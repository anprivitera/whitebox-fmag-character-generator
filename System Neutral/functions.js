function removeLoadScreen() {
  const loaderContainer = document.querySelector(".loader-container");
  loaderContainer.style.display = "none";
}

function addLoadScreen() {
  const loaderContainer = document.querySelector(".loader-container");
  loaderContainer.style.display = "initial";
}

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

function receivePortrait(race, gender) {
  document.getElementById(
    "portrait"
  ).innerHTML = `<img src ="" width = 125></img>`;
  let originalUrl = null;
  let redirectedUrl = null;
  let character = null;
  if (race == "Human" || race == "Halfling") {
    character = gender;
  } else if (race == "Dwarf") {
    character = "dwarf";
  } else {
    character = "elf";
  }
  //TODO: Find a way to generate a new character portait
  originalUrl = `https://campaignwiki.org/face/redirect/alex/${character}`;
  redirectedUrl = new URL(originalUrl);
  document.getElementById(
    "portrait"
  ).innerHTML = `<img src = "${redirectedUrl}" width = 125></img>`;
}

function selectItems(
  itemsToEvaluate,
  numberOfItems,
  currentMoney,
  characterClassName
) {
  let shoppingArray = itemsToEvaluate.map((x) => x),
    filteredByCharacter = null,
    filteredByPrice = null,
    selectedItems = [];
  shuffleArray(shoppingArray);
  filteredByCharacter = shoppingArray.filter(
    (i) => i.usedBy.indexOf(characterClassName) > -1
  );
  filteredByPrice = filteredByCharacter.filter((x) => x.cost <= currentMoney);
  for (let i = 0; i < numberOfItems; i++) {
    if (
      filteredByPrice != 0 &&
      filteredByPrice.some((x) => x.cost < currentMoney) &&
      currentMoney > 0
    ) {
      if (filteredByPrice[0].repeatable) {
        selectedItems.unshift(filteredByPrice[0]);
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

export function arrayRandomItem(array) {
  let item = array[Math.floor(Math.random() * array.length)];
  return item;
}

export {
  diceRoller,
  determineCharacterClass,
  receivePortrait,
  selectItems,
  removeLoadScreen,
  addLoadScreen,
};
