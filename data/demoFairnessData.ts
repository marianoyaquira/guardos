export type FairnessPriority = "ALTA" | "NORMAL";

export type FairnessEntry = {
  id: string;
  rank: number;
  label: string;
  shifts: number;
  guidePercent: number;
  rotationIndex: number;
  priority: FairnessPriority;
};

export const demoFairnessData: FairnessEntry[] = [
  {
    id: "gva",
    rank: 1,
    label: "GV A",
    shifts: 12,
    guidePercent: 8,
    rotationIndex: 68,
    priority: "ALTA",
  },
  {
    id: "gvb",
    rank: 2,
    label: "GV B",
    shifts: 15,
    guidePercent: 14,
    rotationIndex: 92,
    priority: "NORMAL",
  },
  {
    id: "gvc",
    rank: 3,
    label: "GV C",
    shifts: 16,
    guidePercent: 15,
    rotationIndex: 100,
    priority: "NORMAL",
  },
  {
    id: "gvd",
    rank: 4,
    label: "GV D",
    shifts: 10,
    guidePercent: 6,
    rotationIndex: 54,
    priority: "ALTA",
  },
  {
    id: "gve",
    rank: 5,
    label: "GV E",
    shifts: 14,
    guidePercent: 12,
    rotationIndex: 84,
    priority: "NORMAL",
  },
];

export const fairnessTeamAverage = {
  shifts: 13.4,
  guidePercent: 11,
  rotationIndex: 80,
};
