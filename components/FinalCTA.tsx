"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { CtaButton } from "@/components/CtaButton";
import { site } from "@/data/site";
import { useI18n } from "@/lib/i18n-context";

export function FinalCTA() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const park = String(data.get("park") ?? "");
    const subject = encodeURIComponent(t.cta.mailSubject);
    const body = encodeURIComponent(
      t.cta.mailBody
        .replace("{name}", name)
        .replace("{email}", email)
        .replace("{park}", park),
    );
    window.location.href = `mailto:${site.contact.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contato" className="relative overflow-hidden bg-navy text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_20%,rgb(0_168_181_/_0.16),transparent_55%)]" />
      <div className="absolute inset-y-0 right-0 hidden w-[42%] lg:block">
        <Image
          src="/images/surf-wave.jpg"
          alt={t.cta.imageAlt}
          fill
          className="object-cover opacity-50"
          sizes="42vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/70 to-transparent" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-[var(--space-section)] sm:px-6 lg:px-8">
        <h2 className="section-title max-w-xl text-white">{t.cta.title}</h2>
        <ol className="mt-10 grid max-w-3xl gap-6 sm:grid-cols-3">
          {t.cta.steps.map((step, index) => (
            <li key={step.title} className="flex gap-3">
              <p className="w-8 shrink-0 text-sm font-semibold text-cyan">
                0{index + 1}
              </p>
              <div>
                <h3 className="text-lg font-semibold tracking-[-0.02em]">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-white/60">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 max-w-xl">
          <CtaButton
            href={`mailto:${site.contact.email}?subject=${encodeURIComponent(t.cta.mailSubject)}`}
          >
            {t.cta.button}
          </CtaButton>
          <form onSubmit={onSubmit} className="mt-8 grid gap-3 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-1.5 block text-white/55">{t.cta.name}</span>
              <input
                name="name"
                required
                className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-white outline-none focus-visible:border-cyan"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block text-white/55">{t.cta.email}</span>
              <input
                name="email"
                type="email"
                required
                className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-white outline-none focus-visible:border-cyan"
              />
            </label>
            <label className="block text-sm sm:col-span-2">
              <span className="mb-1.5 block text-white/55">{t.cta.park}</span>
              <input
                name="park"
                className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-white outline-none focus-visible:border-cyan"
              />
            </label>
            <button
              type="submit"
              className="h-12 rounded-xl bg-cyan px-5 text-sm font-semibold text-white shadow-[0_8px_24px_rgb(0_168_181_/_0.28)] transition-all duration-200 hover:-translate-y-px hover:bg-cyan-deep sm:col-span-2"
            >
              {sent ? t.cta.sent : t.cta.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
