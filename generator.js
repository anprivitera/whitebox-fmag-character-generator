"strict mode";
import { diceRoller } from "./diceRoller.js";

import determineModifier from "./Whitebox/determineModifier.js";
import determineXPBonus from "./Whitebox/determineXPBonus.js";
import WEAPONS from "./Whitebox/WEAPONS.js";
import ARMOR from "./Whitebox/ARMOR.js";
import ALIGNMENTS from "./Whitebox/ALIGNMENTS.js";
import ADVENTURING_GEAR from "./Whitebox/ADVENTURING_GEAR.js";

//TODO: Include name randomizer

//FUNCTIONS
//TODO: move these functions to modules?

function generateCharacter(armorClassPreference) {
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function determineCharacterClass(attributes) {
    const cleric = {
      characterClassName: "Cleric",
      xpToLevel2: 1500,
      HDatLevel1: diceRoller(1),
      toHitAtLevel1: 0,
      savingThrowAtLevel1: 15,
      savingThrowBonus: "+2 vs. death/poison",
      spellcasterType: "divine",
      primeAttribute: "WIS",
      domininonKind: "Temple",
      dominionLevel: 10,
      specialAbilities: [`Turn the Undead`],
    };
    const fighter = {
      characterClassName: "Fighter",
      xpToLevel2: 2000,
      HDatLevel1: diceRoller(1) + 1,
      toHitAtLevel1: 0,
      savingThrowAtLevel1: 14,
      savingThrowBonus: "+2 vs. poison/paralysis",
      spellcasterType: null,
      spellsAtLevel1: null,
      primeAttribute: "STR",
      domininonKind: "Stronghold",
      dominionLevel: 9,
      specialAbilities: [`Combat Fury (+1 attack/level vs. >=1 HD foes)`],
    };
    const elf = {
      characterClassName: "Elf",
      xpToLevel2: 5000,
      HDatLevel1: diceRoller(1) + 1,
      toHitAtLevel1: 0,
      savingThrowAtLevel1: 14,
      savingThrowBonus: "+2 vs. poison/paralysis",
      spellcasterType: null, // TODO: change when implementing more character levels
      spellsAtLevel1: null,
      primeAttribute: null,
      specialAbilities: [
        `+1 to-hit vs. goblins, orcs, intelligent undead, lycantropes`,
        `Immune to undead paralysis`,
        `Half damage from giants and ogres`,
        `4-in-6 chances of actively spotting hidden or concealed doors (2-in-6 if passing by)`,
      ],
    };
    const magicUser = {
      characterClassName: "Magic-User",
      xpToLevel2: 2500,
      HDatLevel1: diceRoller(1),
      toHitAtLevel1: 0,
      savingThrowAtLevel1: 15,
      savingThrowBonus: "+2 vs. spells",
      spellcasterType: "magic",
      primeAttribute: "INT",
      domininonKind: "Wizard Tower",
      dominionLevel: 9,
      specialAbilities: [
        `Known Spells: ${
          MAGIC_USER_SPELLS_LEVEL_1[
            Math.floor(Math.random() * MAGIC_USER_SPELLS_LEVEL_1.length)
          ]
        }`,
      ],
    };
    const thief = {
      characterClassName: "Thief",
      xpToLevel2: 1250,
      HDatLevel1: diceRoller(1),
      toHitAtLevel1: 0,
      savingThrowAtLevel1: 14,
      savingThrowBonus: "+2 vs. Traps",
      spellcasterType: null,
      primeAttribute: "DEX",
      domininonKind: "Guild",
      dominionLevel: 9,
      specialAbilities: [
        `Back Stab (+2 to Hit and x2 damage on hit)`,
        `Thievery 2-in-6`,
      ],
    };
    let generatedCharacterClass = null;
    if (Math.random() < 0.1) {
      generatedCharacterClass = elf;
      return generatedCharacterClass;
    }
    let fromHighToLow = attributes.map((x) => x);
    fromHighToLow.sort((a, b) => b.attributeValue - a.attributeValue);
    while (generatedCharacterClass == null) {
      for (let x = 0; x < fromHighToLow.length; x++) {
        //TODO: migrate character clasess to separate javascript folder in arrays, then create nested for loop to check the prime attribute of each character class contained in the array
        if (fromHighToLow[x].attributeName == cleric.primeAttribute) {
          generatedCharacterClass = cleric;
          generatedCharacterClass.primeAttributeValue =
            fromHighToLow[x].attributeValue;
          return generatedCharacterClass;
        } else if (fromHighToLow[x].attributeName == fighter.primeAttribute) {
          generatedCharacterClass = fighter;
          generatedCharacterClass.primeAttributeValue =
            fromHighToLow[x].attributeValue;
          return generatedCharacterClass;
        } else if (fromHighToLow[x].attributeName == magicUser.primeAttribute) {
          generatedCharacterClass = magicUser;
          generatedCharacterClass.primeAttributeValue =
            fromHighToLow[x].attributeValue;
          return generatedCharacterClass;
        } else if (fromHighToLow[x].attributeName == thief.primeAttribute) {
          generatedCharacterClass = thief;
          generatedCharacterClass.primeAttributeValue =
            fromHighToLow[x].attributeValue;
          return generatedCharacterClass;
        }
      }
    }
  }

  function determineCharacterRace(generatedCharacterClass) {
    const ELF = {
      raceName: "",
      standardMovementRate: 12,
      raceSavingThrowBonus: "",
      raceSpecialAbilities: [`Can reach maximum level 8`],
    };
    const HUMAN = {
      raceName: "Human",
      standardMovementRate: 12,
      raceSavingThrowBonus: "",
      raceSpecialAbilities: [
        `Can establish ${generatedCharacterClass.domininonKind} at Level ${generatedCharacterClass.dominionLevel}`,
      ],
    };
    const DWARF = {
      raceName: "Dwarf",
      standardMovementRate: 9,
      raceSavingThrowBonus: "<br />+4 vs. Magic",
      raceSpecialAbilities: [
        `Can reach maximum level 6`,
        `Half damage from giants and ogres`,
        `4-in-6 chances of actively spotting traps, slanting passages or construction (2-in-6 if passing by)`,
        `Can speak with goblins, ogres, orcs, kobolds`,
      ],
    };
    const HALFLING = {
      raceName: "Halfling",
      standardMovementRate: 9,
      raceSavingThrowBonus: "<br />+4 vs. Magic",
      raceSpecialAbilities: [
        `Can reach maxium level ${
          generatedCharacterClass.characterClassName == "Fighter" ? "4" : "6"
        }`,
        `Half damage from giants and ogres`,
        `+2 to-hit using missile weapons`,
        `5-in-6 chance of going undetected when outside of combat`,
      ],
    };
    const RACES = [HUMAN, DWARF, HALFLING];
    if (generatedCharacterClass.characterClassName == "Elf") {
      let characterRace = ELF;
      return characterRace;
    }
    let characterRace = HUMAN;
    if (
      generatedCharacterClass.characterClassName == "Fighter" ||
      generatedCharacterClass.characterClassName == "Thief"
    ) {
      characterRace = RACES[Math.floor(Math.random() * RACES.length)];
    }
    return characterRace;
  }

  function receivePortrait() {
    let character = null;
    if (
      generatedCharacterRace.raceName == "Human" ||
      generatedCharacterRace.raceName == "Halfling"
    ) {
      const gender = ["man", "woman"];
      character = gender[Math.floor(Math.random() * gender.length)];
      // character = gender[genderSelect];
    } else if (generatedCharacterRace.raceName == "Dwarf") {
      character = "dwarf";
    } else {
      character = "elf";
    }
    characterPortrait = `https://campaignwiki.org/face/redirect/alex/${character}`;
    return characterPortrait;
  }

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
    shuffle(shoppingArray);
    //TODO: Include more dynamic combinations for weapon selection (i.e., weapon and shield, two weapons...)
    //TODO: make sure that currentMoney is never negative, both by checking at the beginning of the function if the money can be spent, and by checking after each purchase.
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
  const MAGIC_USER_SPELLS_LEVEL_1 = [
    "Charm Person",
    "Detect Magic",
    "Hold Portal",
    "Light",
    "Protection from Chaos",
    "Read Languages",
    "Read Magic",
    "Sleep",
  ];

  const SHIELD = {
    armorName: "Shield",
    AC: 1,
    weight: 10,
    cost: 10,
    cleric: true,
    fighter: true,
    magicUser: false,
    thief: false,
    elf: true,
  };

  //TODO: Treat ammunitions as a separate purchase: if a character gets a missile weapon, they should obviously get also ammunitions. Bow > arrows, Sling > stones, Crossbow > Bolts
  //TODO: Divide consumables items, so that they can be purchased more than once, and display them as unified (i.e., Torches (10))

  //START RUNTIME
  const rollForStrength = diceRoller(3),
    rollForDexterity = diceRoller(3),
    rollForConstitution = diceRoller(3),
    rollForIntelligence = diceRoller(3),
    rollForWisdom = diceRoller(3),
    rollForCharisma = diceRoller(3),
    stengthModifier = determineModifier(rollForStrength),
    dexterityModifier = determineModifier(rollForDexterity),
    constitutionModifier = determineModifier(rollForConstitution),
    intelligenceModifier = determineModifier(rollForIntelligence),
    wisdomModifier = determineModifier(rollForWisdom),
    charismaModifier = determineModifier(rollForCharisma),
    initialMoney = diceRoller(3) * 10;

  const generatedAttributes = [
    {
      attributeName: "STR",
      attributeValue: rollForStrength,
      modifierValue: stengthModifier,
    },
    {
      attributeName: "DEX",
      attributeValue: rollForDexterity,
      modifierValue: dexterityModifier,
    },
    {
      attributeName: "CON",
      attributeValue: rollForConstitution,
      modifierValue: constitutionModifier,
    },
    {
      attributeName: "INT",
      attributeValue: rollForIntelligence,
      modifierValue: intelligenceModifier,
    },
    {
      attributeName: "WIS",
      attributeValue: rollForWisdom,
      modifierValue: wisdomModifier,
    },
    {
      attributeName: "CHA",
      attributeValue: rollForCharisma,
      modifierValue: charismaModifier,
    },
  ];

  const generatedCharacterClass = determineCharacterClass(generatedAttributes);

  const generatedCharacterRace = determineCharacterRace(
    generatedCharacterClass
  );

  let characterPortrait = null;
  characterPortrait = receivePortrait();

  const characterAlignment =
    ALIGNMENTS[Math.floor(Math.random() * ALIGNMENTS.length)];

  let xpBonus = determineXPBonus(
    rollForWisdom,
    rollForCharisma,
    generatedCharacterClass.primeAttributeValue
  );

  let characterHP = generatedCharacterClass.HDatLevel1 + constitutionModifier;
  if (characterHP <= 0) {
    characterHP = 1;
  }

  const toHitMelee = `${
    generatedCharacterClass.toHitAtLevel1 + stengthModifier > 0 ? "+" : ""
  }${generatedCharacterClass.toHitAtLevel1 + stengthModifier}`;
  const toHitMissile = `${
    generatedCharacterClass.toHitAtLevel1 + dexterityModifier > 0 ? "+" : ""
  }${generatedCharacterClass.toHitAtLevel1 + dexterityModifier}`;

  let maxHirelings = null;
  let hirelingsLoyalty = null;
  if (rollForCharisma <= 4) {
    maxHirelings = 1;
    hirelingsLoyalty = -2;
  } else if (rollForCharisma >= 5 && rollForCharisma <= 6) {
    maxHirelings = 2;
    hirelingsLoyalty = -2;
  } else if (rollForCharisma >= 7 && rollForCharisma <= 8) {
    maxHirelings = 3;
    hirelingsLoyalty = -1;
  } else if (rollForCharisma >= 9 && rollForCharisma <= 12) {
    maxHirelings = 4;
    hirelingsLoyalty = 0;
  } else if (rollForCharisma >= 13 && rollForCharisma <= 15) {
    maxHirelings = 5;
    hirelingsLoyalty = 1;
  } else if (rollForCharisma >= 16 && rollForCharisma <= 17) {
    maxHirelings = 6;
    hirelingsLoyalty = 2;
  } else {
    maxHirelings = 7;
    hirelingsLoyalty = 2;
  }

  let currentMoney = initialMoney;
  let characterWeapons = [];
  let characterArmorGear = [];
  let characterEquipment = [];

  [characterArmorGear, currentMoney] = selectItems(
    ARMOR,
    1,
    currentMoney,
    generatedCharacterClass.characterClassName
  );

  [characterWeapons, currentMoney] = selectItems(
    WEAPONS,
    1,
    currentMoney,
    generatedCharacterClass.characterClassName
  );

  if (
    (generatedCharacterClass.characterClassName == "Fighter" ||
      generatedCharacterClass.characterClassName == "Cleric" ||
      generatedCharacterClass.characterClassName == "Elf") &&
    characterWeapons.some((x) => x.handling == "one-handed")
  ) {
    let chanceOfShield = Math.floor(Math.random() * 100);

    if (chanceOfShield <= 40 && currentMoney >= SHIELD.cost) {
      characterArmorGear.push(SHIELD);
      currentMoney = currentMoney - SHIELD.cost;
    } else {
      let chanceOf2ndWeapon = Math.floor(Math.random() * 100);
      if (
        chanceOf2ndWeapon <= 50 &&
        generatedCharacterClass.characterClassName == "Fighter"
      ) {
        let weaponNum2 = null;
        [weaponNum2, currentMoney] = selectItems(
          WEAPONS.filter((x) => x.handling == "one-handed"),
          1,
          currentMoney,
          generatedCharacterClass.characterClassName
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
    generatedCharacterClass.characterClassName
  );

  let descendingArmorClass = 9 - dexterityModifier;
  let ascendingArmorClass = 10 + dexterityModifier;
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

  let movementRate = generatedCharacterRace.standardMovementRate * 10;
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
  ).innerHTML = `${characterAlignment}`;

  document.getElementById("xp-bonus-written").innerHTML = `${xpBonus}%`;

  let characterLevel = document.getElementById("character-level").value;
  if (characterLevel == 1) {
    currentXP = 0;
    xpToNextLevel = generatedCharacterClass.xpToLevel2;
  } else if (characterLevel == 2) {
    currentXP = generatedCharacterClass.xpToLevel2;
    xpToNextLevel = generatedCharacterClass.xpToLevel2 * 2;
  }
  document.getElementById("char-level-written").innerHTML = `${characterLevel}`;
  document.getElementById(
    "char-current-xp-written"
  ).innerHTML = `${currentXP}/${xpToNextLevel}`;

  // setInterval(setXP, 1000);

  document.getElementById(
    "char-race-class-written"
  ).innerHTML = `${generatedCharacterRace.raceName}
  ${generatedCharacterClass.characterClassName}`;

  document.getElementById("str-written").innerHTML =
    generatedAttributes[0].attributeValue;
  document.getElementById("str-modifier-written").innerHTML = `${
    generatedAttributes[0].modifierValue > 0 ? "+" : "  "
  }${generatedAttributes[0].modifierValue}`;

  document.getElementById("dex-written").innerHTML =
    generatedAttributes[1].attributeValue;
  document.getElementById("dex-modifier-written").innerHTML = `${
    generatedAttributes[1].modifierValue > 0 ? "+" : "  "
  }${generatedAttributes[1].modifierValue}`;

  document.getElementById("con-written").innerHTML =
    generatedAttributes[2].attributeValue;
  document.getElementById("con-modifier-written").innerHTML = `${
    generatedAttributes[2].modifierValue > 0 ? "+" : "  "
  }${generatedAttributes[2].modifierValue}`;

  document.getElementById("int-written").innerHTML =
    generatedAttributes[3].attributeValue;
  document.getElementById("int-modifier-written").innerHTML = `${
    generatedAttributes[3].modifierValue > 0 ? "+" : "  "
  }${generatedAttributes[3].modifierValue}`;

  document.getElementById("wis-written").innerHTML =
    generatedAttributes[4].attributeValue;
  document.getElementById("wis-modifier-written").innerHTML = `${
    generatedAttributes[4].modifierValue > 0 ? "+" : "  "
  }${generatedAttributes[4].modifierValue}`;

  document.getElementById("cha-written").innerHTML =
    generatedAttributes[5].attributeValue;
  document.getElementById("cha-modifier-written").innerHTML = `${
    generatedAttributes[5].modifierValue > 0 ? "+" : "  "
  }${generatedAttributes[5].modifierValue}`;

  // document.getElementById("attributes").innerHTML = attributesToDisplay;

  document.getElementById("ac-written").innerHTML = armorClass;
  document.getElementById("hp-written").innerHTML = characterHP;
  document.getElementById("st-written").innerHTML =
    generatedCharacterClass.savingThrowAtLevel1;
  document.getElementById(
    "st-description-written"
  ).innerHTML = `${generatedCharacterClass.savingThrowBonus}${generatedCharacterRace.raceSavingThrowBonus}`;

  let characterAbilities = [];
  characterAbilities.push(...generatedCharacterClass.specialAbilities);
  characterAbilities.push(...generatedCharacterRace.raceSpecialAbilities);

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
