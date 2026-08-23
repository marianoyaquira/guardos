"use client";

import { StatusPill } from "@/components/StatusPill";
import {
  demoFatigueData,
  fatigueThresholdMinutes,
  fatigueZones,
  formatHours,
  totalMinutes,
} from "@/data/demoFatigueData";
import { useReveal } from "@/lib/useReveal";
import { useI18n } from "@/lib/i18n-context";
import { cn } from "@/lib/cn";

const scaleMax = 240;

export function FatigueChart() {
  const { t } = useI18n();
  const { ref, shown } = useReveal<HTMLDivElement>(0.2);

  return (
    <div ref={ref}>
      <h2 className="max-w-xl text-[1.65rem] font-semibold tracking-[-0.03em] text-navy sm:text-3xl">
        {t.fatigue.titleA}
      </h2>
      <div className="console-surface mt-6 rounded-lg border border-white/8 p-4 text-white sm:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-white/40 uppercase">
            {t.fatigue.exposure}
          </p>
          <div className="flex flex-wrap gap-2.5">
            {fatigueZones.map((zone) => (
              <span
                key={zone.id}
                className="inline-flex items-center gap-1.5 text-[10px] text-white/65"
              >
                <span
                  className="h-2 w-2 rounded-sm"
                  style={{ background: zone.color }}
                />
                {t.fatigue.zones[zone.id]}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-3.5">
          {demoFatigueData.map((entry, index) => {
            const total = totalMinutes(entry);
            return (
              <div
                key={entry.id}
                className="grid min-w-0 grid-cols-[48px_minmax(0,1fr)_auto] items-center gap-2 sm:grid-cols-[64px_minmax(0,1fr)_auto] sm:gap-3"
              >
                <p className="text-xs font-medium text-white/80">{entry.label}</p>
                <div className="relative h-7 overflow-hidden rounded-sm bg-white/6">
                  <div
                    className={cn(
                      "absolute inset-y-0 left-0 flex overflow-hidden",
                      shown ? "grow-x" : "w-0",
                    )}
                    style={{
                      width: shown ? `${(total / scaleMax) * 100}%` : 0,
                      animationDelay: `${index * 90}ms`,
                    }}
                  >
                    {fatigueZones.map((zone) => {
                      const value = entry.minutes[zone.id];
                      if (!value) return null;
                      return (
                        <span
                          key={zone.id}
                          className="h-full"
                          style={{
                            width: `${(value / total) * 100}%`,
                            background: zone.color,
                          }}
                        />
                      );
                    })}
                  </div>
                  <span
                    className="absolute inset-y-0 z-10 w-px bg-[#E11D48]"
                    style={{
                      left: `${(fatigueThresholdMinutes / scaleMax) * 100}%`,
                    }}
                  />
                </div>
                <div className="flex min-w-[4.25rem] flex-col items-end gap-1 sm:min-w-[6.5rem] sm:flex-row sm:items-center sm:justify-end sm:gap-2">
                  <span className="tabular text-[11px] text-white/50">
                    {formatHours(total)}
                  </span>
                  <StatusPill status={entry.status} compact />
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-5 grid min-w-0 grid-cols-[48px_minmax(0,1fr)_auto] gap-2 text-[10px] text-white/40 sm:grid-cols-[64px_minmax(0,1fr)_auto] sm:gap-3">
          <span />
          <div className="min-w-0">
            <div className="flex justify-between">
              <span>0h</span>
              <span>4h00</span>
            </div>
            <p className="mt-2 text-[10px] tracking-[0.06em] text-[#F87171] uppercase">
              {t.fatigue.threshold}
            </p>
          </div>
          <span className="min-w-[4.25rem] sm:min-w-[6.5rem]" />
        </div>
      </div>
    </div>
  );
}
