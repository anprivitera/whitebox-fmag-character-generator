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
// Define Strengths, Dexterity, Constitution, Intelligence, Wisdom, Charisma. For each of them, roll 3d6 separately
// Give an appropriate modifier for each score (3-6 = -1, 7-14 =0, 15-18 = +1)
// Give 5% xp bonus if WIS is 15+, and 5% if CHA is 15+
// HD Dice is 1d6
// Choose an alignment randmoly between Law, Neutrality and Chaos
// based on the highest score, choose the most appropriate class
// include class characteristics
// roll for initial money
// pick elements from list of items randomly until money runs out (giving priority to 1 allowed weapon, 1 allowed armor and then assigning the rest randomly)
// calculate movement speed