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
    label: "LG A",
    shifts: 12,
    guidePercent: 8,
    rotationIndex: 68,
    priority: "ALTA",
  },
  {
    id: "gvb",
    rank: 2,
    label: "LG B",
    shifts: 15,
    guidePercent: 14,
    rotationIndex: 92,
    priority: "NORMAL",
  },
  {
    id: "gvc",
    rank: 3,
    label: "LG C",
    shifts: 16,
    guidePercent: 15,
    rotationIndex: 100,
    priority: "NORMAL",
  },
  {
    id: "gvd",
    rank: 4,
    label: "LG D",
    shifts: 10,
    guidePercent: 6,
    rotationIndex: 54,
    priority: "ALTA",
  },
  {
    id: "gve",
    rank: 5,
    label: "LG E",
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

export const fairnessIndexScale = 100;

export function sortFairnessByPriority(entries: FairnessEntry[]) {
  return [...entries].sort((a, b) => {
    if (a.priority !== b.priority) return a.priority === "ALTA" ? -1 : 1;
    return a.rank - b.rank;
  });
}

export function fairnessRollup(entries: FairnessEntry[]) {
  return {
    high: entries.filter((entry) => entry.priority === "ALTA").length,
    avgShifts: fairnessTeamAverage.shifts,
    avgIndex: fairnessTeamAverage.rotationIndex,
    avgLead: fairnessTeamAverage.guidePercent,
  };
}
