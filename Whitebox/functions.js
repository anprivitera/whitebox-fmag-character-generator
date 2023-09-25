import { diceRoller } from "../System Neutral/functions.js";

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

export function determineCharacterRace(
  characterClassName,
  domininonKind,
  dominionLevel,
  characterRaces
) {
  let availableCharacterRaces = characterRaces.map((x) => x),
    characterRace = availableCharacterRaces.find((x) => x.raceID == "human"),
    classedRaces = availableCharacterRaces.filter((x) => x.classedRace == true);
  if (characterClassName == "Elf") {
    characterRace = availableCharacterRaces.find((x) => x.raceID == "elf");
    return characterRace;
  }
  if (characterClassName == "Fighter" || characterClassName == "Thief") {
    characterRace =
      classedRaces[Math.floor(Math.random() * classedRaces.length)];
  }
  if (characterRace.raceID == "halfling" && characterClassName == "Fighter") {
    characterRace.maxLevel = 4;
  } else if (
    characterRace.raceID == "halfling" &&
    characterClassName == "Thief"
  ) {
    characterRace.maxLevel = 6;
  }
  if (characterRace.raceID == "human") {
    characterRace.raceSpecialAbilities = [
      `Can establish ${domininonKind} at Level ${dominionLevel}`,
    ];
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

//TODO: calculate HP of higher levels

export function determineHP(
  [numberOfDice, diceFace, bonus],
  consitutionModifier
) {
  const HD = [numberOfDice, diceFace, bonus];
  const rollResult = diceRoller(HD);
  let HP = rollResult + consitutionModifier;
  if (HP <= 0) {
    HP = 1;
  }
  return HP;
}
