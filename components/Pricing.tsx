"use client";

import { Check } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { cn } from "@/lib/cn";

export function Pricing() {
  const { t } = useI18n();

  return (
    <section id="investimento" className="bg-aqua">
      <div className="mx-auto max-w-7xl px-4 py-[var(--space-section)] sm:px-6 lg:px-8">
        <h2 className="section-title text-navy">{t.pricing.headline}</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {t.pricing.plans.map((plan) => (
            <article
              key={plan.id}
              className={cn(
                "rounded-[20px] border bg-white p-6 shadow-[0_12px_40px_rgb(7_27_51_/_0.04)] sm:p-8",
                plan.featured
                  ? "border-cyan shadow-[0_16px_50px_rgb(0_168_181_/_0.08)]"
                  : "border-navy/8",
              )}
            >
              <p className="kicker text-navy/40">{plan.label}</p>
              <p className="tabular mt-3 text-4xl font-semibold tracking-[-0.03em] text-navy sm:text-5xl">
                {plan.price}
              </p>
              <p className="mt-1 text-sm text-navy/50">{plan.cadence}</p>
              <ul className="mt-6 space-y-2.5">
                {plan.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-navy/70"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-deep" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-sm text-navy/50">{t.pricing.note}</p>
      </div>
    </section>
  );
}
