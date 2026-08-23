"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { CtaButton } from "@/components/CtaButton";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { Logo } from "@/components/Logo";
import { site } from "@/data/site";
import { useI18n } from "@/lib/i18n-context";

export function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-navy/8 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo compact />
        <nav className="hidden items-center gap-7 lg:flex">
          {t.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] font-medium text-navy/65 transition-colors hover:text-navy"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitch />
          <CtaButton
            href={site.appHref}
            variant="secondary"
            icon="launch"
            className="min-h-10 bg-white px-4 text-sm"
          >
            {t.header.tryApp}
          </CtaButton>
          <CtaButton href={site.ctaHref} className="min-h-10 px-4 text-sm">
            {t.header.cta}
          </CtaButton>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitch />
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-lg text-navy"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.header.closeMenu : t.header.openMenu}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div
          id="mobile-nav"
          className="min-h-[calc(100svh-72px)] border-t border-navy/8 bg-white px-4 py-5 lg:hidden"
        >
          <nav className="flex flex-col gap-1">
            {t.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-[15px] font-medium text-navy/80"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <CtaButton href={site.appHref} icon="launch" className="mt-4 w-full">
            {t.header.tryApp}
          </CtaButton>
          <CtaButton href={site.ctaHref} variant="secondary" className="mt-3 w-full">
            {t.header.cta}
          </CtaButton>
        </div>
      )}
    </header>
  );
}
