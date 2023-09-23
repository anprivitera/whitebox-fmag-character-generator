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
  let generatedCharacter = CHARACTER_SHEET,
    {
      characterName,
      characterLevel,
      currentXP,
      alignment,
      attributes,
      attributes: [
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
      ],
      gender,
      HP,
      characterClass,
      characterClass: {
        characterClassName,
        xpToLevel2,
        HDatLevel1,
        toHitAtLevel1,
        savingThrowAtLevel1,
        savingThrowBonus,
        spellcasterType,
        primeAttribute,
        primeAttributeValue,
        domininonKind,
        dominionLevel,
        classSpecialAbilities,
      },
      characterRace,
      characterRace: {
        raceID,
        raceName,
        maxLevel,
        classedRace,
        standardMovementRate,
        raceSavingThrowBonus,
        raceSpecialAbilities,
        raceMeleeBonus,
        raceMissileBonus,
      },
      xpBonus,
      toHitMelee,
      toHitMissile,
      armorClass: { descendingAC, ascendingAC },
      hirelings: { maxHirelings, hirelingsLoyalty },
      money: { initialMoney, currentMoney },
      equipment,
      equipment: { weapons, ammunitions, armor, adventuringGear, containers },
      gearWeight,
      characterCapacity,
      movementRate,
    } = generatedCharacter;

  for (const attribute in attributes) {
    attributes[attribute].attributeValue = diceRoller(3, 6);
    attributes[attribute].modifierValue = determineModifier(
      attributes[attribute].attributeValue
    );
  }

  ({
    characterClassName,
    xpToLevel2,
    HDatLevel1,
    toHitAtLevel1,
    savingThrowAtLevel1,
    savingThrowBonus,
    spellcasterType,
    primeAttribute,
    primeAttributeValue,
    domininonKind,
    dominionLevel,
    classSpecialAbilities,
  } = determineCharacterClass(attributes, CHARACTER_CLASSES));

  ({
    raceID,
    raceName,
    maxLevel,
    classedRace,
    standardMovementRate,
    raceSavingThrowBonus,
    raceSpecialAbilities,
    raceMeleeBonus,
    raceMissileBonus,
  } = determineCharacterRace(
    characterClassName,
    domininonKind,
    dominionLevel,
    CHARACTER_RACES
  ));

  gender = arrayRandomItem(GENDERS);

  characterName = "Kerrigan";

  alignment = arrayRandomItem(ALIGNMENTS);

  xpBonus = determineXPBonus(
    wisdom.attributeValue,
    charisma.attributeValue,
    primeAttributeValue
  );

  HP = determineHP(HDatLevel1, constitution.modifierValue);

  toHitMelee = toHitAtLevel1 + strength.modifierValue + raceMeleeBonus;
  toHitMissile = toHitAtLevel1 + dexterity.modifierValue + raceMissileBonus;

  [maxHirelings, hirelingsLoyalty] = determineHirelings(
    charisma.attributeValue
  );

  initialMoney = diceRoller(3, 6) * 10;
  currentMoney = initialMoney;

  let weaponsByAttribute = null;
  console.log(weaponsByAttribute);
  if (toHitMelee < toHitMissile) {
    weaponsByAttribute = WEAPONS.filter(
      (x) => x.meleeOrMissile.indexOf("missile") > -1
    );
    console.log(weaponsByAttribute);
  } else if (toHitMelee > toHitMissile) {
    weaponsByAttribute = WEAPONS.filter(
      (x) => x.meleeOrMissile.indexOf("melee") > -1
    );
    console.log(weaponsByAttribute);
  } else {
    console.log(weaponsByAttribute);
    weaponsByAttribute = WEAPONS;
  }
  console.log(weaponsByAttribute);

  [weapons, currentMoney] = selectItems(
    weaponsByAttribute,
    1,
    currentMoney,
    characterClassName
  );

  console.log(weapons[0]);

  if (
    weapons[0].meleeOrMissile.indexOf("missile") > -1 &&
    weapons[0].ammunitions
  ) {
    //TODO: Find a way to include also the silver arrow for bows
    let ammunitionForPurchasedWeapon = AMMUNITIONS.find(
      (x) => x.usedBy.indexOf(weapons[0].weaponName) > -1
    );
    ammunitions.push(ammunitionForPurchasedWeapon);
    currentMoney = currentMoney - ammunitionForPurchasedWeapon.cost;
  }

  [armor, currentMoney] = selectItems(
    ARMORS,
    1,
    currentMoney,
    characterClassName
  );

  if (
    (characterClassName == "Fighter" ||
      characterClassName == "Cleric" ||
      characterClassName == "Elf") &&
    weapons.some((x) => x.handling == "1H")
  ) {
    let chanceOfShield = Math.floor(Math.random() * 100);

    if (chanceOfShield <= 40 && currentMoney >= SHIELDS.cost) {
      armor.push(SHIELDS);
      currentMoney = currentMoney - SHIELDS.cost;
    } else {
      let chanceOf2ndWeapon = Math.floor(Math.random() * 100);
      if (chanceOf2ndWeapon <= 50 && characterClassName == "Fighter") {
        let weaponNum2 = null;
        [weaponNum2, currentMoney] = selectItems(
          WEAPONS.filter(
            (x) =>
              x.handling != weapons[0].handling ||
              x.meleeOrMissile != weapons[0].meleeOrMissile
          ),
          1,
          currentMoney,
          characterClassName
        );
        weapons.push(...weaponNum2);
      }
    }
  }

  [containers, currentMoney] = selectItems(
    ADVENTURING_GEAR.filter((x) => x.container),
    Math.floor(Math.random() * (3 - 2) + 2),
    currentMoney,
    characterClassName
  );

  [adventuringGear, currentMoney] = selectItems(
    ADVENTURING_GEAR.filter((x) => !x.container),
    12 - weapons.length - armor.length - containers.length - ammunitions.length,
    currentMoney,
    characterClassName
  );

  descendingAC = 9 - dexterity.modifierValue;
  ascendingAC = 10 + dexterity.modifierValue;
  gearWeight = 10;
  for (const armors in armor) {
    descendingAC -= armor[armors].AC;
    ascendingAC += armor[armors].AC;
    gearWeight += armor[armors].weight;
  }

  for (const item in weapons) {
    gearWeight += weapons[item].weight;
  }

  for (const ammunition in ammunitions) {
    gearWeight += ammunitions[ammunition].weight;
  }

  gearWeight += currentMoney * 0.1;

  movementRate = determineMovementRate(standardMovementRate, gearWeight);

  characterCapacity = 0;

  for (const container in containers) {
    characterCapacity += containers[container].capacity;
  }
  receivePortrait(raceName, gender); //TODO: Show a different image for each generated character

  document
    .getElementById("change-portrait")
    .addEventListener("click", function () {
      new receivePortrait(raceName, gender);
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

  // characterLevel = document.getElementById("character-level").value;
  // if (characterLevel == 1) {
  //   currentXP = 0;
  //   xpToNextLevel = xpToLevel2;
  // } else if (characterLevel == 2) {
  //   currentXP = xpToLevel2;
  //   xpToNextLevel = xpToLevel2 * 2;
  // }
  document.getElementById(
    "char-level-written"
  ).innerHTML = `${characterLevel} of ${maxLevel}`;
  document.getElementById("char-current-xp-written").innerHTML = currentXP;
  document.getElementById("char-xp-to-next-lvl-written").innerHTML = xpToLevel2;

  document.getElementById(
    "char-race-class-written"
  ).innerHTML = `<span>${raceName}</span>
  <span>${characterClassName}</span>`;

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
    document.getElementById("armor-class").value == "descendingPreferred"
      ? descendingAC
      : ascendingAC;

  document.getElementById("hp-written").innerHTML = HP;
  document.getElementById("st-written").innerHTML = savingThrowAtLevel1;
  document.getElementById(
    "st-description-written"
  ).innerHTML = `${savingThrowBonus}${raceSavingThrowBonus}`;

  let characterAbilities = [];
  characterAbilities.push(...classSpecialAbilities);
  characterAbilities.push(...raceSpecialAbilities);

  let characterAbilitiesToDisplay = `<ul>`;
  for (const ability in characterAbilities) {
    characterAbilitiesToDisplay += `<li class="handwritten-medium">${characterAbilities[ability]}</li>`;
  }
  characterAbilitiesToDisplay += "</ul>";

  document.getElementById("character-abilities-list").innerHTML =
    characterAbilitiesToDisplay;

  document.getElementById("to-hit-melee-written").innerHTML = `${
    toHitMelee > 0 ? "+" : ""
  }${toHitMelee}`;

  document.getElementById("to-hit-melee-description-written").innerHTML = `${
    toHitAtLevel1 > 0 ? "+" : ""
  }${toHitAtLevel1} lvl, ${strength.modifierValue > 0 ? "+" : ""}${
    strength.modifierValue
  } ${strength.attributeName}, ${
    raceMeleeBonus > 0 ? "+" : ""
  }${raceMeleeBonus} race`;

  document.getElementById("to-hit-missile-written").innerHTML = `${
    toHitMissile > 0 ? "+" : ""
  }${toHitMissile}`;

  document.getElementById("to-hit-missile-description-written").innerHTML = `${
    toHitAtLevel1 > 0 ? "+" : ""
  }${toHitAtLevel1} lvl, ${dexterity.modifierValue > 0 ? "+" : ""}${
    dexterity.modifierValue
  } ${dexterity.attributeName}, ${
    raceMissileBonus > 0 ? "+" : ""
  }${raceMissileBonus} race.`;

  let equipmentToDisplay = "<ol>";

  for (const weapon in weapons) {
    equipmentToDisplay += `<li class="handwritten-medium">${weapons[weapon].weaponName}, ${weapons[weapon].damage} <br/><div class="description">${weapons[weapon].meleeOrMissile}, ${weapons[weapon].handling}, ${weapons[weapon].missileRange}${weapons[weapon].missileROF}${weapons[weapon].weight} lbs.</div></li>`;
  }

  for (const item in ammunitions) {
    equipmentToDisplay += `<li class="handwritten-medium">${ammunitions[item].ammunitionName}, <input type="number" value="${ammunitions[item].quantity}"></input><div class="description">${ammunitions[item].weight} lbs.</div></li>`;
  }

  for (const piece in armor) {
    armor[piece].armorName == "Unarmored"
      ? (equipmentToDisplay += "")
      : (equipmentToDisplay += `<li class="handwritten-medium" id="armor">${
          armor[piece].armorName
        }<br /><div class="description">${
          document.getElementById("armor-class").value == "descendingPreferred"
            ? "-"
            : "+"
        }${armor[piece].AC} AC, ${armor[piece].weight} lbs.</div></li>`);
  }
  // document.getElementById("weapons-and-armor").innerHTML = weaponsAndArmor;

  for (const item in containers) {
    equipmentToDisplay += `<li class="handwritten-medium">${containers[item].itemName}</li>`;
  }

  for (const item in adventuringGear) {
    equipmentToDisplay += `<li class="handwritten-medium">${
      adventuringGear[item].itemName
    }${
      adventuringGear[item].quantity != ""
        ? ', <input type="number" value="'
        : ""
    }${adventuringGear[item].quantity}${
      adventuringGear[item].quantity != "" ? '"></input>' : ""
    } ${
      adventuringGear[item].quantityType != ""
        ? adventuringGear[item].quantityType
        : ""
    }
      </li>`;
  }
  equipmentToDisplay += "</ol>";

  document.getElementById("gp-written").value = currentMoney;

  document.getElementById("equipment-items").innerHTML = equipmentToDisplay;

  document.getElementById("hirelings-max-written").innerHTML = maxHirelings;
  document.getElementById("hirelings-loyalty-written").innerHTML = `${
    hirelingsLoyalty > 0 ? "+" : ""
  }${hirelingsLoyalty}`;

  document.getElementById("gear-weight-written").innerHTML = `${Math.floor(
    gearWeight
  )}/300 lbs.`;

  document.getElementById(
    "movement-normal-written"
  ).innerHTML = `${movementRate} ft.`;

  document.getElementById("movement-careful-written").innerHTML = `${
    movementRate / 2
  } ft.`;

  document.getElementById("movement-running-written").innerHTML = `${
    movementRate * 2
  } ft.`;

  document.getElementById("movement-combat-written").innerHTML = `${
    movementRate / 3
  } ft.`;

  document.getElementById(
    "carrying-capacity-written"
  ).innerHTML = `${Math.floor(
    10 + currentMoney * 0.1
  )}/${characterCapacity} lbs.`;
}

const newCharacterButton = document.querySelector("#new-character");

newCharacterButton.addEventListener("click", function () {
  addLoadScreen(), new generateCharacter(), setTimeout(removeLoadScreen, 1200);
});

setTimeout(removeLoadScreen, 1200);

generateCharacter();
