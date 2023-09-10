"strict mode";
//added comment to test read-only on github
/* USER STORY: I see a short textual description Whitebox character randomly generated and ready to play. 
It includes: 
- ~~Ascending Armor class~~
- ~~HD~~
- ~~Attribute scores with modifiers~~
- Name 
- ~~Class~~
- ~~Level~~
- ~~Race~~
- ~~Alignment~~
- ~~Initial XP~~
- ~~XP bonus~~
- ~~A character portrait~~
- ~~Saving throw and mods~~
- ~~Spells / Abilities ~~
- ~~Equipment~~
- ~~Weapons & Armor~~
- ~~Coins~~
- ~~Languages~~
- ~~To-Hit bonus~~
- ~~Number of hirelings and loyalty~~
- Weight carried and movement speed
*/

//FUNCTIONS
//TODO: move these functions to modules?
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
  const characterPortrait = `https://campaignwiki.org/face/redirect/alex/${character}`;
  return characterPortrait;
}

function determineXPBonus() {
  let xpBonus = 0;
  if (rollForWisdom >= 15) {
    xpBonus += 5;
  }
  if (rollForCharisma >= 15) {
    xpBonus += 5;
  }
  if (generatedCharacterClass.primeAttributeValue >= 15) {
    xpBonus += 5;
  }
  if (xpBonus > 15) {
    xpBonus = 15;
  }
  return xpBonus;
}

function selectItems(
  itemsAvailable,
  numberOfItems,
  currentMoney,
  whoIsTheCharacter
) {
  let shoppingArray = itemsAvailable.map((x) => x),
    filteredShoppingArray = null,
    selectedItem = [],
    i = 0;
  shuffle(shoppingArray);
  //TODO: Include more dynamic combinations for weapon selection (i.e., weapon and shield, two weapons...)
  //TODO: make sure that currentMoney is never negative, both by checking at the beginning of the function if the money can be spent, and by checking after each purchase.
  //TODO: turn recurring code below into function
  switch (whoIsTheCharacter) {
    case "Fighter":
      filteredShoppingArray = shoppingArray.filter((n) => n.fighter == true);
      for (let i = 0; i < numberOfItems; i++) {
        selectedItem.push(filteredShoppingArray.pop());
        currentMoney = currentMoney - selectedItem[0].cost;
      }
      break;
    case "Elf":
      filteredShoppingArray = shoppingArray.filter((n) => n.fighter == true);
      for (let i = 0; i < numberOfItems; i++) {
        selectedItem.push(filteredShoppingArray.pop());
        currentMoney = currentMoney - selectedItem[0].cost;
      }
      break;
    case "Cleric":
      filteredShoppingArray = shoppingArray.filter((n) => n.cleric == true);
      for (let i = 0; i < numberOfItems; i++) {
        selectedItem.push(filteredShoppingArray.pop());
        currentMoney = currentMoney - selectedItem[0].cost;
      }
      break;
    case "Magic-User":
      filteredShoppingArray = shoppingArray.filter((n) => n.magicUser == true);
      for (let i = 0; i < numberOfItems; i++) {
        selectedItem.push(filteredShoppingArray.pop());
        currentMoney = currentMoney - selectedItem[0].cost;
      }
      break;
    case "Thief":
      filteredShoppingArray = shoppingArray.filter((n) => n.thief == true);
      for (let i = 0; i < numberOfItems; i++) {
        selectedItem.push(filteredShoppingArray.pop());
        currentMoney = currentMoney - selectedItem[0].cost;
      }
      break;
  }

  return [selectedItem, currentMoney];
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
  ],
  ALIGNMENTS = ["Lawful", "Neutral", "Chaotic"],
  WEAPONS = [
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
  ],
  ARMOR = [
    {
      armorName: "Unarmored",
      AC: 0,
      weight: 0,
      cost: 0,
      cleric: true,
      fighter: false,
      magicUser: true,
      thief: true,
      elf: true,
    },
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

const ADVENTURING_GEAR = [
  {
    itemName: "Backpack (30 lb. capacity",
    cost: 5,
    cleric: true,
    fighter: true,
    magicUser: true,
    thief: true,
    elf: true,
  },
  {
    itemName: "Bedroll",
    cost: 2,
    cleric: true,
    fighter: true,
    magicUser: true,
    thief: true,
    elf: true,
  },
  {
    itemName: "Belladonna, bunch",
    cost: 10,
    cleric: true,
    fighter: true,
    magicUser: true,
    thief: true,
    elf: true,
  },
  {
    itemName: "Bottle (wine), glass",
    cost: 1,
    cleric: true,
    fighter: true,
    magicUser: true,
    thief: true,
    elf: true,
  },
  {
    itemName: "Case (map or scroll)",
    cost: 3,
    cleric: true,
    fighter: true,
    magicUser: true,
    thief: true,
    elf: true,
  },
  {
    itemName: "Crowbar",
    cost: 5,
    cleric: true,
    fighter: true,
    magicUser: true,
    thief: true,
    elf: true,
  },
  {
    itemName: "Flint and Stell",
    cost: 5,
    cleric: true,
    fighter: true,
    magicUser: true,
    thief: true,
    elf: true,
  },
  {
    itemName: "Garlic (1 lb.)",
    cost: 10,
    cleric: true,
    fighter: true,
    magicUser: true,
    thief: true,
    elf: true,
  },
  {
    itemName: "Grappling Hook",
    cost: 5,
    cleric: true,
    fighter: true,
    magicUser: true,
    thief: true,
    elf: true,
  },
  {
    itemName: "Hammer",
    cost: 2,
    cleric: true,
    fighter: true,
    magicUser: true,
    thief: true,
    elf: true,
  },
  {
    itemName: "Helmet",
    cost: 10,
    cleric: true,
    fighter: true,
    magicUser: true,
    thief: true,
    elf: true,
  },
  {
    itemName: "Holy Symbol, wooden",
    cost: 2,
    cleric: true,
    fighter: false,
    magicUser: false,
    thief: false,
    elf: false,
  },
  {
    itemName: "Holy Symbol, silver",
    cost: 25,
    cleric: true,
    fighter: false,
    magicUser: false,
    thief: false,
    elf: false,
  },
  {
    itemName: "Holy Water, small vial",
    cost: 25,
    cleric: true,
    fighter: true,
    magicUser: true,
    thief: true,
    elf: true,
  },
  {
    itemName: "Lantern",
    cost: 10,
    cleric: true,
    fighter: true,
    magicUser: true,
    thief: true,
    elf: true,
  },
  {
    itemName: "Mirror (small), steel",
    cost: 5,
    cleric: true,
    fighter: true,
    magicUser: true,
    thief: true,
    elf: true,
  },
  {
    itemName: "Oil (lamp), 1 pint",
    cost: 2,
    cleric: true,
    fighter: true,
    magicUser: true,
    thief: true,
    elf: true,
  },
  {
    itemName: "Pole, 10 ft.",
    cost: 1,
    cleric: true,
    fighter: true,
    magicUser: true,
    thief: true,
    elf: true,
  },
  {
    itemName: "Rations, trail (day)",
    cost: 1,
    cleric: true,
    fighter: true,
    magicUser: true,
    thief: true,
    elf: true,
  },
  {
    itemName: "Rations, dried (day)",
    cost: 3,
    cleric: true,
    fighter: true,
    magicUser: true,
    thief: true,
    elf: true,
  },
  {
    itemName: "Rope (50 ft.), hemp",
    cost: 1,
    cleric: true,
    fighter: true,
    magicUser: true,
    thief: true,
    elf: true,
  },
  {
    itemName: "Rope (50 ft.), silk",
    cost: 5,
    cleric: true,
    fighter: true,
    magicUser: true,
    thief: true,
    elf: true,
  },
  {
    itemName: "Sack (15 lb. capacity)",
    cost: 1,
    cleric: true,
    fighter: true,
    magicUser: true,
    thief: true,
    elf: true,
  },
  {
    itemName: "Sack (30 lb. capacity)",
    cost: 2,
    cleric: true,
    fighter: true,
    magicUser: true,
    thief: true,
    elf: true,
  },
  {
    itemName: "Shovel",
    cost: 5,
    cleric: true,
    fighter: true,
    magicUser: true,
    thief: true,
    elf: true,
  },
  {
    itemName: "Spellbook (blank)",
    cost: 100,
    cleric: false,
    fighter: false,
    magicUser: true,
    thief: false,
    elf: true,
  },
  {
    itemName: "Spikes (12), iron",
    cost: 1,
    cleric: true,
    fighter: true,
    magicUser: true,
    thief: true,
    elf: true,
  },
  {
    itemName: "Stakes (12), wooden",
    cost: 1,
    cleric: true,
    fighter: true,
    magicUser: true,
    thief: true,
    elf: true,
  },
  {
    itemName: "Tent",
    cost: 20,
    cleric: true,
    fighter: true,
    magicUser: true,
    thief: true,
    elf: true,
  },
  {
    itemName: "Thieves' Tools",
    cost: 25,
    cleric: false,
    fighter: false,
    magicUser: false,
    thief: true,
    elf: false,
  },
  {
    itemName: "Torches (6)",
    cost: 1,
    cleric: true,
    fighter: true,
    magicUser: true,
    thief: true,
    elf: true,
  },
  {
    itemName: "Waterskin",
    cost: 1,
    cleric: true,
    fighter: true,
    magicUser: true,
    thief: true,
    elf: true,
  },
  {
    itemName: "Wolfsbane, bunch",
    cost: 10,
    cleric: true,
    fighter: true,
    magicUser: true,
    thief: true,
    elf: true,
  },
];
//TODO: Treat ammunitions as a separate purchase: if a character gets a missile weapon, they should obviously get also ammunitions. Bow > arrows, Sling > stones, Crossbow > Bolts
//TODO: Divide consumables items, so that they can be purchased more than once, and display them as unified (i.e., Torches (10))

//START RUN-TIME
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

const generatedCharacterRace = determineCharacterRace(generatedCharacterClass);

const characterPortrait = receivePortrait();

const characterAlignment =
  ALIGNMENTS[Math.floor(Math.random() * ALIGNMENTS.length)];

let xpBonus = determineXPBonus(generatedCharacterClass.primeAttributeValue);

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

//TODO: Fighters and Clerics should have 40% chance of shield; if no shield, fighters should have a 50% chance of a missile weapon

[characterArmorGear, currentMoney] = selectItems(
  ARMOR,
  1,
  currentMoney,
  generatedCharacterClass.characterClassName
);

if (
  generatedCharacterClass.characterClassName == "Fighter" ||
  generatedCharacterClass.characterClassName == "Cleric" ||
  generatedCharacterClass.characterClassName == "Elf"
) {
  let chanceOfShield = Math.floor(Math.random() * 100);

  if (chanceOfShield <= 40) {
    characterArmorGear.push(SHIELD);
    currentMoney = currentMoney - SHIELD.cost;
  } else {
    let chanceOf2ndWeapon = Math.floor(Math.random() * 100);
    if (
      chanceOf2ndWeapon <= 50 &&
      generatedCharacterClass.characterClassName == "Fighter"
    ) {
      [characterArmorGear, currentMoney] = selectItems(
        ARMOR,
        1,
        currentMoney,
        generatedCharacterClass.characterClassName
      );
    }
  }
}

let descendingArmorClass = 9 - dexterityModifier;
let ascendingArmorClass = 10 + dexterityModifier;
let gearWeight = 10;
for (let i = 0; i < characterArmorGear.length; i++) {
  descendingArmorClass -= characterArmorGear[i].AC;
  ascendingArmorClass += characterArmorGear[i].AC;
  gearWeight += characterArmorGear[i].weight;
}

[characterWeapons, currentMoney] = selectItems(
  WEAPONS,
  1,
  currentMoney,
  generatedCharacterClass.characterClassName
);

for (let i = 0; i < characterWeapons.length; i++) {
  gearWeight += characterWeapons[i].weight;
}

let movementRate = generatedCharacterRace.standardMovementRate * 10;
if (gearWeight >= 76 && gearWeight <= 100) {
  movementRate -= 30;
} else if (gearWeight >= 101 && gearWeight <= 150) {
  movementRate -= 30;
} else if (gearWeight >= 151) {
  movementRate = 30;
}

[characterEquipment, currentMoney] = selectItems(
  ADVENTURING_GEAR,
  Math.floor(Math.random() * 10 + 5),
  currentMoney,
  generatedCharacterClass.characterClassName
);

// for (let i=0; i < characterEquipment.length; i++ ) {

// }

const basicInfo = `<h2>Basic info</h2><div class="vitals">${generatedCharacterRace.raceName} ${generatedCharacterClass.characterClassName}</div> <div class="vitals">Level 1</div><div class="vitals">${characterAlignment}</div><div class="vitals">Current XP 0/${generatedCharacterClass.xpToLevel2} </div><div class="vitals"> XP Bonus ${xpBonus}%</div>`;
document.getElementById("basic-info").innerHTML = basicInfo;

let attributesToDisplay = `<h2>Attributes</h2>`;
for (let n = 0; n < generatedAttributes.length; n++) {
  attributesToDisplay += `<div class="vitals">${
    generatedAttributes[n].attributeName
  } ${generatedAttributes[n].attributeValue} (${
    generatedAttributes[n].modifierValue > 0 ? "+" : ""
  }${generatedAttributes[n].modifierValue})</div> `;
}
document.getElementById("attributes").innerHTML = attributesToDisplay;

let combatInfo = `<h2>Combat Info</h2><div class="vitals" id="AC">AC 
${descendingArmorClass}
[${ascendingArmorClass}]</div> <div class="vitals" id="hp">HP ${characterHP}</div> <div class="vitals" id="saving-throw">ST ${generatedCharacterClass.savingThrowAtLevel1}</div><div class="description" id="saving-throw-description">${generatedCharacterClass.savingThrowBonus}${generatedCharacterRace.raceSavingThrowBonus}</div>`;
document.getElementById("combat-info").innerHTML = combatInfo;

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
  weaponsAndArmor += `<div class="vitals" id="armor">${characterArmorGear[n].armorName}</div><div class="description">(-${characterArmorGear[n].AC} [+${characterArmorGear[n].AC}])</div>`;
}
document.getElementById("weapons-and-armor").innerHTML = weaponsAndArmor;

let hirelings = `<h2>Hirelings</h2><div class="character-info">Max #: ${maxHirelings}</div><div class="character-info">Loyalty: ${
  hirelingsLoyalty > 0 ? "+" : ""
}${hirelingsLoyalty}</div>`;

document.getElementById("hirelings").innerHTML = hirelings;

let equipmentToDisplay = `<h2>Equipment</h2><div class="character-info" id="equipment">`;
for (let n = 0; n < characterEquipment.length; n++) {
  equipmentToDisplay += `${characterEquipment[n].itemName}, `;
}
equipmentToDisplay += `${currentMoney} gp</div>`;
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

//TODO: calculate movement speed

//TODO: implement async function so that character portrait for humans/halflings looks good.

document.getElementById(
  "portrait"
).innerHTML = `<img src = "${characterPortrait}" width = 175></img>`;
