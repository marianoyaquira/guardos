"use client";

import { Check } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

export function Roadmap() {
  const { t } = useI18n();

  return (
    <section id="roadmap" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-[var(--space-section)] sm:px-6 lg:px-8">
        <h2 className="section-title text-navy">{t.roadmap.title}</h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="kicker text-ok">{t.roadmap.now.label}</p>
            <ul className="mt-5 space-y-3">
              {t.roadmap.now.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-navy">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-ok" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="kicker text-navy/35">{t.roadmap.later.label}</p>
            <ol className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {t.roadmap.later.items.map((item, index) => (
                <li key={item.id} className="relative flex gap-3 border-t border-navy/10 pt-4">
                  <p className="w-8 shrink-0 text-sm font-semibold text-cyan-deep">
                    {item.id}
                  </p>
                  <p className="text-sm leading-relaxed text-navy/70">{item.title}</p>
                  {index < t.roadmap.later.items.length - 1 && (
                    <span className="absolute top-4 right-0 hidden text-navy/20 xl:block">
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
