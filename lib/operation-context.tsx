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
  defaultSessionId,
  demoSessions,
  type DemoSession,
  type PostAssignment,
  type PostId,
} from "@/data/demoSessions";
import {
  extraPostIds,
  initialsFromName,
  neededPosts,
  seedNeeds,
  seedRoster,
  type CoverageNeeds,
  type LifeguardProfile,
  type LifeguardRole,
  type Weekday,
} from "@/data/operationSetup";
import { fillAssignments } from "@/lib/fillSession";

export type SetupTab = "people" | "needs" | "fill";

type OperationState = {
  roster: LifeguardProfile[];
  needs: CoverageNeeds;
  overrides: Partial<Record<string, Record<PostId, PostAssignment>>>;
};

export type SetupFocus = "posts" | "setup";

type OperationContextValue = OperationState & {
  setupOpen: boolean;
  setupTab: SetupTab;
  setupFocus: SetupFocus;
  openSetup: (tab?: SetupTab) => void;
  openPlan: () => void;
  focusSetup: (focus: SetupFocus) => void;
  closeSetup: () => void;
  addPerson: (input: {
    name: string;
    age?: number;
    photo: string;
    role: LifeguardRole;
  }) => void;
  updatePerson: (id: string, patch: Partial<LifeguardProfile>) => void;
  removePerson: (id: string) => void;
  toggleRequired: (id: PostId) => void;
  toggleExtra: (id: PostId) => void;
  toggleDay: (day: Weekday) => void;
  toggleWindow: (id: string) => void;
  applyFill: (sessionId: string) => void;
  liveSession: (session: DemoSession) => DemoSession;
};

const STORAGE_KEY = "guardos.operation.v1";

function initialsMark(initials: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect fill="#0C2744" width="96" height="96"/><text x="50%" y="55%" text-anchor="middle" fill="white" font-size="28" font-family="sans-serif">${initials}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const OperationContext = createContext<OperationContextValue | null>(null);

function loadState(): OperationState {
  return { roster: seedRoster(), needs: seedNeeds(), overrides: {} };
}

export function OperationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OperationState>(loadState);
  const [hydrated, setHydrated] = useState(false);
  const [setupOpen, setSetupOpen] = useState(false);
  const [setupTab, setSetupTab] = useState<SetupTab>("people");
  const [setupFocus, setSetupFocus] = useState<SetupFocus>("posts");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as OperationState;
        if (parsed.roster && parsed.needs) setState(parsed);
      }
    } catch {
      /* keep seed */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [hydrated, state]);

  const value = useMemo<OperationContextValue>(() => {
    function liveSession(session: DemoSession): DemoSession {
      const override = state.overrides[session.id];
      const posts = neededPosts(state.needs);
      const assignments = override ?? session.assignments;
      const covered = posts.filter((id) => assignments[id]).length;
      return {
        ...session,
        assignments,
        totalPosts: posts.length,
        coveredPosts: covered,
      };
    }

    return {
      ...state,
      setupOpen,
      setupTab,
      setupFocus,
      openSetup(tab = "people") {
        setSetupTab(tab);
        setSetupFocus("setup");
        setSetupOpen(true);
      },
      openPlan() {
        setSetupFocus("posts");
        setSetupOpen(true);
      },
      focusSetup(focus) {
        setSetupFocus(focus);
        setSetupOpen(true);
      },
      closeSetup() {
        setSetupOpen(false);
      },
      addPerson(input) {
        const initials = initialsFromName(input.name);
        const id = `lg-${Date.now()}`;
        setState((current) => {
          const unique = current.roster.some((row) => row.initials === initials)
            ? `${initials}${current.roster.length}`
            : initials;
          return {
            ...current,
            roster: [
              ...current.roster,
              {
                id,
                initials: unique,
                name: input.name.trim(),
                age: input.age,
                photo: input.photo || initialsMark(unique),
                role: input.role,
                available: true,
                seeded: false,
              },
            ],
          };
        });
      },
      updatePerson(id, patch) {
        setState((current) => ({
          ...current,
          roster: current.roster.map((row) =>
            row.id === id ? { ...row, ...patch } : row,
          ),
        }));
      },
      removePerson(id) {
        setState((current) => ({
          ...current,
          roster: current.roster.filter((row) => row.id !== id || row.seeded),
        }));
      },
      toggleRequired(id) {
        setState((current) => {
          const on = current.needs.requiredPosts.includes(id);
          return {
            ...current,
            needs: {
              ...current.needs,
              requiredPosts: on
                ? current.needs.requiredPosts.filter((item) => item !== id)
                : [...current.needs.requiredPosts, id],
              extraPosts: current.needs.extraPosts.filter((item) => item !== id),
            },
          };
        });
      },
      toggleExtra(id) {
        setState((current) => {
          const on = current.needs.extraPosts.includes(id);
          return {
            ...current,
            needs: {
              ...current.needs,
              extraPosts: on
                ? current.needs.extraPosts.filter((item) => item !== id)
                : [...current.needs.extraPosts, id],
              requiredPosts: current.needs.requiredPosts.filter((item) => item !== id),
            },
          };
        });
      },
      toggleDay(day) {
        setState((current) => {
          const on = current.needs.days.includes(day);
          return {
            ...current,
            needs: {
              ...current.needs,
              days: on
                ? current.needs.days.filter((item) => item !== day)
                : [...current.needs.days, day],
            },
          };
        });
      },
      toggleWindow(id) {
        setState((current) => {
          const on = current.needs.windows.includes(id);
          return {
            ...current,
            needs: {
              ...current.needs,
              windows: on
                ? current.needs.windows.filter((item) => item !== id)
                : [...current.needs.windows, id],
            },
          };
        });
      },
      applyFill(sessionId) {
        const session =
          demoSessions.find((item) => item.id === sessionId) ??
          demoSessions.find((item) => item.id === defaultSessionId) ??
          demoSessions[1];
        const filled = fillAssignments(
          session,
          state.roster,
          neededPosts(state.needs),
        );
        setState((current) => ({
          ...current,
          overrides: { ...current.overrides, [session.id]: filled },
        }));
      },
      liveSession,
    };
  }, [setupOpen, setupTab, setupFocus, state]);

  return (
    <OperationContext.Provider value={value}>{children}</OperationContext.Provider>
  );
}

export function useOperation() {
  const value = useContext(OperationContext);
  if (!value) {
    throw new Error("useOperation must be used within OperationProvider");
  }
  return value;
}

export { extraPostIds };
