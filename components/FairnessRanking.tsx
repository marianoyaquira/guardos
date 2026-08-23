"use client";

import {
  demoFairnessData,
  fairnessTeamAverage,
} from "@/data/demoFairnessData";
import { useReveal } from "@/lib/useReveal";
import { useI18n } from "@/lib/i18n-context";
import { cn } from "@/lib/cn";

export function FairnessRanking() {
  const { t } = useI18n();
  const { ref, shown } = useReveal<HTMLDivElement>(0.2);

  return (
    <div ref={ref} className="min-w-0 max-w-full overflow-x-hidden">
      <h2 className="max-w-xl text-[1.65rem] font-semibold tracking-[-0.03em] text-navy sm:text-3xl">
        {t.fairness.titleA}
      </h2>
      <p className="mt-2 max-w-xl text-navy/58">{t.fairness.titleB}</p>

      <div className="mt-7 min-w-0 border-t border-navy/10">
        <div className="hidden grid-cols-[36px_minmax(0,1fr)_64px_72px_minmax(0,1fr)_120px] gap-3 border-b border-navy/8 py-2.5 text-[10px] font-semibold tracking-[0.12em] text-navy/40 uppercase md:grid">
          {t.fairness.columns.map((col) => (
            <span key={col}>{col}</span>
          ))}
        </div>
        <ul className="min-w-0">
          {demoFairnessData.map((row) => {
            const high = row.priority === "ALTA";
            const meta = t.fairness.mobileMeta
              .replace("{shifts}", String(row.shifts))
              .replace("{guide}", String(row.guidePercent));

            return (
              <li
                key={row.id}
                className={cn(
                  "min-w-0 border-b border-navy/8 py-3",
                  high && "bg-[#fff8f1]",
                )}
              >
                <div className="min-w-0 md:hidden">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="tabular text-[11px] text-navy/35">{row.rank}</p>
                      <p className="mt-0.5 text-sm font-semibold text-navy">{row.label}</p>
                      <p className="tabular mt-0.5 text-[11px] text-navy/45">{meta}</p>
                    </div>
                    <div className="max-w-[9.5rem] shrink-0 text-right">
                      <span
                        className={cn(
                          "text-[10px] font-semibold tracking-[0.08em]",
                          high ? "text-attention" : "text-ok",
                        )}
                      >
                        {high ? t.fairness.priority.high : t.fairness.priority.normal}
                      </span>
                      {high && (
                        <p className="mt-0.5 text-[11px] leading-snug text-attention/80">
                          {t.fairness.prioritize}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden bg-navy/8">
                    <div
                      className={cn(
                        "h-full max-w-full transition-[width] duration-500",
                        high ? "bg-attention" : "bg-cyan",
                        shown ? "grow-x" : "w-0",
                      )}
                      style={{ width: shown ? `${row.rotationIndex}%` : 0 }}
                    />
                  </div>
                </div>

                <div className="hidden min-w-0 grid-cols-[36px_minmax(0,1fr)_64px_72px_minmax(0,1fr)_120px] items-center gap-3 md:grid">
                  <span className="tabular text-xs text-navy/35">{row.rank}</span>
                  <p className="text-sm font-semibold text-navy">{row.label}</p>
                  <p className="tabular text-sm text-navy/70">{row.shifts}</p>
                  <p className="tabular text-sm text-navy/70">{row.guidePercent}%</p>
                  <div className="h-1.5 min-w-0 overflow-hidden bg-navy/8">
                    <div
                      className={cn(
                        "h-full transition-[width] duration-500",
                        high ? "bg-attention" : "bg-cyan",
                        shown ? "grow-x" : "w-0",
                      )}
                      style={{ width: shown ? `${row.rotationIndex}%` : 0 }}
                    />
                  </div>
                  <div className="min-w-0">
                    <span
                      className={cn(
                        "text-[10px] font-semibold tracking-[0.08em]",
                        high ? "text-attention" : "text-ok",
                      )}
                    >
                      {high ? t.fairness.priority.high : t.fairness.priority.normal}
                    </span>
                    {high && (
                      <p className="mt-0.5 text-[11px] leading-snug text-attention/80">
                        {t.fairness.prioritize}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="flex min-w-0 flex-wrap items-center justify-between gap-x-4 gap-y-1 py-3 text-xs text-navy/50">
          <span>{t.fairness.average}</span>
          <span className="tabular">
            {fairnessTeamAverage.shifts}{" "}
            {t.fairness.averageDetail.replace(
              "{n}",
              String(fairnessTeamAverage.guidePercent),
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
