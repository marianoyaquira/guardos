"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
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
        <h2 className="max-w-xl text-[1.75rem] font-semibold tracking-[-0.03em] text-white sm:text-4xl">
          {t.cta.title}
        </h2>
        <p className="mt-4 max-w-xl text-lg text-white/60">{t.cta.body}</p>
        <p className="mt-3 text-sm text-white/50">
          {t.cta.writeTo}{" "}
          <a
            href={`mailto:${site.contact.email}`}
            className="text-white/80 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white"
          >
            {site.contact.email}
          </a>
        </p>

        <form onSubmit={onSubmit} className="mt-10 grid max-w-xl gap-3 sm:grid-cols-2">
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
    </section>
  );
}
