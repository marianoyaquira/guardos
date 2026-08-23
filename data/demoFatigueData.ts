export type FatigueZone = "reef" | "piscina" | "pier" | "controle" | "lobby";

export type FatigueStatus = "OK" | "ATENÇÃO" | "ALTO";

export type FatigueEntry = {
  id: string;
  label: string;
  minutes: Record<FatigueZone, number>;
  status: FatigueStatus;
};

export const fatigueZones: { id: FatigueZone; label: string; color: string }[] =
  [
    { id: "reef", label: "Reef", color: "#0B3C5D" },
    { id: "piscina", label: "Piscina", color: "#00A8B5" },
    { id: "pier", label: "Pier", color: "#D4893A" },
    { id: "controle", label: "Controle", color: "#5B7C99" },
    { id: "lobby", label: "Lobby", color: "#8B85C1" },
  ];

export const fatigueThresholdMinutes = 180;

export const demoFatigueData: FatigueEntry[] = [
  {
    id: "gv01",
    label: "LG 01",
    minutes: { reef: 75, piscina: 60, pier: 30, controle: 20, lobby: 10 },
    status: "OK",
  },
  {
    id: "gv03",
    label: "LG 03",
    minutes: { reef: 85, piscina: 40, pier: 20, controle: 0, lobby: 0 },
    status: "ATENÇÃO",
  },
  {
    id: "gv06",
    label: "LG 06",
    minutes: { reef: 95, piscina: 70, pier: 40, controle: 20, lobby: 5 },
    status: "ALTO",
  },
  {
    id: "gv04",
    label: "LG 04",
    minutes: { reef: 80, piscina: 60, pier: 40, controle: 25, lobby: 10 },
    status: "OK",
  },
  {
    id: "gv02",
    label: "LG 02",
    minutes: { reef: 40, piscina: 50, pier: 20, controle: 15, lobby: 5 },
    status: "OK",
  },
];

export function formatHours(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h${String(minutes).padStart(2, "0")}`;
}

export function totalMinutes(entry: FatigueEntry) {
  return Object.values(entry.minutes).reduce((sum, value) => sum + value, 0);
}

const statusRank: Record<FatigueStatus, number> = {
  ALTO: 0,
  ATENÇÃO: 1,
  OK: 2,
};

export function sortByAttention(entries: FatigueEntry[]) {
  return [...entries].sort((a, b) => {
    const byStatus = statusRank[a.status] - statusRank[b.status];
    if (byStatus !== 0) return byStatus;
    return totalMinutes(b) - totalMinutes(a);
  });
}

export function zoneRollups(entries: FatigueEntry[]) {
  return fatigueZones.map((zone) => {
    const minutes = entries.map((entry) => entry.minutes[zone.id]);
    const avg = Math.round(
      minutes.reduce((sum, value) => sum + value, 0) / entries.length,
    );
    const alerts = entries.filter(
      (entry) => entry.status !== "OK" && entry.minutes[zone.id] > 0,
    ).length;
    return { ...zone, avg, alerts };
  });
}

export const fatigueScaleMinutes = 240;
