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
    itemName: "Backpack (30 lb. capacity)",
    cost: 5,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
    quantity: "",
    quantityType: "",
  },
  {
    itemName: "Bedroll",
    cost: 2,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
    quantity: "",
    quantityType: "",
  },
  {
    itemName: "Belladonna, bunch",
    cost: 10,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
    quantity: "",
    quantityType: "",
  },
  {
    itemName: "Bottle (wine), glass",
    cost: 1,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
    quantity: "",
    quantityType: "",
  },
  {
    itemName: "Case (map or scroll)",
    cost: 3,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
    quantity: "",
    quantityType: "",
  },
  {
    itemName: "Crowbar",
    cost: 5,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
    quantity: "",
    quantityType: "",
  },
  {
    itemName: "Flint and Stell",
    cost: 5,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
    quantity: "",
    quantityType: "",
  },
  {
    itemName: "Garlic",
    cost: 10,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: true,
    quantity: 1,
    quantityType: "lb.",
  },
  {
    itemName: "Grappling Hook",
    cost: 5,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
    quantity: "",
    quantityType: "",
  },
  {
    itemName: "Hammer",
    cost: 2,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
    quantity: "",
    quantityType: "",
  },
  {
    itemName: "Helmet",
    cost: 10,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
    quantity: "",
    quantityType: "",
  },
  {
    itemName: "Holy Symbol, wooden",
    cost: 2,
    usedBy: ["Cleric"],
    repeatable: false,
    quantity: "",
    quantityType: "",
  },
  {
    itemName: "Holy Symbol, silver",
    cost: 25,
    usedBy: ["Cleric"],
    repeatable: false,
    quantity: "",
    quantityType: "",
  },
  {
    itemName: "Holy Water",
    cost: 25,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: true,
    quantity: 1,
    quantityType: "small vial",
  },
  {
    itemName: "Lantern",
    cost: 10,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
    quantity: "",
    quantityType: "",
  },
  {
    itemName: "Mirror (small), steel",
    cost: 5,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
    quantity: "",
    quantityType: "",
  },
  {
    itemName: "Oil (lamp)",
    cost: 2,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: true,
    quantity: 1,
    quantityType: "pint",
  },
  {
    itemName: "Pole - 10 ft.",
    cost: 1,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
    quantity: "",
    quantityType: "",
  },
  {
    itemName: "Rations, trail",
    cost: 1,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: true,
    quantity: 1,
    quantityType: "day(s)",
  },
  {
    itemName: "Rations, dried",
    cost: 3,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: true,
    quantity: 1,
    quantityType: "day(s)",
  },
  {
    itemName: "Rope, hemp",
    cost: 1,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: true,
    quantity: 50,
    quantityType: "ft.",
  },
  {
    itemName: "Rope, silk",
    cost: 5,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: true,
    quantity: 50,
    quantityType: "ft.",
  },
  {
    itemName: "Sack (15 lb. capacity)",
    cost: 1,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
    quantity: "",
    quantityType: "",
  },
  {
    itemName: "Sack (30 lb. capacity)",
    cost: 2,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
    quantity: "",
    quantityType: "",
  },
  {
    itemName: "Shovel",
    cost: 5,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
    quantity: "",
    quantityType: "",
  },
  {
    itemName: "Spellbook",
    cost: 100,
    usedBy: ["Magic-User", "Elf"],
    repeatable: false,
    quantity: "",
    quantityType: "",
  },
  {
    itemName: "Spikes, iron",
    cost: 1,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: true,
    quantity: 12,
    quantityType: "",
  },
  {
    itemName: "Stakes, wooden",
    cost: 1,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: true,
    quantity: 12,
    quantityType: "",
  },
  {
    itemName: "Tent",
    cost: 20,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
    quantity: "",
    quantityType: "",
  },
  {
    itemName: "Thieves' Tools",
    cost: 25,
    usedBy: ["Thief"],
    repeatable: false,
    quantity: "",
    quantityType: "",
  },
  {
    itemName: "Torches",
    cost: 1,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: true,
    quantity: 6,
    quantityType: "",
  },
  {
    itemName: "Waterskin",
    cost: 1,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
    quantity: "",
    quantityType: "",
  },
  {
    itemName: "Wolfsbane, bunch",
    cost: 10,
    usedBy: ["Cleric", "Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
    quantity: "",
    quantityType: "",
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
    armorName: "Leather",
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
    savingThrowBonus: "+2 vs. death/poison",
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
    savingThrowBonus: "+2 vs. poison/paralysis",
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
    savingThrowBonus: "+2 vs. poison/paralysis",
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
    savingThrowBonus: "+2 vs. spells",
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
    savingThrowBonus: "+2 vs. Traps",
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
    handling: "two-handed",
    melee: true,
    missile: false,
    missileROF: null,
    usedBy: ["Fighter", "Thief", "Elf"],
    repeatable: false,
  },
  {
    weaponName: "Axe, hand",
    damage: "1d6",
    weight: 5,
    cost: 3,
    handling: "one-handed",
    melee: true,
    missile: true,
    missileROF: 1,
    usedBy: ["Fighter", "Thief", "Elf"],
    repeatable: false,
  },
  {
    weaponName: "Club",
    damage: "1d6",
    weight: 10,
    cost: 0,
    handling: "one-handed",
    melee: true,
    missile: false,
    missileROF: null,
    usedBy: ["Cleric", "Fighter", "Thief", "Elf"],
    repeatable: false,
  },
  {
    weaponName: "Dagger",
    damage: "1d6-1",
    weight: 2,
    cost: 3,
    handling: "one-handed",
    melee: true,
    missile: true,
    missileROF: 1,
    usedBy: ["Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
  },
  {
    weaponName: "Flail",
    damage: "1d6",
    weight: 15,
    cost: 8,
    handling: "one-handed",
    melee: true,
    missile: false,
    missileROF: null,
    usedBy: ["Cleric", "Fighter", "Thief", "Elf"],
    repeatable: false,
  },
  {
    weaponName: "Mace",
    damage: "1d6",
    weight: 10,
    cost: 5,
    handling: "one-handed",
    melee: true,
    missile: false,
    missileROF: null,
    usedBy: ["Cleric", "Fighter", "Thief", "Elf"],
    repeatable: false,
  },
  {
    weaponName: "Morning Star",
    damage: "1d6",
    weight: 15,
    cost: 8,
    handling: "one-handed",
    melee: true,
    missile: false,
    missileROF: null,
    usedBy: ["Cleric", "Fighter", "Thief", "Elf"],
    repeatable: false,
  },
  {
    weaponName: "Polearm",
    damage: "1d6+1",
    weight: 15,
    cost: 7,
    handling: "two-handed",
    melee: true,
    missile: false,
    missileROF: null,
    usedBy: ["Fighter", "Thief", "Elf"],
    repeatable: false,
  },
  {
    weaponName: "Spear",
    damage: "1d6",
    weight: 10,
    cost: 2,
    handling: "one-handed",
    melee: true,
    missile: true,
    missileROF: 1,
    usedBy: ["Fighter", "Thief", "Elf"],
    repeatable: false,
  },
  {
    weaponName: "Staff",
    damage: "1d6",
    weight: 10,
    cost: 1,
    handling: "two-handed",
    melee: true,
    missile: false,
    missileROF: null,
    usedBy: ["Fighter", "Magic-User", "Thief", "Elf"],
    repeatable: false,
  },
  {
    weaponName: "Sword, long",
    damage: "1d6",
    weight: 10,
    cost: 10,
    handling: "one-handed",
    melee: true,
    missile: false,
    missileROF: null,
    usedBy: ["Fighter", "Thief", "Elf"],
    repeatable: false,
  },
  {
    weaponName: "Sword, short",
    damage: "1d6-1",
    weight: 5,
    cost: 8,
    handling: "one-handed",
    melee: true,
    missile: false,
    missileROF: null,
    usedBy: ["Fighter", "Thief", "Elf"],
    repeatable: false,
  },
  {
    weaponName: "Sword, two-handed",
    damage: "1d6+1",
    weight: 15,
    cost: 15,
    handling: "two-handed",
    melee: true,
    missile: false,
    missileROF: null,
    usedBy: ["Fighter", "Thief", "Elf"],
    repeatable: false,
  },
  {
    weaponName: "Warhammer",
    damage: "1d6",
    weight: 10,
    cost: 5,
    handling: "one-handed",
    melee: true,
    missile: false,
    missileROF: null,
    usedBy: ["Cleric", "Fighter", "Thief", "Elf"],
    repeatable: false,
  },
  {
    weaponName: "Bow, long",
    damage: "1d6",
    weight: 5,
    cost: 40,
    handling: "two-handed",
    melee: false,
    missile: true,
    missileROF: 2,
    usedBy: ["Fighter", "Thief", "Elf"],
    repeatable: false,
  },
  {
    weaponName: "Bow, short",
    damage: "1d6-1",
    weight: 5,
    cost: 25,
    handling: "two-handed",
    melee: false,
    missile: true,
    missileROF: 2,
    usedBy: ["Fighter", "Thief", "Elf"],
    repeatable: false,
  },
  {
    weaponName: "Crossbow, heavy",
    damage: "1d6+1",
    weight: 5,
    cost: 25,
    handling: "two-handed",
    melee: false,
    missile: true,
    missileROF: 0.5,
    usedBy: ["Fighter", "Thief", "Elf"],
    repeatable: false,
  },
  {
    weaponName: "Crossbow, light",
    damage: "1d6-1",
    weight: 5,
    cost: 15,
    handling: "two-handed",
    melee: false,
    missile: true,
    missileROF: 1,
    usedBy: ["Fighter", "Thief", "Elf"],
    repeatable: false,
  },
  {
    weaponName: "Sling",
    damage: "1d6",
    weight: 1,
    cost: 2,
    handling: "one-handed",
    melee: false,
    missile: true,
    missileROF: 1,
    usedBy: ["Cleric", "Fighter", "Thief", "Elf"],
    repeatable: false,
  },
];
