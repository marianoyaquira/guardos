"use client";

import { MapStatusPill } from "@/components/app/MapStatusPill";
import type { FatigueRow } from "@/data/demoSessions";
import { useI18n } from "@/lib/i18n-context";
import { cn } from "@/lib/cn";

export function FatigueSummary({
  rows,
  selectedInitials,
  onSelect,
  onViewDetails,
}: {
  rows: FatigueRow[];
  selectedInitials?: string | null;
  onSelect?: (initials: string) => void;
  onViewDetails?: () => void;
}) {
  const { t } = useI18n();

  return (
    <section className="min-w-0 overflow-hidden rounded-2xl border border-[#E6EEF2] bg-white p-4 shadow-[0_8px_24px_rgb(7_27_51_/_0.03)]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-navy">{t.ui.fatigueOverview}</h2>
        <button
          type="button"
          onClick={onViewDetails}
          className="shrink-0 text-xs font-medium text-cyan"
        >
          {t.ui.viewDetails}
        </button>
      </div>
      <table className="w-full table-fixed text-left text-xs">
        <thead>
          <tr className="text-[10px] tracking-[0.08em] text-navy/35 uppercase">
            <th className="pb-2 font-medium">{t.ui.lifeguard}</th>
            <th className="pb-2 font-medium">{t.ui.totalTime}</th>
            <th className="pb-2 font-medium">{t.ui.status}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const selected = selectedInitials === row.initials;
            return (
              <tr
                key={row.id}
                className={cn(
                  "border-t border-[#F0F4F7]",
                  selected && "bg-cyan/6",
                )}
              >
                <td className="py-2 pr-2">
                  <button
                    type="button"
                    onClick={() => onSelect?.(row.initials)}
                    className={cn(
                      "flex w-full min-w-0 items-center gap-2 text-left",
                      onSelect && "rounded-md hover:bg-navy/4",
                    )}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={row.photo}
                      alt={row.name}
                      width={28}
                      height={28}
                      className="h-7 w-7 shrink-0 rounded-full object-cover"
                    />
                    <span className="min-w-0">
                      <span className="block truncate font-medium text-navy">{row.label}</span>
                      <span className="block truncate text-[10px] text-navy/45">{row.name}</span>
                    </span>
                  </button>
                </td>
                <td className="tabular py-2.5 text-navy/65">{row.totalTime}</td>
                <td className="py-2.5">
                  <MapStatusPill status={row.status} compact />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
