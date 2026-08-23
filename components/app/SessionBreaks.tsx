"use client";

import type { SessionBreak } from "@/data/demoSessions";
import { breakLabel } from "@/lib/localizeDemo";
import { useI18n } from "@/lib/i18n-context";

export function SessionBreaks({ breaks }: { breaks: SessionBreak[] }) {
  const { t } = useI18n();

  return (
    <section className="rounded-2xl border border-[#E6EEF2] bg-white p-4 shadow-[0_8px_24px_rgb(7_27_51_/_0.03)]">
      <h2 className="text-sm font-semibold text-navy">{t.ui.sessionBreaks}</h2>
      {breaks.length === 0 ? (
        <p className="mt-3 text-sm text-navy/45">{t.ui.noBreaks}</p>
      ) : (
        <ul className="mt-3 space-y-2.5">
          {breaks.map((item) => (
            <li key={item.id} className="flex items-center gap-2 text-sm text-navy/70">
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  background: item.tone === "pause" ? "#3B82F6" : "#E67E22",
                }}
              />
              <span>
                {breakLabel(item.label, t)} — {item.duration}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
