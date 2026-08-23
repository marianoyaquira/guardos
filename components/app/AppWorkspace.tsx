"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { FatigueScreen } from "@/components/app/FatigueScreen";
import { GuardOSSidebar } from "@/components/app/GuardOSSidebar";
import { InventoryScreen } from "@/components/app/InventoryScreen";
import { MapScreen } from "@/components/app/MapScreen";
import { ReportsScreen } from "@/components/app/ReportsScreen";
import { RostersScreen } from "@/components/app/RostersScreen";
import { SettingsScreen } from "@/components/app/SettingsScreen";
import { TeamScreen } from "@/components/app/TeamScreen";
import { SessionSetupSlide } from "@/components/app/SessionSetupSlide";
import { isAppView, type AppView } from "@/lib/appViews";
import { OperationProvider } from "@/lib/operation-context";
import { useI18n } from "@/lib/i18n-context";
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
  const { t } = useI18n();
  const [view, setView] = useState<AppView>("mapa");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (embedded) return;
    const hash = window.location.hash.replace("#", "");
    if (isAppView(hash)) setView(hash);
  }, [embedded]);

  function openView(next: AppView) {
    setView(next);
    if (!embedded) {
      window.history.replaceState(null, "", `#${next}`);
    }
    setMenuOpen(false);
  }

  return (
    <OperationProvider>
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

      {menuOpen && (
        <div className={cn("z-40 lg:hidden", embedded ? "absolute inset-0" : "fixed inset-0")}>
          <button
            type="button"
            className="absolute inset-0 bg-navy/30"
            aria-label={t.header.closeMenu}
            onClick={() => setMenuOpen(false)}
          />
          <GuardOSSidebar
            className="relative z-50 h-full shadow-2xl"
            active={view}
            onSelect={openView}
            onNavigate={() => setMenuOpen(false)}
            hideLogout={embedded}
          />
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-[#E6EEF2] bg-white px-4 py-3 lg:hidden">
          <p className="text-sm font-semibold tracking-[0.12em] text-navy">
            GUARD<span className="text-cyan">OS</span>
          </p>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl text-navy"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? t.header.closeMenu : t.header.openMenu}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
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
            {view === "escalas" && <RostersScreen />}
            {view === "fadiga" && <FatigueScreen />}
            {view === "equipe" && <TeamScreen />}
            {view === "relatorios" && <ReportsScreen />}
            {view === "estoque" && <InventoryScreen />}
            {view === "config" && <SettingsScreen />}
          </div>
        )}
      </div>
      {!embedded && <SessionSetupSlide />}
    </div>
    </OperationProvider>
  );
}
