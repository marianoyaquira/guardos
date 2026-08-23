"use client";

import { AppScreenHeader } from "@/components/app/AppScreenHeader";
import { MapStatusPill } from "@/components/app/MapStatusPill";
import {
  demoFatigueData,
  fatigueScaleMinutes,
  fatigueThresholdMinutes,
  fatigueZones,
  formatHours,
  sortByAttention,
  totalMinutes,
  zoneRollups,
} from "@/data/demoFatigueData";
import { people } from "@/data/demoSessions";
import { useI18n } from "@/lib/i18n-context";
import { cn } from "@/lib/cn";

const personByGuard: Record<string, (typeof people)[keyof typeof people]> = {
  gv01: people.LS,
  gv02: people.MR,
  gv03: people.JP,
  gv04: people.TZ,
  gv06: people.RC,
};

export function FatigueScreen() {
  const { t } = useI18n();
  const rows = sortByAttention(demoFatigueData);
  const rollups = [...zoneRollups(demoFatigueData)].sort(
    (a, b) => b.alerts - a.alerts || b.avg - a.avg,
  );
  const thresholdPct = (fatigueThresholdMinutes / fatigueScaleMinutes) * 100;

  return (
    <div className="min-w-0 space-y-5">
      <AppScreenHeader title={t.ui.navFatigue} lead={t.app.fatigueLead} />

      <div className="rounded-2xl border border-[#FDECEC] bg-[#FFF8F8] px-4 py-3">
        <p className="text-sm font-medium text-[#C24141]">{t.app.highHint}</p>
        <p className="mt-1 text-xs text-navy/50">{t.app.watchHint}</p>
      </div>

      <div>
        <p className="text-[11px] font-semibold tracking-[0.12em] text-navy/35 uppercase">
          {t.app.exposureByZone}
        </p>
        <ul className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {rollups.map((zone) => (
            <li
              key={zone.id}
              className="min-w-0 rounded-2xl border border-[#E6EEF2] bg-white px-3 py-3"
            >
              <p className="text-[11px] font-semibold tracking-[0.08em] text-navy/40 uppercase">
                {t.fatigue.zones[zone.id]}
              </p>
              <p className="tabular mt-1 text-lg font-semibold tracking-[-0.03em] text-navy">
                {t.app.zoneAvg.replace("{n}", String(zone.avg))}
              </p>
              <p
                className={cn(
                  "mt-1 text-[11px]",
                  zone.alerts > 0 ? "text-[#C24141]" : "text-navy/40",
                )}
              >
                {t.app.zoneAlert.replace("{n}", String(zone.alerts))}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="min-w-0 overflow-hidden rounded-2xl border border-[#E6EEF2] bg-white">
        <div className="flex items-center justify-between gap-3 border-b border-[#E6EEF2] px-4 py-3">
          <p className="text-sm font-semibold text-navy">{t.app.timeOnStation}</p>
          <p className="text-[11px] text-navy/40">{t.fatigue.threshold}</p>
        </div>
        <ul className="divide-y divide-[#F0F4F7]">
          {rows.map((entry) => {
            const person = personByGuard[entry.id];
            const total = totalMinutes(entry);
            const width = Math.min(100, (total / fatigueScaleMinutes) * 100);

            return (
              <li key={entry.id} className="px-4 py-3.5">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex min-w-0 items-center gap-2.5">
                    {person ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={person.photo}
                        alt={person.name}
                        width={36}
                        height={36}
                        className="h-9 w-9 shrink-0 rounded-full object-cover"
                      />
                    ) : null}
                    <span className="min-w-0">
                      <span className="block truncate font-semibold text-navy">
                        {entry.label}
                        <span className="ml-1.5 font-normal text-navy/45">
                          {person?.name}
                        </span>
                      </span>
                      {entry.status === "ALTO" && (
                        <span className="mt-0.5 block text-[11px] text-[#C24141]">
                          {t.app.recommendSwap}
                        </span>
                      )}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2">
                    <span className="tabular text-sm font-semibold text-navy">
                      {formatHours(total)}
                    </span>
                    <MapStatusPill status={entry.status} compact />
                  </span>
                </div>

                <div className="relative mt-3">
                  <div className="relative h-6 overflow-hidden rounded-md bg-navy/6">
                    <div
                      className="absolute inset-y-0 left-0 flex"
                      style={{ width: `${width}%` }}
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
                  </div>
                  <span
                    className="pointer-events-none absolute -top-1 bottom-0 z-10 w-0.5 bg-[#C24141]"
                    style={{ left: `${thresholdPct}%` }}
                    title={t.fatigue.threshold}
                  />
                </div>
                <div className="relative mt-1 h-3 text-[10px] text-navy/35">
                  <span>0h</span>
                  <span
                    className="absolute -translate-x-1/2 font-semibold text-[#C24141]"
                    style={{ left: `${thresholdPct}%` }}
                  >
                    {formatHours(fatigueThresholdMinutes)}
                  </span>
                  <span className="absolute right-0">
                    {formatHours(fatigueScaleMinutes)}
                  </span>
                </div>

                <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-navy/45">
                  {fatigueZones.map((zone) => (
                    <span key={zone.id} className="tabular">
                      {t.fatigue.zones[zone.id]} {entry.minutes[zone.id] || "—"}
                    </span>
                  ))}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
