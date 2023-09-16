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

export function determineCharacterRace(generatedCharacter, characterRaces) {
  let availableCharacterRaces = characterRaces.map((x) => x);
  if (generatedCharacter.characterClass.characterClassName == "Elf") {
    generatedCharacter.characterRace = availableCharacterRaces.find(
      (x) => x.raceID == "elf"
    );
    return generatedCharacter;
  }
  generatedCharacter.characterRace = availableCharacterRaces.find(
    (x) => x.raceID == "human"
  );
  let classedRaces = availableCharacterRaces.filter(
    (x) => x.classedRace == true
  );
  if (
    generatedCharacter.characterClass.characterClassName == "Fighter" ||
    generatedCharacter.characterClass.characterClassName == "Thief"
  ) {
    generatedCharacter.characterRace =
      classedRaces[Math.floor(Math.random() * classedRaces.length)];
  }
  if (
    generatedCharacter.characterRace.raceID == "halfling" &&
    generatedCharacter.characterClass.characterClassName == "Fighter"
  ) {
    generatedCharacter.characterRace.maxLevel = 4;
  } else {
    generatedCharacter.characterRace.maxLevel = 6;
  } //FABIO: is there a way to avoid using this if statement with "this" in the constant object?
  if (generatedCharacter.characterRace.raceID == "human") {
    generatedCharacter.characterRace.raceSpecialAbilities.push(
      `Can establish ${generatedCharacter.characterClass.domininonKind} at Level ${generatedCharacter.characterClass.dominionLevel}`
    );
  }
  return generatedCharacter;
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

export function determineMovementRate(standardMovementRate, gearWeight) {
  let movementRate = standardMovementRate * 10;
  if (gearWeight >= 76 && gearWeight <= 100) {
    movementRate -= 30;
  } else if (gearWeight >= 101 && gearWeight <= 150) {
    movementRate -= 30;
  } else if (gearWeight >= 151) {
    movementRate = 30;
  }
  return movementRate;
}

export function determineAlignment(alignments) {
  let characterAlignment =
    alignments[Math.floor(Math.random() * alignments.length)];
  return characterAlignment;
}
