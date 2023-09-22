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
  CHARACTER_SHEET,
  SHIELDS,
  WEAPONS,
  AMMUNITIONS,
} from "./Whitebox/constants.js";

//TODO: Include name randomizer

let generatedCharacter = CHARACTER_SHEET;

let { characterName, alignment } = generatedCharacter;

function generateCharacter() {
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

  generatedCharacter.gender =
    genderArray[Math.floor(Math.random() * genderArray.length)];

  characterName = "Kerrigan";

  alignment = determineAlignment(ALIGNMENTS);

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

  [
    generatedCharacter.hirelings.maxHirelings,
    generatedCharacter.hirelings.hirelingsLoyalty,
  ] = determineHirelings(generatedCharacter.attributes[5].attributeValue);

  generatedCharacter.initialMoney = diceRoller(3, 6) * 10;
  generatedCharacter.currentMoney = generatedCharacter.initialMoney;
  generatedCharacter.equipment.weapons = [];
  generatedCharacter.equipment.ammunitions = [];
  generatedCharacter.equipment.armor = [];
  generatedCharacter.equipment.adventuringGear = [];

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

  [generatedCharacter.equipment.weapons, generatedCharacter.currentMoney] =
    selectItems(
      weaponsByAttribute,
      1,
      generatedCharacter.currentMoney,
      generatedCharacter.characterClass.characterClassName
    );

  if (
    generatedCharacter.equipment.weapons[0].meleeOrMissile.indexOf("missile") >
      -1 &&
    generatedCharacter.equipment.weapons[0].ammunitions
  ) {
    //TODO: Find a way to include also the silver arrow for bows
    let ammunitionForPurchasedWeapon = AMMUNITIONS.find(
      (x) =>
        x.usedBy.indexOf(generatedCharacter.equipment.weapons[0].weaponName) >
        -1
    );
    generatedCharacter.equipment.ammunitions.push(ammunitionForPurchasedWeapon);
    generatedCharacter.currentMoney =
      generatedCharacter.currentMoney - ammunitionForPurchasedWeapon.cost;
  }

  [generatedCharacter.equipment.armor, generatedCharacter.currentMoney] =
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
    generatedCharacter.equipment.weapons.some((x) => x.handling == "1H")
  ) {
    let chanceOfShield = Math.floor(Math.random() * 100);

    if (
      chanceOfShield <= 40 &&
      generatedCharacter.currentMoney >= SHIELDS.cost
    ) {
      generatedCharacter.equipment.armor.push(SHIELDS);
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
              x.handling != generatedCharacter.equipment.weapons[0].handling ||
              x.meleeOrMissile !=
                generatedCharacter.equipment.weapons[0].meleeOrMissile
          ),
          1,
          generatedCharacter.currentMoney,
          generatedCharacter.characterClass.characterClassName
        );
        generatedCharacter.equipment.weapons.push(...weaponNum2);
      }
    }
  }

  // let container = [];
  // let equipment = [];

  [generatedCharacter.equipment.containers, generatedCharacter.currentMoney] =
    selectItems(
      ADVENTURING_GEAR.filter((x) => x.container),
      Math.floor(Math.random() * (3 - 2) + 2),
      generatedCharacter.currentMoney,
      generatedCharacter.characterClass.characterClassName
    );

  [
    generatedCharacter.equipment.adventuringGear,
    generatedCharacter.currentMoney,
  ] = selectItems(
    ADVENTURING_GEAR.filter((x) => !x.container),
    12 -
      generatedCharacter.equipment.weapons.length -
      generatedCharacter.equipment.armor.length -
      generatedCharacter.equipment.containers.length -
      generatedCharacter.equipment.ammunitions.length,
    // + generatedCharacter.attributes[0].modifierValue +
    // generatedCharacter.attributes[2].modifierValue,
    generatedCharacter.currentMoney,
    generatedCharacter.characterClass.characterClassName
  );

  generatedCharacter.armorClass.descending -=
    generatedCharacter.attributes[1].modifierValue;
  generatedCharacter.armorClass.ascending +=
    generatedCharacter.attributes[1].modifierValue;
  generatedCharacter.gearWeight = 10;
  for (let i = 0; i < generatedCharacter.equipment.armor.length; i++) {
    generatedCharacter.armorClass.descending -=
      generatedCharacter.equipment.armor[i].AC;
    generatedCharacter.armorClass.ascending +=
      generatedCharacter.equipment.armor[i].AC;
    generatedCharacter.gearWeight +=
      generatedCharacter.equipment.armor[i].weight;
  }

  for (let i = 0; i < generatedCharacter.equipment.weapons.length; i++) {
    generatedCharacter.gearWeight +=
      generatedCharacter.equipment.weapons[i].weight;
  }

  for (let i = 0; i < generatedCharacter.equipment.ammunitions.length; i++) {
    generatedCharacter.gearWeight +=
      generatedCharacter.equipment.ammunitions[i].weight;
  }

  generatedCharacter.gearWeight += generatedCharacter.currentMoney * 0.1;

  generatedCharacter.movementRate = determineMovementRate(
    generatedCharacter.characterRace.standardMovementRate,
    generatedCharacter.gearWeight
  );

  for (let i = 0; i < generatedCharacter.equipment.containers.length; i++) {
    generatedCharacter.characterCapacity +=
      generatedCharacter.equipment.containers[i].capacity;
  }
  let characterPortrait = new receivePortrait(
    generatedCharacter.characterRace.raceName,
    generatedCharacter.gender
  ); //TODO: this should be outside of the main function otherwise it generates always the same picture for the same tag

  document
    .getElementById("change-portrait")
    .addEventListener("click", function () {
      new receivePortrait(
        generatedCharacter.characterRace.raceName,
        generatedCharacter.gender
      );
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

  document.getElementById(
    "char-alignment-written"
  ).innerHTML = `${alignment}`;

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
      ? generatedCharacter.armorClass.descending
      : generatedCharacter.armorClass.ascending;

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

  for (let n = 0; n < generatedCharacter.equipment.weapons.length; n++) {
    equipmentToDisplay += `<li class="handwritten-medium" id="weapon-${n}">${generatedCharacter.equipment.weapons[n].weaponName}, ${generatedCharacter.equipment.weapons[n].damage} <br/><div class="description" id="weapon-${n}-description">${generatedCharacter.equipment.weapons[n].meleeOrMissile}, ${generatedCharacter.equipment.weapons[n].handling}, ${generatedCharacter.equipment.weapons[n].missileRange}${generatedCharacter.equipment.weapons[n].missileROF}${generatedCharacter.equipment.weapons[n].weight} lbs.</div></li>`;
  }

  for (let n = 0; n < generatedCharacter.equipment.ammunitions.length; n++) {
    equipmentToDisplay += `<li class="handwritten-medium" id="weapon-${n}">${generatedCharacter.equipment.ammunitions[n].ammunitionName}, <input type="number" value="${generatedCharacter.equipment.ammunitions[n].quantity}"></input><div class="description" id="ammunition-${n}-description">${generatedCharacter.equipment.ammunitions[n].weight} lbs.</div></li>`;
  }

  for (let n = 0; n < generatedCharacter.equipment.armor.length; n++) {
    generatedCharacter.equipment.armor[n].armorName == "Unarmored"
      ? (equipmentToDisplay += "")
      : (equipmentToDisplay += `<li class="handwritten-medium" id="armor">${
          generatedCharacter.equipment.armor[n].armorName
        }<br /><div class="description">${
          document.getElementById("armor-class").value == "ascending"
            ? "+"
            : "-"
        }${generatedCharacter.equipment.armor[n].AC} AC, ${
          generatedCharacter.equipment.armor[n].weight
        } lbs.</div></li>`);
  }
  // document.getElementById("weapons-and-armor").innerHTML = weaponsAndArmor;

  for (let n = 0; n < generatedCharacter.equipment.containers.length; n++) {
    equipmentToDisplay += `<li class="handwritten-medium">${generatedCharacter.equipment.containers[n].itemName}</li>`;
  }

  for (
    let n = 0;
    n < generatedCharacter.equipment.adventuringGear.length;
    n++
  ) {
    equipmentToDisplay += `<li class="handwritten-medium">${
      generatedCharacter.equipment.adventuringGear[n].itemName
    }${
      generatedCharacter.equipment.adventuringGear[n].quantity != ""
        ? ', <input type="number" value="'
        : ""
    }${generatedCharacter.equipment.adventuringGear[n].quantity}${
      generatedCharacter.equipment.adventuringGear[n].quantity != ""
        ? '"></input>'
        : ""
    } ${
      generatedCharacter.equipment.adventuringGear[n].quantityType != ""
        ? generatedCharacter.equipment.adventuringGear[n].quantityType
        : ""
    }
      </li>`;
  }
  equipmentToDisplay += "</ol>";

  document.getElementById("gp-written").value = generatedCharacter.currentMoney;

  document.getElementById("equipment-items").innerHTML = equipmentToDisplay;

  document.getElementById("hirelings-max-written").innerHTML =
    generatedCharacter.hirelings.maxHirelings;
  document.getElementById("hirelings-loyalty-written").innerHTML = `${
    generatedCharacter.hirelings.hirelingsLoyalty > 0 ? "+" : ""
  }${generatedCharacter.hirelings.hirelingsLoyalty}`;

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
