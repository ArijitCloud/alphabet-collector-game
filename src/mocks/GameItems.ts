import { GameItem } from "../types";

function getRandomLabel(labels: string[]) {
  let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  labels.forEach((label) => {
    alphabet = alphabet.replace(label, "");
  });
  const randomIndex = Math.floor(Math.random() * alphabet.length);
  return alphabet[randomIndex];
}

function getRandomBasePoint() {
  return Math.floor(Math.random() * (50 - 15 + 1)) + 15;
}

function getRandomThreshold() {
  const thresholds = [2, 3, 4];
  const randomIndex = Math.floor(Math.random() * thresholds.length);
  return thresholds[randomIndex];
}

function getRandomBonus(basePoint: number) {
  if (Math.random() < 0.3) {
    // Return a bonus object
    const threshold = getRandomThreshold();
    return {
      point: (threshold + 1) * basePoint, // additional base point
      threshold, // Random threshold
    };
  }
  return undefined; // No bonus
}

const randomGameAlphabets = () => {
  const randomizedData = [];

  for (let i = 0; i < 8; i++) {
    const label = getRandomLabel(randomizedData.map((i) => i.label));
    const basePoint = getRandomBasePoint();
    const bonus = getRandomBonus(basePoint);
    const threshold = bonus ? bonus.threshold : getRandomThreshold();

    const item = {
      label,
      basePoint,
      bonus: bonus ? { point: bonus.point, threshold } : undefined,
    };

    randomizedData.push(item);
  }

  return randomizedData;
};
export default function MockGameItems(): GameItem[] {
  return randomGameAlphabets().map((i) => ({
    ...i,
    collectCount: 0,
    itemScore: 0,
  }));
}
