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

export { diceRoller, shuffleArray, determineCharacterClass, receivePortrait };
