"use client";

import { useState } from "react";
import { AppScreenHeader } from "@/components/app/AppScreenHeader";
import { MapStatusPill } from "@/components/app/MapStatusPill";
import {
  defaultSessionId,
  demoSessions,
  mapPosts,
  rosterRollup,
  rotationScaleMinutes,
  rotationThresholdMinutes,
  sortRosterByAttention,
} from "@/data/demoSessions";
import { postLabel } from "@/lib/localizeDemo";
import { useI18n } from "@/lib/i18n-context";
import { cn } from "@/lib/cn";
import type { FatigueStatus } from "@/data/demoFatigueData";

const barTone: Record<FatigueStatus, string> = {
  OK: "bg-cyan",
  ATENÇÃO: "bg-[#D97706]",
  ALTO: "bg-[#C24141]",
};

export function RostersScreen() {
  const { t } = useI18n();
  const [sessionId, setSessionId] = useState(defaultSessionId);
  const session = demoSessions.find((item) => item.id === sessionId) ?? demoSessions[1];
  const rows = sortRosterByAttention(mapPosts, session.assignments);
  const rollup = rosterRollup(session.assignments);
  const thresholdPct = (rotationThresholdMinutes / rotationScaleMinutes) * 100;

  return (
    <div className="min-w-0 space-y-5">
      <AppScreenHeader title={t.ui.navRosters} lead={t.app.rostersLead} />

      <div className="rounded-2xl border border-[#FDECEC] bg-[#FFF8F8] px-4 py-3">
        <p className="text-sm font-medium text-[#C24141]">{t.app.highHint}</p>
        <p className="mt-1 text-xs text-navy/50">{t.app.watchHint}</p>
      </div>

      <div className="min-w-0">
        <div className="flex gap-2 overflow-x-auto overscroll-x-contain pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {demoSessions.map((item) => {
            const active = item.id === session.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSessionId(item.id)}
                className={cn(
                  "min-w-[7.5rem] shrink-0 rounded-xl border px-3 py-2.5 text-left",
                  active
                    ? "border-cyan bg-cyan text-white"
                    : "border-[#E6EEF2] bg-white text-navy hover:border-cyan/40",
                )}
              >
                <p className="text-[11px] font-semibold tracking-[0.08em] uppercase">
                  {item.startTime}–{item.endTime}
                </p>
                <p className="mt-1 text-sm font-medium">{item.team}</p>
              </button>
            );
          })}
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <li className="min-w-0 rounded-2xl border border-[#E6EEF2] bg-white px-3 py-3">
          <p className="text-[11px] font-semibold tracking-[0.08em] text-navy/40 uppercase">
            {t.ui.timeOnPost}
          </p>
          <p className="tabular mt-1 text-lg font-semibold tracking-[-0.03em] text-navy">
            {t.app.zoneAvg.replace("{n}", String(rollup.avg))}
          </p>
        </li>
        <li className="min-w-0 rounded-2xl border border-[#E6EEF2] bg-white px-3 py-3">
          <p className="text-[11px] font-semibold tracking-[0.08em] text-navy/40 uppercase">
            {t.app.rotationThreshold}
          </p>
          <p
            className={cn(
              "tabular mt-1 text-lg font-semibold tracking-[-0.03em]",
              rollup.overdue > 0 ? "text-[#C24141]" : "text-navy",
            )}
          >
            {t.app.pastThreshold.replace("{n}", String(rollup.overdue))}
          </p>
        </li>
        <li className="min-w-0 rounded-2xl border border-[#E6EEF2] bg-white px-3 py-3">
          <p className="text-[11px] font-semibold tracking-[0.08em] text-navy/40 uppercase">
            {t.ui.status}
          </p>
          <p
            className={cn(
              "tabular mt-1 text-lg font-semibold tracking-[-0.03em]",
              rollup.alerts > 0 ? "text-[#C24141]" : "text-navy",
            )}
          >
            {t.app.zoneAlert.replace("{n}", String(rollup.alerts))}
          </p>
        </li>
      </ul>

      <div className="min-w-0 overflow-hidden rounded-2xl border border-[#E6EEF2] bg-white">
        <div className="flex items-center justify-between gap-3 border-b border-[#E6EEF2] px-4 py-3">
          <p className="text-sm font-semibold text-navy">{t.ui.timeOnPost}</p>
          <p className="text-[11px] text-navy/40">{t.app.rotationThreshold}</p>
        </div>
        <ul className="divide-y divide-[#F0F4F7]">
          {rows.map((post) => {
            const assignment = session.assignments[post.id];
            const width = Math.min(
              100,
              (assignment.minutesOnPost / rotationScaleMinutes) * 100,
            );

            return (
              <li key={post.id} className="px-4 py-3.5">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex min-w-0 items-center gap-2.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={assignment.photo}
                      alt={assignment.name}
                      width={36}
                      height={36}
                      className="h-9 w-9 shrink-0 rounded-full object-cover"
                    />
                    <span className="min-w-0">
                      <span className="block truncate font-semibold text-navy">
                        {postLabel(post.id, t)}
                      </span>
                      <span className="block truncate text-[11px] text-navy/45">
                        {assignment.name}
                      </span>
                      {assignment.status === "ALTO" && (
                        <span className="mt-0.5 block text-[11px] text-[#C24141]">
                          {t.app.recommendSwap}
                        </span>
                      )}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2">
                    <span className="tabular text-sm font-semibold text-navy">
                      {assignment.minutesOnPost} {t.ui.minutes}
                    </span>
                    <MapStatusPill status={assignment.status} compact />
                  </span>
                </div>

                <div className="relative mt-3">
                  <div className="relative h-6 overflow-hidden rounded-md bg-navy/6">
                    <div
                      className={cn("absolute inset-y-0 left-0 rounded-md", barTone[assignment.status])}
                      style={{ width: `${width}%` }}
                    />
                  </div>
                  <span
                    className="pointer-events-none absolute -top-1 bottom-0 z-10 w-0.5 bg-[#C24141]"
                    style={{ left: `${thresholdPct}%` }}
                    title={t.app.rotationThreshold}
                  />
                </div>
                <div className="relative mt-1 h-3 text-[10px] text-navy/35">
                  <span>0</span>
                  <span
                    className="absolute -translate-x-1/2 font-semibold text-[#C24141]"
                    style={{ left: `${thresholdPct}%` }}
                  >
                    {rotationThresholdMinutes} {t.ui.minutes}
                  </span>
                  <span className="absolute right-0">
                    {rotationScaleMinutes} {t.ui.minutes}
                  </span>
                </div>

                <p className="mt-2 text-[11px] text-navy/45">
                  {t.ui.nextSwap} {assignment.nextSwap}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
