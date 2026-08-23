"use client";

import { useI18n } from "@/lib/i18n-context";

export function AppScreenHeader({
  title,
  lead,
}: {
  title: string;
  lead: string;
}) {
  const { t } = useI18n();

  return (
    <div className="min-w-0">
      <h1 className="text-[1.35rem] font-semibold tracking-[-0.03em] text-navy">
        {title}
      </h1>
      <p className="mt-1 text-sm text-navy/55">{lead}</p>
      <p className="mt-2 text-[11px] tracking-[0.04em] text-navy/35">{t.app.demoNote}</p>
    </div>
  );
}
