import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mapa · GuardOS",
  description:
    "Centro operacional do supervisor — mapa de rodízio, cobertura e sessão ativa.",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return children;
}
