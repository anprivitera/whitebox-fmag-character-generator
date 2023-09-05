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

const WEAPONS = [
  {
    weaponName: "Axe, battle",
    damage: "1d6+1",
    weight: 15,
    cost: 7,
    blunt: false,
    twoHanded: true,
    melee: true,
    missile: false,
    missileROF: null,
  },
  {
    weaponName: "Axe, hand",
    damage: "1d6",
    weight: 5,
    cost: 3,
    blunt: false,
    twoHanded: false,
    melee: true,
    missile: true,
    missileROF: 1,
  },
  {
    weaponName: "Club",
    damage: "1d6",
    weight: 10,
    cost: 0,
    blunt: true,
    twoHanded: false,
    melee: true,
    missile: false,
    missileROF: null,
  },
  {
    weaponName: "Dagger",
    damage: "1d6-1",
    weight: 2,
    cost: 3,
    blunt: false,
    twoHanded: false,
    melee: true,
    missile: true,
    missileROF: 1,
  },
  {
    weaponName: "Flail",
    damage: "1d6",
    weight: 15,
    cost: 8,
    blunt: true,
    twoHanded: false,
    melee: true,
    missile: false,
    missileROF: null,
  },
  {
    weaponName: "Mace",
    damage: "1d6",
    weight: 10,
    cost: 5,
    blunt: true,
    twoHanded: false,
    melee: true,
    missile: false,
    missileROF: null,
  },
  {
    weaponName: "Morning Star",
    damage: "1d6",
    weight: 15,
    cost: 8,
    blunt: true,
    twoHanded: false,
    melee: true,
    missile: false,
    missileROF: null,
  },
  {
    weaponName: "Polearm",
    damage: "1d6+1",
    weight: 15,
    cost: 7,
    blunt: false,
    twoHanded: true,
    melee: true,
    missile: false,
    missileROF: null,
  },
  {
    weaponName: "Spear",
    damage: "1d6",
    weight: 10,
    cost: 2,
    blunt: false,
    twoHanded: false,
    melee: true,
    missile: true,
    missileROF: 1,
  },
  {
    weaponName: "Staff",
    damage: "1d6",
    weight: 10,
    cost: 1,
    blunt: false,
    twoHanded: true,
    melee: true,
    missile: false,
    missileROF: null,
  },
  {
    weaponName: "Sword, long",
    damage: "1d6",
    weight: 10,
    cost: 10,
    blunt: false,
    twoHanded: false,
    melee: true,
    missile: false,
    missileROF: null,
  },
  {
    weaponName: "Sword, short",
    damage: "1d6-1",
    weight: 5,
    cost: 8,
    blunt: false,
    twoHanded: false,
    melee: true,
    missile: false,
    missileROF: null,
  },
  {
    weaponName: "Sword, two-handed",
    damage: "1d6+1",
    weight: 15,
    cost: 15,
    blunt: false,
    twoHanded: true,
    melee: true,
    missile: false,
    missileROF: null,
  },
  {
    weaponName: "Warhammer",
    damage: "1d6",
    weight: 10,
    cost: 5,
    blunt: true,
    twoHanded: false,
    melee: true,
    missile: false,
    missileROF: null,
  },
  {
    weaponName: "Bow, long",
    damage: "1d6",
    weight: 5,
    cost: 40,
    blunt: false,
    twoHanded: true,
    melee: false,
    missile: true,
    missileROF: 2,
  },
  {
    weaponName: "Bow, short",
    damage: "1d6-1",
    weight: 5,
    cost: 25,
    blunt: false,
    twoHanded: true,
    melee: false,
    missile: true,
    missileROF: 2,
  },
  {
    weaponName: "Crossbow, heavy",
    damage: "1d6+1",
    weight: 5,
    cost: 25,
    blunt: false,
    twoHanded: true,
    melee: false,
    missile: true,
    missileROF: 0.5,
  },
  {
    weaponName: "Crossbow, light",
    damage: "1d6-1",
    weight: 5,
    cost: 15,
    blunt: false,
    twoHanded: true,
    melee: false,
    missile: true,
    missileROF: 1,
  },
  {
    weaponName: "Sling",
    damage: "1d6",
    weight: 1,
    cost: 2,
    blunt: true,
    twoHanded: false,
    melee: false,
    missile: true,
    missileROF: 1,
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

//INITIAL VARIABLES
let raceAbilities = "",
  currentMoney = initialMoney,
  characterEquipment = [];

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
  const HUMAN = {
    raceName: "Human",
    raceSavingThrowBonus: "",
    raceSpecialAbilities: "",
  };
  const ELF = {
    raceName: "",
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

function selectWeapons(weaponsAvailable, currentMoney) {
  let shoppingArray = weaponsAvailable.map((x) => x);
  shuffle(shoppingArray);
  characterEquipment.push(
    shoppingArray.pop(Math.floor(Math.random() * shoppingArray.length))
  );
  currentMoney = currentMoney - characterEquipment[0].cost;
  return { characterEquipment, currentMoney };
}

function selectAdventuringGear(aventuringGear, currentMoney) {
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

//START RUN-TIME
const rollStrength = diceRoller(3),
  rollDexterity = diceRoller(3),
  rollConstitution = diceRoller(3),
  rollIntelligence = diceRoller(3),
  rollWisdom = diceRoller(3),
  rollCharisma = diceRoller(3),
  strengthModifier = determineModifier(rollStrength),
  dexterityModifier = determineModifier(rollDexterity),
  constitutionModifier = determineModifier(rollConstitution),
  intelligenceModifier = determineModifier(rollIntelligence),
  wisdomModifier = determineModifier(rollWisdom),
  charsimaModifier = determineModifier(rollCharisma),
  initialMoney = diceRoller(3) * 10,
  ALIGNMENTS = ["Law", "Neutral", "Chaos"];

const attributes = [
  {
    attributeName: "STR",
    attributeValue: rollStrength,
    modifierValue: strengthModifier,
  },
  {
    attributeName: "DEX",
    attributeValue: rollDexterity,
    modifierValue: dexterityModifier,
  },
  {
    attributeName: "CON",
    attributeValue: rollConstitution,
    modifierValue: constitutionModifier,
  },
  {
    attributeName: "INT",
    attributeValue: rollIntelligence,
    modifierValue: intelligenceModifier,
  },
  {
    attributeName: "WIS",
    attributeValue: rollWisdom,
    modifierValue: wisdomModifier,
  },
  {
    attributeName: "CHA",
    attributeValue: rollCharisma,
    modifierValue: charsimaModifier,
  },
];

let generatedCharacterClass = determineCharacterClass(ATTRIBUTES);

let generatedCharacterRace = determineCharacterRace(generatedCharacterClass);

const characterAlignment =
  ALIGNMENTS[Math.floor(Math.random() * ALIGNMENTS.length)];

let xpBonus = 0;
if (rollWisdom >= 15) {
  xpBonus += 5;
}
if (rollCharisma >= 15) {
  xpBonus += 5;
}
if (generatedCharacterClass.primeAttributeValue >= 15) {
  xpBonus += 5;
}
if (xpBonus > 15) {
  xpBonus = 15;
}

let characterHP = generatedCharacterClass.HDatLevel1 + constitutionModifier;
if (characterHP <= 0) {
  characterHP = 1;
}

const toHitMelee = `${
  generatedCharacterClass.toHitAtLevel1 + strengthModifier > 0 ? "+" : ""
}${generatedCharacterClass.toHitAtLevel1 + strengthModifier}`;
const toHitMissile = `${
  generatedCharacterClass.toHitAtLevel1 + dexterityModifier > 0 ? "+" : ""
}${generatedCharacterClass.toHitAtLevel1 + dexterityModifier}`;

let maxHirelings = null;
let hirelingsLoyalty = null;
if (rollCharisma <= 4) {
  maxHirelings = 1;
  hirelingsLoyalty = -2;
} else if (rollCharisma >= 5 && rollCharisma <= 6) {
  maxHirelings = 2;
  hirelingsLoyalty = -2;
} else if (rollCharisma >= 7 && rollCharisma <= 8) {
  maxHirelings = 3;
  hirelingsLoyalty = -1;
} else if (rollCharisma >= 9 && rollCharisma <= 12) {
  maxHirelings = 4;
  hirelingsLoyalty = 0;
} else if (rollCharisma >= 13 && rollCharisma <= 15) {
  maxHirelings = 5;
  hirelingsLoyalty = 1;
} else if (rollCharisma >= 16 && rollCharisma <= 17) {
  maxHirelings = 6;
  hirelingsLoyalty = 2;
} else {
  maxHirelings = 7;
  hirelingsLoyalty = 2;
}

if (
  generatedCharacterRace.raceName != "Human" &&
  generatedCharacterRace.raceName != "Elf"
) {
  raceAbilities = `Race Abilities: ${generatedCharacterRace.raceSpecialAbilities}`;
}

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
for (let n = 0; n < characterEquipment.length; n++) {
  stringToDisplay += `${characterEquipment[n].itemName} <br />`;
}
stringToDisplay += `Equipment: ${currentMoney} gp <br /><br /> Hirelings (Max #): ${maxHirelings}<br /> Loyalty: ${
  hirelingsLoyalty > 0 ? "+" : ""
}${hirelingsLoyalty}<br />`;
//TODO: pick elements from list of items randomly until money runs out (giving priority to 1 allowed weapon, 1 allowed armor and then assigning the rest randomly)
//TODO: calculate movement speed

document.getElementById("generator").innerHTML = stringToDisplay;
