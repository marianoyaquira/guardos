"use client";

import { useI18n } from "@/lib/i18n-context";
import { localePath } from "@/i18n";
import { cn } from "@/lib/cn";

export function Logo({
  inverted = false,
  compact = false,
  hideMotif = false,
}: {
  inverted?: boolean;
  compact?: boolean;
  hideMotif?: boolean;
}) {
  const { locale, t } = useI18n();

  return (
    <a href={localePath(locale, "#topo")} className="group inline-flex items-center gap-2.5">
      <span
        className={cn(
          "grid h-8 w-8 place-items-center rounded-md border",
          inverted ? "border-white/15 bg-white/5" : "border-navy/10 bg-aqua",
        )}
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
          <circle cx="12" cy="12" r="6.2" stroke="#00A8B5" strokeWidth="2.4" />
          <rect x="10.6" y="4.4" width="2.8" height="3.2" rx="0.4" fill={inverted ? "#071B33" : "#ffffff"} />
          <rect x="10.6" y="16.4" width="2.8" height="3.2" rx="0.4" fill={inverted ? "#071B33" : "#ffffff"} />
          <rect x="4.4" y="10.6" width="3.2" height="2.8" rx="0.4" fill={inverted ? "#071B33" : "#ffffff"} />
          <rect x="16.4" y="10.6" width="3.2" height="2.8" rx="0.4" fill={inverted ? "#071B33" : "#ffffff"} />
        </svg>
      </span>
      <span className="leading-none">
        <span
          className={cn(
            "block text-[17px] font-semibold tracking-[0.14em]",
            inverted ? "text-white" : "text-navy",
          )}
        >
          GUARD
          <span className="text-cyan">OS</span>
        </span>
        {!hideMotif && (
          <span
            className={cn(
              "mt-1 hidden text-[8px] font-medium tracking-[0.14em] uppercase sm:block",
              inverted ? "text-white/50" : "text-navy/40",
              compact && "max-w-[12.5rem]",
            )}
          >
            {t.brand.motif}
          </span>
        )}
      </span>
    </a>
  );
}
