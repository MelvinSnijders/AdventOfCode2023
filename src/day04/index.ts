import run from "aocrunner";

const parseInput = (rawInput: string): Game[] => {
  return rawInput.split("\n").map((line) => {
    const gameId = line.match(/(?<= )(.*?)(?=:)/g)!;
    const allNumbers = line
      .substring(8 + gameId.length)
      .trim()
      .split(/\s+\|\s+/);
    const winningNumbers = allNumbers[0].split(/\s+/).map((n) => +n);
    const numbers = allNumbers[1].split(/\s+/).map((n) => +n);
    return { id: +gameId, winningNumbers, numbers, instances: 1 };
  });
};

type Game = {
  id: number;
  numbers: number[];
  winningNumbers: number[];
  instances: number;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return input
    .map((game) => {
      const winningCount = game.winningNumbers.filter((number) => game.numbers.includes(number)).length;
      const points = Math.pow(2, winningCount - 1);
      return winningCount == 0 ? 0 : points;
    })
    .reduce((a, b) => a + b);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  input.forEach((game) => {
    const winningCount = game.winningNumbers.filter((number) => game.numbers.includes(number)).length;
    for (let inst = 0; inst < game.instances; inst++) {
      for (let i = 0; i < winningCount; i++) {
        input[game.id + i].instances++;
      }
    }
  });

  return input.map((game) => game.instances).reduce((a, b) => a + b);
};

run({
  part1: {
    tests: [
      {
        input: `
        Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
        Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
        Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
        Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
        Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
        Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
        Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
        Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
        Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
        Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
        Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
`,
        expected: 30,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
