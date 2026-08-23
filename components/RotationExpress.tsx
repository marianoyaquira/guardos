"use client";

import { Users, RefreshCw, Scale, Send } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

const stepIcons = [Users, RefreshCw, Scale, Send];

export function RotationExpress() {
  const { t } = useI18n();

  return (
    <div>
      <h2 className="max-w-xl text-[1.65rem] font-semibold tracking-[-0.03em] text-navy sm:text-3xl">
        {t.express.title}
      </h2>
      <p className="mt-2 max-w-lg text-navy/58">{t.express.body}</p>
      <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {t.express.steps.map((step, index) => {
          const Icon = stepIcons[index];
          return (
            <li key={step.title} className="border-t border-navy/12 pt-4">
              <p className="flex items-center gap-2 text-navy/35">
                <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                <span className="tabular text-[11px] font-semibold tracking-[0.14em]">
                  0{index + 1}
                </span>
              </p>
              <h3 className="mt-2 text-base font-semibold tracking-[-0.02em] text-navy">
                {step.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-navy/55">{step.body}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
