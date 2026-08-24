import type { Metadata } from "next";
import { GaropabaProvider } from "@/lib/garopaba-context";

export const metadata: Metadata = {
  title: "GuardOS · Garopaba",
  description: "Operação Veraneio — centro de comando costeiro de Garopaba.",
};

export default function GaropabaLayout({ children }: { children: React.ReactNode }) {
  return <GaropabaProvider>{children}</GaropabaProvider>;
}
