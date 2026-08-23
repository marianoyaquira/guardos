"use client";

import { Check, Clock3 } from "lucide-react";
import { useState } from "react";
import { DemoNote } from "@/components/DemoNote";
import { PoolDiagram } from "@/components/PoolDiagram";
import { demoRotationData, type SessionKind } from "@/data/demoRotationData";
import { useI18n } from "@/lib/i18n-context";
import { cn } from "@/lib/cn";

export function RotationMap() {
  const { t } = useI18n();
  const [activeId, setActiveId] = useState(demoRotationData[1].id);
  const session =
    demoRotationData.find((item) => item.id === activeId) ?? demoRotationData[1];

  const stateCopy = (kind: SessionKind) => t.map.states[kind];

  return (
    <div className="console-surface overflow-hidden rounded-[20px] border border-white/8 text-white">
      <div className="flex flex-col gap-5 border-b border-white/8 px-5 py-6 sm:px-6">
        <div>
          <p className="kicker text-cyan">{t.map.kicker}</p>
          <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] sm:text-2xl">
            {t.map.title}
          </h3>
          <p className="mt-1 text-sm text-white/55">{t.map.body}</p>
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          {demoRotationData.map((item) => {
            const copy = stateCopy(item.kind);
            const active = item.id === session.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                className={cn(
                  "min-h-16 rounded-xl border px-3 py-3 text-left transition-all duration-200",
                  active
                    ? "border-cyan/50 bg-cyan/15"
                    : "border-white/8 bg-white/4 hover:bg-white/8",
                )}
              >
                <span className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] uppercase">
                  {item.kind === "live" && <span className="live-dot" />}
                  {item.kind === "history" && (
                    <Check className="h-3.5 w-3.5 text-white/55" />
                  )}
                  {item.kind === "next" && (
                    <Clock3 className="h-3.5 w-3.5 text-white/55" />
                  )}
                  {copy.label}
                  {item.kind === "live" && (
                    <span className="rounded-full bg-ok/20 px-1.5 py-0.5 text-[9px] tracking-[0.14em] text-ok">
                      {t.map.live}
                    </span>
                  )}
                  {item.kind === "history" && (
                    <span className="text-white/35">{t.map.done}</span>
                  )}
                </span>
                <span className="tabular mt-1 block text-sm text-white/70">
                  {item.time}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-5 p-5 lg:grid-cols-[1.5fr_0.7fr] lg:p-6">
        <PoolDiagram assignments={session.assignments} />
        <aside className="rounded-xl border border-white/8 bg-white/4 p-4 backdrop-blur-sm">
          <p className="kicker text-white/40">{t.map.selected}</p>
          <p className="mt-2 text-lg font-semibold">
            {stateCopy(session.kind).label}
          </p>
          <p className="tabular text-sm text-white/60">{session.time}</p>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between gap-4 border-b border-white/8 pb-3">
              <dt className="text-white/45">{t.map.team}</dt>
              <dd>{t.mockup.team}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-white/8 pb-3">
              <dt className="text-white/45">{t.map.covered}</dt>
              <dd className="tabular text-cyan">
                {session.covered}/{session.total} · 100%
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-white/45">{t.map.breaks}</dt>
              <dd className="text-right">
                {t.map.notes[String(session.id)] ?? session.note}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
      <div className="px-5 pb-4 sm:px-6">
        <DemoNote className="text-white/35" />
      </div>
    </div>
  );
}
