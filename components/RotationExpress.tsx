"use client";

import { Users, Cpu, CalendarCheck, Send } from "lucide-react";
import { useReveal } from "@/lib/useReveal";
import { useI18n } from "@/lib/i18n-context";
import { cn } from "@/lib/cn";

const icons = [Users, Cpu, CalendarCheck, Send];

export function RotationExpress() {
  const { t } = useI18n();
  const { ref, shown } = useReveal<HTMLDivElement>(0.28);

  return (
    <div
      ref={ref}
      className="rounded-[20px] border border-navy/8 bg-white px-5 py-8 shadow-[0_12px_40px_rgb(7_27_51_/_0.04)] sm:px-8"
    >
      <p className="kicker text-cyan-deep">{t.express.kicker}</p>
      <h3 className="section-title mt-3 text-navy">{t.express.title}</h3>
      <p className="mt-2 max-w-xl text-navy/58">{t.express.body}</p>

      <ol className="relative mt-10">
        <span
          className="absolute top-3 bottom-3 left-[15px] w-px bg-mist sm:left-[19px]"
          aria-hidden
        />
        <span
          className={cn(
            "absolute top-3 left-[15px] w-px origin-top bg-cyan sm:left-[19px]",
            shown ? "h-[calc(100%-24px)]" : "h-0",
          )}
          style={
            shown
              ? { transition: "height 1.1s ease" }
              : undefined
          }
          aria-hidden
        />
        {t.express.steps.map((step, index) => {
          const Icon = icons[index];
          return (
            <li
              key={step.title}
              className={cn(
                "relative flex gap-4 py-4 sm:gap-5",
                shown ? "reveal-in" : "reveal",
              )}
              style={{ animationDelay: shown ? `${index * 120}ms` : undefined }}
            >
              <div className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-cyan/30 bg-white text-[11px] font-semibold text-cyan-deep sm:h-10 sm:w-10">
                0{index + 1}
              </div>
              <div className="min-w-0 pb-2">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-cyan-deep" strokeWidth={1.7} />
                  <h4 className="text-lg font-semibold tracking-[-0.02em] text-navy">
                    {step.title}
                  </h4>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-navy/58">
                  {step.body}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
