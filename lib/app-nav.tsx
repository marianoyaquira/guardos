"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { AppView } from "@/lib/appViews";

const AppNavContext = createContext<(view: AppView) => void>(() => {});

export function AppNavProvider({
  openView,
  children,
}: {
  openView: (view: AppView) => void;
  children: ReactNode;
}) {
  return <AppNavContext.Provider value={openView}>{children}</AppNavContext.Provider>;
}

export function useAppNav() {
  return useContext(AppNavContext);
}
