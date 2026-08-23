import type { FatigueStatus } from "@/data/demoFatigueData";
import { useI18n } from "@/lib/i18n-context";
import { cn } from "@/lib/cn";

const styles: Record<FatigueStatus, string> = {
  OK: "bg-[#E8F6EE] text-[#1B7A4A]",
  ATENÇÃO: "bg-[#FFF4D6] text-[#B45309]",
  ALTO: "bg-[#FDECEC] text-[#B42318]",
};

export function MapStatusPill({
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
        "inline-flex items-center justify-center rounded-full font-semibold tracking-[0.04em]",
        compact ? "px-2 py-0.5 text-[10px]" : "min-w-[4.5rem] px-2.5 py-1 text-[11px]",
        styles[status],
      )}
    >
      {t.fatigue.status[status]}
    </span>
  );
}
