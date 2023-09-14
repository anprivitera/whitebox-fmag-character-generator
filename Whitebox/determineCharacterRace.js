export default function determineCharacterRace(generatedCharacterClass) {
  const ELF = {
    raceName: "",
    standardMovementRate: 12,
    raceSavingThrowBonus: "",
    raceSpecialAbilities: [`Can reach maximum level 8`],
  };
  const HUMAN = {
    raceName: "Human",
    standardMovementRate: 12,
    raceSavingThrowBonus: "",
    raceSpecialAbilities: [
      `Can establish ${generatedCharacterClass.domininonKind} at Level ${generatedCharacterClass.dominionLevel}`,
    ],
  };
  const DWARF = {
    raceName: "Dwarf",
    standardMovementRate: 9,
    raceSavingThrowBonus: "<br />+4 vs. Magic",
    raceSpecialAbilities: [
      `Can reach maximum level 6`,
      `Half damage from giants and ogres`,
      `4-in-6 chances of actively spotting traps, slanting passages or construction (2-in-6 if passing by)`,
      `Can speak with goblins, ogres, orcs, kobolds`,
    ],
  };
  const HALFLING = {
    raceName: "Halfling",
    standardMovementRate: 9,
    raceSavingThrowBonus: "<br />+4 vs. Magic",
    raceSpecialAbilities: [
      `Can reach maxium level ${
        generatedCharacterClass.characterClassName == "Fighter" ? "4" : "6"
      }`,
      `Half damage from giants and ogres`,
      `+2 to-hit using missile weapons`,
      `5-in-6 chance of going undetected when outside of combat`,
    ],
  };
  const CLASSED_RACES = [HUMAN, DWARF, HALFLING];
  if (generatedCharacterClass.characterClassName == "Elf") {
    let characterRace = ELF;
    return characterRace;
  }
  let characterRace = HUMAN;
  if (
    generatedCharacterClass.characterClassName == "Fighter" ||
    generatedCharacterClass.characterClassName == "Thief"
  ) {
    characterRace =
      CLASSED_RACES[Math.floor(Math.random() * CLASSED_RACES.length)];
  }
  return characterRace;
}
