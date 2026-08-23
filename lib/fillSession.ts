import type { DemoSession, PostAssignment, PostId } from "@/data/demoSessions";
import type { LifeguardProfile } from "@/data/operationSetup";

function asAssignment(
  person: LifeguardProfile,
  fallback: PostAssignment | undefined,
  session: DemoSession,
): PostAssignment {
  return {
    initials: person.initials,
    name: person.name,
    photo: person.photo,
    minutesOnPost: fallback?.minutesOnPost ?? 0,
    status: fallback?.status ?? "OK",
    nextSwap: fallback?.nextSwap ?? session.endTime,
  };
}

export function fillAssignments(
  session: DemoSession,
  roster: LifeguardProfile[],
  needed: PostId[],
): Record<PostId, PostAssignment> {
  const available = roster.filter((person) => person.available);
  const next = { ...session.assignments };
  const used = new Set<string>();
  const filled = new Set<PostId>();

  for (const postId of needed) {
    const current = session.assignments[postId];
    const match = available.find((person) => person.initials === current?.initials);
    if (!match) continue;
    next[postId] = asAssignment(match, current, session);
    used.add(match.initials);
    filled.add(postId);
  }

  const leftover = available
    .filter((person) => !used.has(person.initials))
    .sort((a, b) => Number(b.role === "lead") - Number(a.role === "lead"));

  for (const postId of needed) {
    if (filled.has(postId)) continue;
    const person = leftover.shift();
    if (!person) continue;
    next[postId] = asAssignment(person, session.assignments[postId], session);
    filled.add(postId);
  }

  return next;
}
