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
  CHARISMA_MODIFIER = determineModifier(ROLL_FOR_CHARISMA);

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

//TODO: Treat ammunitions as a separate purchase: if a character gets a missile weapon, they should obviously get also ammunitions
//Bow > arrows, Sling > stones, Crossbow > Bolts

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

let generatedCharacterClass = determineCharacterClass(ATTRIBUTES);

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

let generatedCharacterRace = determineCharacterRace(generatedCharacterClass);

const ALIGNMENTS = ["Law", "Neutral", "Chaos"];
const CHARACTER_ALIGNMENT =
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

if (
  generatedCharacterRace.raceName != "Human" &&
  generatedCharacterRace.raceName != "Elf"
) {
  raceAbilities = `Race Abilities: ${generatedCharacterRace.raceSpecialAbilities}`;
}

const initialMoney = diceRoller(3) * 10;
let currentMoney = initialMoney;

// create a new array called purchasedItems
// while initialMoney is above the "cost" value of at least one item in the WEAPONS array
// select a random item to transfer from the WEAPONS array to the purchasedItems array, making sure that it is not already present in the purchasedItems array

let characterEquipment = [];
let shoppingArray = WEAPONS.map((x) => x);
shuffle(shoppingArray);

for (let i = 0; i < shoppingArray.length; i++) {
  if (shoppingArray[i].cost <= currentMoney) {
    characterEquipment.push(shoppingArray.pop());
    currentMoney = currentMoney - shoppingArray[i].cost;
  }
}

// copy the WEAPONS array into shoppingArray
// while there are still items in shoppingArray with "cost" value equal or lower than currentMoney
// take out an item from the shoppyingArray whose value is lower or equal to the currentMoney
// subtract item cost from currentMoney

//TODO: Include AC value after including equipment
let stringToDisplay = `${generatedCharacterRace.raceName} ${generatedCharacterClass.characterClassName}, Level 1 <br /> Alignment: ${CHARACTER_ALIGNMENT}<br /><br />`;
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
  stringToDisplay += `${initialMoney} ${characterEquipment[n].weaponName} <br />`;
}
stringToDisplay += `Equipment: ${currentMoney} gp <br /><br /> Hirelings (Max #): ${maxHirelings}<br /> Loyalty: ${
  hirelingsLoyalty > 0 ? "+" : ""
}${hirelingsLoyalty}<br />`;
//TODO: pick elements from list of items randomly until money runs out (giving priority to 1 allowed weapon, 1 allowed armor and then assigning the rest randomly)
//TODO: calculate movement speed

document.getElementById("generator").innerHTML = stringToDisplay;
