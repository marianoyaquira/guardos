"use client";

import { Check } from "lucide-react";
import { DemoNote } from "@/components/DemoNote";
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
    <div
      ref={ref}
      className="overflow-hidden rounded-[20px] border border-navy/8 bg-white shadow-[0_12px_40px_rgb(7_27_51_/_0.04)]"
    >
      <div className="grid gap-8 px-5 py-8 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
        <div>
          <p className="kicker text-cyan-deep">{t.fatigue.kicker}</p>
          <h3 className="section-title mt-3 text-navy">
            {t.fatigue.titleA}
            <span className="block">{t.fatigue.titleB}</span>
          </h3>
          <ul className="mt-6 space-y-2.5">
            {t.fatigue.benefits.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-navy/70">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-ok" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="console-surface rounded-xl border border-white/8 p-4 text-white sm:p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="kicker text-white/40">{t.fatigue.exposure}</p>
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
                  className="grid grid-cols-[52px_1fr_auto] items-center gap-2 sm:grid-cols-[64px_1fr_auto] sm:gap-3"
                >
                  <p className="text-xs font-medium text-white/80">{entry.label}</p>
                  <div className="relative h-7 overflow-hidden rounded-md bg-white/6">
                    <div
                      className={cn(
                        "absolute inset-y-0 left-0 flex overflow-hidden rounded-md",
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
                      className="absolute inset-y-0 z-10 w-px bg-alert/80"
                      style={{
                        left: `${(fatigueThresholdMinutes / scaleMax) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="flex min-w-[4.5rem] flex-col items-end gap-1 sm:min-w-[6.5rem] sm:flex-row sm:items-center sm:justify-end sm:gap-2">
                    <span className="tabular text-[11px] text-white/50">
                      {formatHours(total)}
                    </span>
                    <StatusPill status={entry.status} compact />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="relative mt-5 text-[10px] text-white/40">
            <div className="flex justify-between">
              <span>0h</span>
              <span>4h00</span>
            </div>
            <span
              className="absolute -top-1 -translate-x-1/2 rounded-full border border-alert/30 bg-alert/15 px-2 py-0.5 text-[9px] tracking-[0.08em] text-alert uppercase"
              style={{
                left: `${(fatigueThresholdMinutes / scaleMax) * 100}%`,
              }}
            >
              {t.fatigue.threshold}
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-navy/6 px-5 py-3 sm:px-8">
        <DemoNote />
      </div>
    </div>
  );
}
