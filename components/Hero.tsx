"use client";

import Image from "next/image";
import { CtaButton } from "@/components/CtaButton";
import { images } from "@/data/imageSlots";
import { site } from "@/data/site";
import { useI18n } from "@/lib/i18n-context";

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative min-h-[88svh] overflow-hidden bg-[#0a1c22] pt-[72px] lg:min-h-[100svh]">
      <Image
        src={images.surflandHero}
        alt={t.hero.imageAlt}
        fill
        priority
        className="object-cover object-[62%_42%]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(105deg,rgb(255_255_255_/_0.90)_0%,rgb(255_255_255_/_0.72)_32%,rgb(7_27_51_/_0.06)_58%,rgb(7_27_51_/_0.18)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#071b33]/25 via-transparent to-white/10" />

      <div className="relative mx-auto flex min-h-[calc(88svh-72px)] max-w-[92rem] flex-col justify-end px-4 py-12 sm:px-6 lg:min-h-[calc(100svh-72px)] lg:justify-center lg:px-10 lg:py-16">
        <div className="max-w-xl lg:max-w-[36rem]">
          <h1 className="display-hero text-navy">
            {t.hero.titleA}
            <span className="block">{t.hero.titleB}</span>
          </h1>
          <p className="mt-6 max-w-[30rem] text-base leading-relaxed text-navy/70 sm:text-lg">
            {t.hero.body}
          </p>
          <div className="mt-8">
            <CtaButton href={site.ctaHref}>{t.hero.cta}</CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
