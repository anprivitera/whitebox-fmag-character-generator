"strict mode";
/* USER STORY: I see a short textual description Whitebox character randomly generated and ready to play. 
It includes: 
- Ascending Armor class
- HD
- Attribute scores with modifiers
- Name 
- Class
- Level
- Race
- Alignment
- Initial XP
- XP bonus
- A character portrait
- Saving throw and mods
- Spells / Abilities
- Equipment
- Weapons & Armor
- Coins
- Languages
- To-Hit bonus
- Number of hirelings and loyalty
- Weight carried and movement speed
*/

function diceRoller (numberOfDice) {
    let rollResult = null;
    for (let i = 0; i < numberOfDice; i++) {
        rollResult += Math.floor(Math.random() * 6 + 1);
    }
    return rollResult
}

function determineModifier(attributeScore) {
    if (attributeScore <= 6) {
        return -1;
    } else if (attributeScore >= 7 && attributeScore <= 14) {
        return 0;
    } else {
        return +1;
    }
} 

const ROLL_FOR_STRENGTH = diceRoller(3),
    ROLL_FOR_DEXTERITY = diceRoller(3),
    ROLL_FOR_CONSTITUTION = diceRoller(3),
    ROLL_FOR_INTELLIGENCE = diceRoller(3),
    ROLL_FOR_WISDOM = diceRoller(3),
    ROLL_FOR_CHARISMA = diceRoller(3),
    STRENGTH_MODIFIER =  determineModifier(ROLL_FOR_STRENGTH),
    DEXTERITY_MODIFIER =  determineModifier(ROLL_FOR_DEXTERITY),
    CONSTITUTION_MODIFIER =  determineModifier(ROLL_FOR_CONSTITUTION),
    INTELLIGENCE_MODIFIER = determineModifier(ROLL_FOR_INTELLIGENCE),
    WISDOM_MODIFIER = determineModifier(ROLL_FOR_WISDOM),
    CHARISMA_MODIFIER = determineModifier(ROLL_FOR_CHARISMA);

const ALIGNMENTS = ["Law", "Neutral", "Chaos"];
const CHARACTER_ALIGNMENT = ALIGNMENTS[Math.floor(Math.random() * ALIGNMENTS.length)];

let stringToDisplay = ""; //TODO: based on the highest score, choose the most appropriate class.

const ATTRIBUTES = [ 
    { attributeName:"STR", attributeValue:ROLL_FOR_STRENGTH, modifierValue:STRENGTH_MODIFIER }, 
    { attributeName:"DEX", attributeValue:ROLL_FOR_DEXTERITY, modifierValue:DEXTERITY_MODIFIER }, 
    { attributeName:"CON", attributeValue:ROLL_FOR_CONSTITUTION, modifierValue:CONSTITUTION_MODIFIER }, 
    { attributeName:"INT", attributeValue:ROLL_FOR_INTELLIGENCE, modifierValue:INTELLIGENCE_MODIFIER },
    { attributeName:"WIS", attributeValue:ROLL_FOR_WISDOM, modifierValue:WISDOM_MODIFIER },
    { attributeName:"CHA", attributeValue:ROLL_FOR_CHARISMA, modifierValue:CHARISMA_MODIFIER }
];

for (let n = 0; n < ATTRIBUTES.length; n++) {
    stringToDisplay += `${ATTRIBUTES[n].attributeName} ${ATTRIBUTES[n].attributeValue} (${ATTRIBUTES[n].modifierValue > 0 ? "+" : ""}${ATTRIBUTES[n].modifierValue}), `
}

stringToDisplay += `HP ${diceRoller(1)}, Alignment ${CHARACTER_ALIGNMENT},`
//TODO: Include different HP roller for Fighter



document.getElementById("generator").innerHTML = stringToDisplay;
//TODO: Give 5% xp bonus if WIS is 15+, and 5% if CHA is 15+


//TODO: include class characteristics
//TODO: roll for initial money
//TODO: pick elements from list of items randomly until money runs out (giving priority to 1 allowed weapon, 1 allowed armor and then assigning the rest randomly)
//TODO: calculate movement speed