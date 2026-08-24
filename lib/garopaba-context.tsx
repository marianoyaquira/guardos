"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  seedAssignments,
  seedBeaches,
  seedIncidents,
  seedInventory,
  seedPeople,
  seedPosts,
  seedSeason,
} from "@/data/garopaba/seed";
import type {
  Assignment,
  Beach,
  Incident,
  InventoryItem,
  Lifeguard,
  Post,
  Season,
  StaffingMode,
} from "@/data/garopaba/types";

type CoastalState = {
  beaches: Beach[];
  posts: Post[];
  people: Lifeguard[];
  assignments: Assignment[];
  incidents: Incident[];
  inventory: InventoryItem[];
  season: Season;
  operationOpen: boolean;
  staffingMode: StaffingMode;
  attentionMinutes: number;
  highMinutes: number;
};

type CoastalContextValue = CoastalState & {
  updateBeach: (id: string, patch: Partial<Beach>) => void;
  updatePost: (id: string, patch: Partial<Post>) => void;
  updateSeason: (patch: Partial<Season>) => void;
  setStaffingMode: (mode: StaffingMode) => void;
  setOperationOpen: (open: boolean) => void;
  setThresholds: (attention: number, high: number) => void;
  movePerson: (personId: string, postId: string) => void;
  setAttendance: (personId: string, attendance: Assignment["attendance"]) => void;
  toggleBreak: (personId: string) => void;
  addIncident: (input: Omit<Incident, "id" | "demo">) => void;
  setIncidentStatus: (id: string, status: Incident["status"]) => void;
};

const STORAGE_KEY = "guardos.garopaba.v1";
const CoastalContext = createContext<CoastalContextValue | null>(null);

function load(): CoastalState {
  return {
    beaches: seedBeaches,
    posts: seedPosts,
    people: seedPeople,
    assignments: seedAssignments,
    incidents: seedIncidents,
    inventory: seedInventory,
    season: seedSeason,
    operationOpen: true,
    staffingMode: "base",
    attentionMinutes: 240,
    highMinutes: 360,
  };
}

export function GaropabaProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CoastalState>(load);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CoastalState;
        if (parsed.beaches && parsed.posts) setState({ ...load(), ...parsed });
      }
    } catch {
      /* seed */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [hydrated, state]);

  const value = useMemo<CoastalContextValue>(
    () => ({
      ...state,
      updateBeach(id, patch) {
        setState((current) => ({
          ...current,
          beaches: current.beaches.map((row) =>
            row.id === id ? { ...row, ...patch } : row,
          ),
        }));
      },
      updatePost(id, patch) {
        setState((current) => ({
          ...current,
          posts: current.posts.map((row) => (row.id === id ? { ...row, ...patch } : row)),
        }));
      },
      updateSeason(patch) {
        setState((current) => ({ ...current, season: { ...current.season, ...patch } }));
      },
      setStaffingMode(mode) {
        setState((current) => ({ ...current, staffingMode: mode }));
      },
      setOperationOpen(open) {
        setState((current) => ({ ...current, operationOpen: open }));
      },
      setThresholds(attention, high) {
        setState((current) => ({
          ...current,
          attentionMinutes: attention,
          highMinutes: high,
        }));
      },
      movePerson(personId, postId) {
        const post = state.posts.find((row) => row.id === postId);
        if (!post) return;
        setState((current) => ({
          ...current,
          assignments: current.assignments.map((row) =>
            row.personId === personId
              ? { ...row, postId, beachId: post.beachId }
              : row,
          ),
        }));
      },
      setAttendance(personId, attendance) {
        setState((current) => ({
          ...current,
          assignments: current.assignments.map((row) =>
            row.personId === personId ? { ...row, attendance } : row,
          ),
        }));
      },
      toggleBreak(personId) {
        setState((current) => ({
          ...current,
          assignments: current.assignments.map((row) =>
            row.personId === personId ? { ...row, onBreak: !row.onBreak } : row,
          ),
        }));
      },
      addIncident(input) {
        setState((current) => ({
          ...current,
          incidents: [
            {
              ...input,
              id: `inc-${Date.now()}`,
              demo: true,
            },
            ...current.incidents,
          ],
        }));
      },
      setIncidentStatus(id, status) {
        setState((current) => ({
          ...current,
          incidents: current.incidents.map((row) =>
            row.id === id ? { ...row, status } : row,
          ),
        }));
      },
    }),
    [state],
  );

  return <CoastalContext.Provider value={value}>{children}</CoastalContext.Provider>;
}

export function useGaropaba() {
  const value = useContext(CoastalContext);
  if (!value) throw new Error("useGaropaba must be used within GaropabaProvider");
  return value;
}
