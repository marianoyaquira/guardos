"use client";

import { CheckCircle2 } from "lucide-react";
import { FatigueSummary } from "@/components/app/FatigueSummary";
import { OperationalMap } from "@/components/app/OperationalMap";
import { MapStatusPill } from "@/components/app/MapStatusPill";
import { defaultSessionId, demoSessions } from "@/data/demoSessions";
import { useI18n } from "@/lib/i18n-context";

const session =
  demoSessions.find((item) => item.id === defaultSessionId) ?? demoSessions[1];

export function ProductMockup() {
  const { t } = useI18n();

  return (
    <div className="relative mx-auto w-full max-w-[720px]">
      <div className="overflow-hidden rounded-[20px] border border-navy/8 bg-[#F4F8FA] shadow-[0_28px_70px_rgb(7_27_51_/_0.12)]">
        <div className="flex items-center justify-between gap-3 border-b border-[#E6EEF2] bg-white px-3 py-2.5 sm:px-4">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.14em] text-navy/40 uppercase">
              {t.mockup.currentSession}
            </p>
            <p className="tabular text-sm font-semibold text-navy">
              {session.startTime} → {session.endTime}
              <span className="ml-2 text-xs font-medium text-navy/50">
                {t.mockup.team}
              </span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-semibold tracking-[0.14em] text-navy/40 uppercase">
              {t.mockup.postsCovered}
            </p>
            <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy">
              <span className="tabular">
                {session.coveredPosts}/{session.totalPosts}
              </span>
              <CheckCircle2 className="h-4 w-4 text-ok" />
            </p>
          </div>
        </div>

        <div className="grid gap-3 p-2 sm:p-3 lg:grid-cols-[minmax(0,1fr)_200px]">
          <OperationalMap session={session} preview />
          <div className="hidden lg:block">
            <FatigueSummary rows={session.fatigueSummary} />
          </div>
          <ul className="grid grid-cols-2 gap-2 px-1 pb-1 lg:hidden">
            {session.fatigueSummary.slice(0, 4).map((row) => (
              <li
                key={row.id}
                className="flex items-center justify-between rounded-xl border border-[#E6EEF2] bg-white px-2.5 py-2"
              >
                <div>
                  <p className="text-[11px] font-semibold text-navy">{row.label}</p>
                  <p className="tabular text-[10px] text-navy/45">{row.totalTime}</p>
                </div>
                <MapStatusPill status={row.status} compact />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
