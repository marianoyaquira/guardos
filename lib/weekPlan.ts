import { demoSessions, type PostAssignment, type PostId } from "@/data/demoSessions";
import {
  neededPosts,
  type CoverageNeeds,
  type LifeguardProfile,
  type Weekday,
} from "@/data/operationSetup";
import { fillAssignments } from "@/lib/fillSession";

export type PlanSlot = {
  dateKey: string;
  weekday: Weekday;
  dayOffset: number;
  sessionId: string;
  startTime: string;
  endTime: string;
  open: boolean;
  assignments: Record<PostId, PostAssignment>;
};

const jsWeekday: Weekday[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

function dateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(from: Date, days: number) {
  const next = new Date(from);
  next.setDate(from.getDate() + days);
  next.setHours(12, 0, 0, 0);
  return next;
}

function rotateAssignments(
  base: Record<PostId, PostAssignment>,
  needed: PostId[],
  offset: number,
): Record<PostId, PostAssignment> {
  const peopleOn = needed
    .map((id) => base[id])
    .filter((row): row is PostAssignment => Boolean(row));
  if (peopleOn.length === 0) return base;
  const next = { ...base };
  needed.forEach((id, index) => {
    const person = peopleOn[(index + offset) % peopleOn.length];
    const post = base[id];
    if (!person || !post) return;
    next[id] = {
      ...post,
      initials: person.initials,
      name: person.name,
      photo: person.photo,
    };
  });
  return next;
}

export function buildWeekPlan(
  needs: CoverageNeeds,
  roster: LifeguardProfile[],
  overrides: Partial<Record<string, Record<PostId, PostAssignment>>>,
  from = new Date(),
): PlanSlot[] {
  const needed = neededPosts(needs);
  const slots: PlanSlot[] = [];

  for (let day = 0; day < 7; day += 1) {
    const date = addDays(from, day);
    const weekday = jsWeekday[date.getDay()];
    const open = needs.days.includes(weekday);

    for (const session of demoSessions) {
      if (!needs.windows.includes(session.id)) continue;
      const filled =
        overrides[session.id] ?? fillAssignments(session, roster, needed);
      slots.push({
        dateKey: dateKey(date),
        weekday,
        dayOffset: day,
        sessionId: session.id,
        startTime: session.startTime,
        endTime: session.endTime,
        open,
        assignments: open ? rotateAssignments(filled, needed, day) : filled,
      });
    }
  }

  return slots;
}

export function postForPerson(slot: PlanSlot, initials: string): PostId | null {
  const match = Object.entries(slot.assignments).find(
    ([, row]) => row.initials === initials,
  );
  return (match?.[0] as PostId) ?? null;
}

export function groupPlanByDay(slots: PlanSlot[]) {
  const groups: { dateKey: string; weekday: Weekday; open: boolean; slots: PlanSlot[] }[] =
    [];
  for (const slot of slots) {
    const last = groups[groups.length - 1];
    if (last && last.dateKey === slot.dateKey) {
      last.slots.push(slot);
      continue;
    }
    groups.push({
      dateKey: slot.dateKey,
      weekday: slot.weekday,
      open: slot.open,
      slots: [slot],
    });
  }
  return groups;
}
