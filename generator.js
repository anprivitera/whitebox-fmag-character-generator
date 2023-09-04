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

// Define dice roller (3d6)
function diceRoller (numberOfDice) {
    let rollResult = null;
    for (let i = 0; i < numberOfDice; i++) {
        rollResult += Math.floor(Math.random() * 6 + 1);
    }
    return rollResult
}

// Give an appropriate modifier for each score (3-6 = -1, 7-14 =0, 15-18 = +1)
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

let stringToDisplay = "";
// Define Strengths, Dexterity, Constitution, Intelligence, Wisdom, Charisma. For each of them, roll 3d6 separately
const ATTRIBUTES = [ 
    { attributeName:"STR", attributeValue:ROLL_FOR_STRENGTH, modifierValue: }, 
    { attributeName:"DEX", attributeValue:ROLL_FOR_DEXTERITY }, 
    { attributeName:"CON", attributeValue:ROLL_FOR_CONSTITUTION }, 
    { attributeName:"INT", attributeValue:ROLL_FOR_INTELLIGENCE },
    { attributeName:"WIS", attributeValue:ROLL_FOR_WISDOM },
    { attributeName:"CHA", attributeValue:ROLL_FOR_CHARISMA }
];

for (let n = 0; n < ATTRIBUTES.length; n++) {
    stringToDisplay += `${ATTRIBUTES[n].attributeName} ${ATTRIBUTES[n].attributeValue}, `
}

document.getElementById("generator").innerHTML = stringToDisplay;
// Give 5% xp bonus if WIS is 15+, and 5% if CHA is 15+
// HD Dice is 1d6
// Choose an alignment randmoly between Law, Neutrality and Chaos
// based on the highest score, choose the most appropriate class
// include class characteristics
// roll for initial money
// pick elements from list of items randomly until money runs out (giving priority to 1 allowed weapon, 1 allowed armor and then assigning the rest randomly)
// calculate movement speed