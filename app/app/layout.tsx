import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GuardOS",
  description:
    "The Guard Operational System — live map, rosters, fatigue, team, reports, and inventory.",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return children;
}
