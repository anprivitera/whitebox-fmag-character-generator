"strict mode";
import {
  diceRoller,
  shuffleArray,
  determineCharacterClass,
  receivePortrait,
  rollForAttributes,
} from "./systemNeutralFunctions.js";

import {
  determineModifier,
  determineXPBonus,
  determineCharacterRace,
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
  function selectItems(
    itemsToEvaluate,
    numberOfItems,
    currentMoney,
    whoIsTheCharacter
  ) {
    let shoppingArray = itemsToEvaluate.map((x) => x),
      filteredByCharacter = null,
      filteredByPrice = null,
      selectedItems = [];
    shuffleArray(shoppingArray);
    switch (whoIsTheCharacter) {
      //TODO: find a way to not state each filter so to make code modular
      case "Fighter":
        filteredByCharacter = shoppingArray.filter((n) => n.fighter == true);
        break;
      case "Elf":
        filteredByCharacter = shoppingArray.filter((n) => n.fighter == true);
        break;
      case "Cleric":
        filteredByCharacter = shoppingArray.filter((n) => n.cleric == true);
        break;
      case "Magic-User":
        filteredByCharacter = shoppingArray.filter((n) => n.magicUser == true);
        break;
      case "Thief":
        filteredByCharacter = shoppingArray.filter((n) => n.thief == true);
        break;
    }
    filteredByPrice = filteredByCharacter.filter((x) => x.cost <= currentMoney);

    for (let i = 0; i < numberOfItems; i++) {
      if (
        filteredByPrice != 0 &&
        filteredByPrice.some((x) => x.cost < currentMoney) &&
        currentMoney > 0
      ) {
        selectedItems.unshift(filteredByPrice.shift());
        currentMoney = currentMoney - selectedItems[0].cost;
        filteredByPrice = filteredByPrice.filter((x) => x.cost <= currentMoney);
      } else {
        return [selectedItems, currentMoney];
      }
    }
    return [selectedItems, currentMoney];
  }

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
  );

  generatedCharacter.characterAlignment =
    ALIGNMENTS[Math.floor(Math.random() * ALIGNMENTS.length)];

  let xpBonus = determineXPBonus(
    generatedCharacter.attributes[4].attributeValue,
    generatedCharacter.attributes[5].attributeValue,
    generatedCharacter.characterClass.primeAttributeValue
  );

  let characterHP =
    generatedCharacter.characterClass.HDatLevel1 +
    generatedCharacter.attributes[2].modifierValue;
  if (characterHP <= 0) {
    characterHP = 1;
  }

  const toHitMelee = `${
    generatedCharacter.characterClass.toHitAtLevel1 +
      generatedCharacter.attributes[0].modifierValue >
    0
      ? "+"
      : ""
  }${
    generatedCharacter.characterClass.toHitAtLevel1 +
    generatedCharacter.attributes[0].modifierValue
  }`;
  const toHitMissile = `${
    generatedCharacter.characterClass.toHitAtLevel1 +
      generatedCharacter.attributes[1].modifierValue >
    0
      ? "+"
      : ""
  }${
    generatedCharacter.characterClass.toHitAtLevel1 +
    generatedCharacter.attributes[1].modifierValue
  }`;

  let maxHirelings = null;
  let hirelingsLoyalty = null;
  if (generatedCharacter.attributes[5].attributeValue <= 4) {
    maxHirelings = 1;
    hirelingsLoyalty = -2;
  } else if (
    generatedCharacter.attributes[5].attributeValue >= 5 &&
    generatedCharacter.attributes[5].attributeValue <= 6
  ) {
    maxHirelings = 2;
    hirelingsLoyalty = -2;
  } else if (
    generatedCharacter.attributes[5].attributeValue >= 7 &&
    generatedCharacter.attributes[5].attributeValue <= 8
  ) {
    maxHirelings = 3;
    hirelingsLoyalty = -1;
  } else if (
    generatedCharacter.attributes[5].attributeValue >= 9 &&
    generatedCharacter.attributes[5].attributeValue <= 12
  ) {
    maxHirelings = 4;
    hirelingsLoyalty = 0;
  } else if (
    generatedCharacter.attributes[5].attributeValue >= 13 &&
    generatedCharacter.attributes[5].attributeValue <= 15
  ) {
    maxHirelings = 5;
    hirelingsLoyalty = 1;
  } else if (
    generatedCharacter.attributes[5].attributeValue >= 16 &&
    generatedCharacter.attributes[5].attributeValue <= 17
  ) {
    maxHirelings = 6;
    hirelingsLoyalty = 2;
  } else {
    maxHirelings = 7;
    hirelingsLoyalty = 2;
  }

  const initialMoney = diceRoller(3, 6) * 10;
  let currentMoney = initialMoney;
  let characterWeapons = [];
  let characterArmorGear = [];
  let characterEquipment = [];

  [characterArmorGear, currentMoney] = selectItems(
    ARMORS,
    1,
    currentMoney,
    generatedCharacter.characterClass.characterClassName
  );

  [characterWeapons, currentMoney] = selectItems(
    WEAPONS,
    1,
    currentMoney,
    generatedCharacter.characterClass.characterClassName
  );

  if (
    (generatedCharacter.characterClass.characterClassName == "Fighter" ||
      generatedCharacter.characterClass.characterClassName == "Cleric" ||
      generatedCharacter.characterClass.characterClassName == "Elf") &&
    characterWeapons.some((x) => x.handling == "one-handed")
  ) {
    let chanceOfShield = Math.floor(Math.random() * 100);

    if (chanceOfShield <= 40 && currentMoney >= SHIELDS.cost) {
      characterArmorGear.push(SHIELDS);
      currentMoney = currentMoney - SHIELDS.cost;
    } else {
      let chanceOf2ndWeapon = Math.floor(Math.random() * 100);
      if (
        chanceOf2ndWeapon <= 50 &&
        generatedCharacter.characterClass.characterClassName == "Fighter"
      ) {
        let weaponNum2 = null;
        [weaponNum2, currentMoney] = selectItems(
          WEAPONS.filter((x) => x.handling == "one-handed"),
          1,
          currentMoney,
          generatedCharacter.characterClass.characterClassName
        );
        characterWeapons.push(...weaponNum2);
      }
    }
  }

  //TODO: if there is a shield, then the selectable weapons should just be one handed

  [characterEquipment, currentMoney] = selectItems(
    ADVENTURING_GEAR,
    ADVENTURING_GEAR.length,
    currentMoney,
    generatedCharacter.characterClass.characterClassName
  );

  let descendingArmorClass = 9 - generatedCharacter.attributes[1].modifierValue;
  let ascendingArmorClass = 10 + generatedCharacter.attributes[1].modifierValue;
  let gearWeight = 10;
  for (let i = 0; i < characterArmorGear.length; i++) {
    descendingArmorClass -= characterArmorGear[i].AC;
    ascendingArmorClass += characterArmorGear[i].AC;
    gearWeight += characterArmorGear[i].weight;
  }

  let armorClass = null,
    armorClassModifier = null;
  if (armorClassPreference == "descending") {
    armorClass = descendingArmorClass;
    armorClassModifier = "-";
  } else if (armorClassPreference == "ascending") {
    armorClass = ascendingArmorClass;
    armorClassModifier = "+";
  }

  for (let i = 0; i < characterWeapons.length; i++) {
    gearWeight += characterWeapons[i].weight;
  }

  if (currentMoney != null) {
    gearWeight += Math.floor(currentMoney / 10);
  }

  let movementRate = generatedCharacter.characterRace.standardMovementRate * 10;
  if (gearWeight >= 76 && gearWeight <= 100) {
    movementRate -= 30;
  } else if (gearWeight >= 101 && gearWeight <= 150) {
    movementRate -= 30;
  } else if (gearWeight >= 151) {
    movementRate = 30;
  }

  // for (let i=0; i < characterEquipment.length; i++ ) {

  // }

  let currentXP = "";
  let xpToNextLevel = "";

  document.getElementById(
    "char-alignment-written"
  ).innerHTML = `${generatedCharacter.characterAlignment}`;

  document.getElementById("xp-bonus-written").innerHTML = `${xpBonus}%`;

  let characterLevel = document.getElementById("character-level").value;
  if (characterLevel == 1) {
    currentXP = 0;
    xpToNextLevel = generatedCharacter.characterClass.xpToLevel2;
  } else if (characterLevel == 2) {
    currentXP = generatedCharacter.characterClass.xpToLevel2;
    xpToNextLevel = generatedCharacter.characterClass.xpToLevel2 * 2;
  }
  document.getElementById("char-level-written").innerHTML = `${characterLevel}`;
  document.getElementById(
    "char-current-xp-written"
  ).innerHTML = `${currentXP}/${xpToNextLevel}`;

  // setInterval(setXP, 1000);

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

  document.getElementById("ac-written").innerHTML = armorClass;
  document.getElementById("hp-written").innerHTML = characterHP;
  document.getElementById("st-written").innerHTML =
    generatedCharacter.characterClass.savingThrowAtLevel1;
  document.getElementById(
    "st-description-written"
  ).innerHTML = `${generatedCharacter.characterClass.savingThrowBonus}${generatedCharacter.characterRace.raceSavingThrowBonus}`;

  let characterAbilities = [];
  characterAbilities.push(
    ...generatedCharacter.characterClass.specialAbilities
  );
  characterAbilities.push(
    ...generatedCharacter.characterRace.raceSpecialAbilities
  );

  let characterAbilitiesToDisplay = `<h2>Abilities</h2>`;
  for (let i = 0; i < characterAbilities.length; i++) {
    characterAbilitiesToDisplay += `<div class="character-info" id="ability">${characterAbilities[i]}</div> `;
  }

  document.getElementById("character-abilities").innerHTML =
    characterAbilitiesToDisplay;

  let weaponsAndArmor = `<h2>Weapons and Armor</h2><div class="vitals" id="tohit-melee">Melee: ${toHitMelee} </div> <div class="description" id="tohit-melee-description">(to-hit and damage)</div> <div class="vitals" id="tohit-missile">Missile: ${toHitMissile} </div> <div class="description" id="tohit-missile-description">(to-hit)</div>`;
  for (let n = 0; n < characterWeapons.length; n++) {
    weaponsAndArmor += `<div class="vitals" id="weapon">${characterWeapons[n].weaponName}</div><div class="description">(${characterWeapons[n].damage})</div>`;
  }
  for (let n = 0; n < characterArmorGear.length; n++) {
    characterArmorGear[n].armorName == "Unarmored"
      ? (weaponsAndArmor += "")
      : (weaponsAndArmor += `<div class="vitals" id="armor">${characterArmorGear[n].armorName}</div><div class="description">(${armorClassModifier}${characterArmorGear[n].AC})</div>`);
  }
  document.getElementById("weapons-and-armor").innerHTML = weaponsAndArmor;

  let hirelings = `<h2>Hirelings</h2><div class="character-info">Max #: ${maxHirelings}</div><div class="character-info">Loyalty: ${
    hirelingsLoyalty > 0 ? "+" : ""
  }${hirelingsLoyalty}</div>`;

  document.getElementById("hirelings").innerHTML = hirelings;

  let equipmentToDisplay = `<h2>Equipment</h2><div class="character-info" id="equipment">`;
  for (let n = 0; n < characterEquipment.length; n++) {
    equipmentToDisplay += `${characterEquipment[n].itemName}<br/> `;
  }
  equipmentToDisplay += currentMoney > 0 ? `${currentMoney} gp</div>` : "";
  document.getElementById("equipment").innerHTML = equipmentToDisplay;

  document.getElementById(
    "movement"
  ).innerHTML = `<h2>Encumberance</h2><div class="character-info">Gear Weight: ${gearWeight}</div><div class="character-info">Normal: ${movementRate} ft.</div><div class="character-info">Careful: ${Math.floor(
    movementRate / 2
  )} ft.</div><div class="character-info">Running: ${
    movementRate * 2
  } ft.</div><div class="character-info">Combat: ${Math.floor(
    movementRate / 3
  )} ft.</div>`;

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
