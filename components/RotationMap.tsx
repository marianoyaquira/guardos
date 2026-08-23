"use client";

import { Check, Clock3 } from "lucide-react";
import { useState } from "react";
import { DemoNote } from "@/components/DemoNote";
import { OperationalMap } from "@/components/app/OperationalMap";
import { demoSessions } from "@/data/demoSessions";
import { useI18n } from "@/lib/i18n-context";
import { cn } from "@/lib/cn";
import type { SessionKind } from "@/data/demoRotationData";

const previewSessions = [
  { session: demoSessions[0], kind: "history" as const },
  { session: demoSessions[1], kind: "live" as const },
  { session: demoSessions[2], kind: "next" as const },
];

export function RotationMap() {
  const { t } = useI18n();
  const [activeId, setActiveId] = useState(previewSessions[1].session.id);
  const current =
    previewSessions.find((item) => item.session.id === activeId) ??
    previewSessions[1];
  const session = current.session;
  const stateCopy = (kind: SessionKind) => t.map.states[kind];
  const noteKey = session.id.replace("s0", "");

  return (
    <div className="overflow-hidden rounded-[20px] border border-navy/8 bg-white text-navy shadow-[0_20px_50px_rgb(7_27_51_/_0.06)]">
      <div className="flex flex-col gap-5 border-b border-[#E6EEF2] px-5 py-6 sm:px-6">
        <div>
          <p className="kicker text-cyan-deep">{t.map.kicker}</p>
          <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] sm:text-2xl">
            {t.map.title}
          </h3>
          <p className="mt-1 text-sm text-navy/55">{t.map.body}</p>
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          {previewSessions.map(({ session: item, kind }) => {
            const copy = stateCopy(kind);
            const active = item.id === session.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                className={cn(
                  "min-h-16 rounded-xl border px-3 py-3 text-left transition-all duration-200",
                  active
                    ? "border-cyan/50 bg-cyan/8"
                    : "border-[#E6EEF2] bg-[#F7FBFC] hover:bg-white",
                )}
              >
                <span className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] uppercase">
                  {kind === "live" && <span className="live-dot" />}
                  {kind === "history" && (
                    <Check className="h-3.5 w-3.5 text-navy/45" />
                  )}
                  {kind === "next" && (
                    <Clock3 className="h-3.5 w-3.5 text-navy/45" />
                  )}
                  {copy.label}
                  {kind === "live" && (
                    <span className="rounded-full bg-ok/15 px-1.5 py-0.5 text-[9px] tracking-[0.14em] text-ok">
                      {t.map.live}
                    </span>
                  )}
                  {kind === "history" && (
                    <span className="text-navy/35">{t.map.done}</span>
                  )}
                </span>
                <span className="tabular mt-1 block text-sm text-navy/70">
                  {item.startTime} → {item.endTime}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-5 p-5 lg:grid-cols-[1.5fr_0.7fr] lg:p-6">
        <OperationalMap session={session} size="section" />
        <aside className="rounded-xl border border-[#E6EEF2] bg-[#F7FBFC] p-4">
          <p className="kicker text-navy/40">{t.map.selected}</p>
          <p className="mt-2 text-lg font-semibold">
            {stateCopy(current.kind).label}
          </p>
          <p className="tabular text-sm text-navy/60">
            {session.startTime} → {session.endTime}
          </p>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between gap-4 border-b border-[#E6EEF2] pb-3">
              <dt className="text-navy/45">{t.map.team}</dt>
              <dd>{session.team}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-[#E6EEF2] pb-3">
              <dt className="text-navy/45">{t.map.covered}</dt>
              <dd className="tabular text-cyan-deep">
                {session.coveredPosts}/{session.totalPosts} ·{" "}
                {Math.round((session.coveredPosts / session.totalPosts) * 100)}%
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-navy/45">{t.map.breaks}</dt>
              <dd className="text-right">
                {t.map.notes[noteKey] ??
                  session.breaks
                    .map((item) => `${item.label} ${item.duration}`)
                    .join(" · ") ??
                  "—"}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
      <div className="px-5 pb-4 sm:px-6">
        <DemoNote className="text-navy/35" />
      </div>
    </div>
  );
}
