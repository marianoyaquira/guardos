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
  photo: string;
  minutesOnPost: number;
  status: FatigueStatus;
  nextSwap: string;
};

export type FatigueRow = {
  id: string;
  label: string;
  initials: string;
  name: string;
  photo: string;
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
  { id: "pier", code: "PIER", label: "Pier", kind: "special", x: 42, y: 42 },
  { id: "p02", code: "02", label: "Posto 02", kind: "edge", x: 38, y: 24 },
  { id: "p04", code: "04", label: "Posto 04", kind: "edge", x: 55, y: 22 },
  { id: "p01", code: "01", label: "Posto 01", kind: "edge", x: 16, y: 55 },
  { id: "ct", code: "CT", label: "Torre de Controle", kind: "special", x: 24, y: 36 },
  { id: "p03", code: "03", label: "Posto 03", kind: "edge", x: 32, y: 68 },
  { id: "p05", code: "05", label: "Posto 05", kind: "edge", x: 76, y: 38 },
  { id: "p06", code: "06", label: "Posto 06", kind: "edge", x: 68, y: 58 },
  { id: "p07", code: "07", label: "Posto 07", kind: "edge", x: 52, y: 74 },
  { id: "lobby", code: "LOBBY", label: "Lobby", kind: "special", x: 86, y: 56 },
];

export const people = {
  LS: { initials: "LS", name: "Leonardo Souza", photo: "/guardos/avatars/ls.jpg" },
  MR: { initials: "MR", name: "Marcos Ribeiro", photo: "/guardos/avatars/mr.jpg" },
  JP: { initials: "JP", name: "João Pedro", photo: "/guardos/avatars/jp.jpg" },
  TZ: { initials: "TZ", name: "Thiago Zani", photo: "/guardos/avatars/tz.jpg" },
  RC: { initials: "RC", name: "Rafael Costa", photo: "/guardos/avatars/rc.jpg" },
  AA: { initials: "AA", name: "Ana Alves", photo: "/guardos/avatars/aa.jpg" },
  GB: { initials: "GB", name: "Gabriel Bastos", photo: "/guardos/avatars/gb.jpg" },
  AR: { initials: "AR", name: "Amanda Reis", photo: "/guardos/avatars/ar.jpg" },
  BN: { initials: "BN", name: "Bruno Nunes", photo: "/guardos/avatars/bn.jpg" },
  FM: { initials: "FM", name: "Felipe Mendes", photo: "/guardos/avatars/fm.jpg" },
} as const;

const fatiguePeople = {
  gv01: people.LS,
  gv02: people.MR,
  gv03: people.JP,
  gv04: people.TZ,
  gv06: people.RC,
} as const;

function assign(
  person: (typeof people)[keyof typeof people],
  minutesOnPost: number,
  status: FatigueStatus,
  nextSwap: string,
): PostAssignment {
  return { ...person, minutesOnPost, status, nextSwap };
}

function fatigue(
  id: keyof typeof fatiguePeople,
  totalTime: string,
  status: FatigueStatus,
): FatigueRow {
  const person = fatiguePeople[id];
  const number = id.replace("gv", "").padStart(2, "0");
  return { id, label: `LG ${number}`, ...person, totalTime, status };
}

export function postIdForInitials(
  session: DemoSession,
  initials: string,
): PostId | null {
  const match = mapPosts.find((post) => session.assignments[post.id].initials === initials);
  return match?.id ?? null;
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
      lobby: assign(people.FM, 12, "OK", "09:20"),
    },
    fatigueSummary: [
      fatigue("gv01", "1h10", "OK"),
      fatigue("gv03", "0h55", "OK"),
      fatigue("gv06", "1h20", "OK"),
      fatigue("gv04", "1h05", "OK"),
      fatigue("gv02", "0h40", "OK"),
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
      lobby: assign(people.FM, 15, "OK", "11:40"),
    },
    fatigueSummary: [
      fatigue("gv01", "3h15", "OK"),
      fatigue("gv03", "2h25", "ATENÇÃO"),
      fatigue("gv06", "3h50", "ALTO"),
      fatigue("gv04", "3h35", "OK"),
      fatigue("gv02", "2h10", "OK"),
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
      lobby: assign(people.FM, 10, "OK", "13:40"),
    },
    fatigueSummary: [
      fatigue("gv01", "3h35", "OK"),
      fatigue("gv03", "2h45", "ATENÇÃO"),
      fatigue("gv06", "4h10", "ALTO"),
      fatigue("gv04", "3h50", "OK"),
      fatigue("gv02", "2h30", "OK"),
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
      lobby: assign(people.FM, 8, "OK", "15:40"),
    },
    fatigueSummary: [
      fatigue("gv01", "4h00", "ATENÇÃO"),
      fatigue("gv03", "3h05", "OK"),
      fatigue("gv06", "4h30", "ALTO"),
      fatigue("gv04", "4h10", "ATENÇÃO"),
      fatigue("gv02", "2h50", "OK"),
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
      lobby: assign(people.FM, 6, "OK", "17:40"),
    },
    fatigueSummary: [
      fatigue("gv01", "4h20", "ATENÇÃO"),
      fatigue("gv03", "3h20", "OK"),
      fatigue("gv06", "4h45", "ALTO"),
      fatigue("gv04", "4h25", "ATENÇÃO"),
      fatigue("gv02", "3h05", "OK"),
    ],
    breaks: [],
  },
];

export const defaultSessionId = "s02";

export function coveragePercent(session: DemoSession) {
  return Math.round((session.coveredPosts / session.totalPosts) * 100);
}
