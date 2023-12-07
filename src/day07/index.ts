import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

enum PokerType {
  FiveOfAKind = 6,
  FourOfAKind = 5,
  FullHouse = 4,
  ThreeOfAKind = 3,
  TwoPair = 2,
  OnePair = 1,
  HighCard = 0,
}

const countCharacters = (hand: string): [string, number][] => {
  var counts: { [key: string]: number } = {};
  for (var i = 0; i < hand.length; i++) {
    var key = hand[i];
    if (!counts[key]) {
      counts[key] = 0;
    }
    counts[key]++;
  }
  var countsArray: [string, number][] = Object.entries(counts);
  countsArray.sort((a, b) => b[1] - a[1]);
  return countsArray;
};

const determinePokerType = (countsArray: [string, number][]): PokerType => {
  if (countsArray[0][1] == 5) return PokerType.FiveOfAKind;
  if (countsArray[0][1] == 4) return PokerType.FourOfAKind;
  if (countsArray[0][1] == 3 && countsArray[1][1] == 2) return PokerType.FullHouse;
  if (countsArray[0][1] == 3) return PokerType.ThreeOfAKind;
  if (countsArray[0][1] == 2 && countsArray.length > 1 && countsArray[1][1] == 2) return PokerType.TwoPair;
  if (countsArray[0][1] == 2) return PokerType.OnePair;
  return PokerType.HighCard;
};

const calculateHandType = (hand: string, replaceJoker: boolean): PokerType => {
  let countsArray: [string, number][] = countCharacters(hand);
  const preReplace = determinePokerType(countsArray);

  if (!replaceJoker) return preReplace;

  if (countsArray[0][1] == 5) return PokerType.FiveOfAKind;
  const most = countsArray.filter((char) => char[0] != "J")[0][0];
  const newHand = hand.replace(/j/gi, countsArray.filter((char) => char[0] != "J")[0][0]);
  countsArray = countCharacters(newHand);
  const afterReplace = determinePokerType(countsArray);

  return Math.max(preReplace, afterReplace);

  // if (replaceJoker) {
  //   const jokerCount = hand.split("").filter((char) => char == "J").length;
  //   countsArray[0][1] += jokerCount;
  //   countsArray = countsArray.filter((count) => count[0] != "J");
  // }
};

const isHandBigger = (hand1: string, hand2: string, cards: string): number => {
  if (hand1[0] == hand2[0]) return isHandBigger(hand1.substring(1), hand2.substring(1), cards);
  return cards.indexOf(hand1[0]) - cards.indexOf(hand2[0]);
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const cards = "AKQJT98765432";

  const hands: [string, number][] = input.split("\n").map((line) => {
    const splitted = line.split(" ");
    return [splitted[0], +splitted[1]];
  });

  const sorted = hands.sort((a, b) => {
    const type1 = calculateHandType(a[0], false);
    const type2 = calculateHandType(b[0], false);
    if (type1 != type2) return type2 - type1;
    return isHandBigger(a[0], b[0], cards);
  });

  return sorted
    .map((hand, index) => {
      // console.log(hand + " * " + (sorted.length - index));
      return hand[1] * (sorted.length - index);
    })
    .reduce((a, b) => a + b);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const cards = "AKQT98765432J";

  const hands: [string, number][] = input.split("\n").map((line) => {
    const splitted = line.split(" ");
    return [splitted[0], +splitted[1]];
  });

  const sorted = hands.sort((a, b) => {
    const type1 = calculateHandType(a[0], true);
    const type2 = calculateHandType(b[0], true);
    if (type1 != type2) return type2 - type1;
    return isHandBigger(a[0], b[0], cards);
  });

  return sorted
    .map((hand, index) => {
      console.log(hand + " * " + (sorted.length - index));
      return hand[1] * (sorted.length - index);
    })
    .reduce((a, b) => a + b);
};

const testInput = `
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 6440,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 5905,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
