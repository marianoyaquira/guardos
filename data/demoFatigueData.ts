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
    label: "GV 01",
    minutes: { reef: 75, piscina: 60, pier: 30, controle: 20, lobby: 10 },
    status: "OK",
  },
  {
    id: "gv03",
    label: "GV 03",
    minutes: { reef: 85, piscina: 40, pier: 20, controle: 0, lobby: 0 },
    status: "ATENÇÃO",
  },
  {
    id: "gv06",
    label: "GV 06",
    minutes: { reef: 95, piscina: 70, pier: 40, controle: 20, lobby: 5 },
    status: "ALTO",
  },
  {
    id: "gv04",
    label: "GV 04",
    minutes: { reef: 80, piscina: 60, pier: 40, controle: 25, lobby: 10 },
    status: "OK",
  },
  {
    id: "gv02",
    label: "GV 02",
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
