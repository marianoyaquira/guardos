"use client";

import { DemoNote } from "@/components/DemoNote";
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
    <div
      ref={ref}
      className="overflow-hidden rounded-[20px] border border-navy/8 bg-white shadow-[0_12px_40px_rgb(7_27_51_/_0.04)]"
    >
      <div className="px-5 py-8 sm:px-8">
        <p className="kicker text-cyan-deep">{t.fairness.kicker}</p>
        <h3 className="section-title mt-3 max-w-xl text-navy">
          {t.fairness.titleA}
          <span className="block">{t.fairness.titleB}</span>
        </h3>

        <div className="mt-8 overflow-hidden rounded-xl border border-navy/8">
          <div className="hidden grid-cols-[40px_1fr_72px_88px_1fr_140px] gap-3 border-b border-navy/8 bg-aqua px-4 py-2.5 text-[10px] font-semibold tracking-[0.12em] text-navy/45 uppercase md:grid">
            {t.fairness.columns.map((col) => (
              <span key={col}>{col}</span>
            ))}
          </div>
          <ul>
            {demoFairnessData.map((row, index) => {
              const high = row.priority === "ALTA";
              return (
                <li
                  key={row.id}
                  className={cn(
                    "border-b border-navy/6 px-4 py-3 transition-colors last:border-0 hover:bg-aqua/70",
                    high && "bg-[#fff7ed]/70",
                    index % 2 === 1 && !high && "bg-aqua/35",
                  )}
                >
                  <div className="grid items-center gap-3 md:grid-cols-[40px_1fr_72px_88px_1fr_140px]">
                    <span className="tabular text-xs text-navy/35">{row.rank}</span>
                    <div className="flex items-center justify-between md:block">
                      <p className="text-sm font-semibold text-navy">{row.label}</p>
                      <span className="tabular text-xs text-navy/45 md:hidden">
                        {t.fairness.mobileMeta
                          .replace("{shifts}", String(row.shifts))
                          .replace("{guide}", String(row.guidePercent))}
                      </span>
                    </div>
                    <p className="tabular hidden text-sm text-navy/70 md:block">
                      {row.shifts}
                    </p>
                    <p className="tabular hidden text-sm text-navy/70 md:block">
                      {row.guidePercent}%
                    </p>
                    <div className="h-2 overflow-hidden rounded-full bg-navy/8">
                      <div
                        className={cn(
                          "h-full rounded-full transition-[width] duration-500",
                          high ? "bg-attention" : "bg-cyan",
                          shown ? "grow-x" : "w-0",
                        )}
                        style={{
                          width: shown ? `${row.rotationIndex}%` : 0,
                          animationDelay: `${index * 80}ms`,
                        }}
                      />
                    </div>
                    <div>
                      <span
                        className={cn(
                          "inline-flex rounded-md border px-2 py-1 text-[10px] font-semibold tracking-[0.06em]",
                          high
                            ? "border-attention/35 bg-attention/12 text-attention"
                            : "border-ok/35 bg-ok/12 text-ok",
                        )}
                      >
                        {high ? t.fairness.priority.high : t.fairness.priority.normal}
                      </span>
                      {high && (
                        <p className="mt-1 text-[11px] text-attention/80">
                          {t.fairness.prioritize}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center justify-between gap-4 bg-aqua px-4 py-3 text-xs text-navy/55">
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
        <DemoNote className="mt-4" />
      </div>
    </div>
  );
}
