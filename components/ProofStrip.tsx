"use client";

import Image from "next/image";
import {
  comingSoonOperators,
  isPending,
  operators,
  voices,
  type OperatorMark,
} from "@/data/proofData";
import { useI18n } from "@/lib/i18n-context";

export function ProofStrip() {
  const { t } = useI18n();
  const voice = voices.find((item) => !isPending(item));

  return (
    <section className="border-y border-navy/8 bg-white">
      <div className="mx-auto flex max-w-7xl min-w-0 flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-8 lg:py-7">
        {voice && !isPending(voice) ? (
          <blockquote className="min-w-0 max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-navy/40 uppercase">
              {t.proof.headline}
            </p>
            <p className="mt-2 text-[15px] leading-snug text-navy/75 sm:text-base">
              “{t.proof.emphasis}”
            </p>
            <footer className="mt-3 flex items-center gap-3">
              <Image
                src={voice.photoSrc}
                alt={t.proof.photoAlt}
                width={40}
                height={40}
                className="h-9 w-9 shrink-0 rounded-full object-cover object-[50%_28%]"
              />
              <div className="min-w-0 text-[12px] leading-snug text-navy/50">
                <p className="font-semibold text-navy">{t.proof.name}</p>
                <p>
                  {t.proof.role} · {t.proof.organization}
                </p>
              </div>
              <a
                href="#prova"
                className="ml-auto hidden text-[12px] font-medium text-navy/45 underline-offset-4 hover:text-navy hover:underline sm:inline"
              >
                {t.proof.readFull}
              </a>
            </footer>
          </blockquote>
        ) : null}

        <div className="min-w-0 lg:max-w-sm lg:shrink-0">
          <p className="text-[10px] font-semibold tracking-[0.18em] text-navy/32 uppercase">
            {t.proof.operatorsLabel}
          </p>
          <ul className="mt-2.5 flex flex-wrap items-center gap-2">
            {operators
              .filter((item): item is OperatorMark => !isPending(item))
              .map((item) => (
              <li
                key={item.id}
                className="h-8 rounded-sm border border-navy/10 bg-[#f4f2ee] px-2.5 text-[12px] leading-8 font-semibold tracking-[-0.02em] text-navy"
              >
                {item.name}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[10px] font-semibold tracking-[0.18em] text-navy/32 uppercase">
            {t.proof.comingSoon}
          </p>
          <ul className="mt-2 flex flex-wrap items-center gap-2">
            {comingSoonOperators.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href ?? "/app/garopaba"}
                  className="flex h-8 items-center rounded-sm border border-dashed border-navy/20 px-2.5 text-[12px] font-semibold tracking-[-0.02em] text-navy transition-colors hover:border-cyan/40"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          <ul className="mt-2 hidden gap-2 sm:flex">
            {voices.filter(isPending).map((item) => (
              <li
                key={item.id}
                className="h-8 min-w-[6.5rem] rounded-sm border border-dashed border-navy/12 px-2.5 text-[10px] leading-8 text-navy/28"
              >
                {t.proof.pendingVoice}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
