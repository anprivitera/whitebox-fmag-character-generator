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
- Coins
- ~~Languages~~
- ~~To-Hit bonus~~
- Number of hirelings and loyalty
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
    specialAbilities: "Turn the Undead, Establish Temple (at Level 10)",
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
    specialAbilities: "Combat Fury, Establish Stronghold (at Level 9)",
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
      "+1 to-hit vs. goblins, orcs, intelligent undead, lycantropes; immune to undead paralysis;  damage from giants and ogres; 4-in-6 chances of actively spotting hidden or concealed doors (2-in-6 if passing by).",
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
    specialAbilities: "Spell Casting, Establish Wizard Tower (at Level 9)",
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
      "Back Stab (+2 to Hit and x2 damage on hit), Thievery 2, Establish Guild (at Level 9)",
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
      "; can reach maximum level 6; half damage from giants and ogres; 4-in-6 chances of actively spotting traps, slanting passages or construction (2-in-6 if passing by); can speak with goblins, orgrs, orcs, kobolds.",
  };
  const HALFLING = {
    raceName: "Halfling",
    raceSavingThrowBonus: ", +4 vs. Magic",
    raceSpecialAbilities:
      "; can reach maximum level 4 (fighter) or level 6 (thief); half damage from giants and ogres; +2 to-hit using missile weapons; 5-in-6 chance of going undetected when outside of combat",
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
let stringToDisplay = `${generatedCharacterRace.raceName} ${generatedCharacterClass.characterClassName}, Level 1 <br /> Alignment: ${CHARACTER_ALIGNMENT}<br /><br />`;

for (let n = 0; n < ATTRIBUTES.length; n++) {
  stringToDisplay += `${ATTRIBUTES[n].attributeName} ${
    ATTRIBUTES[n].attributeValue
  } (${ATTRIBUTES[n].modifierValue > 0 ? "+" : ""}${
    ATTRIBUTES[n].modifierValue
  }) <br />`;
}

let characterHP = generatedCharacterClass.HDatLevel1 + CONSTITUTION_MODIFIER;
if (characterHP <= 0) {
  characterHP = 1;
}

const toHitMelee = generatedCharacterClass.toHitAtLevel1 + STRENGTH_MODIFIER;
const toHitMissile = generatedCharacterClass.toHitAtLevel1 + DEXTERITY_MODIFIER;

//TODO: Include AC value after including equipment
stringToDisplay += `<br />Melee: ${
  toHitMelee > 0 ? "+" : ""
}${toHitMelee} (to-hit and damage) <br /> Missile: ${
  toHitMissile > 0 ? "+" : ""
}${toHitMissile} (to-hit) <br /> AC <br/> HP ${characterHP} <br /> ST ${
  generatedCharacterClass.savingThrowAtLevel1
} (${
  generatedCharacterClass.savingThrowBonus +
  generatedCharacterRace.raceSavingThrowBonus
}) <br />  </br> Current XP 0, XP Bonus ${xpBonus}% <br /> <br /> Abilities: ${
  generatedCharacterClass.specialAbilities +
  generatedCharacterRace.raceSpecialAbilities
}`;
if (generatedCharacterClass.spellcasterType === "magic") {
  stringToDisplay += `<br />Known Spells: ${
    MAGIC_USER_SPELLS_LEVEL_1[
      Math.floor(Math.random() * MAGIC_USER_SPELLS_LEVEL_1.length)
    ]
  }`;
}
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

stringToDisplay += `<br /> Hirelings (Max #): ${maxHirelings}; Loyalty: ${hirelingsLoyalty}<br />`;

document.getElementById("generator").innerHTML = stringToDisplay;

//TODO: roll for initial money
//TODO: pick elements from list of items randomly until money runs out (giving priority to 1 allowed weapon, 1 allowed armor and then assigning the rest randomly)
//TODO: calculate movement speed
