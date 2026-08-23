import {
  demoSessions,
  mapPosts,
  people,
  type PostId,
} from "@/data/demoSessions";

export type LifeguardRole = "lifeguard" | "lead";

export type Weekday = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export type LifeguardProfile = {
  id: string;
  initials: string;
  name: string;
  age?: number;
  photo: string;
  role: LifeguardRole;
  available: boolean;
  seeded: boolean;
};

export type CoverageNeeds = {
  requiredPosts: PostId[];
  extraPosts: PostId[];
  days: Weekday[];
  windows: string[];
};

export const weekdays: Weekday[] = [
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
  "sun",
];

export const basePostIds: PostId[] = [
  "p01",
  "p02",
  "p03",
  "p04",
  "p05",
  "p06",
  "p07",
  "pier",
];

export const extraPostIds: PostId[] = ["ct", "lobby"];

export function seedRoster(): LifeguardProfile[] {
  return Object.values(people).map((person) => ({
    id: person.initials,
    initials: person.initials,
    name: person.name,
    photo: person.photo,
    role: "lifeguard" as const,
    available: true,
    seeded: true,
  }));
}

export function seedNeeds(): CoverageNeeds {
  return {
    requiredPosts: [...basePostIds],
    extraPosts: [],
    days: ["mon", "tue", "wed", "thu", "fri"],
    windows: demoSessions.map((session) => session.id),
  };
}

export function neededPosts(needs: CoverageNeeds): PostId[] {
  return [...needs.requiredPosts, ...needs.extraPosts];
}

export function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "LG";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export const knownPosts = mapPosts;
