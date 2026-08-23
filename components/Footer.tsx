"use client";

import { Logo } from "@/components/Logo";
import { site } from "@/data/site";
import { useI18n } from "@/lib/i18n-context";

export function Footer() {
  const { t } = useI18n();
  const links = t.nav.filter((item) => item.href !== "#prova");

  return (
    <footer className="bg-[#061525] text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-8">
        <div className="flex min-w-0 flex-wrap items-center gap-x-5 gap-y-2">
          <Logo inverted compact hideMotif />
          <p className="text-sm text-white/40">{t.footer.line}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 text-sm">
          <a
            href={`mailto:${site.contact.email}`}
            className="text-white/70 transition-colors hover:text-white"
          >
            {site.contact.email}
          </a>
          <span className="text-white/20" aria-hidden>
            ·
          </span>
          <span className="text-white/35">{t.brand.domain}</span>
        </div>
        <nav className="flex flex-wrap gap-x-4 text-sm text-white/60">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
