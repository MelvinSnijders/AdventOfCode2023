import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const stages = input.split("\n\n");

  const initialSeeds: number[] = stages[0]
    .substring(7)
    .split(" ")
    .map((s) => +s);

  let currentNumbers = initialSeeds;

  stages.shift();
  stages.forEach((stage) => {
    const mappings = stage.split("\n").map((s) => s.split(" ").map((s) => +s));
    mappings.shift();
    currentNumbers.forEach((current, index) => {
      const mapping = mappings.find((mapping) => mapping[1] <= current && current <= mapping[1] + mapping[2]);
      if (!mapping) return;
      currentNumbers[index] = mapping[0] + (current - mapping[1]);
    });
  });

  return currentNumbers.sort((a, b) => a - b)[0];
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return input;
};

const testInput = `
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 35,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 46,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
