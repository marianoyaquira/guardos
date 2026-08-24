export type AttendanceStatus =
  | "escalado"
  | "presente"
  | "atrasado"
  | "ausente"
  | "folga"
  | "afastado";

export type FatigueLevel = "OK" | "ATENCAO" | "ALTO";
export type IncidentStatus = "aberta" | "atendimento" | "apoio" | "encerrada";
export type InventoryState = "OK" | "ATENCAO" | "AUSENTE" | "MANUTENCAO";
export type AnchorSource = "documented" | "provisional";

export type Beach = {
  id: string;
  name: string;
  slug: string;
  latitude: number;
  longitude: number;
  displayOrder: number;
  active: boolean;
  anchorSource: AnchorSource;
};

export type Post = {
  id: string;
  beachId: string;
  code: string;
  name: string;
  type: "posto" | "cabine";
  latitude: number | null;
  longitude: number | null;
  baseTarget: number;
  reinforcedTarget: number;
  active: boolean;
};

export type Season = {
  id: string;
  name: string;
  startsAt: string;
  endsAt: string;
  defaultStartTime: string;
  defaultEndTime: string;
  active: boolean;
};

export type Lifeguard = {
  id: string;
  name: string;
  initials: string;
  photo: string;
  role: "guarda-vidas" | "chefe";
  qualification: string;
  demo: boolean;
};

export type Assignment = {
  id: string;
  personId: string;
  beachId: string;
  postId: string;
  startTime: string;
  endTime: string;
  attendance: AttendanceStatus;
  onBreak: boolean;
  minutesOnDuty: number;
  minutesOnPost: number;
  minutesWithoutBreak: number;
  notes: string;
};

export type Incident = {
  id: string;
  createdAt: string;
  beachId: string;
  postId: string;
  type: string;
  description: string;
  severity: "baixa" | "media" | "alta";
  status: IncidentStatus;
  peopleIds: string[];
  demo: true;
};

export type InventoryItem = {
  id: string;
  name: string;
  category: string;
  beachId: string;
  postId: string | null;
  quantity: number;
  state: InventoryState;
  demo: boolean;
};

export type StaffingMode = "base" | "reforco";
