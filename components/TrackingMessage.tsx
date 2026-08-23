"use client";

import { useI18n } from "@/lib/i18n-context";

export function TrackingMessage() {
  const { t } = useI18n();

  return (
    <div className="rounded-[20px] border border-navy/8 bg-white px-5 py-8 sm:px-8">
      <h3 className="section-title max-w-2xl text-navy">{t.tracking.title}</h3>
      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {t.tracking.items.map((item, index) => (
          <article key={item.title} className="flex gap-4">
            <p className="w-8 shrink-0 text-[11px] font-semibold tracking-[0.18em] text-cyan-deep">
              0{index + 1}
            </p>
            <div>
              <h4 className="text-lg font-semibold tracking-[-0.02em] text-navy">
                {item.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-navy/58">
                {item.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
