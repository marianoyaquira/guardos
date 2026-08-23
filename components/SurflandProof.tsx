"use client";

import { proofData } from "@/data/proofData";
import { useI18n } from "@/lib/i18n-context";

export function SurflandProof() {
  const { t } = useI18n();

  return (
    <section id="prova" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-[var(--space-section)] sm:px-6 lg:px-8">
        <p className="kicker text-cyan-deep">{t.proof.eyebrow}</p>
        <h2 className="section-title mt-3 max-w-3xl text-navy">
          {t.proof.headline}
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-navy/60">{t.proof.body}</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-[20px] border border-navy/8">
            {proofData.imageSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={proofData.imageSrc}
                alt={proofData.imageAlt}
                className="h-full min-h-[280px] w-full object-cover"
              />
            ) : (
              <div className="skeleton-slot grid min-h-[280px] place-items-center px-6 text-center">
                <div>
                  <p className="kicker text-navy/35">{t.proof.imagePending}</p>
                  <p className="mt-2 max-w-sm text-sm text-navy/45">
                    {t.proof.imageHint}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {t.proof.metrics.map((metric) => {
                const value =
                  proofData.metrics.find((item) => item.id === metric.id)
                    ?.value ?? null;
                return (
                  <div key={metric.id} className="border-t border-navy/10 pt-4">
                    {value ? (
                      <p className="tabular font-mono text-5xl font-semibold tracking-tight text-navy">
                        {value}
                      </p>
                    ) : (
                      <p className="skeleton-slot inline-flex rounded-lg px-3 py-2 font-mono text-5xl font-semibold tracking-tight text-navy/25">
                        —
                      </p>
                    )}
                    <p className="mt-1 text-sm text-navy/55">{metric.label}</p>
                    {!value && (
                      <p className="mt-1 text-[11px] tracking-[0.08em] text-navy/35 uppercase">
                        {t.proof.awaiting}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
            <blockquote className="skeleton-slot rounded-[20px] px-5 py-5">
              <p className="text-base leading-relaxed text-navy/45 italic">
                “{proofData.testimonial.quote ?? t.proof.quotePending}”
              </p>
              <footer className="mt-4 text-sm text-navy/40">
                — {proofData.testimonial.name ?? t.proof.namePending}
                <span className="block">
                  {proofData.testimonial.organization}
                </span>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
