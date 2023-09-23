"strict mode";
import {
  diceRoller,
  determineCharacterClass,
  receivePortrait,
  selectItems,
  removeLoadScreen,
  addLoadScreen,
  arrayRandomItem,
} from "./System Neutral/functions.js";

import { GENDERS } from "./System Neutral/constants.js";

import {
  determineModifier,
  determineXPBonus,
  determineCharacterRace,
  determineHirelings,
  determineMovementRate,
  determineHP,
} from "./Whitebox/functions.js";

import {
  ADVENTURING_GEAR,
  ALIGNMENTS,
  ARMORS,
  CHARACTER_CLASSES,
  CHARACTER_RACES,
  CHARACTER_SHEET,
  SHIELDS,
  WEAPONS,
  AMMUNITIONS,
} from "./Whitebox/constants.js";

//TODO: Include name randomizer

function generateCharacter() {
  let generatedCharacter = CHARACTER_SHEET;

  let {
    characterName,
    alignment,
    attributes,
    gender,
    HP,
    characterClass,
    characterRace,
    xpBonus,
    toHitMelee,
    toHitMissile,
    armorClass,
    hirelings,
    money,
    equipment,
    gearWeight,
    characterCapacity,
  } = generatedCharacter;

  let [strength, dexterity, constitution, intelligence, wisdom, charisma] =
    attributes;

  for (const attribute in attributes) {
    attributes[attribute].attributeValue = diceRoller(3, 6);
    attributes[attribute].modifierValue = determineModifier(
      attributes[attribute].attributeValue
    );
  }

  characterClass = determineCharacterClass(attributes, CHARACTER_CLASSES);

  characterRace = determineCharacterRace(characterClass, CHARACTER_RACES);

  gender = arrayRandomItem(GENDERS);

  characterName = "Kerrigan";

  alignment = arrayRandomItem(ALIGNMENTS);

  xpBonus = determineXPBonus(
    wisdom.attributeValue,
    charisma.attributeValue,
    characterClass.primeAttributeValue
  );

  HP = determineHP(characterClass.HDatLevel1, constitution.modifierValue);

  toHitMelee =
    characterClass.toHitAtLevel1 +
    strength.modifierValue +
    characterRace.raceMeleeBonus;
  toHitMissile =
    characterClass.toHitAtLevel1 +
    dexterity.modifierValue +
    +characterRace.raceMissileBonus;

  [hirelings.maxHirelings, hirelings.hirelingsLoyalty] = determineHirelings(
    charisma.attributeValue
  );

  money.initialMoney = diceRoller(3, 6) * 10;
  money.currentMoney = money.initialMoney;
  equipment.weapons = [];
  equipment.ammunitions = [];
  equipment.armor = [];
  equipment.adventuringGear = [];

  let weaponsByAttribute = null;
  if (toHitMelee < toHitMissile) {
    weaponsByAttribute = WEAPONS.filter(
      (x) => x.meleeOrMissile.indexOf("missile") > -1
    );
  } else if (toHitMelee > toHitMissile) {
    weaponsByAttribute = WEAPONS.filter(
      (x) => x.meleeOrMissile.indexOf("melee") > -1
    );
  } else {
    weaponsByAttribute = WEAPONS;
  }

  [equipment.weapons, money.currentMoney] = selectItems(
    weaponsByAttribute,
    1,
    money.currentMoney,
    characterClass.characterClassName
  );

  if (
    equipment.weapons[0].meleeOrMissile.indexOf("missile") > -1 &&
    equipment.weapons[0].ammunitions
  ) {
    //TODO: Find a way to include also the silver arrow for bows
    let ammunitionForPurchasedWeapon = AMMUNITIONS.find(
      (x) => x.usedBy.indexOf(equipment.weapons[0].weaponName) > -1
    );
    equipment.ammunitions.push(ammunitionForPurchasedWeapon);
    money.currentMoney = money.currentMoney - ammunitionForPurchasedWeapon.cost;
  }

  [equipment.armor, money.currentMoney] = selectItems(
    ARMORS,
    1,
    money.currentMoney,
    characterClass.characterClassName
  );

  if (
    (characterClass.characterClassName == "Fighter" ||
      characterClass.characterClassName == "Cleric" ||
      characterClass.characterClassName == "Elf") &&
    equipment.weapons.some((x) => x.handling == "1H")
  ) {
    let chanceOfShield = Math.floor(Math.random() * 100);

    if (chanceOfShield <= 40 && money.currentMoney >= SHIELDS.cost) {
      equipment.armor.push(SHIELDS);
      money.currentMoney = money.currentMoney - SHIELDS.cost;
    } else {
      let chanceOf2ndWeapon = Math.floor(Math.random() * 100);
      if (
        chanceOf2ndWeapon <= 50 &&
        characterClass.characterClassName == "Fighter"
      ) {
        let weaponNum2 = null;
        [weaponNum2, money.currentMoney] = selectItems(
          WEAPONS.filter(
            (x) =>
              x.handling != equipment.weapons[0].handling ||
              x.meleeOrMissile != equipment.weapons[0].meleeOrMissile
          ),
          1,
          money.currentMoney,
          characterClass.characterClassName
        );
        equipment.weapons.push(...weaponNum2);
      }
    }
  }

  // let container = [];
  // let equipment = [];

  [equipment.containers, money.currentMoney] = selectItems(
    ADVENTURING_GEAR.filter((x) => x.container),
    Math.floor(Math.random() * (3 - 2) + 2),
    money.currentMoney,
    characterClass.characterClassName
  );

  [equipment.adventuringGear, money.currentMoney] = selectItems(
    ADVENTURING_GEAR.filter((x) => !x.container),
    12 -
      equipment.weapons.length -
      equipment.armor.length -
      equipment.containers.length -
      equipment.ammunitions.length,
    // + strength.modifierValue +
    // constitution.modifierValue,
    money.currentMoney,
    characterClass.characterClassName
  );

  armorClass.descending = 9 - dexterity.modifierValue;
  armorClass.ascending = 10 + dexterity.modifierValue;
  gearWeight = 10;
  for (const armors in equipment.armor) {
    armorClass.descending -= equipment.armor[armors].AC;
    armorClass.ascending += equipment.armor[armors].AC;
    gearWeight += equipment.armor[armors].weight;
  }

  for (let i = 0; i < equipment.weapons.length; i++) {
    gearWeight += equipment.weapons[i].weight;
  }

  for (let i = 0; i < equipment.ammunitions.length; i++) {
    gearWeight += equipment.ammunitions[i].weight;
  }

  gearWeight += money.currentMoney * 0.1;

  generatedCharacter.movementRate = determineMovementRate(
    characterRace.standardMovementRate,
    gearWeight
  );

  for (let i = 0; i < equipment.containers.length; i++) {
    characterCapacity += equipment.containers[i].capacity;
  }
  let characterPortrait = new receivePortrait(characterRace.raceName, gender); //TODO: this should be outside of the main function otherwise it generates always the same picture for the same tag

  document
    .getElementById("change-portrait")
    .addEventListener("click", function () {
      new receivePortrait(characterRace.raceName, gender);
    });

  document.getElementById("name-handwritten").innerHTML = characterName;

  // document.getElementById("physique-handwritten").innerHTML =
  //   PHYSIQUE[Math.floor(Math.random() * PHYSIQUE.length)];

  // document.getElementById("skin-handwritten").innerHTML =
  //   SKIN[Math.floor(Math.random() * SKIN.length)];

  // document.getElementById("clothing-handwritten").innerHTML =
  //   CLOTHING[Math.floor(Math.random() * CLOTHING.length)];

  // document.getElementById("virtue-handwritten").innerHTML =
  //   VIRTUE[Math.floor(Math.random() * VIRTUE.length)];

  // document.getElementById("vice-handwritten").innerHTML =
  //   VICE[Math.floor(Math.random() * VICE.length)];

  // document.getElementById("speech-handwritten").innerHTML =
  //   SPEECH[Math.floor(Math.random() * SPEECH.length)];

  // document.getElementById("background-handwritten").innerHTML =
  //   BACKGROUND[Math.floor(Math.random() * BACKGROUND.length)];

  // document.getElementById("misfortune-handwritten").innerHTML =
  //   MISFORTUNES[Math.floor(Math.random() * MISFORTUNES.length)];

  document.getElementById("char-alignment-written").innerHTML = `${alignment}`;

  document.getElementById("xp-bonus-written").innerHTML = `${xpBonus}%`;

  generatedCharacter.characterLevel =
    document.getElementById("character-level").value;
  if (generatedCharacter.characterLevel == 1) {
    generatedCharacter.currentXP = 0;
    generatedCharacter.xpToNextLevel = characterClass.xpToLevel2;
  } else if (generatedCharacter.characterLevel == 2) {
    generatedCharacter.currentXP = characterClass.xpToLevel2;
    generatedCharacter.xpToNextLevel = characterClass.xpToLevel2 * 2;
  }
  document.getElementById(
    "char-level-written"
  ).innerHTML = `${generatedCharacter.characterLevel} of ${characterRace.maxLevel}`;
  document.getElementById("char-current-xp-written").innerHTML =
    generatedCharacter.currentXP;
  document.getElementById("char-xp-to-next-lvl-written").innerHTML =
    generatedCharacter.xpToNextLevel;

  document.getElementById(
    "char-race-class-written"
  ).innerHTML = `<span>${characterRace.raceName}</span>
  <span>${characterClass.characterClassName}</span>`;

  document.getElementById("str-written").innerHTML = strength.attributeValue;
  document.getElementById("str-modifier-written").innerHTML = `(${
    strength.modifierValue > 0 ? "+" : ""
  }${strength.modifierValue})`;

  document.getElementById("dex-written").innerHTML = dexterity.attributeValue;
  document.getElementById("dex-modifier-written").innerHTML = `(${
    dexterity.modifierValue > 0 ? "+" : ""
  }${dexterity.modifierValue})`;

  document.getElementById("con-written").innerHTML =
    constitution.attributeValue;
  document.getElementById("con-modifier-written").innerHTML = `(${
    constitution.modifierValue > 0 ? "+" : ""
  }${constitution.modifierValue})`;

  document.getElementById("int-written").innerHTML =
    intelligence.attributeValue;
  document.getElementById("int-modifier-written").innerHTML = `(${
    intelligence.modifierValue > 0 ? "+" : ""
  }${intelligence.modifierValue})`;

  document.getElementById("wis-written").innerHTML = wisdom.attributeValue;
  document.getElementById("wis-modifier-written").innerHTML = `(${
    wisdom.modifierValue > 0 ? "+" : ""
  }${wisdom.modifierValue})`;

  document.getElementById("cha-written").innerHTML = charisma.attributeValue;
  document.getElementById("cha-modifier-written").innerHTML = `(${
    charisma.modifierValue > 0 ? "+" : ""
  }${charisma.modifierValue})`;

  // document.getElementById("attributes").innerHTML = attributesToDisplay;

  document.getElementById("ac-written").innerHTML =
    document.getElementById("armor-class").value == "descending"
      ? armorClass.descending
      : armorClass.ascending;

  document.getElementById("hp-written").innerHTML = HP;
  document.getElementById("st-written").innerHTML =
    characterClass.savingThrowAtLevel1;
  document.getElementById(
    "st-description-written"
  ).innerHTML = `${characterClass.savingThrowBonus}${characterRace.raceSavingThrowBonus}`;

  let characterAbilities = [];
  characterAbilities.push(...characterClass.classSpecialAbilities);
  characterAbilities.push(...characterRace.raceSpecialAbilities);

  let characterAbilitiesToDisplay = `<ul>`;
  for (let i = 0; i < characterAbilities.length; i++) {
    characterAbilitiesToDisplay += `<li class="handwritten-medium" id="ability-${i}">${characterAbilities[i]}</li>`;
  }
  characterAbilitiesToDisplay += "</ul>";

  document.getElementById("character-abilities-list").innerHTML =
    characterAbilitiesToDisplay;

  document.getElementById("to-hit-melee-written").innerHTML = `${
    toHitMelee > 0 ? "+" : ""
  }${toHitMelee}`;

  document.getElementById("to-hit-melee-description-written").innerHTML = `${
    characterClass.toHitAtLevel1 > 0 ? "+" : ""
  }${characterClass.toHitAtLevel1} lvl, ${
    strength.modifierValue > 0 ? "+" : ""
  }${strength.modifierValue} ${strength.attributeName}, ${
    characterRace.raceMeleeBonus > 0 ? "+" : ""
  }${characterRace.raceMeleeBonus} race`;

  document.getElementById("to-hit-missile-written").innerHTML = `${
    toHitMissile > 0 ? "+" : ""
  }${toHitMissile}`;

  document.getElementById("to-hit-missile-description-written").innerHTML = `${
    characterClass.toHitAtLevel1 > 0 ? "+" : ""
  }${characterClass.toHitAtLevel1} lvl, ${
    dexterity.modifierValue > 0 ? "+" : ""
  }${dexterity.modifierValue} ${dexterity.attributeName}, ${
    characterRace.raceMissileBonus > 0 ? "+" : ""
  }${characterRace.raceMissileBonus} race.`;

  let equipmentToDisplay = "<ol>";

  for (let n = 0; n < equipment.weapons.length; n++) {
    equipmentToDisplay += `<li class="handwritten-medium" id="weapon-${n}">${equipment.weapons[n].weaponName}, ${equipment.weapons[n].damage} <br/><div class="description" id="weapon-${n}-description">${equipment.weapons[n].meleeOrMissile}, ${equipment.weapons[n].handling}, ${equipment.weapons[n].missileRange}${equipment.weapons[n].missileROF}${equipment.weapons[n].weight} lbs.</div></li>`;
  }

  for (let n = 0; n < equipment.ammunitions.length; n++) {
    equipmentToDisplay += `<li class="handwritten-medium" id="weapon-${n}">${equipment.ammunitions[n].ammunitionName}, <input type="number" value="${equipment.ammunitions[n].quantity}"></input><div class="description" id="ammunition-${n}-description">${equipment.ammunitions[n].weight} lbs.</div></li>`;
  }

  for (let n = 0; n < equipment.armor.length; n++) {
    equipment.armor[n].armorName == "Unarmored"
      ? (equipmentToDisplay += "")
      : (equipmentToDisplay += `<li class="handwritten-medium" id="armor">${
          equipment.armor[n].armorName
        }<br /><div class="description">${
          document.getElementById("armor-class").value == "ascending"
            ? "+"
            : "-"
        }${equipment.armor[n].AC} AC, ${
          equipment.armor[n].weight
        } lbs.</div></li>`);
  }
  // document.getElementById("weapons-and-armor").innerHTML = weaponsAndArmor;

  for (let n = 0; n < equipment.containers.length; n++) {
    equipmentToDisplay += `<li class="handwritten-medium">${equipment.containers[n].itemName}</li>`;
  }

  for (let n = 0; n < equipment.adventuringGear.length; n++) {
    equipmentToDisplay += `<li class="handwritten-medium">${
      equipment.adventuringGear[n].itemName
    }${
      equipment.adventuringGear[n].quantity != ""
        ? ', <input type="number" value="'
        : ""
    }${equipment.adventuringGear[n].quantity}${
      equipment.adventuringGear[n].quantity != "" ? '"></input>' : ""
    } ${
      equipment.adventuringGear[n].quantityType != ""
        ? equipment.adventuringGear[n].quantityType
        : ""
    }
      </li>`;
  }
  equipmentToDisplay += "</ol>";

  document.getElementById("gp-written").value = money.currentMoney;

  document.getElementById("equipment-items").innerHTML = equipmentToDisplay;

  document.getElementById("hirelings-max-written").innerHTML =
    hirelings.maxHirelings;
  document.getElementById("hirelings-loyalty-written").innerHTML = `${
    hirelings.hirelingsLoyalty > 0 ? "+" : ""
  }${hirelings.hirelingsLoyalty}`;

  document.getElementById("gear-weight-written").innerHTML = `${Math.floor(
    gearWeight
  )}/300 lbs.`;

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

  document.getElementById(
    "carrying-capacity-written"
  ).innerHTML = `${Math.floor(10 + money.currentMoney * 0.1)}/${
    characterCapacity
  } lbs.`;
}

const newCharacterButton = document.querySelector("#new-character");

newCharacterButton.addEventListener("click", function () {
  addLoadScreen(), new generateCharacter(), setTimeout(removeLoadScreen, 1200);
});

setTimeout(removeLoadScreen, 1200);

generateCharacter();

//TODO: implement async function so that there is no load time for the portait
