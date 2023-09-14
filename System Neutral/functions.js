function diceRoller(numberOfDice, diceFace) {
  let rollResult = null;
  for (let i = 0; i < numberOfDice; i++) {
    rollResult += Math.floor(Math.random() * diceFace + 1);
  }
  return rollResult;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function determineCharacterClass(attributes, characterClasses) {
  let generatedCharacterClass = null;
  let fromHighToLow = attributes.map((x) => x);
  fromHighToLow.sort((a, b) => b.attributeValue - a.attributeValue);
  while (generatedCharacterClass == null) {
    for (let x = 0; x < fromHighToLow.length; x++) {
      for (let i = 0; i < characterClasses.length; i++) {
        if (
          fromHighToLow[x].attributeName == characterClasses[i].primeAttribute
        ) {
          generatedCharacterClass = characterClasses[i];
          return generatedCharacterClass;
        }
      }
    }
  }
}

function receivePortrait(race) {
  let character = null;
  if (race == "Human" || race == "Halfling") {
    const gender = ["man", "woman"];
    character = gender[Math.floor(Math.random() * gender.length)];
  } else if (race == "Dwarf") {
    character = "dwarf";
  } else {
    character = "elf";
  }
  let characterPortrait = `https://campaignwiki.org/face/redirect/alex/${character}`;
  return characterPortrait;
}

function rollForAttributes(numberOfDice) {
  let generatedAttributes = null;
  const rollForStrength = diceRoller(numberOfDice, 6),
    rollForDexterity = diceRoller(numberOfDice, 6),
    rollForConstitution = diceRoller(numberOfDice, 6),
    rollForIntelligence = diceRoller(numberOfDice, 6),
    rollForWisdom = diceRoller(numberOfDice, 6),
    rollForCharisma = diceRoller(numberOfDice, 6);

  return [
    {
      attributeName: "STR",
      attributeValue: rollForStrength,
      modifierValue: null,
    },
    {
      attributeName: "DEX",
      attributeValue: rollForDexterity,
      modifierValue: null,
    },
    {
      attributeName: "CON",
      attributeValue: rollForConstitution,
      modifierValue: null,
    },
    {
      attributeName: "INT",
      attributeValue: rollForIntelligence,
      modifierValue: null,
    },
    {
      attributeName: "WIS",
      attributeValue: rollForWisdom,
      modifierValue: null,
    },
    {
      attributeName: "CHA",
      attributeValue: rollForCharisma,
      modifierValue: null,
    },
  ];
}

export {
  diceRoller,
  shuffleArray,
  determineCharacterClass,
  receivePortrait,
  rollForAttributes,
};
