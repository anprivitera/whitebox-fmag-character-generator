export function removeLoadScreen() {
  const loaderContainer = document.querySelector(".loader-container");
  loaderContainer.style.display = "none";
}

export function addLoadScreen() {
  const loaderContainer = document.querySelector(".loader-container");
  loaderContainer.style.display = "initial";
}

export function diceRoller([numberOfDice, diceFace, bonus]) {
  let rollResult = null;
  for (let i = 0; i < numberOfDice; i++) {
    rollResult += Math.floor(Math.random() * diceFace + 1);
  }
  rollResult += bonus;
  return rollResult;
}

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function determineCharacterClass(attributes, characterClasses) {
  let generatedCharacterClass = null;
  shuffleArray(characterClasses);
  let fromHighToLow = attributes.map((x) => x);
  fromHighToLow.sort((a, b) => b.attributeValue - a.attributeValue);
  while (generatedCharacterClass == null) {
    for (let x = 0; x < fromHighToLow.length; x++) {
      for (let i = 0; i < characterClasses.length; i++) {
        let attribute = fromHighToLow[x].attributeName;
        let classPrimeAttribute = characterClasses[i].primeAttribute;
        if (classPrimeAttribute.find((x) => x == attribute)) {
          generatedCharacterClass = characterClasses[i];
          return generatedCharacterClass;
        }
      }
    }
  }
}

export function receivePortrait(race, gender) {
  let character = undefined;
  let img = document.getElementById("campaignwiki-image");
  let id = Math.floor(Math.random() * 2 ** 53); //TODO: replace later with uuid module
  if (race == "Human" || race == "Halfling") {
    character = gender;
  } else if (race == "Dwarf") {
    character = "dwarf";
  } else {
    character = "elf";
  }
  //TODO: Find a way to generate a new character portait
  let url = `https://campaignwiki.org/face/redirect/alex/${character}/?${id}`;
  img.src = url;
}

// export async function receivePortrait(race, gender) {
//   let url = new URL(`https://campaignwiki.org/`);
//   let character = undefined;
//   let portraitFrame = document.getElementById("portrait");
//   let headers = new Headers();
//   console.log(url);
//   if (race == "Human" || race == "Halfling") {
//     character = gender;
//   } else if (race == "Dwarf") {
//     character = "dwarf";
//   } else {
//     character = "elf";
//   }
//   //TODO: Find a way to generate a new character portait
//   url.pathname = `face/redirect/alex/${character}`;
//   console.log(url);
//   console.log(headers);
//   let response = await fetch(url, {
//     method: "GET",
//     headers: headers,
//     mode: "no-cors",
//     credentials: "include",
//   });
//   console.log(response.status);
//   let image = response.url;
//   console.log(image);
//   let imgElement = `<img src = "${image}" width = 115></img>`;

//   portraitFrame.innerHTML = imgElement;
// }

// export async function receivePortrait() {
//   // const { url } = await fetch(
//   //   "https://campaignwiki.org/face/redirect/alex/human",
//   //   { cache: "no-store", mode: "no-cors" }
//   // );
//   // return console.log(url);
//   return console.log("https://campaignwiki.org/face/redirect/alex/human");
// }

export function selectItems(
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
