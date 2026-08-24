import type {
  Assignment,
  Beach,
  FatigueLevel,
  Incident,
  Post,
  StaffingMode,
} from "@/data/garopaba/types";

export function postTarget(post: Post, mode: StaffingMode) {
  return mode === "reforco" ? post.reinforcedTarget : post.baseTarget;
}

export function isPresent(row: Assignment) {
  return row.attendance === "presente";
}

export function presentOnPost(assignments: Assignment[], postId: string) {
  return assignments.filter((row) => row.postId === postId && isPresent(row)).length;
}

export function postStatus(
  present: number,
  target: number,
): "ok" | "watch" | "critical" | "closed" {
  if (target <= 0) return "closed";
  if (present >= target) return "ok";
  if (present === 0) return "critical";
  return "watch";
}

export function coveragePercent(present: number, target: number) {
  if (target <= 0) return 0;
  return Math.min(100, Math.round((present / target) * 100));
}

export function fatigueLevel(
  assignment: Assignment,
  attentionMinutes: number,
  highMinutes: number,
): FatigueLevel {
  if (!isPresent(assignment)) return "OK";
  if (assignment.minutesOnDuty >= highMinutes) return "ALTO";
  if (assignment.minutesOnDuty >= attentionMinutes) return "ATENCAO";
  return "OK";
}

export function municipalityCoverage(
  beaches: Beach[],
  posts: Post[],
  assignments: Assignment[],
  mode: StaffingMode,
) {
  const activeBeaches = beaches.filter((beach) => beach.active);
  const activePosts = posts.filter(
    (post) => post.active && activeBeaches.some((beach) => beach.id === post.beachId),
  );
  const target = activePosts.reduce((sum, post) => sum + postTarget(post, mode), 0);
  const present = assignments.filter(
    (row) =>
      isPresent(row) && activePosts.some((post) => post.id === row.postId),
  ).length;
  const coveredPosts = activePosts.filter(
    (post) => presentOnPost(assignments, post.id) >= postTarget(post, mode),
  ).length;
  return {
    present,
    target,
    coveredPosts,
    totalPosts: activePosts.length,
    percent: coveragePercent(present, target),
    extra: Math.max(0, present - target),
  };
}

export function beachCoverage(
  beachId: string,
  posts: Post[],
  assignments: Assignment[],
  mode: StaffingMode,
) {
  const beachPosts = posts.filter((post) => post.beachId === beachId && post.active);
  const target = beachPosts.reduce((sum, post) => sum + postTarget(post, mode), 0);
  const present = assignments.filter(
    (row) => isPresent(row) && beachPosts.some((post) => post.id === row.postId),
  ).length;
  const coveredPosts = beachPosts.filter(
    (post) => presentOnPost(assignments, post.id) >= postTarget(post, mode),
  ).length;
  return {
    present,
    target,
    coveredPosts,
    totalPosts: beachPosts.length,
    percent: coveragePercent(present, target),
    extra: Math.max(0, present - target),
    status: postStatus(present, target),
  };
}

export function openAlerts(
  beaches: Beach[],
  posts: Post[],
  assignments: Assignment[],
  incidents: Incident[],
  mode: StaffingMode,
  attentionMinutes: number,
  highMinutes: number,
) {
  const gaps = posts.filter((post) => {
    if (!post.active) return false;
    return presentOnPost(assignments, post.id) < postTarget(post, mode);
  }).length;
  const fatigue = assignments.filter(
    (row) => fatigueLevel(row, attentionMinutes, highMinutes) !== "OK",
  ).length;
  const openIncidents = incidents.filter((item) => item.status !== "encerrada").length;
  return gaps + fatigue + openIncidents;
}

export function displayCoord(
  beach: { latitude: number; longitude: number },
  post: Post,
  index: number,
  total: number,
): [number, number] {
  if (post.latitude != null && post.longitude != null) {
    return [post.latitude, post.longitude];
  }
  const angle = (index / Math.max(total, 1)) * Math.PI * 1.5 - 0.75;
  return [beach.latitude + Math.cos(angle) * 0.0036, beach.longitude + Math.sin(angle) * 0.0044];
}
