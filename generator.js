"strict mode";
/* USER STORY: I see a short textual description Whitebox character randomly generated and ready to play. 
It includes: 
- Ascending Armor class
- HD
- ~~Attribute scores with modifiers~~
- Name 
- ~~Class~~
- Level
- (Race)
- ~~Alignment~~
- ~~Initial XP~~
- ~~XP bonus~~
- A character portrait
- ~~Saving throw and mods~~
- Spells / Abilities
- Equipment
- Weapons & Armor
- Coins
- Languages
- To-Hit bonus
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

function determineCharacterClass(attributes) {
  const cleric = {
    characterClassName: "Cleric",
    xpAtLevel1: 0,
    HDatLevel1: diceRoller(1),
    toHitAtLevel1: 0,
    savingThrowAtLevel1: 15,
    savingThrowBonus: "+2 vs. Death and Poison",
    spellsAtLevel1: [0, 0, 0, 0, 0],
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
    spellsAtLevel1: [0, 0, 0, 0, 0],
    primeAttribute: "STR",
    // primeAttributeValue: null;
    specialAbilities: "Combat Fury, Establish Stronghold (at Level 9)",
  };
  const magicUser = {
    characterClassName: "Magic-User",
    xpAtLevel1: 0,
    HDatLevel1: diceRoller(1),
    toHitAtLevel1: 0,
    savingThrowAtLevel1: 15,
    savingThrowBonus: "+2 vs. Spells",
    spellsAtLevel1: [1, 0, 0, 0, 0],
    primeAttribute: "INT",
    // primeAttributeValue: null;
    specialAbilities: "Spell Casting, Establish Wizard Tower (at Level 9)",
  };
  let generatedCharacterClass = null;
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
      }
    }
  }
}

let generatedCharacterClass = determineCharacterClass(ATTRIBUTES);

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
let stringToDisplay = `${generatedCharacterClass.characterClassName}, Level 1 <br /> Alignment: ${CHARACTER_ALIGNMENT}<br /><br />`;

for (let n = 0; n < ATTRIBUTES.length; n++) {
  stringToDisplay += `${ATTRIBUTES[n].attributeName} ${
    ATTRIBUTES[n].attributeValue
  } (${ATTRIBUTES[n].modifierValue > 0 ? "+" : ""}${
    ATTRIBUTES[n].modifierValue
  }) <br />`;
}
stringToDisplay += `<br />HP ${diceRoller(1)} <br /> ST ${
  generatedCharacterClass.savingThrowAtLevel1
} (${
  generatedCharacterClass.savingThrowBonus
}) <br />  </br> Current XP 0, XP Bonus ${xpBonus}% <br /> Abilities: ${
  generatedCharacterClass.specialAbilities
}`;

document.getElementById("generator").innerHTML = stringToDisplay;

//TODO: include class characteristics
//TODO: roll for initial money
//TODO: pick elements from list of items randomly until money runs out (giving priority to 1 allowed weapon, 1 allowed armor and then assigning the rest randomly)
//TODO: calculate movement speed
