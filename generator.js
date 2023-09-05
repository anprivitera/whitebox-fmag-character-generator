"strict mode";
/* USER STORY: I see a short textual description Whitebox character randomly generated and ready to play. 
It includes: 
- Ascending Armor class
- ~~HD~~
- ~~Attribute scores with modifiers~~
- Name 
- ~~Class~~
- ~~Level~~
- ~~Race~~
- ~~Alignment~~
- ~~Initial XP~~
- ~~XP bonus~~
- A character portrait
- ~~Saving throw and mods~~
- ~~Spells / Abilities ~~
- Equipment
- Weapons & Armor
- ~~Coins~~
- ~~Languages~~
- ~~To-Hit bonus~~
- ~~Number of hirelings and loyalty~~
- Weight carried and movement speed
*/

//FUNCTIONS
function diceRoller(numberOfDice) {
  let rollResult = null;
  for (let i = 0; i < numberOfDice; i++) {
    rollResult += Math.floor(Math.random() * 6 + 1);
  }
  return rollResult;
}

function determineModifier(attributeScore) {
  if (attributeScore <= 6) {
    return -1;
  } else if (attributeScore >= 7 && attributeScore <= 14) {
    return 0;
  } else {
    return +1;
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function determineCharacterRace(generatedCharacterClass) {
  const ELF = {
    raceName: "",
    raceSavingThrowBonus: "",
    raceSpecialAbilities: "",
  };
  const HUMAN = {
    raceName: "Human",
    raceSavingThrowBonus: "",
    raceSpecialAbilities: "",
  };
  const DWARF = {
    raceName: "Dwarf",
    raceSavingThrowBonus: ", +4 vs. Magic",
    raceSpecialAbilities:
      "<ul><li>Can reach maximum level 6</li><li>Half damage from giants and ogres</li><li>4-in-6 chances of actively spotting traps, slanting passages or construction (2-in-6 if passing by)</li><li>Can speak with goblins, ogres, orcs, kobolds</li></ul>",
  };
  const HALFLING = {
    raceName: "Halfling",
    raceSavingThrowBonus: ", +4 vs. Magic",
    raceSpecialAbilities: `<ul><li>${
      generatedCharacterClass.characterClassName == "Fighter"
        ? "Can reach maxium level 4."
        : "Can reach maxium Level 6."
    }</li><li>Half damage from giants and ogres</li><li>+2 to-hit using missile weapons</li><li>5-in-6 chance of going undetected when outside of combat</li></ul>`,
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

function determineCharacterClass(attributes) {
  const cleric = {
    characterClassName: "Cleric",
    xpAtLevel1: 0,
    HDatLevel1: diceRoller(1),
    toHitAtLevel1: 0,
    savingThrowAtLevel1: 15,
    savingThrowBonus: "+2 vs. Death and Poison",
    spellcasterType: "divine",
    primeAttribute: "WIS",
    // primeAttributeValue: null;
    specialAbilities:
      "<ul><li>Turn the Undead.</li><li>Establish Temple (at Level 10).</li></ul>",
  };
  const fighter = {
    characterClassName: "Fighter",
    xpAtLevel1: 0,
    HDatLevel1: diceRoller(1) + 1,
    toHitAtLevel1: 0,
    savingThrowAtLevel1: 14,
    savingThrowBonus: "+2 vs. Poison and Paralysis",
    spellcasterType: null,
    spellsAtLevel1: null,
    primeAttribute: "STR",
    // primeAttributeValue: null;
    specialAbilities:
      "<ul><li>Combat Fury (+1 attack/level vs. >=1 HD foes).</li><li>Establish Stronghold (at Level 9).</li></ul>",
  };
  const elf = {
    characterClassName: "Elf",
    xpAtLevel1: 0,
    HDatLevel1: diceRoller(1) + 1,
    toHitAtLevel1: 0,
    savingThrowAtLevel1: 14,
    savingThrowBonus: "+2 vs. Poison and Paralysis",
    spellcasterType: null, // TODO: change when implementing more character levels
    spellsAtLevel1: null,
    primeAttribute: null,
    // primeAttributeValue: null;
    specialAbilities:
      "<ul><li>+1 to-hit vs. goblins, orcs, intelligent undead, lycantropes.</li><li>Immune to undead paralysis.</li><li>Half damage from giants and ogres.</li><li>4-in-6 chances of actively spotting hidden or concealed doors (2-in-6 if passing by).</li></ul>",
  };
  const magicUser = {
    characterClassName: "Magic-User",
    xpAtLevel1: 0,
    HDatLevel1: diceRoller(1),
    toHitAtLevel1: 0,
    savingThrowAtLevel1: 15,
    savingThrowBonus: "+2 vs. Spells",
    spellcasterType: "magic",
    primeAttribute: "INT",
    // primeAttributeValue: null;
    specialAbilities:
      "<ul><li>Spell Casting.</li><li>Establish Wizard Tower (at Level 9).</li></ul>",
  };
  const thief = {
    characterClassName: "Thief",
    xpAtLevel1: 0,
    HDatLevel1: diceRoller(1),
    toHitAtLevel1: 0,
    savingThrowAtLevel1: 14,
    savingThrowBonus: "+2 vs. Traps",
    spellcasterType: null,
    primeAttribute: "DEX",
    // primeAttributeValue: null;
    specialAbilities:
      "<ul><li>Back Stab (+2 to Hit and x2 damage on hit)</li><li>Thievery 2-in-6</li><li>Establish Guild (at Level 9)</li></ul>",
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
//TODO: Complete functions for Weapons and Gear
// let filteredShoppingArray = shoppingArray.filter(
//   (n) => n.characterClass == true
// );
function selectWeapons(weaponsAvailable, currentMoney, whoIsTheCharacter) {
  let shoppingArray = weaponsAvailable.map((x) => x);
  let filteredShoppingArray = null;
  let selectedWeapon = [];
  shuffle(shoppingArray);
  //TODO: Include more dynamic combinations for weapon selection (i.e., weapon and shield, two weapons...)
  switch (whoIsTheCharacter) {
    case "Fighter":
      filteredShoppingArray = shoppingArray.filter((n) => n.fighter == true);
      selectedWeapon.push(filteredShoppingArray.pop());
      break;
    case "Elf":
      filteredShoppingArray = shoppingArray.filter((n) => n.fighter == true);
      selectedWeapon.push(filteredShoppingArray.pop());
      break;
    case "Cleric":
      filteredShoppingArray = shoppingArray.filter((n) => n.cleric == true);
      selectedWeapon.push(filteredShoppingArray.pop());
      break;
    case "Magic-User":
      filteredShoppingArray = shoppingArray.filter((n) => n.magicUser == true);
      selectedWeapon.push(filteredShoppingArray.pop());
      break;
    case "Thief":
      filteredShoppingArray = shoppingArray.filter((n) => n.thief == true);
      selectedWeapon.push(filteredShoppingArray.pop());
      break;
  }
  currentMoney = currentMoney - selectedWeapon[0].cost;
  return [selectedWeapon, currentMoney];
}

function selectAdventuringGear(
  characterEquipment,
  aventuringGear,
  currentMoney
) {
  let shoppingArray = aventuringGear.map((x) => x);
  shuffle(shoppingArray);
  let shoppableItems = shoppingArray.some((item) => item.cost <= currentMoney);
  while (shoppableItems) {
    // for (let i = 0; i < shoppingArray.length; i++) {
    if (shoppingArray[0].cost <= currentMoney) {
      characterEquipment.push(shoppingArray.pop());
      currentMoney = currentMoney - shoppingArray[0].cost;
    }
  }
  return { characterEquipment, currentMoney };
}

//CONSTANTS
const ROLL_FOR_STRENGTH = diceRoller(3),
  ROLL_FOR_DEXTERITY = diceRoller(3),
  ROLL_FOR_CONSTITUTION = diceRoller(3),
  ROLL_FOR_INTELLIGENCE = diceRoller(3),
  ROLL_FOR_WISDOM = diceRoller(3),
  ROLL_FOR_CHARISMA = diceRoller(3),
  STRENGTH_MODIFIER = determineModifier(ROLL_FOR_STRENGTH),
  DEXTERITY_MODIFIER = determineModifier(ROLL_FOR_DEXTERITY),
  CONSTITUTION_MODIFIER = determineModifier(ROLL_FOR_CONSTITUTION),
  INTELLIGENCE_MODIFIER = determineModifier(ROLL_FOR_INTELLIGENCE),
  WISDOM_MODIFIER = determineModifier(ROLL_FOR_WISDOM),
  CHARISMA_MODIFIER = determineModifier(ROLL_FOR_CHARISMA),
  INITIAL_MONEY = diceRoller(3) * 10,
  ALIGNMENTS = ["Law", "Neutral", "Chaos"];

const ATTRIBUTES = [
  {
    attributeName: "STR",
    attributeValue: ROLL_FOR_STRENGTH,
    modifierValue: STRENGTH_MODIFIER,
  },
  {
    attributeName: "DEX",
    attributeValue: ROLL_FOR_DEXTERITY,
    modifierValue: DEXTERITY_MODIFIER,
  },
  {
    attributeName: "CON",
    attributeValue: ROLL_FOR_CONSTITUTION,
    modifierValue: CONSTITUTION_MODIFIER,
  },
  {
    attributeName: "INT",
    attributeValue: ROLL_FOR_INTELLIGENCE,
    modifierValue: INTELLIGENCE_MODIFIER,
  },
  {
    attributeName: "WIS",
    attributeValue: ROLL_FOR_WISDOM,
    modifierValue: WISDOM_MODIFIER,
  },
  {
    attributeName: "CHA",
    attributeValue: ROLL_FOR_CHARISMA,
    modifierValue: CHARISMA_MODIFIER,
  },
];

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

const WEAPONS = [
  {
    weaponName: "Axe, battle",
    damage: "1d6+1",
    weight: 15,
    cost: 7,
    twoHanded: true,
    melee: true,
    missile: false,
    missileROF: null,
    cleric: false,
    fighter: true,
    magicUser: false,
    thief: true,
    elf: true,
  },
  {
    weaponName: "Axe, hand",
    damage: "1d6",
    weight: 5,
    cost: 3,
    twoHanded: false,
    melee: true,
    missile: true,
    missileROF: 1,
    cleric: false,
    fighter: true,
    magicUser: false,
    thief: true,
    elf: true,
  },
  {
    weaponName: "Club",
    damage: "1d6",
    weight: 10,
    cost: 0,
    twoHanded: false,
    melee: true,
    missile: false,
    missileROF: null,
    cleric: true,
    fighter: true,
    magicUser: false,
    thief: true,
    elf: true,
  },
  {
    weaponName: "Dagger",
    damage: "1d6-1",
    weight: 2,
    cost: 3,
    twoHanded: false,
    melee: true,
    missile: true,
    missileROF: 1,
    cleric: false,
    fighter: true,
    magicUser: true,
    thief: true,
    elf: true,
  },
  {
    weaponName: "Flail",
    damage: "1d6",
    weight: 15,
    cost: 8,
    twoHanded: false,
    melee: true,
    missile: false,
    missileROF: null,
    cleric: true,
    fighter: true,
    magicUser: false,
    thief: true,
    elf: true,
  },
  {
    weaponName: "Mace",
    damage: "1d6",
    weight: 10,
    cost: 5,
    twoHanded: false,
    melee: true,
    missile: false,
    missileROF: null,
    cleric: true,
    fighter: true,
    magicUser: false,
    thief: true,
    elf: true,
  },
  {
    weaponName: "Morning Star",
    damage: "1d6",
    weight: 15,
    cost: 8,
    twoHanded: false,
    melee: true,
    missile: false,
    missileROF: null,
    cleric: true,
    fighter: true,
    magicUser: false,
    thief: true,
    elf: true,
  },
  {
    weaponName: "Polearm",
    damage: "1d6+1",
    weight: 15,
    cost: 7,
    twoHanded: true,
    melee: true,
    missile: false,
    missileROF: null,
    cleric: false,
    fighter: true,
    magicUser: false,
    thief: true,
    elf: true,
  },
  {
    weaponName: "Spear",
    damage: "1d6",
    weight: 10,
    cost: 2,
    twoHanded: false,
    melee: true,
    missile: true,
    missileROF: 1,
    cleric: false,
    fighter: true,
    magicUser: false,
    thief: true,
    elf: true,
  },
  {
    weaponName: "Staff",
    damage: "1d6",
    weight: 10,
    cost: 1,
    twoHanded: true,
    melee: true,
    missile: false,
    missileROF: null,
    cleric: false,
    fighter: true,
    magicUser: true,
    thief: true,
    elf: true,
  },
  {
    weaponName: "Sword, long",
    damage: "1d6",
    weight: 10,
    cost: 10,
    twoHanded: false,
    melee: true,
    missile: false,
    missileROF: null,
    cleric: false,
    fighter: true,
    magicUser: false,
    thief: true,
    elf: true,
  },
  {
    weaponName: "Sword, short",
    damage: "1d6-1",
    weight: 5,
    cost: 8,
    twoHanded: false,
    melee: true,
    missile: false,
    missileROF: null,
    cleric: false,
    fighter: true,
    magicUser: false,
    thief: true,
    elf: true,
  },
  {
    weaponName: "Sword, two-handed",
    damage: "1d6+1",
    weight: 15,
    cost: 15,
    twoHanded: true,
    melee: true,
    missile: false,
    missileROF: null,
    cleric: false,
    fighter: true,
    magicUser: false,
    thief: true,
    elf: true,
  },
  {
    weaponName: "Warhammer",
    damage: "1d6",
    weight: 10,
    cost: 5,
    twoHanded: false,
    melee: true,
    missile: false,
    missileROF: null,
    cleric: true,
    fighter: true,
    magicUser: false,
    thief: true,
    elf: true,
  },
  {
    weaponName: "Bow, long",
    damage: "1d6",
    weight: 5,
    cost: 40,
    twoHanded: true,
    melee: false,
    missile: true,
    missileROF: 2,
    cleric: false,
    fighter: true,
    magicUser: false,
    thief: true,
    elf: true,
  },
  {
    weaponName: "Bow, short",
    damage: "1d6-1",
    weight: 5,
    cost: 25,
    twoHanded: true,
    melee: false,
    missile: true,
    missileROF: 2,
    cleric: false,
    fighter: true,
    magicUser: false,
    thief: true,
    elf: true,
  },
  {
    weaponName: "Crossbow, heavy",
    damage: "1d6+1",
    weight: 5,
    cost: 25,
    twoHanded: true,
    melee: false,
    missile: true,
    missileROF: 0.5,
    cleric: false,
    fighter: true,
    magicUser: false,
    thief: true,
    elf: true,
  },
  {
    weaponName: "Crossbow, light",
    damage: "1d6-1",
    weight: 5,
    cost: 15,
    twoHanded: true,
    melee: false,
    missile: true,
    missileROF: 1,
    cleric: false,
    fighter: true,
    magicUser: false,
    thief: true,
    elf: true,
  },
  {
    weaponName: "Sling",
    damage: "1d6",
    weight: 1,
    cost: 2,
    twoHanded: false,
    melee: false,
    missile: true,
    missileROF: 1,
    cleric: true,
    fighter: true,
    magicUser: false,
    thief: true,
    elf: true,
  },
];

const ARMOR = [
  {
    armorName: "Chain Mail",
    AC: 4,
    weight: 50,
    cost: 30,
    cleric: true,
    fighter: true,
    magicUser: false,
    thief: false,
    elf: true,
  },
  {
    armorName: "Leather",
    AC: 2,
    weight: 25,
    cost: 15,
    cleric: true,
    fighter: true,
    magicUser: false,
    thief: true,
    elf: true,
  },
  {
    armorName: "Plate Mail",
    AC: 6,
    weight: 75,
    cost: 50,
    cleric: true,
    fighter: true,
    magicUser: false,
    thief: false,
    elf: false,
  },
];

const ADVENTURING_GEAR = [
  { itemName: "Backpack (30 lb. capacity", cost: 5 },
  { itemName: "Bedroll", cost: 2 },
  { itemName: "Belladonna, bunch", cost: 10 },
  { itemName: "Bottle (wine), glass", cost: 1 },
  { itemName: "Case (map or scroll)", cost: 3 },
  { itemName: "Crowbar", cost: 5 },
  { itemName: "Flint and Stell", cost: 5 },
  { itemName: "Garlic (1 lb.)", cost: 10 },
  { itemName: "Grappling Hook", cost: 5 },
  { itemName: "Hammer", cost: 2 },
  { itemName: "Helmet", cost: 10 },
  { itemName: "Holy Symbol, wooden", cost: 2 },
  { itemName: "Holy Symbol, silver", cost: 25 },
  { itemName: "Holy Water, small vial", cost: 25 },
  { itemName: "Lantern", cost: 10 },
  { itemName: "Mirror (small), steel", cost: 5 },
  { itemName: "Oil (lamp), 1 pint", cost: 2 },
  { itemName: "Pole, 10 ft.", cost: 1 },
  { itemName: "Rations, trail (day)", cost: 1 },
  { itemName: "Rations, dried (day)", cost: 3 },
  { itemName: "Rope (50 ft.), hemp", cost: 1 },
  { itemName: "Rope (50 ft.), silk", cost: 5 },
  { itemName: "Sack (15 lb. capacity)", cost: 1 },
  { itemName: "Sack (30 lb. capacity)", cost: 2 },
  { itemName: "Shovel", cost: 5 },
  { itemName: "Spellbook (blank)", cost: 100 },
  { itemName: "Spikes (12), iron", cost: 1 },
  { itemName: "Stakes (12), wooden", cost: 1 },
  { itemName: "Tent", cost: 20 },
  { itemName: "Thieves' Tools", cost: 25 },
  { itemName: "Torches (6)", cost: 1 },
  { itemName: "Waterskin", cost: 1 },
  { itemName: "Wolfsbane, bunch", cost: 10 },
];
//TODO: Treat ammunitions as a separate purchase: if a character gets a missile weapon, they should obviously get also ammunitions. Bow > arrows, Sling > stones, Crossbow > Bolts
//TODO: Divide consumables items, so that they can be purchased more than once, and display them as unified (i.e., Torches (10))
//TODO: Required items should go into character classes?

//START RUN-TIME
let generatedCharacterClass = determineCharacterClass(ATTRIBUTES);

let generatedCharacterRace = determineCharacterRace(generatedCharacterClass);

const characterAlignment =
  ALIGNMENTS[Math.floor(Math.random() * ALIGNMENTS.length)];

let xpBonus = 0;
if (ROLL_FOR_WISDOM >= 15) {
  xpBonus += 5;
}
if (ROLL_FOR_CHARISMA >= 15) {
  xpBonus += 5;
}
if (generatedCharacterClass.primeAttributeValue >= 15) {
  xpBonus += 5;
}
if (xpBonus > 15) {
  xpBonus = 15;
}

let characterHP = generatedCharacterClass.HDatLevel1 + CONSTITUTION_MODIFIER;
if (characterHP <= 0) {
  characterHP = 1;
}

const toHitMelee = `${
  generatedCharacterClass.toHitAtLevel1 + STRENGTH_MODIFIER > 0 ? "+" : ""
}${generatedCharacterClass.toHitAtLevel1 + STRENGTH_MODIFIER}`;
const toHitMissile = `${
  generatedCharacterClass.toHitAtLevel1 + DEXTERITY_MODIFIER > 0 ? "+" : ""
}${generatedCharacterClass.toHitAtLevel1 + DEXTERITY_MODIFIER}`;

let maxHirelings = null;
let hirelingsLoyalty = null;
if (ROLL_FOR_CHARISMA <= 4) {
  maxHirelings = 1;
  hirelingsLoyalty = -2;
} else if (ROLL_FOR_CHARISMA >= 5 && ROLL_FOR_CHARISMA <= 6) {
  maxHirelings = 2;
  hirelingsLoyalty = -2;
} else if (ROLL_FOR_CHARISMA >= 7 && ROLL_FOR_CHARISMA <= 8) {
  maxHirelings = 3;
  hirelingsLoyalty = -1;
} else if (ROLL_FOR_CHARISMA >= 9 && ROLL_FOR_CHARISMA <= 12) {
  maxHirelings = 4;
  hirelingsLoyalty = 0;
} else if (ROLL_FOR_CHARISMA >= 13 && ROLL_FOR_CHARISMA <= 15) {
  maxHirelings = 5;
  hirelingsLoyalty = 1;
} else if (ROLL_FOR_CHARISMA >= 16 && ROLL_FOR_CHARISMA <= 17) {
  maxHirelings = 6;
  hirelingsLoyalty = 2;
} else {
  maxHirelings = 7;
  hirelingsLoyalty = 2;
}

let raceAbilities = "";

let notHumanOrElf =
  generatedCharacterRace.raceName != "Human" &&
  generatedCharacterClass.characterClassName != "Elf";

if (notHumanOrElf) {
  raceAbilities = `Race Abilities: ${generatedCharacterRace.raceSpecialAbilities}`;
}

let currentMoney = INITIAL_MONEY;
let characterWeapons = [];

[characterWeapons, currentMoney] = selectWeapons(
  WEAPONS,
  currentMoney,
  generatedCharacterClass.characterClassName
);

//TODO: Include AC value after including equipment
let stringToDisplay = `${generatedCharacterRace.raceName} ${generatedCharacterClass.characterClassName}, Level 1 <br /> Alignment: ${characterAlignment}<br /><br />`;
for (let n = 0; n < ATTRIBUTES.length; n++) {
  stringToDisplay += `${ATTRIBUTES[n].attributeName} ${
    ATTRIBUTES[n].attributeValue
  } (${ATTRIBUTES[n].modifierValue > 0 ? "+" : ""}${
    ATTRIBUTES[n].modifierValue
  }) <br />`;
}
stringToDisplay += `<br />Melee: ${toHitMelee} (to-hit and damage) <br /> Missile: ${toHitMissile} (to-hit) <br /> AC <br/> HP ${characterHP} <br /> ST ${
  generatedCharacterClass.savingThrowAtLevel1
} (${
  generatedCharacterClass.savingThrowBonus +
  generatedCharacterRace.raceSavingThrowBonus
}) <br /> </br> Current XP 0 <br /> XP Bonus ${xpBonus}% <br /> <br /> Class Abilities: ${
  generatedCharacterClass.specialAbilities
}
  ${raceAbilities}`;
if (generatedCharacterClass.spellcasterType === "magic") {
  stringToDisplay += `Known Spells: ${
    MAGIC_USER_SPELLS_LEVEL_1[
      Math.floor(Math.random() * MAGIC_USER_SPELLS_LEVEL_1.length)
    ]
  }<br />`;
}
stringToDisplay += `<br />Weapons & Armor: <br/><ul>`;
for (let n = 0; n < characterWeapons.length; n++) {
  stringToDisplay += `<li>${characterWeapons[n].weaponName} (${characterWeapons[n].damage}) </li>`;
}
stringToDisplay += `</ul>Equipment: ${currentMoney} gp <br /><br /> Hirelings (Max #): ${maxHirelings}<br /> Loyalty: ${
  hirelingsLoyalty > 0 ? "+" : ""
}${hirelingsLoyalty}<br />`;
//TODO: pick elements from list of items randomly until money runs out (giving priority to 1 allowed weapon, 1 allowed armor and then assigning the rest randomly)
//TODO: calculate movement speed

document.getElementById("generator").innerHTML = stringToDisplay;
