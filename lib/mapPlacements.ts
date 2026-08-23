import { mapPosts, type PostId } from "@/data/demoSessions";

export type PostPlacement = {
  x: number;
  y: number;
  onMap: boolean;
};

export type PlacementMap = Record<PostId, PostPlacement>;

export function defaultPlacements(): PlacementMap {
  return Object.fromEntries(
    mapPosts.map((post) => [post.id, { x: post.x, y: post.y, onMap: true }]),
  ) as PlacementMap;
}

export function clampMapPercent(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function clientToMapPercent(
  clientX: number,
  clientY: number,
  rect: DOMRect,
) {
  if (rect.width === 0 || rect.height === 0) return null;
  return {
    x: clampMapPercent(((clientX - rect.left) / rect.width) * 100, 6, 94),
    y: clampMapPercent(((clientY - rect.top) / rect.height) * 100, 10, 90),
  };
}
