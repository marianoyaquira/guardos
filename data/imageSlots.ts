/**
 * Photography slots for the landing.
 * hero + aerial are filled from the project’s wave-pool geometry.
 * Remaining Surfland-branded slots stay empty until an approved
 * photograph is supplied — never generate or invent those frames.
 */
export const images = {
  surflandHero: "/images/surfland/hero.jpg",
  surflandAerial: "/images/surfland/wave-pool-aerial.jpg",
  operationalMap: "/guardos/wave-pool-map.jpg",
  pedro: "/images/surfland/pedro.png",
} as const;

export const pendingSurflandSlots = [
  "/images/surfland/lifeguard-operation.jpg",
  "/images/surfland/surf-session.jpg",
  "/images/surfland/pool-detail.jpg",
] as const;
