"use client";

import type { FatigueStatus } from "@/data/demoFatigueData";
import { useI18n } from "@/lib/i18n-context";
import { cn } from "@/lib/cn";

const styles: Record<FatigueStatus, string> = {
  OK: "bg-ok/12 text-ok border-ok/35",
  ATENÇÃO: "bg-attention/12 text-attention border-attention/35",
  ALTO: "bg-alert/12 text-alert border-alert/35",
};

export function StatusPill({
  status,
  compact = false,
}: {
  status: FatigueStatus;
  compact?: boolean;
}) {
  const { t } = useI18n();
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md border font-semibold tracking-[0.06em]",
        compact ? "px-1.5 py-0.5 text-[10px]" : "min-w-[4.6rem] px-2 py-1 text-[11px]",
        styles[status],
      )}
    >
      {t.fatigue.status[status] ?? status}
    </span>
  );
}
