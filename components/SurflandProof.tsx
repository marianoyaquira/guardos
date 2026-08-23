"use client";

import Image from "next/image";
import { images } from "@/data/imageSlots";
import { useI18n } from "@/lib/i18n-context";

export function SurflandProof() {
  const { t } = useI18n();

  return (
    <section id="prova" className="bg-[#f4f2ee]">
      <div className="mx-auto max-w-[42rem] px-4 py-[var(--space-section)] sm:px-6 lg:max-w-[46rem]">
        <h2 className="text-[1.85rem] font-semibold tracking-[-0.035em] text-navy sm:text-4xl">
          {t.proof.headline}
        </h2>
        <blockquote className="mt-8">
          <p className="text-lg leading-relaxed text-navy/70 sm:text-xl">
            {t.proof.quote}{" "}
            <span className="font-medium text-navy">{t.proof.emphasis}</span>
          </p>
          <footer className="mt-8 flex items-center gap-4">
            <Image
              src={images.pedro}
              alt={t.proof.photoAlt}
              width={208}
              height={208}
              className="h-20 w-20 shrink-0 rounded-full object-cover object-[50%_28%] lg:h-[104px] lg:w-[104px]"
            />
            <div>
              <p className="text-base font-semibold text-navy">{t.proof.name}</p>
              <p className="mt-1 text-sm text-navy/55">
                {t.proof.role} · {t.proof.organization}
              </p>
            </div>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
