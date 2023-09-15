"strict mode";
import {
  diceRoller,
  shuffleArray,
  determineCharacterClass,
  receivePortrait,
  rollForAttributes,
  selectItems,
} from "./System Neutral/functions.js";

import {
  determineModifier,
  determineXPBonus,
  determineCharacterRace,
  determineHirelings,
  determineMovementRate,
} from "./Whitebox/functions.js";

import {
  ADVENTURING_GEAR,
  ALIGNMENTS,
  ARMORS,
  CHARACTER_CLASSES,
  SHIELDS,
  WEAPONS,
} from "./Whitebox/constants.js";

//TODO: Include name randomizer

//FUNCTIONS
//TODO: move these functions to modules?

function generateCharacter(armorClassPreference) {
  //CONSTANTS

  //TODO: Treat ammunitions as a separate purchase: if a character gets a missile weapon, they should obviously get also ammunitions. Bow > arrows, Sling > stones, Crossbow > Bolts
  //TODO: Divide consumables items, so that they can be purchased more than once, and display them as unified (i.e., Torches (10))

  //START RUNTIME
  const generatedCharacter = {};

  generatedCharacter.attributes = rollForAttributes(3);

  for (let i = 0; i < generatedCharacter.attributes.length; i++) {
    generatedCharacter.attributes[i].modifierValue = determineModifier(
      generatedCharacter.attributes[i].attributeValue
    );
  }

  generatedCharacter.characterClass = determineCharacterClass(
    generatedCharacter.attributes,
    CHARACTER_CLASSES
  );

  generatedCharacter.characterRace = determineCharacterRace(
    generatedCharacter.characterClass
  );

  let characterPortrait = receivePortrait(
    generatedCharacter.characterRace.raceName
  ); //TODO: this should be outside of the main function otherwise it generates always the same picture for the same tag

  generatedCharacter.characterAlignment =
    ALIGNMENTS[Math.floor(Math.random() * ALIGNMENTS.length)];

  generatedCharacter.xpBonus = determineXPBonus(
    generatedCharacter.attributes[4].attributeValue,
    generatedCharacter.attributes[5].attributeValue,
    generatedCharacter.characterClass.primeAttributeValue
  );

  generatedCharacter.characterHP =
    generatedCharacter.characterClass.HDatLevel1 +
    generatedCharacter.attributes[2].modifierValue;
  if (generatedCharacter.characterHP <= 0) {
    generatedCharacter.characterHP = 1;
  }

  generatedCharacter.toHitMelee = `${
    generatedCharacter.characterClass.toHitAtLevel1 +
      generatedCharacter.attributes[0].modifierValue >
    0
      ? "+"
      : ""
  }${
    generatedCharacter.characterClass.toHitAtLevel1 +
    generatedCharacter.attributes[0].modifierValue
  }`;
  generatedCharacter.toHitMissile = `${
    generatedCharacter.characterClass.toHitAtLevel1 +
      generatedCharacter.attributes[1].modifierValue >
    0
      ? "+"
      : ""
  }${
    generatedCharacter.characterClass.toHitAtLevel1 +
    generatedCharacter.attributes[1].modifierValue
  }`;

  [generatedCharacter.maxHirelings, generatedCharacter.hirelingsLoyalty] =
    determineHirelings(generatedCharacter.attributes[5].attributeValue);

  generatedCharacter.initialMoney = diceRoller(3, 6) * 10;
  generatedCharacter.currentMoney = generatedCharacter.initialMoney;
  generatedCharacter.characterWeapons = [];
  generatedCharacter.characterArmorGear = [];
  generatedCharacter.characterEquipment = [];

  [generatedCharacter.characterArmorGear, generatedCharacter.currentMoney] =
    selectItems(
      ARMORS,
      1,
      generatedCharacter.currentMoney,
      generatedCharacter.characterClass.characterClassName
    );

  [generatedCharacter.characterWeapons, generatedCharacter.currentMoney] =
    selectItems(
      WEAPONS,
      1,
      generatedCharacter.currentMoney,
      generatedCharacter.characterClass.characterClassName
    );

  if (
    (generatedCharacter.characterClass.characterClassName == "Fighter" ||
      generatedCharacter.characterClass.characterClassName == "Cleric" ||
      generatedCharacter.characterClass.characterClassName == "Elf") &&
    generatedCharacter.characterWeapons.some((x) => x.handling == "one-handed")
  ) {
    let chanceOfShield = Math.floor(Math.random() * 100);

    if (
      chanceOfShield <= 40 &&
      generatedCharacter.currentMoney >= SHIELDS.cost
    ) {
      generatedCharacter.characterArmorGear.push(SHIELDS);
      generatedCharacter.currentMoney =
        generatedCharacter.currentMoney - SHIELDS.cost;
    } else {
      let chanceOf2ndWeapon = Math.floor(Math.random() * 100);
      if (
        chanceOf2ndWeapon <= 50 &&
        generatedCharacter.characterClass.characterClassName == "Fighter"
      ) {
        let weaponNum2 = null;
        [weaponNum2, generatedCharacter.currentMoney] = selectItems(
          WEAPONS.filter((x) => x.handling == "one-handed"),
          1,
          generatedCharacter.currentMoney,
          generatedCharacter.characterClass.characterClassName
        );
        generatedCharacter.characterWeapons.push(...weaponNum2);
      }
    }
  }

  //TODO: if there is a shield, then the selectable weapons should just be one handed

  [generatedCharacter.characterEquipment, generatedCharacter.currentMoney] =
    selectItems(
      ADVENTURING_GEAR,
      ADVENTURING_GEAR.length,
      generatedCharacter.currentMoney,
      generatedCharacter.characterClass.characterClassName
    );

  generatedCharacter.descendingArmorClass =
    9 - generatedCharacter.attributes[1].modifierValue;
  generatedCharacter.ascendingArmorClass =
    10 + generatedCharacter.attributes[1].modifierValue;
  generatedCharacter.gearWeight = 10;
  for (let i = 0; i < generatedCharacter.characterArmorGear.length; i++) {
    generatedCharacter.descendingArmorClass -=
      generatedCharacter.characterArmorGear[i].AC;
    generatedCharacter.ascendingArmorClass +=
      generatedCharacter.characterArmorGear[i].AC;
    generatedCharacter.gearWeight +=
      generatedCharacter.characterArmorGear[i].weight;
  }

  for (let i = 0; i < generatedCharacter.characterWeapons.length; i++) {
    generatedCharacter.gearWeight +=
      generatedCharacter.characterWeapons[i].weight;
  }

  generatedCharacter.gearWeight += Math.floor(
    generatedCharacter.currentMoney / 10
  );

  //generatedCharacter.characterRace.;

  generatedCharacter.movementRate = determineMovementRate(
    generatedCharacter.characterRace.standardMovementRate,
    generatedCharacter.gearWeight
  );

  document.getElementById(
    "char-alignment-written"
  ).innerHTML = `${generatedCharacter.characterAlignment}`;

  document.getElementById(
    "xp-bonus-written"
  ).innerHTML = `${generatedCharacter.xpBonus}%`;

  let characterLevel = document.getElementById("character-level").value;
  if (characterLevel == 1) {
    generatedCharacter.currentXP = 0;
    generatedCharacter.xpToNextLevel =
      generatedCharacter.characterClass.xpToLevel2;
  } else if (characterLevel == 2) {
    generatedCharacter.currentXP = generatedCharacter.characterClass.xpToLevel2;
    generatedCharacter.xpToNextLevel =
      generatedCharacter.characterClass.xpToLevel2 * 2;
  }
  document.getElementById("char-level-written").innerHTML = `${characterLevel}`;
  document.getElementById(
    "char-current-xp-written"
  ).innerHTML = `${generatedCharacter.currentXP}/${generatedCharacter.xpToNextLevel}`;

  document.getElementById(
    "char-race-class-written"
  ).innerHTML = `${generatedCharacter.characterRace.raceName}
  ${generatedCharacter.characterClass.characterClassName}`;

  document.getElementById("str-written").innerHTML =
    generatedCharacter.attributes[0].attributeValue;
  document.getElementById("str-modifier-written").innerHTML = `${
    generatedCharacter.attributes[0].modifierValue > 0 ? "+" : "  "
  }${generatedCharacter.attributes[0].modifierValue}`;

  document.getElementById("dex-written").innerHTML =
    generatedCharacter.attributes[1].attributeValue;
  document.getElementById("dex-modifier-written").innerHTML = `${
    generatedCharacter.attributes[1].modifierValue > 0 ? "+" : "  "
  }${generatedCharacter.attributes[1].modifierValue}`;

  document.getElementById("con-written").innerHTML =
    generatedCharacter.attributes[2].attributeValue;
  document.getElementById("con-modifier-written").innerHTML = `${
    generatedCharacter.attributes[2].modifierValue > 0 ? "+" : "  "
  }${generatedCharacter.attributes[2].modifierValue}`;

  document.getElementById("int-written").innerHTML =
    generatedCharacter.attributes[3].attributeValue;
  document.getElementById("int-modifier-written").innerHTML = `${
    generatedCharacter.attributes[3].modifierValue > 0 ? "+" : "  "
  }${generatedCharacter.attributes[3].modifierValue}`;

  document.getElementById("wis-written").innerHTML =
    generatedCharacter.attributes[4].attributeValue;
  document.getElementById("wis-modifier-written").innerHTML = `${
    generatedCharacter.attributes[4].modifierValue > 0 ? "+" : "  "
  }${generatedCharacter.attributes[4].modifierValue}`;

  document.getElementById("cha-written").innerHTML =
    generatedCharacter.attributes[5].attributeValue;
  document.getElementById("cha-modifier-written").innerHTML = `${
    generatedCharacter.attributes[5].modifierValue > 0 ? "+" : "  "
  }${generatedCharacter.attributes[5].modifierValue}`;

  // document.getElementById("attributes").innerHTML = attributesToDisplay;

  document.getElementById("ac-written").innerHTML =
    armorClassPreference == "descending"
      ? generatedCharacter.descendingArmorClass
      : generatedCharacter.ascendingArmorClass;

  document.getElementById("hp-written").innerHTML =
    generatedCharacter.characterHP;
  document.getElementById("st-written").innerHTML =
    generatedCharacter.characterClass.savingThrowAtLevel1;
  document.getElementById(
    "st-description-written"
  ).innerHTML = `${generatedCharacter.characterClass.savingThrowBonus}${generatedCharacter.characterRace.raceSavingThrowBonus}`;

  let characterAbilities = [];
  characterAbilities.push(
    ...generatedCharacter.characterClass.classSpecialAbilities
  );
  characterAbilities.push(
    ...generatedCharacter.characterRace.raceSpecialAbilities
  );

  let characterAbilitiesToDisplay = ``;
  for (let i = 0; i < characterAbilities.length; i++) {
    characterAbilitiesToDisplay += `<span class="handwritten-smaller">${characterAbilities[i]}</span><br /> `;
  }

  document.getElementById("character-abilities-list").innerHTML =
    characterAbilitiesToDisplay;

  let weaponsAndArmor = `<h2>Weapons and Armor</h2><div class="vitals" id="tohit-melee">Melee: ${generatedCharacter.toHitMelee} </div> <div class="description" id="tohit-melee-description">(to-hit and damage)</div> <div class="vitals" id="tohit-missile">Missile: ${generatedCharacter.toHitMissile} </div> <div class="description" id="tohit-missile-description">(to-hit)</div>`;
  for (let n = 0; n < generatedCharacter.characterWeapons.length; n++) {
    weaponsAndArmor += `<div class="vitals" id="weapon">${generatedCharacter.characterWeapons[n].weaponName}</div><div class="description">(${generatedCharacter.characterWeapons[n].damage})</div>`;
  }
  for (let n = 0; n < generatedCharacter.characterArmorGear.length; n++) {
    generatedCharacter.characterArmorGear[n].armorName == "Unarmored"
      ? (weaponsAndArmor += "")
      : (weaponsAndArmor += `<div class="vitals" id="armor">${
          generatedCharacter.characterArmorGear[n].armorName
        }</div><div class="description">(${
          armorClassPreference == "ascending" ? "+" : "-"
        }${generatedCharacter.characterArmorGear[n].AC})</div>`);
  }
  document.getElementById("weapons-and-armor").innerHTML = weaponsAndArmor;

  let hirelings = `<h2>Hirelings</h2><div class="character-info">Max #: ${
    generatedCharacter.maxHirelings
  }</div><div class="character-info">Loyalty: ${
    generatedCharacter.hirelingsLoyalty > 0 ? "+" : ""
  }${generatedCharacter.hirelingsLoyalty}</div>`;

  document.getElementById("hirelings").innerHTML = hirelings;

  let equipmentToDisplay = `<h2>Equipment</h2><div class="character-info" id="equipment">`;
  for (let n = 0; n < generatedCharacter.characterEquipment.length; n++) {
    equipmentToDisplay += `${generatedCharacter.characterEquipment[n].itemName}<br/> `;
  }
  equipmentToDisplay +=
    generatedCharacter.currentMoney > 0
      ? `${generatedCharacter.currentMoney} gp</div>`
      : "";
  document.getElementById("equipment").innerHTML = equipmentToDisplay;

  document.getElementById(
    "gear-weight-written"
  ).innerHTML = `${generatedCharacter.gearWeight} lbs.`;

  document.getElementById(
    "movement-normal-written"
  ).innerHTML = `${generatedCharacter.movementRate} ft.`;

  document.getElementById("movement-careful-written").innerHTML = `${
    generatedCharacter.movementRate / 2
  } ft.`;

  document.getElementById("movement-running-written").innerHTML = `${
    generatedCharacter.movementRate * 2
  } ft.`;

  document.getElementById("movement-combat-written").innerHTML = `${
    generatedCharacter.movementRate / 3
  } ft.`;

  //TODO: implement async function so that there is no load time for the portait

  document.getElementById(
    "portrait"
  ).innerHTML = `<img src = "${characterPortrait}" width = 175></img>`;
}
generateCharacter(document.getElementById("armor-class").value);

const newCharacterButton = document.querySelector("#new-character");

newCharacterButton.addEventListener("click", () => {
  location.reload(); //TODO: avoid using reload and find a way to make the portait refresh itself
});
