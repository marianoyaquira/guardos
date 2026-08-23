"use client";

import { AppPreview } from "@/components/AppPreview";
import { PostLegend } from "@/components/app/PostLegend";
import { defaultSessionId, demoSessions } from "@/data/demoSessions";
import type { SessionKind } from "@/data/demoRotationData";
import { sessionLabel } from "@/lib/localizeDemo";
import { useI18n } from "@/lib/i18n-context";
import { cn } from "@/lib/cn";
import { useState } from "react";

const storySessions = [
  { session: demoSessions[0], kind: "history" as const },
  { session: demoSessions[1], kind: "live" as const },
  { session: demoSessions[2], kind: "next" as const },
];

export function LiveOperation() {
  const { t } = useI18n();
  const [activeId, setActiveId] = useState(defaultSessionId);
  const current =
    storySessions.find((item) => item.session.id === activeId) ?? storySessions[1];
  const session = current.session;

  return (
    <section id="solucao" className="bg-[#f4f2ee]">
      <div className="mx-auto max-w-[96rem] px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-xl text-[1.75rem] font-semibold tracking-[-0.035em] text-navy sm:text-4xl">
            {t.map.title}
          </h2>
          <div className="flex flex-wrap gap-x-7 gap-y-3">
            {storySessions.map(({ session: item, kind }) => {
              const active = item.id === session.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  className={cn(
                    "text-left transition-colors",
                    active ? "text-navy" : "text-navy/38 hover:text-navy/70",
                  )}
                >
                  <span className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] uppercase">
                    {kind === "live" && <span className="live-dot" />}
                    {t.map.states[kind as SessionKind].label}
                  </span>
                  <span className="tabular mt-1 block text-lg font-medium tracking-[-0.03em]">
                    {item.startTime} → {item.endTime}
                  </span>
                  <span className="sr-only">{sessionLabel(item, t)}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 min-w-0">
          <AppPreview sessionId={session.id} onSessionChange={setActiveId} />
        </div>
        <PostLegend className="mt-4 px-1" />
      </div>
    </section>
  );
}
