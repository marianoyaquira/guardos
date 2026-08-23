"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";
import { cn } from "@/lib/cn";

export function LanguageSwitch({ inverted = false }: { inverted?: boolean }) {
  const { locale, t } = useI18n();

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-1 py-1 text-[11px] font-semibold tracking-[0.12em] shadow-[0_8px_20px_rgb(7_27_51_/_0.10)]",
        inverted
          ? "border-white/25 bg-white/12 text-white"
          : "border-navy/10 bg-white text-navy",
      )}
      aria-label="Language"
    >
      <Link
        href="/pt"
        hrefLang="pt-BR"
        className={cn(
          "rounded-full px-2.5 py-1 transition-colors",
          locale === "pt"
            ? inverted
              ? "bg-white text-navy"
              : "bg-navy text-white"
            : inverted
              ? "text-white/80 hover:text-white"
              : "text-navy/55 hover:text-navy",
        )}
      >
        {t.lang.pt}
      </Link>
      <Link
        href="/"
        hrefLang="en"
        className={cn(
          "rounded-full px-2.5 py-1 transition-colors",
          locale === "en"
            ? inverted
              ? "bg-white text-navy"
              : "bg-navy text-white"
            : inverted
              ? "text-white/80 hover:text-white"
              : "text-navy/55 hover:text-navy",
        )}
      >
        {t.lang.en}
      </Link>
    </div>
  );
}
