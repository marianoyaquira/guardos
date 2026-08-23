import type { FatigueStatus } from "@/data/demoFatigueData";

export type InventoryStatus = FatigueStatus;

export const demoInventory = [
  { id: "tubes", item: "Rescue tube", quantity: 12, location: "Tower store", status: "OK" as InventoryStatus },
  { id: "boards", item: "Rescue board", quantity: 6, location: "Pier rack", status: "ATENÇÃO" as InventoryStatus },
  { id: "radios", item: "Radio", quantity: 10, location: "Control tower", status: "OK" as InventoryStatus },
  { id: "kits", item: "First-aid kit", quantity: 4, location: "Lobby", status: "OK" as InventoryStatus },
  { id: "spinal", item: "Spinal board", quantity: 2, location: "Tower store", status: "OK" as InventoryStatus },
] as const;

export const demoReports = [
  { id: "positions", key: "reportPositions" as const, session: "s02" },
  { id: "rotation", key: "reportRotation" as const, session: "s02" },
  { id: "fatigue", key: "reportFatigue" as const, session: "s02" },
  { id: "fairness", key: "reportFairness" as const, session: "s02" },
] as const;
