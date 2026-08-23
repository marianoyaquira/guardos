"use client";

import { StatusPill } from "@/components/StatusPill";
import { PoolDiagram } from "@/components/PoolDiagram";
import { demoRotationData } from "@/data/demoRotationData";
import { useI18n } from "@/lib/i18n-context";

const session = demoRotationData[1];

const fatiguePreview = [
  { id: "GV 01", time: "3h15", status: "OK" as const },
  { id: "GV 03", time: "2h25", status: "ATENÇÃO" as const },
  { id: "GV 06", time: "3h50", status: "ALTO" as const },
  { id: "GV 04", time: "3h35", status: "OK" as const },
];

export function ProductMockup() {
  const { t } = useI18n();

  return (
    <div className="relative mx-auto w-full max-w-[640px]">
      <div className="console-surface rounded-[20px] border border-white/10 p-3 shadow-[0_30px_80px_rgb(0_168_181_/_0.16)] sm:p-4">
        <div className="mb-3 flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
          </div>
          <p className="kicker text-white/40">{t.mockup.operation}</p>
        </div>
        <div className="grid gap-3 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="rounded-xl bg-white/[0.04] p-3">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="kicker text-white/40">{t.mockup.currentSession}</p>
                <p className="tabular mt-1 text-sm font-semibold text-white">
                  {session.time}
                </p>
                <p className="text-xs text-white/50">{t.mockup.team}</p>
              </div>
              <div className="text-right">
                <p className="kicker text-white/40">{t.mockup.postsCovered}</p>
                <p className="tabular mt-1 text-sm font-semibold text-cyan">
                  {session.covered}/{session.total}
                  <span className="ml-1 text-white/50">100%</span>
                </p>
              </div>
            </div>
            <PoolDiagram assignments={session.assignments} compact />
          </div>
          <div className="hidden rounded-xl bg-white/[0.04] p-3 sm:block">
            <p className="kicker text-white/40">{t.mockup.fatigue}</p>
            <ul className="mt-3 space-y-2.5">
              {fatiguePreview.map((row) => (
                <li
                  key={row.id}
                  className="flex items-center justify-between gap-2 border-b border-white/8 pb-2 last:border-0"
                >
                  <div>
                    <p className="text-xs font-medium text-white">{row.id}</p>
                    <p className="tabular text-[11px] text-white/45">{row.time}</p>
                  </div>
                  <StatusPill status={row.status} compact />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="absolute right-2 -bottom-6 hidden w-[132px] rounded-[1.4rem] border border-white/10 bg-console/80 p-1.5 shadow-[0_18px_40px_rgb(0_168_181_/_0.18)] backdrop-blur-md sm:block md:-right-3 md:w-[148px]">
        <div className="rounded-[1.1rem] bg-console-panel/80 px-2.5 py-3">
          <div className="mx-auto mb-3 h-1 w-8 rounded-full bg-white/15" />
          <p className="kicker text-white/40">{t.mockup.postsCovered}</p>
          <p className="tabular mt-1 text-lg font-semibold text-white">8/8</p>
          <p className="kicker mt-3 text-white/40">{t.hero.signals[1]}</p>
          <ul className="mt-2 space-y-1.5">
            {fatiguePreview.slice(0, 3).map((row) => (
              <li
                key={row.id}
                className="flex items-center justify-between text-[10px] text-white/80"
              >
                <span>{row.id}</span>
                <StatusPill status={row.status} compact />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
