export function determineModifier(attributeScore) {
  if (attributeScore <= 6) {
    return -1;
  } else if (attributeScore >= 7 && attributeScore <= 14) {
    return 0;
  } else {
    return +1;
  }
}

export function determineXPBonus(
  rollForWisdom,
  rollForCharisma,
  primeAttribute
) {
  let xpBonus = 0;
  if (rollForWisdom >= 15) {
    xpBonus += 5;
  }
  if (rollForCharisma >= 15) {
    xpBonus += 5;
  }
  if (primeAttribute >= 15) {
    xpBonus += 5;
  }
  if (xpBonus > 15) {
    xpBonus = 15;
  }
  return xpBonus;
}

export function determineCharacterRace(generatedCharacterClass) {
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
  const CLASSED_RACES = [HUMAN, DWARF, HALFLING];
  if (generatedCharacterClass.characterClassName == "Elf") {
    let characterRace = ELF;
    return characterRace;
  }
  let characterRace = HUMAN;
  if (
    generatedCharacterClass.characterClassName == "Fighter" ||
    generatedCharacterClass.characterClassName == "Thief"
  ) {
    characterRace =
      CLASSED_RACES[Math.floor(Math.random() * CLASSED_RACES.length)];
  }
  return characterRace;
}

export function determineHirelings(charisma) {
  let maxHirelings = null;
  let hirelingsLoyalty = null;
  if (charisma <= 4) {
    maxHirelings = 1;
    hirelingsLoyalty = -2;
  } else if (charisma >= 5 && charisma <= 6) {
    maxHirelings = 2;
    hirelingsLoyalty = -2;
  } else if (charisma >= 7 && charisma <= 8) {
    maxHirelings = 3;
    hirelingsLoyalty = -1;
  } else if (charisma >= 9 && charisma <= 12) {
    maxHirelings = 4;
    hirelingsLoyalty = 0;
  } else if (charisma >= 13 && charisma <= 15) {
    maxHirelings = 5;
    hirelingsLoyalty = 1;
  } else if (charisma >= 16 && charisma <= 17) {
    maxHirelings = 6;
    hirelingsLoyalty = 2;
  } else {
    maxHirelings = 7;
    hirelingsLoyalty = 2;
  }
  return [maxHirelings, hirelingsLoyalty];
}
