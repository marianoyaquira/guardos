"use client";

import { useEffect, useState } from "react";
import { FatigueScreen } from "@/components/app/FatigueScreen";
import { GuardOSSidebar } from "@/components/app/GuardOSSidebar";
import { GuardOSTabBar } from "@/components/app/GuardOSTabBar";
import { InventoryScreen } from "@/components/app/InventoryScreen";
import { MapScreen } from "@/components/app/MapScreen";
import { ReportsScreen } from "@/components/app/ReportsScreen";
import { RostersScreen } from "@/components/app/RostersScreen";
import { SettingsScreen } from "@/components/app/SettingsScreen";
import { TeamScreen } from "@/components/app/TeamScreen";
import { SessionSetupSlide } from "@/components/app/SessionSetupSlide";
import { isAppView, type AppView } from "@/lib/appViews";
import { AppNavProvider } from "@/lib/app-nav";
import { OperationProvider } from "@/lib/operation-context";
import { cn } from "@/lib/cn";

export function AppWorkspace({
  embedded = false,
  sessionId,
  onSessionChange,
}: {
  embedded?: boolean;
  sessionId?: string;
  onSessionChange?: (id: string) => void;
}) {
  const [view, setView] = useState<AppView>("mapa");
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    if (embedded) return;
    const hash = window.location.hash.replace("#", "");
    if (isAppView(hash)) setView(hash);
  }, [embedded]);

  function openView(next: AppView) {
    setView(next);
    setMoreOpen(false);
    if (!embedded) {
      window.history.replaceState(null, "", `#${next}`);
    }
  }

  return (
    <OperationProvider>
    <AppNavProvider openView={openView}>
    <div
      className={cn(
        "relative flex w-full max-w-full overflow-hidden bg-app-bg text-navy",
        embedded ? "min-h-[min(86vh,820px)]" : "min-h-screen overflow-x-hidden",
      )}
    >
      <GuardOSSidebar
        className="hidden lg:flex"
        active={view}
        onSelect={openView}
        hideLogout={embedded}
      />

      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col",
          !embedded && "pb-[calc(4.25rem+env(safe-area-inset-bottom))] lg:pb-0",
        )}
      >
        <header className="flex items-center border-b border-[#E6EEF2] bg-white px-4 py-3 lg:hidden">
          <p className="text-sm font-semibold tracking-[0.12em] text-navy">
            GUARD<span className="text-cyan">OS</span>
          </p>
        </header>

        {view === "mapa" ? (
          <MapScreen
            sessionId={sessionId}
            onSessionChange={onSessionChange}
            embedded={embedded}
            showSidebar={false}
            onOpenFatigue={() => openView("fadiga")}
          />
        ) : (
          <div className="min-w-0 flex-1 overflow-y-auto p-3 md:p-4 lg:p-5">
            {view === "sessao" && <SessionSetupSlide />}
            {view === "escalas" && <RostersScreen />}
            {view === "fadiga" && <FatigueScreen />}
            {view === "equipe" && <TeamScreen />}
            {view === "relatorios" && <ReportsScreen />}
            {view === "estoque" && <InventoryScreen />}
            {view === "config" && <SettingsScreen />}
          </div>
        )}
      </div>
      {!embedded && (
        <GuardOSTabBar
          active={view}
          moreOpen={moreOpen}
          onSelect={openView}
          onToggleMore={() => setMoreOpen((value) => !value)}
          hideLogout={embedded}
        />
      )}
    </div>
    </AppNavProvider>
    </OperationProvider>
  );
}
