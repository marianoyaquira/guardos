"use client";

import {
  Activity,
  CalendarRange,
  MapPin,
  Repeat,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { CtaButton } from "@/components/CtaButton";
import { ProductMockup } from "@/components/ProductMockup";
import { site } from "@/data/site";
import { useI18n } from "@/lib/i18n-context";

const signalIcons = [Repeat, Activity, Scale, CalendarRange, ShieldCheck, MapPin];

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f3fafb_0%,#ffffff_42%)] pt-[72px]">
      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 md:gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:px-8 lg:py-20">
        <div>
          <p className="kicker inline-flex items-center gap-2 text-cyan-deep">
            <span className="h-1.5 w-1.5 rounded-full bg-ok" />
            {t.hero.eyebrow}
          </p>
          <h1 className="display mt-5 text-navy">
            {t.hero.titleA}
            <span className="block">{t.hero.titleB}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed font-normal text-navy/68 sm:text-lg">
            {t.hero.body}
          </p>
          <p className="mt-3 max-w-xl text-sm font-medium text-navy/72 sm:text-base">
            {t.hero.tracking}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaButton href={site.appHref} icon="play">
              {t.hero.secondary}
            </CtaButton>
            <CtaButton href={site.ctaHref} variant="secondary">
              {t.hero.cta}
            </CtaButton>
          </div>
          <ul className="mt-8 flex flex-wrap gap-2">
            {t.hero.signals.map((label, index) => {
              const Icon = signalIcons[index] ?? MapPin;
              return (
                <li
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-navy/8 bg-white/70 px-3 py-1.5 text-[11px] font-semibold tracking-[0.12em] text-navy/55 uppercase"
                >
                  <Icon className="h-3.5 w-3.5 text-cyan-deep" />
                  {label}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="pb-4 sm:pb-10 lg:col-start-2">
          <ProductMockup />
        </div>
      </div>
    </section>
  );
}
