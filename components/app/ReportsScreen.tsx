"use client";

import { AppScreenHeader } from "@/components/app/AppScreenHeader";
import { MapStatusPill } from "@/components/app/MapStatusPill";
import {
  fairnessIndexScale,
  fairnessRollup,
  demoFairnessData,
  sortFairnessByPriority,
} from "@/data/demoFairnessData";
import {
  defaultSessionId,
  demoSessions,
  mapPosts,
  sortRosterByAttention,
} from "@/data/demoSessions";
import { postLabel } from "@/lib/localizeDemo";
import { useI18n } from "@/lib/i18n-context";
import { cn } from "@/lib/cn";
import type { FatigueStatus } from "@/data/demoFatigueData";

const fatigueRank: Record<FatigueStatus, number> = {
  ALTO: 0,
  ATENÇÃO: 1,
  OK: 2,
};

export function ReportsScreen() {
  const { t } = useI18n();
  const session =
    demoSessions.find((item) => item.id === defaultSessionId) ?? demoSessions[1];
  const fairnessRows = sortFairnessByPriority(demoFairnessData);
  const rollup = fairnessRollup(demoFairnessData);
  const recordRows = sortRosterByAttention(mapPosts, session.assignments);
  const fatigueRows = [...session.fatigueSummary].sort(
    (a, b) => fatigueRank[a.status] - fatigueRank[b.status],
  );
  const avgPct = (rollup.avgIndex / fairnessIndexScale) * 100;

  return (
    <div className="min-w-0 space-y-5">
      <AppScreenHeader title={t.ui.navReports} lead={t.app.reportsLead} />

      <div className="rounded-2xl border border-[#FDE8C8] bg-[#FFF8EE] px-4 py-3">
        <p className="text-sm font-medium text-[#D97706]">{t.app.fairnessHint}</p>
        <p className="mt-1 text-xs text-navy/50">{t.fairness.titleB}</p>
      </div>

      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <li className="min-w-0 rounded-2xl border border-[#E6EEF2] bg-white px-3 py-3">
          <p className="text-[11px] font-semibold tracking-[0.08em] text-navy/40 uppercase">
            {t.fairness.average}
          </p>
          <p className="tabular mt-1 text-lg font-semibold tracking-[-0.03em] text-navy">
            {rollup.avgShifts} {t.fairness.averageDetail.replace("{n}", String(rollup.avgLead))}
          </p>
        </li>
        <li className="min-w-0 rounded-2xl border border-[#E6EEF2] bg-white px-3 py-3">
          <p className="text-[11px] font-semibold tracking-[0.08em] text-navy/40 uppercase">
            {t.fairness.columns[4]}
          </p>
          <p className="tabular mt-1 text-lg font-semibold tracking-[-0.03em] text-navy">
            {t.app.teamAvgIndex.replace("{n}", String(rollup.avgIndex))}
          </p>
        </li>
        <li className="min-w-0 rounded-2xl border border-[#E6EEF2] bg-white px-3 py-3">
          <p className="text-[11px] font-semibold tracking-[0.08em] text-navy/40 uppercase">
            {t.app.reportFairness}
          </p>
          <p
            className={cn(
              "tabular mt-1 text-lg font-semibold tracking-[-0.03em]",
              rollup.high > 0 ? "text-[#D97706]" : "text-navy",
            )}
          >
            {t.app.highPriorityCount.replace("{n}", String(rollup.high))}
          </p>
        </li>
      </ul>

      <section className="min-w-0 overflow-hidden rounded-2xl border border-[#E6EEF2] bg-white">
        <div className="flex items-center justify-between gap-3 border-b border-[#E6EEF2] px-4 py-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-navy">{t.app.reportFairness}</p>
            <p className="text-[11px] text-navy/40">{t.fairness.titleA}</p>
          </div>
          <button
            type="button"
            className="shrink-0 rounded-xl border border-[#E6EEF2] px-3 py-2 text-xs font-semibold text-navy/70"
          >
            {t.app.export}
          </button>
        </div>
        <ul className="divide-y divide-[#F0F4F7]">
          {fairnessRows.map((row) => {
            const high = row.priority === "ALTA";
            const width = Math.min(100, row.rotationIndex);

            return (
              <li key={row.id} className="px-4 py-3.5">
                <div className="flex items-start justify-between gap-3">
                  <span className="min-w-0">
                    <span className="block font-semibold text-navy">
                      {row.label}
                      <span className="ml-1.5 font-normal text-navy/40">#{row.rank}</span>
                    </span>
                    <span className="mt-0.5 block text-[11px] text-navy/45">
                      {t.fairness.mobileMeta
                        .replace("{shifts}", String(row.shifts))
                        .replace("{guide}", String(row.guidePercent))}
                    </span>
                    {high && (
                      <span className="mt-0.5 block text-[11px] text-[#D97706]">
                        {t.fairness.prioritize}
                      </span>
                    )}
                  </span>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-[0.04em]",
                      high
                        ? "bg-[#FFF4D6] text-[#B45309]"
                        : "bg-[#E8F6EE] text-[#1B7A4A]",
                    )}
                  >
                    {high ? t.fairness.priority.high : t.fairness.priority.normal}
                  </span>
                </div>
                <div className="relative mt-3">
                  <div className="relative h-6 overflow-hidden rounded-md bg-navy/6">
                    <div
                      className={cn(
                        "absolute inset-y-0 left-0 rounded-md",
                        high ? "bg-[#D97706]" : "bg-cyan",
                      )}
                      style={{ width: `${width}%` }}
                    />
                  </div>
                  <span
                    className="pointer-events-none absolute -top-1 bottom-0 z-10 w-0.5 bg-navy/45"
                    style={{ left: `${avgPct}%` }}
                    title={t.fairness.average}
                  />
                </div>
                <div className="relative mt-1 h-3 text-[10px] text-navy/35">
                  <span>0</span>
                  <span
                    className="absolute -translate-x-1/2 font-medium text-navy/50"
                    style={{ left: `${avgPct}%` }}
                  >
                    {t.app.teamAvgIndex.replace("{n}", String(rollup.avgIndex))}
                  </span>
                  <span className="absolute right-0">{fairnessIndexScale}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="min-w-0 overflow-hidden rounded-2xl border border-[#E6EEF2] bg-white">
        <div className="flex items-center justify-between gap-3 border-b border-[#E6EEF2] px-4 py-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-navy">{t.app.todayRecord}</p>
            <p className="text-[11px] text-navy/40">
              {t.app.periodToday} · {session.startTime}–{session.endTime}
            </p>
          </div>
          <button
            type="button"
            className="shrink-0 rounded-xl border border-[#E6EEF2] px-3 py-2 text-xs font-semibold text-navy/70"
          >
            {t.app.export}
          </button>
        </div>
        <ul className="divide-y divide-[#F0F4F7]">
          {recordRows.map((post) => {
            const assignment = session.assignments[post.id];
            return (
              <li
                key={post.id}
                className="flex items-center justify-between gap-3 px-4 py-3"
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={assignment.photo}
                    alt={assignment.name}
                    width={32}
                    height={32}
                    className="h-8 w-8 shrink-0 rounded-full object-cover"
                  />
                  <span className="min-w-0">
                    <span className="block truncate font-semibold text-navy">
                      {postLabel(post.id, t)}
                    </span>
                    <span className="block truncate text-[11px] text-navy/45">
                      {assignment.name} · {assignment.minutesOnPost} {t.ui.minutes} ·{" "}
                      {t.ui.nextSwap} {assignment.nextSwap}
                    </span>
                  </span>
                </span>
                <MapStatusPill status={assignment.status} compact />
              </li>
            );
          })}
        </ul>
      </section>

      <section className="min-w-0 overflow-hidden rounded-2xl border border-[#E6EEF2] bg-white">
        <div className="flex items-center justify-between gap-3 border-b border-[#E6EEF2] px-4 py-3">
          <p className="text-sm font-semibold text-navy">{t.app.reportFatigue}</p>
          <button
            type="button"
            className="shrink-0 rounded-xl border border-[#E6EEF2] px-3 py-2 text-xs font-semibold text-navy/70"
          >
            {t.app.export}
          </button>
        </div>
        <ul className="divide-y divide-[#F0F4F7]">
          {fatigueRows.map((row) => (
            <li
              key={row.id}
              className="flex items-center justify-between gap-3 px-4 py-3"
            >
              <span className="flex min-w-0 items-center gap-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={row.photo}
                  alt={row.name}
                  width={32}
                  height={32}
                  className="h-8 w-8 shrink-0 rounded-full object-cover"
                />
                <span className="min-w-0">
                  <span className="block truncate font-semibold text-navy">
                    {row.label}
                    <span className="ml-1.5 font-normal text-navy/45">{row.name}</span>
                  </span>
                  <span className="tabular text-[11px] text-navy/45">{row.totalTime}</span>
                </span>
              </span>
              <MapStatusPill status={row.status} compact />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
