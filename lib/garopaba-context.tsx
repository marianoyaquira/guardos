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
  demoDay,
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
import {
  applyMapAnchors,
  captureAnchorsFromState,
  pinBeachAnchor,
  pinPostAnchor,
} from "@/lib/coastal/anchors";
import {
  assignmentsOnDay,
  type DayPatch,
} from "@/lib/coastal/seasonPlan";

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
  dayPatches: Record<string, Record<string, DayPatch>>;
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
  setDayAttendance: (
    dateKey: string,
    personId: string,
    attendance: Assignment["attendance"],
  ) => void;
  movePersonOnDay: (dateKey: string, personId: string, postId: string) => void;
  dayAssignments: (dateKey: string) => Assignment[];
  toggleBreak: (personId: string) => void;
  addIncident: (input: Omit<Incident, "id" | "demo">) => void;
  setIncidentStatus: (id: string, status: Incident["status"]) => void;
  addPerson: (input: {
    name: string;
    role: Lifeguard["role"];
    photo?: string;
    postId?: string;
  }) => void;
  addPost: (input: {
    beachId: string;
    code: string;
    name: string;
    type: Post["type"];
    baseTarget: number;
  }) => void;
  addInventoryItem: (input: {
    name: string;
    category: string;
    beachId: string;
    postId: string | null;
    quantity: number;
    state: InventoryItem["state"];
  }) => void;
  updateInventoryItem: (id: string, patch: Partial<InventoryItem>) => void;
  removeInventoryItem: (id: string) => void;
  removePerson: (id: string) => void;
  removePost: (id: string) => void;
};

const STORAGE_KEY = "guardos.garopaba.v3";
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
    dayPatches: {},
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
        if (parsed.beaches && parsed.posts) {
          const seed = load();
          const storedPeople = parsed.people ?? [];
          const people = [
            ...storedPeople.map((person) => {
              const seeded = seed.people.find((row) => row.id === person.id);
              if (seeded && person.photo.startsWith("data:image/svg")) {
                return { ...person, photo: seeded.photo };
              }
              return person;
            }),
            ...seed.people.filter(
              (person) => !storedPeople.some((row) => row.id === person.id),
            ),
          ];
          const merged = {
            ...seed,
            ...parsed,
            people,
            inventory: (parsed.inventory ?? seed.inventory).map((item) => ({
              ...item,
              quantity: item.quantity ?? 1,
            })),
            dayPatches: parsed.dayPatches ?? {},
          };
          captureAnchorsFromState(merged.beaches, merged.posts);
          setState(applyMapAnchors(merged));
        }
      }
    } catch {
      /* seed */
    }
    try {
      setState((current) => applyMapAnchors(current));
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
        if (patch.latitude != null && patch.longitude != null) {
          pinBeachAnchor(id, patch.latitude, patch.longitude);
        }
        setState((current) => ({
          ...current,
          beaches: current.beaches.map((row) =>
            row.id === id ? { ...row, ...patch } : row,
          ),
        }));
      },
      updatePost(id, patch) {
        if (patch.latitude != null && patch.longitude != null) {
          pinPostAnchor(id, patch.latitude, patch.longitude);
        }
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
      setDayAttendance(dateKey, personId, attendance) {
        setState((current) => ({
          ...current,
          assignments:
            dateKey === demoDay
              ? current.assignments.map((row) =>
                  row.personId === personId ? { ...row, attendance } : row,
                )
              : current.assignments,
          dayPatches: {
            ...current.dayPatches,
            [dateKey]: {
              ...current.dayPatches[dateKey],
              [personId]: {
                ...current.dayPatches[dateKey]?.[personId],
                attendance,
              },
            },
          },
        }));
      },
      movePersonOnDay(dateKey, personId, postId) {
        const post = state.posts.find((row) => row.id === postId);
        if (!post) return;
        setState((current) => ({
          ...current,
          assignments:
            dateKey === demoDay
              ? current.assignments.map((row) =>
                  row.personId === personId
                    ? { ...row, postId, beachId: post.beachId }
                    : row,
                )
              : current.assignments,
          dayPatches: {
            ...current.dayPatches,
            [dateKey]: {
              ...current.dayPatches[dateKey],
              [personId]: {
                ...current.dayPatches[dateKey]?.[personId],
                postId,
                beachId: post.beachId,
              },
            },
          },
        }));
      },
      dayAssignments(dateKey) {
        return assignmentsOnDay(
          dateKey,
          state.posts,
          state.people,
          state.assignments,
          state.dayPatches,
        );
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
      addPerson(input) {
        const parts = input.name.trim().split(/\s+/);
        const initials = `${parts[0]?.[0] ?? "G"}${parts[1]?.[0] ?? parts[0]?.[1] ?? "V"}`.toUpperCase();
        const id = `gv-custom-${Date.now()}`;
        const post = input.postId
          ? state.posts.find((row) => row.id === input.postId)
          : undefined;
        const person: Lifeguard = {
          id,
          name: input.name.trim(),
          initials,
          photo: input.photo || "/guardos/avatars/garopaba/m10.jpg",
          role: input.role,
          qualification: "Guarda-vidas",
          demo: false,
        };
        setState((current) => ({
          ...current,
          people: [...current.people, person],
          assignments: post
            ? [
                ...current.assignments,
                {
                  id: `as-${id}`,
                  personId: id,
                  beachId: post.beachId,
                  postId: post.id,
                  startTime: current.season.defaultStartTime,
                  endTime: current.season.defaultEndTime,
                  attendance: "escalado",
                  onBreak: false,
                  minutesOnDuty: 0,
                  minutesOnPost: 0,
                  minutesWithoutBreak: 0,
                  notes: "",
                },
              ]
            : current.assignments,
        }));
      },
      addPost(input) {
        const code = input.code.trim().toUpperCase();
        const id = `custom-${input.beachId}-${code}-${Date.now()}`;
        const target = Math.max(0, input.baseTarget);
        setState((current) => ({
          ...current,
          posts: [
            ...current.posts,
            {
              id,
              beachId: input.beachId,
              code,
              name: input.name.trim() || `Posto ${code}`,
              type: input.type,
              latitude: null,
              longitude: null,
              baseTarget: target,
              reinforcedTarget: target,
              active: true,
            },
          ],
        }));
      },
      addInventoryItem(input) {
        setState((current) => ({
          ...current,
          inventory: [
            ...current.inventory,
            {
              id: `inv-custom-${Date.now()}`,
              name: input.name.trim(),
              category: input.category.trim() || "Geral",
              beachId: input.beachId,
              postId: input.postId,
              quantity: Math.max(0, input.quantity),
              state: input.state,
              demo: false,
            },
          ],
        }));
      },
      updateInventoryItem(id, patch) {
        setState((current) => ({
          ...current,
          inventory: current.inventory.map((row) =>
            row.id === id ? { ...row, ...patch } : row,
          ),
        }));
      },
      removeInventoryItem(id) {
        setState((current) => ({
          ...current,
          inventory: current.inventory.filter((row) => row.id !== id),
        }));
      },
      removePerson(id) {
        setState((current) => ({
          ...current,
          people: current.people.filter((row) => row.id !== id),
          assignments: current.assignments.filter((row) => row.personId !== id),
        }));
      },
      removePost(id) {
        setState((current) => ({
          ...current,
          posts: current.posts.filter((row) => row.id !== id),
          assignments: current.assignments.filter((row) => row.postId !== id),
          inventory: current.inventory.map((row) =>
            row.postId === id ? { ...row, postId: null } : row,
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
