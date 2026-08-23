import type { PostId } from "@/data/demoSessions";

export const postPlaceImage: Record<PostId, string> = {
  p01: "/guardos/places/place-wave-teal.png",
  p02: "/guardos/places/place-wave-navy.png",
  p03: "/guardos/places/place-wave-amber.png",
  p04: "/guardos/places/place-wave-coral.png",
  p05: "/guardos/places/place-wave-teal.png",
  p06: "/guardos/places/place-wave-navy.png",
  p07: "/guardos/places/place-wave-amber.png",
  pier: "/guardos/places/place-pier.png",
  ct: "/guardos/places/place-tower.png",
  lobby: "/guardos/places/place-lobby.png",
};

export const postPlaceBadge: Record<PostId, string> = {
  p01: "01",
  p02: "02",
  p03: "03",
  p04: "04",
  p05: "05",
  p06: "06",
  p07: "07",
  pier: "PIER",
  ct: "CT",
  lobby: "IN",
};

export const postPlaceTint: Record<PostId, string> = {
  p01: "bg-[#079CB3]",
  p02: "bg-[#0C2744]",
  p03: "bg-[#C9862A]",
  p04: "bg-[#D4654F]",
  p05: "bg-[#079CB3]",
  p06: "bg-[#0C2744]",
  p07: "bg-[#C9862A]",
  pier: "bg-[#8B5A2B]",
  ct: "bg-[#1F4D6A]",
  lobby: "bg-[#3D6B7A]",
};
