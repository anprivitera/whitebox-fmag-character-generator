"strict mode";
import {
  diceRoller,
  determineCharacterClass,
  receivePortrait,
  rollForAttributes,
  selectItems,
  removeLoadScreen,
  addLoadScreen,
} from "./System Neutral/functions.js";

// import {
//   PHYSIQUE,
//   SKIN,
//   CLOTHING,
//   VIRTUE,
//   VICE,
//   SPEECH,
//   BACKGROUND,
//   MISFORTUNES,
// } from "./System Neutral/constants.js";

import {
  determineModifier,
  determineXPBonus,
  determineCharacterRace,
  determineHirelings,
  determineMovementRate,
  determineAlignment,
  determineHP,
} from "./Whitebox/functions.js";

import {
  ADVENTURING_GEAR,
  ALIGNMENTS,
  ARMORS,
  CHARACTER_CLASSES,
  CHARACTER_RACES,
  SHIELDS,
  WEAPONS,
  AMMUNITIONS,
} from "./Whitebox/constants.js";

import {
  human,
} from "./node_modules/fantastical/src/generators/species.js";

//TODO: Include name randomizer

function generateCharacter() {
  let generatedCharacter = {};

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

  generatedCharacter = determineCharacterRace(
    generatedCharacter,
    CHARACTER_RACES
  );

  const genderArray = ["man", "woman"];

  generatedCharacter.characterGender =
    genderArray[Math.floor(Math.random() * genderArray.length)];

  generatedCharacter.characterName = human;

  generatedCharacter.characterAlignment = determineAlignment(ALIGNMENTS);

  generatedCharacter.xpBonus = determineXPBonus(
    generatedCharacter.attributes[4].attributeValue,
    generatedCharacter.attributes[5].attributeValue,
    generatedCharacter.characterClass.primeAttributeValue
  );

  determineHP(generatedCharacter);

  generatedCharacter.toHitMelee =
    generatedCharacter.characterClass.toHitAtLevel1 +
    generatedCharacter.attributes[0].modifierValue +
    generatedCharacter.characterRace.raceMeleeBonus;
  generatedCharacter.toHitMissile =
    generatedCharacter.characterClass.toHitAtLevel1 +
    generatedCharacter.attributes[1].modifierValue +
    +generatedCharacter.characterRace.raceMissileBonus;

  [generatedCharacter.maxHirelings, generatedCharacter.hirelingsLoyalty] =
    determineHirelings(generatedCharacter.attributes[5].attributeValue);

  generatedCharacter.initialMoney = diceRoller(3, 6) * 10;
  generatedCharacter.currentMoney = generatedCharacter.initialMoney;
  generatedCharacter.characterWeapons = [];
  generatedCharacter.characterAmmunitions = [];
  generatedCharacter.characterArmorGear = [];
  generatedCharacter.characterEquipment = [];

  let weaponsByAttribute = null;
  if (generatedCharacter.toHitMelee < generatedCharacter.toHitMissile) {
    weaponsByAttribute = WEAPONS.filter(
      (x) => x.meleeOrMissile.indexOf("missile") > -1
    );
  } else if (generatedCharacter.toHitMelee > generatedCharacter.toHitMissile) {
    weaponsByAttribute = WEAPONS.filter(
      (x) => x.meleeOrMissile.indexOf("melee") > -1
    );
  } else {
    weaponsByAttribute = WEAPONS;
  }

  [generatedCharacter.characterWeapons, generatedCharacter.currentMoney] =
    selectItems(
      weaponsByAttribute,
      1,
      generatedCharacter.currentMoney,
      generatedCharacter.characterClass.characterClassName
    );

  if (
    generatedCharacter.characterWeapons[0].meleeOrMissile.indexOf("missile") >
      -1 &&
    generatedCharacter.characterWeapons[0].ammunitions
  ) {
    //TODO: Find a way to include also the silver arrow for bows
    let ammunitionForPurchasedWeapon = AMMUNITIONS.find(
      (x) =>
        x.usedBy.indexOf(generatedCharacter.characterWeapons[0].weaponName) > -1
    );
    generatedCharacter.characterAmmunitions.push(ammunitionForPurchasedWeapon);
    generatedCharacter.currentMoney =
      generatedCharacter.currentMoney - ammunitionForPurchasedWeapon.cost;
  }

  [generatedCharacter.characterArmorGear, generatedCharacter.currentMoney] =
    selectItems(
      ARMORS,
      1,
      generatedCharacter.currentMoney,
      generatedCharacter.characterClass.characterClassName
    );

  if (
    (generatedCharacter.characterClass.characterClassName == "Fighter" ||
      generatedCharacter.characterClass.characterClassName == "Cleric" ||
      generatedCharacter.characterClass.characterClassName == "Elf") &&
    generatedCharacter.characterWeapons.some((x) => x.handling == "1H")
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
          WEAPONS.filter(
            (x) =>
              x.handling != generatedCharacter.characterWeapons[0].handling ||
              x.meleeOrMissile !=
                generatedCharacter.characterWeapons[0].meleeOrMissile
          ),
          1,
          generatedCharacter.currentMoney,
          generatedCharacter.characterClass.characterClassName
        );
        generatedCharacter.characterWeapons.push(...weaponNum2);
      }
    }
  }

  // let container = [];
  // let equipment = [];

  [generatedCharacter.characterContainer, generatedCharacter.currentMoney] =
    selectItems(
      ADVENTURING_GEAR.filter((x) => x.container),
      Math.floor(Math.random() * (3 - 2) + 2),
      generatedCharacter.currentMoney,
      generatedCharacter.characterClass.characterClassName
    );

  [generatedCharacter.characterEquipment, generatedCharacter.currentMoney] =
    selectItems(
      ADVENTURING_GEAR.filter((x) => !x.container),
      12 -
        generatedCharacter.characterWeapons.length -
        generatedCharacter.characterArmorGear.length -
        generatedCharacter.characterContainer.length -
        generatedCharacter.characterAmmunitions.length,
      // + generatedCharacter.attributes[0].modifierValue +
      // generatedCharacter.attributes[2].modifierValue,
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

  for (let i = 0; i < generatedCharacter.characterAmmunitions.length; i++) {
    generatedCharacter.gearWeight +=
      generatedCharacter.characterAmmunitions[i].weight;
  }

  generatedCharacter.gearWeight += generatedCharacter.currentMoney * 0.1;

  generatedCharacter.movementRate = determineMovementRate(
    generatedCharacter.characterRace.standardMovementRate,
    generatedCharacter.gearWeight
  );

  generatedCharacter.characterCapacity = 0;

  for (let i = 0; i < generatedCharacter.characterContainer.length; i++) {
    generatedCharacter.characterCapacity +=
      generatedCharacter.characterContainer[i].capacity;
  }
  let characterPortrait = new receivePortrait(
    generatedCharacter.characterRace.raceName,
    generatedCharacter.characterGender
  ); //TODO: this should be outside of the main function otherwise it generates always the same picture for the same tag

  document
    .getElementById("change-portrait")
    .addEventListener("click", function () {
      new receivePortrait(
        generatedCharacter.characterRace.raceName,
        generatedCharacter.characterGender
      );
    });

  document.getElementById("name-handwritten").innerHTML =
    generatedCharacter.characterName;

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

  document.getElementById(
    "char-alignment-written"
  ).innerHTML = `${generatedCharacter.characterAlignment}`;

  document.getElementById(
    "xp-bonus-written"
  ).innerHTML = `${generatedCharacter.xpBonus}%`;

  generatedCharacter.characterLevel =
    document.getElementById("character-level").value;
  if (generatedCharacter.characterLevel == 1) {
    generatedCharacter.currentXP = 0;
    generatedCharacter.xpToNextLevel =
      generatedCharacter.characterClass.xpToLevel2;
  } else if (generatedCharacter.characterLevel == 2) {
    generatedCharacter.currentXP = generatedCharacter.characterClass.xpToLevel2;
    generatedCharacter.xpToNextLevel =
      generatedCharacter.characterClass.xpToLevel2 * 2;
  }
  document.getElementById(
    "char-level-written"
  ).innerHTML = `${generatedCharacter.characterLevel} of ${generatedCharacter.characterRace.maxLevel}`;
  document.getElementById("char-current-xp-written").innerHTML =
    generatedCharacter.currentXP;
  document.getElementById("char-xp-to-next-lvl-written").innerHTML =
    generatedCharacter.xpToNextLevel;

  document.getElementById(
    "char-race-class-written"
  ).innerHTML = `<span>${generatedCharacter.characterRace.raceName}</span>
  <span>${generatedCharacter.characterClass.characterClassName}</span>`;

  document.getElementById("str-written").innerHTML =
    generatedCharacter.attributes[0].attributeValue;
  document.getElementById("str-modifier-written").innerHTML = `(${
    generatedCharacter.attributes[0].modifierValue > 0 ? "+" : ""
  }${generatedCharacter.attributes[0].modifierValue})`;

  document.getElementById("dex-written").innerHTML =
    generatedCharacter.attributes[1].attributeValue;
  document.getElementById("dex-modifier-written").innerHTML = `(${
    generatedCharacter.attributes[1].modifierValue > 0 ? "+" : ""
  }${generatedCharacter.attributes[1].modifierValue})`;

  document.getElementById("con-written").innerHTML =
    generatedCharacter.attributes[2].attributeValue;
  document.getElementById("con-modifier-written").innerHTML = `(${
    generatedCharacter.attributes[2].modifierValue > 0 ? "+" : ""
  }${generatedCharacter.attributes[2].modifierValue})`;

  document.getElementById("int-written").innerHTML =
    generatedCharacter.attributes[3].attributeValue;
  document.getElementById("int-modifier-written").innerHTML = `(${
    generatedCharacter.attributes[3].modifierValue > 0 ? "+" : ""
  }${generatedCharacter.attributes[3].modifierValue})`;

  document.getElementById("wis-written").innerHTML =
    generatedCharacter.attributes[4].attributeValue;
  document.getElementById("wis-modifier-written").innerHTML = `(${
    generatedCharacter.attributes[4].modifierValue > 0 ? "+" : ""
  }${generatedCharacter.attributes[4].modifierValue})`;

  document.getElementById("cha-written").innerHTML =
    generatedCharacter.attributes[5].attributeValue;
  document.getElementById("cha-modifier-written").innerHTML = `(${
    generatedCharacter.attributes[5].modifierValue > 0 ? "+" : ""
  }${generatedCharacter.attributes[5].modifierValue})`;

  // document.getElementById("attributes").innerHTML = attributesToDisplay;

  document.getElementById("ac-written").innerHTML =
    document.getElementById("armor-class").value == "descending"
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

  let characterAbilitiesToDisplay = `<ul>`;
  for (let i = 0; i < characterAbilities.length; i++) {
    characterAbilitiesToDisplay += `<li class="handwritten-medium" id="ability-${i}">${characterAbilities[i]}</li>`;
  }
  characterAbilitiesToDisplay += "</ul>";

  document.getElementById("character-abilities-list").innerHTML =
    characterAbilitiesToDisplay;

  document.getElementById("to-hit-melee-written").innerHTML = `${
    generatedCharacter.toHitMelee > 0 ? "+" : ""
  }${generatedCharacter.toHitMelee}`;

  document.getElementById("to-hit-melee-description-written").innerHTML = `${
    generatedCharacter.characterClass.toHitAtLevel1 > 0 ? "+" : ""
  }${generatedCharacter.characterClass.toHitAtLevel1} lvl, ${
    generatedCharacter.attributes[0].modifierValue > 0 ? "+" : ""
  }${generatedCharacter.attributes[0].modifierValue} ${
    generatedCharacter.attributes[0].attributeName
  }, ${generatedCharacter.characterRace.raceMeleeBonus > 0 ? "+" : ""}${
    generatedCharacter.characterRace.raceMeleeBonus
  } race`;

  document.getElementById("to-hit-missile-written").innerHTML = `${
    generatedCharacter.toHitMissile > 0 ? "+" : ""
  }${generatedCharacter.toHitMissile}`;

  document.getElementById("to-hit-missile-description-written").innerHTML = `${
    generatedCharacter.characterClass.toHitAtLevel1 > 0 ? "+" : ""
  }${generatedCharacter.characterClass.toHitAtLevel1} lvl, ${
    generatedCharacter.attributes[1].modifierValue > 0 ? "+" : ""
  }${generatedCharacter.attributes[1].modifierValue} ${
    generatedCharacter.attributes[1].attributeName
  }, ${generatedCharacter.characterRace.raceMissileBonus > 0 ? "+" : ""}${
    generatedCharacter.characterRace.raceMissileBonus
  } race.`;

  let equipmentToDisplay = "<ol>";

  for (let n = 0; n < generatedCharacter.characterWeapons.length; n++) {
    equipmentToDisplay += `<li class="handwritten-medium" id="weapon-${n}">${generatedCharacter.characterWeapons[n].weaponName}, ${generatedCharacter.characterWeapons[n].damage} <br/><div class="description" id="weapon-${n}-description">${generatedCharacter.characterWeapons[n].meleeOrMissile}, ${generatedCharacter.characterWeapons[n].handling}, ${generatedCharacter.characterWeapons[n].missileRange}${generatedCharacter.characterWeapons[n].missileROF}${generatedCharacter.characterWeapons[n].weight} lbs.</div></li>`;
  }

  for (let n = 0; n < generatedCharacter.characterAmmunitions.length; n++) {
    equipmentToDisplay += `<li class="handwritten-medium" id="weapon-${n}">${generatedCharacter.characterAmmunitions[n].ammunitionName}, <input type="number" value="${generatedCharacter.characterAmmunitions[n].quantity}"></input><div class="description" id="ammunition-${n}-description">${generatedCharacter.characterAmmunitions[n].weight} lbs.</div></li>`;
  }

  for (let n = 0; n < generatedCharacter.characterArmorGear.length; n++) {
    generatedCharacter.characterArmorGear[n].armorName == "Unarmored"
      ? (equipmentToDisplay += "")
      : (equipmentToDisplay += `<li class="handwritten-medium" id="armor">${
          generatedCharacter.characterArmorGear[n].armorName
        }<br /><div class="description">${
          document.getElementById("armor-class").value == "ascending"
            ? "+"
            : "-"
        }${generatedCharacter.characterArmorGear[n].AC} AC, ${
          generatedCharacter.characterArmorGear[n].weight
        } lbs.</div></li>`);
  }
  // document.getElementById("weapons-and-armor").innerHTML = weaponsAndArmor;

  for (let n = 0; n < generatedCharacter.characterContainer.length; n++) {
    equipmentToDisplay += `<li class="handwritten-medium">${generatedCharacter.characterContainer[n].itemName}</li>`;
  }

  for (let n = 0; n < generatedCharacter.characterEquipment.length; n++) {
    equipmentToDisplay += `<li class="handwritten-medium">${
      generatedCharacter.characterEquipment[n].itemName
    }${
      generatedCharacter.characterEquipment[n].quantity != ""
        ? ', <input type="number" value="'
        : ""
    }${generatedCharacter.characterEquipment[n].quantity}${
      generatedCharacter.characterEquipment[n].quantity != ""
        ? '"></input>'
        : ""
    } ${
      generatedCharacter.characterEquipment[n].quantityType != ""
        ? generatedCharacter.characterEquipment[n].quantityType
        : ""
    }
      </li>`;
  }
  equipmentToDisplay += "</ol>";

  document.getElementById("gp-written").value = generatedCharacter.currentMoney;

  document.getElementById("equipment-items").innerHTML = equipmentToDisplay;

  document.getElementById("hirelings-max-written").innerHTML =
    generatedCharacter.maxHirelings;
  document.getElementById("hirelings-loyalty-written").innerHTML = `${
    generatedCharacter.hirelingsLoyalty > 0 ? "+" : ""
  }${generatedCharacter.hirelingsLoyalty}`;

  document.getElementById("gear-weight-written").innerHTML = `${Math.floor(
    generatedCharacter.gearWeight
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
  ).innerHTML = `${Math.floor(10 + generatedCharacter.currentMoney * 0.1)}/${
    generatedCharacter.characterCapacity
  } lbs.`;
}

const newCharacterButton = document.querySelector("#new-character");

newCharacterButton.addEventListener("click", function () {
  addLoadScreen(), new generateCharacter(), setTimeout(removeLoadScreen, 1200);
});

setTimeout(removeLoadScreen, 1200);

generateCharacter();

//TODO: implement async function so that there is no load time for the portait
