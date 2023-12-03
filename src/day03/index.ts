import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const getAdjacentCharacters = (
  lines: string[],
  lineIndex: number,
  charIndex: number,
): Map<string, string> => {
  let charMap: Map<string, string> = new Map();
  const topLeft = lines[lineIndex - 1]?.[charIndex - 1];
  if (topLeft) charMap.set(`${lineIndex - 1},${charIndex - 1}`, topLeft);

  const topCenter = lines[lineIndex - 1]?.[charIndex];
  if (topCenter) charMap.set(`${lineIndex - 1},${charIndex}`, topCenter);

  const topRight = lines[lineIndex - 1]?.[charIndex + 1];
  if (topRight) charMap.set(`${lineIndex - 1},${charIndex + 1}`, topRight);

  const left = lines[lineIndex]?.[charIndex - 1];
  if (left) charMap.set(`${lineIndex},${charIndex - 1}`, left);

  const right = lines[lineIndex]?.[charIndex + 1];
  if (right) charMap.set(`${lineIndex},${charIndex + 1}`, right);

  const bottomLeft = lines[lineIndex + 1]?.[charIndex - 1];
  if (bottomLeft) charMap.set(`${lineIndex + 1},${charIndex - 1}`, bottomLeft);

  const bottomCenter = lines[lineIndex + 1]?.[charIndex];
  if (bottomCenter) charMap.set(`${lineIndex + 1},${charIndex}`, bottomCenter);

  const bottomRight = lines[lineIndex + 1]?.[charIndex + 1];
  if (bottomRight)
    charMap.set(`${lineIndex + 1},${charIndex + 1}`, bottomRight);

  return charMap;
};

const checkAdjacentForSymbols = (
  lines: string[],
  lineIndex: number,
  startIndex: number,
  numberLength: number,
): boolean => {
  const symbolRegex = /[^.0-9]+/;

  for (let i = startIndex; i < startIndex + numberLength; i++) {
    const adjacents = getAdjacentCharacters(lines, lineIndex, i);
    if ([...adjacents.values()].some((c) => symbolRegex.test(c))) return true;
  }
  return false;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.split("\n");

  return lines
    .map((line, index) => {
      let matches = [...line.matchAll(/\d+/g)];

      return matches
        .filter((match) =>
          checkAdjacentForSymbols(lines, index, match.index, match[0].length),
        )
        .map((match) => +match[0])
        .reduce((a, b) => a + b, 0);
    })
    .reduce((a, b) => a + b, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.split("\n");

  let gears: Map<string, number[]> = new Map();

  lines.map((line, index) => {
    let matches = [...line.matchAll(/\d+/g)];

    matches.forEach((match) => {
      for (let i = match.index; i < match.index + match[0].length; i++) {
        const adjacents = getAdjacentCharacters(lines, index, i);
        const adjacentGear = [...adjacents.entries()].find(
          (entry) => entry[1] == "*",
        );
        if (adjacentGear) {
          const splitGear = adjacentGear[0].split(".");
          const x = splitGear[0];
          const y = splitGear[1];
          if (gears.has(adjacentGear[0])) {
            const existingNumbers = gears.get(adjacentGear[0]);
            gears.set(adjacentGear[0], [...existingNumbers!, +match[0]]);
          } else {
            gears.set(adjacentGear[0], [+match[0]]);
          }
          break;
        }
      }
    });
  });

  return [...gears.values()]
    .filter((array) => array.length > 1)
    .map((value) => value.reduce((a, b) => a * b))
    .reduce((a, b) => a + b);
};

run({
  part1: {
    tests: [
      {
        input: `
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
        `,
        expected: 4361,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..`,
        expected: 467835,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
