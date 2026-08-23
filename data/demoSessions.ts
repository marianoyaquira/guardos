import type { FatigueStatus } from "@/data/demoFatigueData";

export type PostId =
  | "p01"
  | "p02"
  | "p03"
  | "p04"
  | "p05"
  | "p06"
  | "p07"
  | "ct"
  | "pier"
  | "lobby";

export type PostKind = "edge" | "special";

export type MapPost = {
  id: PostId;
  code: string;
  label: string;
  kind: PostKind;
  x: number;
  y: number;
};

export type PostAssignment = {
  initials: string;
  name: string;
  minutesOnPost: number;
  status: FatigueStatus;
  nextSwap: string;
};

export type FatigueRow = {
  id: string;
  label: string;
  totalTime: string;
  status: FatigueStatus;
};

export type SessionBreak = {
  id: string;
  label: string;
  duration: string;
  tone: "pause" | "lunch";
};

export type DemoSession = {
  id: string;
  label: string;
  startTime: string;
  endTime: string;
  team: string;
  coveredPosts: number;
  totalPosts: number;
  activeProfessionals: number;
  assignments: Record<PostId, PostAssignment>;
  fatigueSummary: FatigueRow[];
  breaks: SessionBreak[];
};

export const mapPosts: MapPost[] = [
  { id: "pier", code: "PIER", label: "Pier", kind: "special", x: 49, y: 30 },
  { id: "p02", code: "02", label: "Posto 02", kind: "edge", x: 37, y: 18 },
  { id: "p04", code: "04", label: "Posto 04", kind: "edge", x: 68, y: 24 },
  { id: "p01", code: "01", label: "Posto 01", kind: "edge", x: 23, y: 34 },
  { id: "ct", code: "CT", label: "Torre de Controle", kind: "special", x: 13, y: 46 },
  { id: "p03", code: "03", label: "Posto 03", kind: "edge", x: 20, y: 58 },
  { id: "p05", code: "05", label: "Posto 05", kind: "edge", x: 80, y: 46 },
  { id: "p06", code: "06", label: "Posto 06", kind: "edge", x: 72, y: 66 },
  { id: "p07", code: "07", label: "Posto 07", kind: "edge", x: 42, y: 72 },
  { id: "lobby", code: "LOBBY", label: "Lobby", kind: "special", x: 52, y: 88 },
];

const people = {
  LS: { initials: "LS", name: "Leonardo Souza" },
  MR: { initials: "MR", name: "Marcos Ribeiro" },
  JP: { initials: "JP", name: "João Pedro" },
  TZ: { initials: "TZ", name: "Thiago Zani" },
  RC: { initials: "RC", name: "Rafael Costa" },
  AA: { initials: "AA", name: "Ana Alves" },
  GB: { initials: "GB", name: "Gabriel Bastos" },
  AR: { initials: "AR", name: "Amanda Reis" },
  BN: { initials: "BN", name: "Bruno Nunes" },
} as const;

function assign(
  person: (typeof people)[keyof typeof people],
  minutesOnPost: number,
  status: FatigueStatus,
  nextSwap: string,
): PostAssignment {
  return { ...person, minutesOnPost, status, nextSwap };
}

export const demoSessions: DemoSession[] = [
  {
    id: "s01",
    label: "Sessão 01",
    startTime: "08:00",
    endTime: "09:30",
    team: "Equipe A",
    coveredPosts: 8,
    totalPosts: 8,
    activeProfessionals: 22,
    assignments: {
      p01: assign(people.MR, 28, "OK", "09:00"),
      p02: assign(people.LS, 28, "OK", "09:00"),
      p03: assign(people.TZ, 36, "OK", "09:10"),
      p04: assign(people.JP, 22, "OK", "09:00"),
      p05: assign(people.AA, 40, "ATENÇÃO", "09:05"),
      p06: assign(people.RC, 18, "OK", "09:15"),
      p07: assign(people.AR, 30, "OK", "09:10"),
      ct: assign(people.BN, 90, "OK", "09:30"),
      pier: assign(people.GB, 34, "OK", "09:00"),
      lobby: assign(people.AA, 12, "OK", "09:20"),
    },
    fatigueSummary: [
      { id: "gv01", label: "GV 01", totalTime: "1h10", status: "OK" },
      { id: "gv03", label: "GV 03", totalTime: "0h55", status: "OK" },
      { id: "gv06", label: "GV 06", totalTime: "1h20", status: "OK" },
      { id: "gv04", label: "GV 04", totalTime: "1h05", status: "OK" },
      { id: "gv02", label: "GV 02", totalTime: "0h40", status: "OK" },
    ],
    breaks: [{ id: "pause", label: "Pausa", duration: "15 min", tone: "pause" }],
  },
  {
    id: "s02",
    label: "Sessão 02",
    startTime: "10:30",
    endTime: "12:00",
    team: "Equipe A",
    coveredPosts: 8,
    totalPosts: 8,
    activeProfessionals: 24,
    assignments: {
      p01: assign(people.LS, 38, "OK", "11:15"),
      p02: assign(people.MR, 40, "OK", "11:15"),
      p03: assign(people.JP, 42, "OK", "11:15"),
      p04: assign(people.TZ, 36, "OK", "11:20"),
      p05: assign(people.RC, 44, "ATENÇÃO", "11:10"),
      p06: assign(people.AA, 30, "OK", "11:25"),
      p07: assign(people.GB, 28, "OK", "11:20"),
      ct: assign(people.AR, 90, "OK", "12:00"),
      pier: assign(people.BN, 48, "ALTO", "11:05"),
      lobby: assign(people.AA, 15, "OK", "11:40"),
    },
    fatigueSummary: [
      { id: "gv01", label: "GV 01", totalTime: "3h15", status: "OK" },
      { id: "gv03", label: "GV 03", totalTime: "2h25", status: "ATENÇÃO" },
      { id: "gv06", label: "GV 06", totalTime: "3h50", status: "ALTO" },
      { id: "gv04", label: "GV 04", totalTime: "3h35", status: "OK" },
      { id: "gv02", label: "GV 02", totalTime: "2h10", status: "OK" },
    ],
    breaks: [
      { id: "pause", label: "Pausa", duration: "15 min", tone: "pause" },
      { id: "lunch", label: "Almoço", duration: "30 min", tone: "lunch" },
    ],
  },
  {
    id: "s03",
    label: "Sessão 03",
    startTime: "12:30",
    endTime: "14:00",
    team: "Equipe A",
    coveredPosts: 8,
    totalPosts: 8,
    activeProfessionals: 24,
    assignments: {
      p01: assign(people.AA, 20, "OK", "13:15"),
      p02: assign(people.JP, 24, "OK", "13:15"),
      p03: assign(people.RC, 18, "OK", "13:20"),
      p04: assign(people.LS, 22, "OK", "13:15"),
      p05: assign(people.TZ, 26, "OK", "13:10"),
      p06: assign(people.GB, 16, "OK", "13:25"),
      p07: assign(people.MR, 20, "OK", "13:20"),
      ct: assign(people.BN, 45, "OK", "14:00"),
      pier: assign(people.AR, 28, "ATENÇÃO", "13:05"),
      lobby: assign(people.AA, 10, "OK", "13:40"),
    },
    fatigueSummary: [
      { id: "gv01", label: "GV 01", totalTime: "3h35", status: "OK" },
      { id: "gv03", label: "GV 03", totalTime: "2h45", status: "ATENÇÃO" },
      { id: "gv06", label: "GV 06", totalTime: "4h10", status: "ALTO" },
      { id: "gv04", label: "GV 04", totalTime: "3h50", status: "OK" },
      { id: "gv02", label: "GV 02", totalTime: "2h30", status: "OK" },
    ],
    breaks: [
      { id: "pause", label: "Pausa", duration: "15 min", tone: "pause" },
    ],
  },
  {
    id: "s04",
    label: "Sessão 04",
    startTime: "14:30",
    endTime: "16:00",
    team: "Equipe B",
    coveredPosts: 8,
    totalPosts: 8,
    activeProfessionals: 23,
    assignments: {
      p01: assign(people.GB, 18, "OK", "15:15"),
      p02: assign(people.RC, 22, "OK", "15:10"),
      p03: assign(people.LS, 20, "OK", "15:15"),
      p04: assign(people.AA, 16, "OK", "15:20"),
      p05: assign(people.MR, 24, "OK", "15:10"),
      p06: assign(people.JP, 18, "OK", "15:15"),
      p07: assign(people.TZ, 14, "OK", "15:25"),
      ct: assign(people.AR, 40, "OK", "16:00"),
      pier: assign(people.BN, 26, "OK", "15:05"),
      lobby: assign(people.GB, 8, "OK", "15:40"),
    },
    fatigueSummary: [
      { id: "gv01", label: "GV 01", totalTime: "4h00", status: "ATENÇÃO" },
      { id: "gv03", label: "GV 03", totalTime: "3h05", status: "OK" },
      { id: "gv06", label: "GV 06", totalTime: "4h30", status: "ALTO" },
      { id: "gv04", label: "GV 04", totalTime: "4h10", status: "ATENÇÃO" },
      { id: "gv02", label: "GV 02", totalTime: "2h50", status: "OK" },
    ],
    breaks: [
      { id: "pause", label: "Pausa", duration: "15 min", tone: "pause" },
    ],
  },
  {
    id: "s05",
    label: "Sessão 05",
    startTime: "16:30",
    endTime: "18:00",
    team: "Equipe B",
    coveredPosts: 7,
    totalPosts: 8,
    activeProfessionals: 20,
    assignments: {
      p01: assign(people.TZ, 12, "OK", "17:15"),
      p02: assign(people.AA, 14, "OK", "17:15"),
      p03: assign(people.GB, 10, "OK", "17:20"),
      p04: assign(people.MR, 16, "OK", "17:10"),
      p05: assign(people.LS, 18, "OK", "17:10"),
      p06: assign(people.BN, 12, "OK", "17:20"),
      p07: assign(people.RC, 8, "OK", "17:25"),
      ct: assign(people.AR, 30, "OK", "18:00"),
      pier: assign(people.JP, 20, "ATENÇÃO", "17:05"),
      lobby: assign(people.AA, 6, "OK", "17:40"),
    },
    fatigueSummary: [
      { id: "gv01", label: "GV 01", totalTime: "4h20", status: "ATENÇÃO" },
      { id: "gv03", label: "GV 03", totalTime: "3h20", status: "OK" },
      { id: "gv06", label: "GV 06", totalTime: "4h45", status: "ALTO" },
      { id: "gv04", label: "GV 04", totalTime: "4h25", status: "ATENÇÃO" },
      { id: "gv02", label: "GV 02", totalTime: "3h05", status: "OK" },
    ],
    breaks: [],
  },
];

export const defaultSessionId = "s02";

export function coveragePercent(session: DemoSession) {
  return Math.round((session.coveredPosts / session.totalPosts) * 100);
}
