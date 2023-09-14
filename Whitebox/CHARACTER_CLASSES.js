import { diceRoller } from "../systemNeutralFunctions.js";
import * as MAGIC_USER_SPELLS_LEVEL_1 from "./SPELLS.js";

const ELF_PRIME_ATTRIBUTES = ["STR", "INT"];

export default [
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
    specialAbilities: [`Turn the Undead`],
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
    specialAbilities: [`Combat Fury (+1 attack/level vs. >=1 HD foes)`],
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
    specialAbilities: [
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
    specialAbilities: [
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
    specialAbilities: [
      `Back Stab (+2 to Hit and x2 damage on hit)`,
      `Thievery 2-in-6`,
    ],
  },
];
