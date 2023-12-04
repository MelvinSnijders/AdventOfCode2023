import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

/**
 * Get a map of all adjacent characters and their positions around a specific point in the grid.
 * @param lines The input of the day.
 * @param y The Y position to get adjacent characters from.
 * @param x The X position to get adjacent characters from.
 * @returns A map of all adjacent characters.
 */
const getAdjacentCharacters = (lines: string[], y: number, x: number): Map<string, string> => {
  let charMap: Map<string, string> = new Map();

  for (let adjY = -1; adjY <= 1; adjY++) {
    for (let adjX = -1; adjX <= 1; adjX++) {
      if (adjX == 0 && adjY == 0) continue;
      const char = lines[y + adjY]?.[x + adjX];
      if (char) charMap.set(`${y + adjY},${x + adjX}`, char);
    }
  }
  return charMap;
};

/**
 * Check if any of the adjacent characters of a number are a symbol or not.
 * Since numbers can me multiple digits, we need to check multiple times.
 * @param lines The input of the day.
 * @param y The Y position of the number.
 * @param xStart The starting X position of the number.
 * @param length The length of the number to check.
 * @returns Whether any of the adjacent characters are a symbol.
 */

const checkAdjacentForSymbols = (lines: string[], y: number, xStart: number, length: number): boolean => {
  const symbolRegex = /[^.0-9]+/;

  for (let i = xStart; i < xStart + length; i++) {
    const adjacents = getAdjacentCharacters(lines, y, i);
    if ([...adjacents.values()].some((c) => symbolRegex.test(c))) return true;
  }

  return false;
};

/**
 * Day 3 part 1
 */
const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input
    .map((line, index) =>
      [...line.matchAll(/\d+/g)]
        .filter((match) => checkAdjacentForSymbols(input, index, match.index, match[0].length))
        .map((match) => +match[0])
        .reduce((a, b) => a + b, 0),
    )
    .reduce((a, b) => a + b, 0);
};

/**
 * Day 3 part 2
 */
const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let gears: Map<string, number[]> = new Map();

  input.forEach((line, index) => {
    let matches = [...line.matchAll(/\d+/g)];

    matches.forEach((match) => {
      for (let i = match.index; i < match.index + match[0].length; i++) {
        const adjacents = getAdjacentCharacters(input, index, i);
        const adjacentGear = [...adjacents.entries()].find((entry) => entry[1] == "*");
        if (adjacentGear) {
          return gears.set(adjacentGear[0], [...(gears.get(adjacentGear[0]) || []), +match[0]]);
        }
      }
    });
  });

  return [...gears.values()]
    .filter((array) => array.length > 1)
    .map((value) => value.reduce((a, b) => a * b))
    .reduce((a, b) => a + b);
};

const testInput = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 4361,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 467835,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
