"use client";

import { useI18n } from "@/lib/i18n-context";
import { cn } from "@/lib/cn";

export function PostLegend({
  layout = "row",
  className,
}: {
  layout?: "row" | "stack";
  className?: string;
}) {
  const { t } = useI18n();
  const items = [
    `CT — ${t.ui.controlTower}`,
    `PIER — ${t.ui.pier}`,
    `01–07 — ${t.ui.edgePositions}`,
    `LOBBY — ${t.ui.lobby}`,
  ];

  return (
    <div
      className={cn(
        layout === "row"
          ? "flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-8 sm:gap-y-2"
          : "space-y-2",
        className,
      )}
    >
      <div
        className={cn(
          layout === "row"
            ? "flex flex-wrap items-baseline gap-x-5 gap-y-2"
            : "space-y-1.5",
        )}
      >
        <p className="text-[10px] font-semibold tracking-[0.16em] text-navy/40 uppercase">
          {t.ui.posts}
        </p>
        <ul
          className={cn(
            "text-[12px] text-navy/65",
            layout === "row" ? "flex flex-wrap gap-x-5 gap-y-1" : "space-y-1",
          )}
        >
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-navy/65">
        <p className="text-[10px] font-semibold tracking-[0.16em] text-navy/40 uppercase">
          {t.ui.status}
        </p>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-cyan" aria-hidden />
          {t.ui.pinOk}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#D97706]" aria-hidden />
          {t.ui.pinWatch}
        </span>
      </div>
    </div>
  );
}
