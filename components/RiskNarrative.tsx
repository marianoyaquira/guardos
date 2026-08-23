"use client";

import {
  ArrowDownRight,
  ChevronRight,
  ClipboardList,
  Clock,
  Hourglass,
  Scale,
  ShieldCheck,
  TrendingUp,
  User,
} from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { cn } from "@/lib/cn";

const chainIcons = [Clock, Hourglass, User, TrendingUp, ArrowDownRight];
const pillarIcons = [ShieldCheck, Scale, ClipboardList];
const pillarTone = [
  "text-[#F07167]",
  "text-[#E8B45A]",
  "text-[#2EC4B6]",
] as const;

export function RiskNarrative() {
  const { t } = useI18n();

  return (
    <section id="risco" className="bg-[#071b33] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.36fr)_minmax(0,0.64fr)] lg:gap-x-16 xl:gap-x-20">
          <div>
            <h2 className="max-w-[20rem] text-[1.55rem] leading-[1.15] font-semibold tracking-[-0.035em] sm:text-[2.1rem] xl:max-w-[22rem]">
              {t.risk.titleA}
              <span className="mt-1 block text-[#F07167]">{t.risk.titleB}</span>
            </h2>
            <p className="mt-3 max-w-[22rem] text-[13px] leading-relaxed text-white/52 sm:text-[14px]">
              {t.risk.body}
            </p>
          </div>

          <ol className="flex min-w-0">
            {t.risk.chain.map((step, index) => {
              const Icon = chainIcons[index];
              const last = index === t.risk.chain.length - 1;
              const over = step.tone === "over";
              const risk = step.tone === "risk";
              const primary = Boolean(step.value);

              return (
                <li key={step.label} className="flex min-w-0 flex-1 flex-col">
                  <p
                    className={cn(
                      "text-[9px] font-medium tracking-[0.16em] sm:text-[10px] sm:tracking-[0.18em]",
                      over || risk ? "text-[#F07167]" : "text-white/28",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <div className="mt-1.5 flex items-center sm:mt-2.5">
                    <span
                      className={cn(
                        "grid h-8 w-8 shrink-0 place-items-center rounded-full sm:h-11 sm:w-11",
                        risk
                          ? "bg-[#F07167] text-white"
                          : over
                            ? "border border-[#F07167] text-[#F07167]"
                            : "border border-white/22 text-white",
                      )}
                    >
                      <Icon
                        className="h-3.5 w-3.5 sm:h-[18px] sm:w-[18px]"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    </span>
                    {!last && (
                      <span
                        className="mx-1 flex min-w-0 flex-1 items-center text-white/18 sm:mx-2"
                        aria-hidden
                      >
                        <span className="h-px w-full bg-current" />
                        <ChevronRight
                          className="-ml-0.5 h-3 w-3 shrink-0 sm:-ml-1 sm:h-3.5 sm:w-3.5"
                          strokeWidth={1.5}
                        />
                      </span>
                    )}
                  </div>

                  {primary ? (
                    <div className="mt-2 pr-1 sm:mt-3 sm:pr-3">
                      {step.overrun && (
                        <p className="mb-0.5 text-[10px] font-medium tracking-[0.04em] text-[#F07167]/80 sm:text-[11px]">
                          {step.overrun}
                        </p>
                      )}
                      <p
                        className={cn(
                          "tabular leading-none font-semibold tracking-[-0.045em]",
                          over
                            ? "text-[1.35rem] text-[#F07167] sm:text-[2rem]"
                            : "text-[1.25rem] text-white sm:text-[1.85rem]",
                        )}
                      >
                        {step.value}{" "}
                        <span className="align-baseline text-[10px] font-medium tracking-normal text-white/38 sm:text-[12px]">
                          {step.unit}
                        </span>
                      </p>
                      <p className="mt-1 text-[11px] leading-snug text-white/40 sm:text-[12px]">
                        {step.label}
                      </p>
                    </div>
                  ) : (
                    <p className="mt-2 max-w-[5.75rem] pr-1 text-[11px] leading-snug text-white/38 sm:mt-3 sm:max-w-[6.5rem] sm:pr-3 sm:text-[12px]">
                      {step.label}
                    </p>
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-8 border-t border-white/[0.08] pt-6 lg:mt-10 lg:pt-7">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-white/32 uppercase">
            {t.risk.controls}
          </p>
          <ul className="mt-4 grid grid-cols-3 gap-4 sm:mt-5 sm:gap-10">
            {t.risk.pillars.map((pillar, index) => {
              const Icon = pillarIcons[index];
              return (
                <li key={pillar.title} className="min-w-0">
                  <span
                    className={cn(
                      "grid h-7 w-7 place-items-center rounded-full border border-current/20 sm:h-8 sm:w-8",
                      pillarTone[index],
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
                  </span>
                  <h3 className="mt-2.5 text-[11px] font-semibold tracking-[0.12em] text-white uppercase sm:text-[12px]">
                    {pillar.title}
                  </h3>
                  <p className="mt-1 max-w-[16rem] text-[12px] leading-snug text-white/42">
                    {pillar.body}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
