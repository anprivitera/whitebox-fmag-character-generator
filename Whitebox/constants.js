import { diceRoller } from "../System Neutral/functions.js";

const ELF_PRIME_ATTRIBUTES = ["STR", "INT"];

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

export const ADVENTURING_GEAR = [
  {
    itemName: "Backpack (30 lb.)",
    cost: 5,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
    quantity: "",
    quantityType: "",
    container: true,
    capacity: 30,
  },
  {
    itemName: "Bedroll",
    cost: 2,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
    quantity: "",
    quantityType: "",
    container: false,
    capacity: null,
  },
  {
    itemName: "Belladonna, bunch",
    cost: 10,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
    quantity: "",
    quantityType: "",
    container: false,
    capacity: null,
  },
  {
    itemName: "Bottle (wine), glass",
    cost: 1,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
    quantity: "",
    quantityType: "",
    container: false,
    capacity: null,
  },
  {
    itemName: "Case (map or scroll)",
    cost: 3,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
    quantity: "",
    quantityType: "",
    container: false,
    capacity: null,
  },
  {
    itemName: "Crowbar",
    cost: 5,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
    quantity: "",
    quantityType: "",
    container: false,
    capacity: null,
  },
  {
    itemName: "Flint and Stell",
    cost: 5,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
    quantity: "",
    quantityType: "",
    container: false,
    capacity: null,
  },
  {
    itemName: "Garlic",
    cost: 10,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: true,
    quantity: 1,
    quantityType: "lb.",
    container: false,
    capacity: null,
  },
  {
    itemName: "Grappling Hook",
    cost: 5,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
    quantity: "",
    quantityType: "",
    container: false,
    capacity: null,
  },
  {
    itemName: "Hammer",
    cost: 2,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
    quantity: "",
    quantityType: "",
    container: false,
    capacity: null,
  },
  {
    itemName: "Helmet",
    cost: 10,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
    quantity: "",
    quantityType: "",
    container: false,
    capacity: null,
  },
  {
    itemName: "Holy Symbol, wooden",
    cost: 2,
    usedBy: ["Cleric"],
    repeatable: false,
    quantity: "",
    quantityType: "",
    container: false,
    capacity: null,
  },
  {
    itemName: "Holy Symbol, silver",
    cost: 25,
    usedBy: ["Cleric"],
    repeatable: false,
    quantity: "",
    quantityType: "",
    container: false,
    capacity: null,
  },
  {
    itemName: "Holy Water",
    cost: 25,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: true,
    quantity: 1,
    quantityType: "small vial",
    container: false,
    capacity: null,
  },
  {
    itemName: "Lantern",
    cost: 10,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
    quantity: "",
    quantityType: "",
    container: false,
    capacity: null,
  },
  {
    itemName: "Mirror (small), steel",
    cost: 5,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
    quantity: "",
    quantityType: "",
    container: false,
    capacity: null,
  },
  {
    itemName: "Oil (lamp)",
    cost: 2,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: true,
    quantity: 1,
    quantityType: "pint",
    container: false,
    capacity: null,
  },
  {
    itemName: "Pole - 10 ft.",
    cost: 1,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
    quantity: "",
    quantityType: "",
    container: false,
    capacity: null,
  },
  {
    itemName: "Rations, trail",
    cost: 1,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: true,
    quantity: 1,
    quantityType: "day(s)",
    container: false,
    capacity: null,
  },
  {
    itemName: "Rations, dried",
    cost: 3,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: true,
    quantity: 1,
    quantityType: "day(s)",
    container: false,
    capacity: null,
  },
  {
    itemName: "Rope, hemp",
    cost: 1,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: true,
    quantity: 50,
    quantityType: "ft.",
    container: false,
    capacity: null,
  },
  {
    itemName: "Rope, silk",
    cost: 5,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: true,
    quantity: 50,
    quantityType: "ft.",
    container: false,
    capacity: null,
  },
  {
    itemName: "Sack (15 lb.)",
    cost: 1,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: true,
    quantity: "",
    quantityType: "",
    container: true,
    capacity: 15,
  },
  {
    itemName: "Sack (30 lb.)",
    cost: 2,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: true,
    quantity: "",
    quantityType: "",
    container: true,
    capacity: 30,
  },
  {
    itemName: "Shovel",
    cost: 5,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
    quantity: "",
    quantityType: "",
    container: false,
    capacity: null,
  },
  {
    itemName: "Spellbook",
    cost: 100,
    usedBy: ["Magic-User", "Elf"],
    repeatable: false,
    quantity: "",
    quantityType: "",
    container: false,
    capacity: null,
  },
  {
    itemName: "Spikes, iron",
    cost: 1,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: true,
    quantity: 12,
    quantityType: "",
    container: false,
    capacity: null,
  },
  {
    itemName: "Stakes, wooden",
    cost: 1,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: true,
    quantity: 12,
    quantityType: "",
    container: false,
    capacity: null,
  },
  {
    itemName: "Tent",
    cost: 20,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
    quantity: "",
    quantityType: "",
    container: false,
    capacity: null,
  },
  {
    itemName: "Thieves' Tools",
    cost: 25,
    usedBy: ["Thief"],
    repeatable: false,
    quantity: "",
    quantityType: "",
    container: false,
    capacity: null,
  },
  {
    itemName: "Torches",
    cost: 1,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: true,
    quantity: 6,
    quantityType: "",
    container: false,
    capacity: null,
  },
  {
    itemName: "Waterskin",
    cost: 1,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
    quantity: "",
    quantityType: "",
    container: false,
    capacity: null,
  },
  {
    itemName: "Wolfsbane, bunch",
    cost: 10,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
    quantity: "",
    quantityType: "",
    container: false,
    capacity: null,
  },
];

export const ALIGNMENTS = ["Lawful", "Neutral", "Chaotic"];

export const ARMORS = [
  {
    armorName: "Unarmored",
    AC: 0,
    weight: 0,
    cost: 0,
    usedBy: ["Cleric", "Magic-User", "Thief", "Elf"],
    repeatable: false,
  },
  {
    armorName: "Chain Mail",
    AC: 4,
    weight: 50,
    cost: 30,
    usedBy: ["Cleric", "Fighter", "Elf"],
    repeatable: false,
  },
  {
    armorName: "Leather Armor",
    AC: 2,
    weight: 25,
    cost: 15,
    usedBy: ["Cleric", "Fighter", "Thief", "Elf"],
    repeatable: false,
  },
  {
    armorName: "Plate Mail",
    AC: 6,
    weight: 75,
    cost: 50,
    usedBy: ["Cleric", "Fighter"],
    repeatable: false,
  },
];

export const CHARACTER_CLASSES = [
  {
    characterClassName: "Cleric",
    xpToLevel2: 1500,
    HDatLevel1: diceRoller(1, 6),
    toHitAtLevel1: 0,
    savingThrowAtLevel1: 15,
    savingThrowBonus: "+2 vs. death/poison<br />",
    spellcasterType: "divine",
    primeAttribute: "WIS",
    domininonKind: "Temple",
    dominionLevel: 10,
    classSpecialAbilities: [`Turn the Undead`],
  },
  {
    characterClassName: "Fighter",
    xpToLevel2: 2000,
    HDatLevel1: diceRoller(1, 6) + 1,
    toHitAtLevel1: 0,
    savingThrowAtLevel1: 14,
    savingThrowBonus: "+2 vs. poison/paralysis<br />",
    spellcasterType: null,
    spellsAtLevel1: null,
    primeAttribute: "STR",
    domininonKind: "Stronghold",
    dominionLevel: 9,
    classSpecialAbilities: [`Combat Fury (+1 attack/level vs. >=1 HD foes)`],
  },
  {
    characterClassName: "Elf",
    xpToLevel2: 5000,
    HDatLevel1: diceRoller(1, 6) + 1,
    toHitAtLevel1: 0,
    savingThrowAtLevel1: 14,
    savingThrowBonus: "+2 vs. poison/paralysis<br />",
    spellcasterType: null, // TODO: change when implementing more character levels
    spellsAtLevel1: null,
    primeAttribute:
      ELF_PRIME_ATTRIBUTES[
        Math.floor(Math.random() * ELF_PRIME_ATTRIBUTES.length)
      ],
    classSpecialAbilities: [
      `+1 to-hit vs. goblins, orcs, intelligent undead, lycantropes`,
      `Immune to undead paralysis`,
      `Half damage from giants and ogres`,
      `4-in-6 chances of actively spotting hidden or concealed doors (2-in-6 if passing by)`,
    ],
  },
  {
    characterClassName: "Magic-User",
    xpToLevel2: 2500,
    HDatLevel1: diceRoller(1, 6),
    toHitAtLevel1: 0,
    savingThrowAtLevel1: 15,
    savingThrowBonus: "+2 vs. spells<br />",
    spellcasterType: "magic",
    primeAttribute: "INT",
    domininonKind: "Wizard Tower",
    dominionLevel: 9,
    classSpecialAbilities: [
      `Known Spells: ${
        MAGIC_USER_SPELLS_LEVEL_1[
          Math.floor(Math.random() * MAGIC_USER_SPELLS_LEVEL_1.length)
        ]
      }`,
    ],
  },
  {
    characterClassName: "Thief",
    xpToLevel2: 1250,
    HDatLevel1: diceRoller(1, 6),
    toHitAtLevel1: 0,
    savingThrowAtLevel1: 14,
    savingThrowBonus: "+2 vs. Traps<br />",
    spellcasterType: null,
    primeAttribute: "DEX",
    domininonKind: "Guild",
    dominionLevel: 9,
    classSpecialAbilities: [
      `Back Stab (+2 to Hit and x2 damage on hit)`,
      `Thievery 2-in-6`,
    ],
  },
];

export const CHARACTER_RACES = [
  {
    raceID: "elf",
    raceName: "",
    maxLevel: 8,
    classedRace: false,
    standardMovementRate: 12,
    raceSavingThrowBonus: "<br />",
    raceSpecialAbilities: [],
    raceMeleeBonus: 0,
    raceMissileBonus: 0,
  },
  {
    raceID: "human",
    raceName: "Human",
    maxLevel: 10,
    classedRace: true,
    standardMovementRate: 12,
    raceSavingThrowBonus: "<br />",
    raceSpecialAbilities: [],
    raceMeleeBonus: 0,
    raceMissileBonus: 0,
  },
  {
    raceID: "dwarf",
    raceName: "Dwarf",
    standardMovementRate: 9,
    maxLevel: 6,
    classedRace: true,
    raceSavingThrowBonus: "+4 vs. Magic",
    raceSpecialAbilities: [
      `Half damage from giants and ogres`,
      `4-in-6 chances of actively spotting traps, slanting passages or construction (2-in-6 if passing by)`,
      `Can speak with goblins, ogres, orcs, kobolds`,
    ],
    raceMeleeBonus: 0,
    raceMissileBonus: 0,
  },
  {
    raceID: "halfling",
    raceName: "Halfling",
    maxLevel: null,
    standardMovementRate: 9,
    classedRace: true,
    raceSavingThrowBonus: "+4 vs. Magic",
    raceSpecialAbilities: [
      `Half damage from giants and ogres`,
      `+2 to-hit using missile weapons`,
      `5-in-6 chance of going undetected when outside of combat`,
    ],
    raceMeleeBonus: 0,
    raceMissileBonus: 2,
  },
];

export const SHIELDS = {
  armorName: "Shield",
  AC: 1,
  weight: 10,
  cost: 10,
  usedBy: ["Cleric", "Fighter", "Elf"],
  repeatable: false,
};

export const WEAPONS = [
  {
    weaponName: "Axe, battle",
    damage: "1d6+1",
    weight: 15,
    cost: 7,
    handling: ["2H"],
    meleeOrMissile: ["melee"],
    missileRange: "",
    missileROF: "",
    ammunitions: false,
    usedBy: ["Fighter", "Thief", "Elf"],
    repeatable: false,
  },
  {
    weaponName: "Axe, hand",
    damage: "1d6",
    weight: 5,
    cost: 3,
    handling: ["1H"],
    meleeOrMissile: ["melee", "missile"],
    missileROF: "ROF: 1/round, ",
    missileRange: "Range: 10 ft., ",
    ammunitions: false,
    usedBy: ["Fighter", "Thief", "Elf"],
    repeatable: true,
  },
  {
    weaponName: "Club",
    damage: "1d6",
    weight: 10,
    cost: 0,
    handling: ["1H"],
    meleeOrMissile: ["melee"],
    missileRange: "",
    missileROF: "",
    usedBy: ["Cleric", "Fighter", "Thief", "Elf"],
    repeatable: false,
  },
  {
    weaponName: "Dagger",
    damage: "1d6-1",
    weight: 2,
    cost: 3,
    handling: ["1H"],
    meleeOrMissile: ["melee"],
    missileROF: "",
    missileRange: "",
    ammunitions: false,
    usedBy: ["Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: true,
  },
  {
    weaponName: "Flail",
    damage: "1d6",
    weight: 15,
    cost: 8,
    handling: ["1H"],
    meleeOrMissile: ["melee"],
    missileRange: "",
    missileROF: "",
    usedBy: ["Cleric", "Fighter", "Thief", "Elf"],
    repeatable: false,
  },
  {
    weaponName: "Mace",
    damage: "1d6",
    weight: 10,
    cost: 5,
    handling: ["1H"],
    meleeOrMissile: ["melee"],
    missileRange: "",
    missileROF: "",
    usedBy: ["Cleric", "Fighter", "Thief", "Elf"],
    repeatable: false,
  },
  {
    weaponName: "Morning Star",
    damage: "1d6",
    weight: 15,
    cost: 8,
    handling: ["1H"],
    meleeOrMissile: ["melee"],
    missileRange: "",
    missileROF: "",
    usedBy: ["Cleric", "Fighter", "Thief", "Elf"],
    repeatable: false,
  },
  {
    weaponName: "Polearm",
    damage: "1d6+1",
    weight: 15,
    cost: 7,
    handling: ["2H"],
    meleeOrMissile: ["melee"],
    missileRange: "",
    missileROF: "",
    usedBy: ["Fighter", "Thief", "Elf"],
    repeatable: false,
  },
  {
    weaponName: "Spear",
    damage: "1d6",
    weight: 10,
    cost: 2,
    handling: ["1H", "2H"],
    meleeOrMissile: ["melee", "missile"],
    missileROF: "ROF: 1/round, ",
    missileRange: "Range: 20ft., ",
    ammunitions: false,
    usedBy: ["Fighter", "Thief", "Elf"],
    repeatable: true,
  },
  {
    weaponName: "Staff",
    damage: "1d6",
    weight: 10,
    cost: 1,
    handling: ["2H"],
    meleeOrMissile: ["melee"],
    missileRange: "",
    missileROF: "",
    usedBy: ["Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
  },
  {
    weaponName: "Sword, long",
    damage: "1d6",
    weight: 10,
    cost: 10,
    handling: ["1H"],
    meleeOrMissile: ["melee"],
    missileRange: "",
    missileROF: "",
    usedBy: ["Fighter", "Thief", "Elf"],
    repeatable: false,
  },
  {
    weaponName: "Sword, short",
    damage: "1d6-1",
    weight: 5,
    cost: 8,
    handling: ["1H"],
    meleeOrMissile: ["melee"],
    missileRange: "",
    missileROF: "",
    usedBy: ["Fighter", "Thief", "Elf"],
    repeatable: false,
  },
  {
    weaponName: "Sword, Two-handed",
    damage: "1d6+1",
    weight: 15,
    cost: 15,
    handling: ["2H"],
    meleeOrMissile: ["melee"],
    missileRange: "",
    missileROF: "",
    usedBy: ["Fighter", "Thief", "Elf"],
    repeatable: false,
  },
  {
    weaponName: "Warhammer",
    damage: "1d6",
    weight: 10,
    cost: 5,
    handling: ["1H"],
    meleeOrMissile: ["melee"],
    missileRange: "",
    missileROF: "",
    usedBy: ["Cleric", "Fighter", "Thief", "Elf"],
    repeatable: false,
  },
  {
    weaponName: "Bow, long",
    damage: "1d6",
    weight: 5,
    cost: 40,
    handling: ["2H"],
    meleeOrMissile: ["missile"],
    ammunitions: true,
    missileROF: "ROF: 2/round, ",
    missileRange: "Range: 70ft., ",
    usedBy: ["Fighter", "Thief", "Elf"],
    repeatable: false,
  },
  {
    weaponName: "Bow, short",
    damage: "1d6-1",
    weight: 5,
    cost: 25,
    handling: ["2H"],
    meleeOrMissile: ["missile"],
    ammunitions: true,
    missileROF: "ROF: 2/round, ",
    missileRange: "Range: 50ft., ",
    usedBy: ["Fighter", "Thief", "Elf"],
    repeatable: false,
  },
  {
    weaponName: "Crossbow, heavy",
    damage: "1d6+1",
    weight: 5,
    cost: 25,
    handling: ["2H"],
    meleeOrMissile: ["missile"],
    ammunitions: true,
    missileROF: "ROF: 0.5/round, ",
    missileRange: "Range: 80ft., ",
    usedBy: ["Fighter", "Thief", "Elf"],
    repeatable: false,
  },
  {
    weaponName: "Crossbow, light",
    damage: "1d6-1",
    weight: 5,
    cost: 15,
    handling: ["2H"],
    meleeOrMissile: ["missile"],
    ammunitions: true,
    missileROF: "ROF: 1/round, ",
    missileRange: "Range: 60ft., ",
    usedBy: ["Fighter", "Thief", "Elf"],
    repeatable: false,
  },
  {
    weaponName: "Sling",
    damage: "1d6",
    weight: 1,
    cost: 2,
    handling: ["1H"],
    meleeOrMissile: ["missile"],
    ammunitions: true,
    missileROF: "ROF: 1/round, ",
    missileRange: "Range: 30ft., ",
    usedBy: ["Cleric", "Fighter", "Thief", "Elf"],
    repeatable: false,
  },
];
export const AMMUNITIONS = [
  {
    ammunitionName: "Quiver of Arrows",
    quantity: 20,
    weight: 2,
    cost: 10,
    usedBy: ["Bow, long", "Bow, short"],
  },
  {
    ammunitionName: "Silver Arrow",
    quantity: 1,
    weight: 1,
    cost: 5,
    usedBy: ["Bow, long", "Bow, short"],
  },
  {
    ammunitionName: "Case of Bolts",
    quantity: 30,
    weight: 6,
    cost: 10,
    usedBy: ["Crossbow, light", "Crossbow, heavy"],
  },
  {
    ammunitionName: "Pouch of Stones",
    quantity: 20,
    weight: 2,
    cost: 2,
    usedBy: ["Sling"],
  },
];
