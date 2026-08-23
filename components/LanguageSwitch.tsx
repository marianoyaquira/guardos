"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";
import { cn } from "@/lib/cn";

export function LanguageSwitch({ inverted = false }: { inverted?: boolean }) {
  const { locale, t } = useI18n();

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-1 py-1 text-[11px] font-semibold tracking-[0.12em]",
        inverted ? "border-white/15 text-white/55" : "border-navy/10 text-navy/45",
      )}
      aria-label="Language"
    >
      <Link
        href="/"
        hrefLang="pt-BR"
        className={cn(
          "rounded-full px-2.5 py-1 transition-colors",
          locale === "pt"
            ? inverted
              ? "bg-white/12 text-white"
              : "bg-navy text-white"
            : "hover:text-navy",
        )}
      >
        {t.lang.pt}
      </Link>
      <Link
        href="/en"
        hrefLang="en"
        className={cn(
          "rounded-full px-2.5 py-1 transition-colors",
          locale === "en"
            ? inverted
              ? "bg-white/12 text-white"
              : "bg-navy text-white"
            : inverted
              ? "hover:text-white"
              : "hover:text-navy",
        )}
      >
        {t.lang.en}
      </Link>
    </div>
  );
}
