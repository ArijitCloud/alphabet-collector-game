export default function GameItems() {
  return [
    {
      label: "A",
      basePoint: 50,
      bonus: {
        point: 200,
        threshold: 3,
      },
    },
    {
      label: "B",
      basePoint: 30,
      bonus: {
        point: 90,
        threshold: 2,
      },
    },
    {
      label: "C",
      basePoint: 20,
    },
    {
      label: "D",
      basePoint: 15,
    },
  ].map((i) => ({ ...i, collectCount: 0, itemScore: 0 }));
}
