import { seedBeaches } from "@/data/garopaba/seed";
import type { Beach, Post } from "@/data/garopaba/types";

export type MapAnchors = {
  beaches: Record<string, { latitude: number; longitude: number }>;
  posts: Record<string, { latitude: number; longitude: number }>;
};

export const ANCHOR_KEY = "guardos.garopaba.anchors.v1";

export function emptyAnchors(): MapAnchors {
  return { beaches: {}, posts: {} };
}

export function readMapAnchors(): MapAnchors {
  if (typeof window === "undefined") return emptyAnchors();
  try {
    const raw = window.localStorage.getItem(ANCHOR_KEY);
    if (!raw) return emptyAnchors();
    const parsed = JSON.parse(raw) as MapAnchors;
    return {
      beaches: parsed.beaches ?? {},
      posts: parsed.posts ?? {},
    };
  } catch {
    return emptyAnchors();
  }
}

function writeMapAnchors(anchors: MapAnchors) {
  window.localStorage.setItem(ANCHOR_KEY, JSON.stringify(anchors));
}

export function pinBeachAnchor(id: string, latitude: number, longitude: number) {
  const anchors = readMapAnchors();
  anchors.beaches[id] = { latitude, longitude };
  writeMapAnchors(anchors);
}

export function pinPostAnchor(id: string, latitude: number, longitude: number) {
  const anchors = readMapAnchors();
  anchors.posts[id] = { latitude, longitude };
  writeMapAnchors(anchors);
}

export function captureAnchorsFromState(beaches: Beach[], posts: Post[]) {
  const anchors = readMapAnchors();
  let changed = false;
  for (const beach of beaches) {
    if (anchors.beaches[beach.id]) continue;
    const seed = seedBeaches.find((row) => row.id === beach.id);
    if (
      !seed ||
      seed.latitude !== beach.latitude ||
      seed.longitude !== beach.longitude
    ) {
      anchors.beaches[beach.id] = {
        latitude: beach.latitude,
        longitude: beach.longitude,
      };
      changed = true;
    }
  }
  for (const post of posts) {
    if (anchors.posts[post.id]) continue;
    if (post.latitude == null || post.longitude == null) continue;
    anchors.posts[post.id] = {
      latitude: post.latitude,
      longitude: post.longitude,
    };
    changed = true;
  }
  if (changed) writeMapAnchors(anchors);
}

export function applyMapAnchors<T extends { beaches: Beach[]; posts: Post[] }>(
  state: T,
): T {
  const anchors = readMapAnchors();
  return {
    ...state,
    beaches: state.beaches.map((beach) => {
      const pin = anchors.beaches[beach.id];
      return pin ? { ...beach, latitude: pin.latitude, longitude: pin.longitude } : beach;
    }),
    posts: state.posts.map((post) => {
      const pin = anchors.posts[post.id];
      return pin ? { ...post, latitude: pin.latitude, longitude: pin.longitude } : post;
    }),
  };
}
