"use client";

import {
  Boxes,
  ClipboardList,
  LogOut,
  Map,
  Settings,
  Shield,
  Users,
  CalendarRange,
} from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { cn } from "@/lib/cn";
import type { AppView } from "@/lib/appViews";

export function GuardOSSidebar({
  className,
  active = "mapa",
  onSelect,
  onNavigate,
  hideLogout = false,
}: {
  className?: string;
  active?: AppView;
  onSelect?: (view: AppView) => void;
  onNavigate?: () => void;
  hideLogout?: boolean;
}) {
  const { t } = useI18n();
  const items: { id: AppView; label: string; icon: typeof Map }[] = [
    { id: "mapa", label: t.ui.navMap, icon: Map },
    { id: "escalas", label: t.ui.navRosters, icon: CalendarRange },
    { id: "fadiga", label: t.ui.navFatigue, icon: Shield },
    { id: "equipe", label: t.ui.navTeam, icon: Users },
    { id: "relatorios", label: t.ui.navReports, icon: ClipboardList },
    { id: "estoque", label: t.ui.navInventory, icon: Boxes },
    { id: "config", label: t.ui.navSettings, icon: Settings },
  ];

  return (
    <aside
      className={cn(
        "flex h-full w-[248px] shrink-0 flex-col border-r border-[#E6EEF2] bg-white",
        className,
      )}
    >
      <div className="px-5 pt-6 pb-5">
        <p className="text-[18px] font-semibold tracking-[0.14em] text-navy">
          GUARD<span className="text-cyan">OS</span>
        </p>
        <p className="mt-1 text-[9px] font-medium tracking-[0.16em] text-navy/40 uppercase">
          {t.ui.productTagline}
        </p>
      </div>

      <nav className="flex-1 space-y-1 px-3" aria-label={t.ui.navMap}>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onSelect?.(item.id);
                onNavigate?.();
              }}
              aria-current={item.id === active ? "page" : undefined}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors",
                item.id === active
                  ? "bg-cyan text-white shadow-[0_8px_20px_rgb(7_156_179_/_0.22)]"
                  : "text-navy/70 hover:bg-[#F3F8FA] hover:text-navy",
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={1.8} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-[#E6EEF2] p-4">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#0C2744] text-[11px] font-semibold tracking-wide text-white">
            LS
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-navy">Lucas Silva</p>
            <p className="text-xs text-navy/45">{t.ui.supervisor}</p>
          </div>
        </div>
        {!hideLogout && (
          <a
            href="/"
            className="mt-3 flex w-full items-center gap-2 rounded-xl px-2 py-2 text-sm text-navy/55 transition-colors hover:bg-[#F3F8FA] hover:text-navy"
          >
            <LogOut className="h-4 w-4" />
            {t.ui.logout}
          </a>
        )}
      </div>
    </aside>
  );
}
