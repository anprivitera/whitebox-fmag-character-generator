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

function selectItems(
  itemsToEvaluate,
  numberOfItems,
  currentMoney,
  characterClass
) {
  let shoppingArray = itemsToEvaluate.map((x) => x),
    filteredByCharacter = null,
    filteredByPrice = null,
    selectedItems = [];
  shuffleArray(shoppingArray);
  console.log(shoppingArray[2].usedBy);
  filteredByCharacter = shoppingArray.filter(
    (i) => i.usedBy.indexOf(characterClass) > -1
  );
  filteredByPrice = filteredByCharacter.filter((x) => x.cost <= currentMoney);

  for (let i = 0; i < numberOfItems; i++) {
    if (
      filteredByPrice != 0 &&
      filteredByPrice.some((x) => x.cost < currentMoney) &&
      currentMoney > 0
    ) {
      if (filteredByPrice[0].repeatable) {
        if (selectedItems.indexOf(filteredByPrice[0]) <= -1) {
          selectedItems.unshift(filteredByPrice[0]);
        } else {
          let elementToUpdate = selectedItems.find(
            (x) => x == filteredByPrice[0]
          );
          elementToUpdate.quantity += filteredByPrice[0].quantity;
        }
      } else {
        selectedItems.unshift(filteredByPrice.shift());
      }
      shuffleArray(filteredByPrice);
      currentMoney = currentMoney - selectedItems[0].cost;
      filteredByPrice = filteredByPrice.filter((x) => x.cost <= currentMoney);
    } else {
      return [selectedItems, currentMoney];
    }
  }
  return [selectedItems, currentMoney];
}

export {
  diceRoller,
  shuffleArray,
  determineCharacterClass,
  receivePortrait,
  rollForAttributes,
  selectItems,
};