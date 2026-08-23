"use client";

import { useI18n } from "@/lib/i18n-context";

export function DemoNote({ className = "" }: { className?: string }) {
  const { t } = useI18n();
  return (
    <p className={`text-[11px] tracking-wide text-navy/40 ${className}`}>
      {t.demo}
    </p>
  );
}
