import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const removedCharacters = input.replace(/[^\d|\n]+/g, "");
  const lines = removedCharacters.split("\n");
  return lines
    .map((line) => {
      const firstDigit = line.charAt(0);
      const lastDigit = line.charAt(line.length - 1);
      const combined: string = firstDigit + lastDigit;
      return +combined;
    })
    .reduce((a, b) => a + b);
};

const part2 = (rawInput: string) => {
  let input = parseInput(rawInput);

  // Replace the text with actual numbers and perform part 1 again with a different input.
  // Since numbers can overlap (eightwo), we do a bit of a hack :)
  const replaced = input
    .replace(/one/g, "o1e")
    .replace(/two/g, "t2o")
    .replace(/three/g, "t3e")
    .replace(/four/g, "f4r")
    .replace(/five/g, "f5e")
    .replace(/six/g, "s6x")
    .replace(/seven/g, "s7n")
    .replace(/eight/g, "e8t")
    .replace(/nine/g, "n9n");

  return part1(replaced);
};

run({
  part1: {
    tests: [
      {
        input: `
        1abc2
        pqr3stu8vwx
        a1b2c3d4e5f
        treb7uchet
        `,
        expected: 142,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        two1nine
        eightwothree
        abcone2threexyz
        xtwone3four
        4nineeightseven2
        zoneight234
        7pqrstsixteen
        `,
        expected: 281,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
