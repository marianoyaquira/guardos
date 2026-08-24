import { demoDay } from "@/data/garopaba/seed";
import type {
  Assignment,
  AttendanceStatus,
  Beach,
  Lifeguard,
  Post,
  Season,
} from "@/data/garopaba/types";

export type DayPatch = {
  postId?: string;
  beachId?: string;
  attendance?: AttendanceStatus;
};

export function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseDateKey(key: string) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day, 12, 0, 0, 0);
}

export function seasonDateKeys(season: Season) {
  const keys: string[] = [];
  const cursor = parseDateKey(season.startsAt);
  const end = parseDateKey(season.endsAt);
  while (cursor.getTime() <= end.getTime()) {
    keys.push(toDateKey(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return keys;
}

export function monthKey(dateKey: string) {
  return dateKey.slice(0, 7);
}

export function monthLabel(key: string) {
  const date = parseDateKey(`${key}-01`);
  return date.toLocaleDateString("pt-BR", { month: "short", year: "numeric" });
}

export function weekdayLabel(dateKey: string) {
  return parseDateKey(dateKey).toLocaleDateString("pt-BR", { weekday: "short" });
}

export function dayNumber(dateKey: string) {
  return dateKey.slice(8);
}

export function seasonMonths(keys: string[]) {
  const seen = new Set<string>();
  const months: { key: string; label: string }[] = [];
  for (const key of keys) {
    const month = monthKey(key);
    if (seen.has(month)) continue;
    seen.add(month);
    months.push({ key: month, label: monthLabel(month) });
  }
  return months;
}

function rotate<T>(rows: T[], offset: number) {
  if (rows.length === 0) return rows;
  const shift = ((offset % rows.length) + rows.length) % rows.length;
  return [...rows.slice(shift), ...rows.slice(0, shift)];
}

export function buildDayAssignments(
  dateKey: string,
  posts: Post[],
  people: Lifeguard[],
  seed: Assignment[],
): Assignment[] {
  if (dateKey === demoDay) {
    return seed.map((row) => ({ ...row }));
  }

  const dayIndex = Math.max(
    0,
    Math.round(
      (parseDateKey(dateKey).getTime() - parseDateKey(demoDay).getTime()) /
        86_400_000,
    ),
  );
  const sunday = parseDateKey(dateKey).getDay() === 0;
  const next: Assignment[] = [];

  const beachIds = [...new Set(posts.filter((post) => post.active).map((post) => post.beachId))];
  for (const beachId of beachIds) {
    const beachPosts = posts.filter((post) => post.beachId === beachId && post.active);
    const roster = seed.filter((row) => row.beachId === beachId);
    const rotated = rotate(roster, dayIndex);
    const folgaId =
      sunday && rotated.length > 0
        ? rotated[Math.abs(dayIndex) % rotated.length]?.personId
        : null;

    let cursor = 0;
    for (const post of beachPosts) {
      for (let slot = 0; slot < post.baseTarget; slot += 1) {
        const source = rotated[cursor];
        cursor += 1;
        if (!source) continue;
        const person = people.find((row) => row.id === source.personId);
        if (!person) continue;
        const off = source.personId === folgaId;
        next.push({
          ...source,
          id: `as-${dateKey}-${source.personId}`,
          postId: post.id,
          beachId,
          attendance: off ? "folga" : "presente",
          onBreak: false,
          minutesOnDuty: off ? 0 : source.minutesOnDuty,
          minutesOnPost: off ? 0 : source.minutesOnPost,
        });
      }
    }
  }

  return next;
}

export function applyDayPatches(
  rows: Assignment[],
  patches: Record<string, DayPatch> | undefined,
) {
  if (!patches) return rows;
  return rows.map((row) => {
    const patch = patches[row.personId];
    if (!patch) return row;
    return { ...row, ...patch };
  });
}

export function assignmentsOnDay(
  dateKey: string,
  posts: Post[],
  people: Lifeguard[],
  seed: Assignment[],
  patches: Record<string, Record<string, DayPatch>>,
) {
  return applyDayPatches(buildDayAssignments(dateKey, posts, people, seed), patches[dateKey]);
}

export function personSeason(
  personId: string,
  keys: string[],
  posts: Post[],
  people: Lifeguard[],
  seed: Assignment[],
  patches: Record<string, Record<string, DayPatch>>,
) {
  return keys.map((dateKey) => {
    const row = assignmentsOnDay(dateKey, posts, people, seed, patches).find(
      (item) => item.personId === personId,
    );
    const post = row ? posts.find((item) => item.id === row.postId) : undefined;
    return { dateKey, row, post };
  });
}

export function postSeason(
  postId: string,
  keys: string[],
  posts: Post[],
  people: Lifeguard[],
  beaches: Beach[],
  seed: Assignment[],
  patches: Record<string, Record<string, DayPatch>>,
) {
  return keys.map((dateKey) => {
    const rows = assignmentsOnDay(dateKey, posts, people, seed, patches).filter(
      (item) => item.postId === postId,
    );
    return {
      dateKey,
      rows,
      people: rows
        .map((row) => people.find((person) => person.id === row.personId))
        .filter((person): person is Lifeguard => Boolean(person)),
      beach: beaches.find((beach) => beach.id === posts.find((post) => post.id === postId)?.beachId),
    };
  });
}
