import run from "aocrunner";

type CubeSet = {
  red: number;
  green: number;
  blue: number;
};

type Game = {
  id: number;
  sets: CubeSet[];
};

const parseInput = (rawInput: string): Game[] => {
  const games = rawInput.split("\n");
  return games.map((game) => {
    const id = game.match(/(?<= )(.*?)(?=:)/g)![0];
    const sets = game.substring(7 + id.length, game.length).split("; ");
    const cubeSets: CubeSet[] = sets.map((set) => {
      const cubes = set.split(", ");
      let red = 0,
        green = 0,
        blue = 0;
      cubes.forEach((cube) => {
        const cubeInfo = cube.split(" ");
        const amount = cubeInfo[0];
        const color = cubeInfo[1];

        switch (color) {
          case "red":
            red += +amount;
            break;
          case "green":
            green += +amount;
            break;
          case "blue":
            blue += +amount;
            break;
        }
      });
      return { red, green, blue };
    });
    return {
      id: +id,
      sets: cubeSets,
    };
  });
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const redCubes = 12;
  const greenCubes = 13;
  const blueCubes = 14;

  let idSum = 0;

  input.forEach((game) => {
    let possible = true;
    game.sets.forEach((set) => {
      if (set.red > redCubes || set.green > greenCubes || set.blue > blueCubes) possible = false;
    });
    if (possible) idSum += game.id;
  });

  return idSum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input
    .map((game) => {
      let minimumRed = 0;
      let minimumGreen = 0;
      let minimumBlue = 0;

      game.sets.forEach((set) => {
        if (set.red > minimumRed) minimumRed = set.red;
        if (set.green > minimumGreen) minimumGreen = set.green;
        if (set.blue > minimumBlue) minimumBlue = set.blue;
      });

      return minimumRed * minimumGreen * minimumBlue;
    })
    .reduce((a, b) => a + b);
};

run({
  part1: {
    tests: [
      {
        input: `
        Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
