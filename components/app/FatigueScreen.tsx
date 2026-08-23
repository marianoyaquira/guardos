"use client";

import { AppScreenHeader } from "@/components/app/AppScreenHeader";
import { MapStatusPill } from "@/components/app/MapStatusPill";
import {
  demoFatigueData,
  fatigueThresholdMinutes,
  fatigueZones,
  formatHours,
  totalMinutes,
} from "@/data/demoFatigueData";
import { people } from "@/data/demoSessions";
import { useI18n } from "@/lib/i18n-context";

const personByGuard: Record<string, (typeof people)[keyof typeof people]> = {
  gv01: people.LS,
  gv02: people.MR,
  gv03: people.JP,
  gv04: people.TZ,
  gv06: people.RC,
};

export function FatigueScreen() {
  const { t } = useI18n();

  return (
    <div className="min-w-0 space-y-5">
      <AppScreenHeader title={t.ui.navFatigue} lead={t.app.fatigueLead} />
      <p className="text-xs text-navy/45">
        {t.app.exposureByZone} · {t.fatigue.threshold}
      </p>

      <div className="overflow-hidden rounded-2xl border border-[#E6EEF2] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead>
              <tr className="border-b border-[#E6EEF2] text-[10px] tracking-[0.08em] text-navy/35 uppercase">
                <th className="px-4 py-3 font-medium">{t.ui.lifeguard}</th>
                <th className="px-4 py-3 font-medium">{t.ui.totalTime}</th>
                {fatigueZones.map((zone) => (
                  <th key={zone.id} className="px-3 py-3 font-medium">
                    {t.fatigue.zones[zone.id]}
                  </th>
                ))}
                <th className="px-4 py-3 font-medium">{t.ui.status}</th>
              </tr>
            </thead>
            <tbody>
              {demoFatigueData.map((entry) => {
                const person = personByGuard[entry.id];
                const total = totalMinutes(entry);
                return (
                  <tr key={entry.id} className="border-t border-[#F0F4F7]">
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-2">
                        {person ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={person.photo}
                            alt={person.name}
                            width={28}
                            height={28}
                            className="h-7 w-7 rounded-full object-cover"
                          />
                        ) : null}
                        <span>
                          <span className="block font-medium text-navy">{entry.label}</span>
                          <span className="block text-[11px] text-navy/45">{person?.name}</span>
                        </span>
                      </span>
                    </td>
                    <td className="tabular px-4 py-3 font-medium text-navy">
                      {formatHours(total)}
                      <span className="ml-1 text-[11px] font-normal text-navy/35">
                        / {formatHours(fatigueThresholdMinutes)}
                      </span>
                    </td>
                    {fatigueZones.map((zone) => (
                      <td key={zone.id} className="tabular px-3 py-3 text-navy/60">
                        {entry.minutes[zone.id] || "—"}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <MapStatusPill status={entry.status} compact />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
