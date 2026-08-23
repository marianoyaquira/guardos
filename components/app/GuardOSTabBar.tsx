"use client";

import {
  Boxes,
  CalendarClock,
  CalendarRange,
  ClipboardList,
  LogOut,
  Map,
  MoreHorizontal,
  Settings,
  Shield,
  Users,
} from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { cn } from "@/lib/cn";
import type { AppView } from "@/lib/appViews";

const primary = [
  { id: "mapa" as const, icon: Map },
  { id: "escalas" as const, icon: CalendarRange },
  { id: "fadiga" as const, icon: Shield },
];

const extra = [
  { id: "sessao" as const, icon: CalendarClock },
  { id: "equipe" as const, icon: Users },
  { id: "relatorios" as const, icon: ClipboardList },
  { id: "estoque" as const, icon: Boxes },
  { id: "config" as const, icon: Settings },
];

const extraIds: AppView[] = extra.map((item) => item.id);

export function GuardOSTabBar({
  active,
  moreOpen,
  onSelect,
  onToggleMore,
  hideLogout = false,
}: {
  active: AppView;
  moreOpen: boolean;
  onSelect: (view: AppView) => void;
  onToggleMore: () => void;
  hideLogout?: boolean;
}) {
  const { t } = useI18n();
  const labels: Record<AppView, string> = {
    mapa: t.ui.navMap,
    sessao: t.ui.navSession,
    escalas: t.ui.navRosters,
    fadiga: t.ui.navFatigue,
    equipe: t.ui.navTeam,
    relatorios: t.ui.navReports,
    estoque: t.ui.navInventory,
    config: t.ui.navSettings,
  };
  const moreActive = extraIds.includes(active);

  return (
    <>
      {moreOpen && (
        <div className="fixed inset-x-0 bottom-[calc(4.25rem+env(safe-area-inset-bottom))] z-40 lg:hidden">
          <button
            type="button"
            className="fixed inset-0 bg-navy/30"
            aria-label={t.header.closeMenu}
            onClick={onToggleMore}
          />
          <div className="relative mx-3 mb-2 overflow-hidden rounded-2xl border border-[#E6EEF2] bg-white shadow-[0_-8px_32px_rgb(7_27_51_/_0.1)]">
            <ul className="divide-y divide-[#F0F4F7]">
              {extra.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => onSelect(item.id)}
                      aria-current={item.id === active ? "page" : undefined}
                      className={cn(
                        "flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium",
                        item.id === active ? "bg-cyan/8 text-cyan" : "text-navy/75",
                      )}
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.8} />
                      {labels[item.id]}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center gap-3 border-t border-[#E6EEF2] px-4 py-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#0C2744] text-[10px] font-semibold text-white">
                LS
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-navy">Lucas Silva</p>
                <p className="text-xs text-navy/45">{t.ui.supervisor}</p>
              </div>
              {!hideLogout && (
                <a
                  href="/"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy/50"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  {t.ui.logout}
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E6EEF2] bg-white pb-[env(safe-area-inset-bottom)] lg:hidden"
        aria-label={t.ui.navMap}
      >
        <ul className="grid h-[4.25rem] grid-cols-4">
          {primary.map((item) => {
            const Icon = item.icon;
            const on = item.id === active;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onSelect(item.id)}
                  aria-current={on ? "page" : undefined}
                  className={cn(
                    "flex h-full w-full flex-col items-center justify-center gap-1 text-[11px] font-semibold",
                    on ? "text-cyan" : "text-navy/45",
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={on ? 2.1 : 1.8} />
                  {labels[item.id]}
                </button>
              </li>
            );
          })}
          <li>
            <button
              type="button"
              onClick={onToggleMore}
              aria-expanded={moreOpen}
              aria-label={t.ui.navMore}
              className={cn(
                "flex h-full w-full flex-col items-center justify-center gap-1 text-[11px] font-semibold",
                moreOpen || moreActive ? "text-cyan" : "text-navy/45",
              )}
            >
              <MoreHorizontal className="h-5 w-5" strokeWidth={moreOpen || moreActive ? 2.1 : 1.8} />
              {t.ui.navMore}
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
