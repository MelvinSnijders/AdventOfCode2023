import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const race = input.split("\n");
  const times = race[0]
    .substring(11)
    .trim()
    .split(/\s+/)
    .map((s) => +s);
  const distances = race[1]
    .substring(11)
    .trim()
    .split(/\s+/)
    .map((s) => +s);

  console.log(times);
  console.log(distances);

  return times
    .map((time, index) => {
      let recordBeat = 0;
      for (let i = 1; i < time; i++) {
        const totalDistance = (time - i) * i;
        if (totalDistance > distances[index]) recordBeat++;
      }
      return recordBeat;
    })
    .reduce((a, b) => a * b);
};

/**
 * Definitely not the fastest solution, I do the exact same thing as part 1.
 * But hey, it still does it in less than 50ms, works for me.
 */
const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const race = input.split("\n");
  const time = +race[0].substring(11).trim().replace(/\s+/g, "");
  const distance = +race[1].substring(11).trim().replace(/\s+/g, "");

  let recordBeat = 0;
  for (let i = 1; i < time; i++) {
    const totalDistance = (time - i) * i;
    if (totalDistance > distance) recordBeat++;
  }
  return recordBeat;

  console.log(time);
  console.log(distance);

  return;
};

const testInput = `
Time:      7  15   30
Distance:  9  40  200
`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 288,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 71503,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
