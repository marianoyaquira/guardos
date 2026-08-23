"use client";

import { LanguageSwitch } from "@/components/LanguageSwitch";
import { Logo } from "@/components/Logo";
import { site } from "@/data/site";
import { useI18n } from "@/lib/i18n-context";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-[#061525] text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div>
          <Logo inverted compact />
          <p className="mt-3 text-sm text-white/55">{t.brand.tagline}</p>
          <p className="mt-4 max-w-sm text-sm text-white/40">{t.footer.line}</p>
        </div>
        <div className="flex flex-col items-start gap-4 text-sm text-white/60 lg:items-end">
          <LanguageSwitch inverted />
          <div>
            {site.contact.name && <p>{site.contact.name}</p>}
            <a
              href={`mailto:${site.contact.email}`}
              className="block hover:text-cyan"
            >
              {site.contact.email}
            </a>
            {site.contact.phone && <p>{site.contact.phone}</p>}
            {site.contact.website && <p>{site.contact.website}</p>}
          </div>
        </div>
      </div>
    </footer>
  );
}
