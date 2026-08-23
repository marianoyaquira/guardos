"use client";

import Image from "next/image";
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
    <section className="relative overflow-hidden pt-[72px]">
      <div className="absolute inset-0 hidden md:block">
        <Image
          src="/images/hero-wave-pool.jpg"
          alt={t.hero.imageAlt}
          fill
          priority
          className="object-cover object-[68%_40%]"
          sizes="100vw"
        />
        <div className="photo-wash absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/20" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 md:gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:px-8 lg:py-20">
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
            <CtaButton href={site.ctaHref}>{t.hero.cta}</CtaButton>
            <CtaButton href={site.demoHref} variant="secondary" icon="play">
              {t.hero.secondary}
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

        <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] md:hidden">
          <Image
            src="/images/hero-wave-pool.jpg"
            alt={t.hero.imageAlt}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        <div className="pb-4 sm:pb-10 lg:col-start-2">
          <ProductMockup />
        </div>
      </div>
    </section>
  );
}
