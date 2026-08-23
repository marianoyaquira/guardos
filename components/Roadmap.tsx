"use client";

import { useI18n } from "@/lib/i18n-context";

export function Roadmap() {
  const { t } = useI18n();

  return (
    <section id="roadmap" className="border-t border-navy/8 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-navy/35 uppercase">
          {t.roadmap.title}
        </p>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {t.roadmap.later.items.map((item) => (
            <li key={item.id} className="text-sm leading-relaxed text-navy/60">
              {item.title}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
