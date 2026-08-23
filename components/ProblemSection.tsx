"use client";

import { Clock, FileSpreadsheet, Scale, ShieldAlert } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

const icons = [Clock, FileSpreadsheet, Scale, ShieldAlert];

export function ProblemSection() {
  const { t } = useI18n();

  return (
    <section className="border-y border-navy/6 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-[var(--space-section)] sm:px-6 lg:px-8">
        <h2 className="section-title max-w-3xl text-navy">{t.problem.title}</h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {t.problem.items.map((item, index) => {
            const Icon = icons[index];
            const isLegal = index === 3;
            return (
              <article
                key={item.title}
                className="lg:border-navy/8 lg:px-6 lg:first:pl-0 lg:last:pr-0 lg:[&:not(:first-child)]:border-l"
              >
                <Icon className="h-6 w-6 text-cyan-deep" strokeWidth={1.6} />
                <div className="mt-5 flex items-start gap-3">
                  <p className="w-8 shrink-0 text-[11px] font-semibold tracking-[0.18em] text-navy/30">
                    0{index + 1}
                  </p>
                  <div>
                    <h3 className="text-lg font-semibold tracking-[-0.02em] text-navy">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy/58">
                      {item.body}
                    </p>
                    {isLegal && (
                      <p className="mt-3 inline-flex rounded-full border border-cyan/25 bg-cyan/8 px-2.5 py-1 text-[11px] font-medium text-cyan-deep">
                        {t.problem.legalCallout}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
