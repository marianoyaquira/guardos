"use client";

import { Check, Plus } from "lucide-react";
import type { DemoSession } from "@/data/demoSessions";
import { sessionLabel } from "@/lib/localizeDemo";
import { useI18n } from "@/lib/i18n-context";
import { cn } from "@/lib/cn";

export function SessionTabs({
  sessions,
  activeId,
  onChange,
}: {
  sessions: DemoSession[];
  activeId: string;
  onChange: (id: string) => void;
}) {
  const { t } = useI18n();

  return (
    <section className="min-w-0 max-w-full">
      <p className="mb-3 text-sm font-semibold text-navy">{t.ui.sessionsToday}</p>
      <div className="flex gap-2 overflow-x-auto overscroll-x-contain pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {sessions.map((session) => {
          const active = session.id === activeId;
          return (
            <button
              key={session.id}
              type="button"
              onClick={() => onChange(session.id)}
              className={cn(
                "min-w-[132px] rounded-xl border px-3 py-2.5 text-left transition-all duration-200",
                active
                  ? "border-cyan bg-cyan text-white shadow-[0_8px_20px_rgb(7_156_179_/_0.22)]"
                  : "border-[#E6EEF2] bg-white text-navy hover:border-cyan/30",
              )}
            >
              <span className="flex items-center justify-between gap-2 text-sm font-semibold">
                {sessionLabel(session, t)}
                {active && <Check className="h-3.5 w-3.5" />}
              </span>
              <span
                className={cn(
                  "tabular mt-0.5 block text-xs",
                  active ? "text-white/80" : "text-navy/45",
                )}
              >
                {session.startTime} – {session.endTime}
              </span>
            </button>
          );
        })}
        <button
          type="button"
          className="inline-flex min-w-[120px] items-center justify-center gap-1 rounded-xl border border-dashed border-[#C9D8DE] bg-white px-3 py-2.5 text-sm font-medium text-navy/55 hover:border-cyan hover:text-cyan"
        >
          <Plus className="h-4 w-4" />
          {t.ui.newSession}
        </button>
      </div>
    </section>
  );
}
