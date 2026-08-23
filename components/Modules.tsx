"use client";

import {
  CalendarDays,
  FileChartColumn,
  Monitor,
  UserPlus,
  Contact,
  Package,
} from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

const moduleIcons = [CalendarDays, FileChartColumn, Monitor, UserPlus, Contact, Package];

export function Modules() {
  const { t } = useI18n();

  return (
    <section id="recursos" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <h2 className="max-w-xl text-[1.45rem] font-semibold tracking-[-0.03em] text-navy sm:text-2xl">
          {t.modules.title}
        </h2>
        <p className="mt-2 max-w-lg text-sm text-navy/55">{t.modules.body}</p>
        <ul className="mt-8 grid gap-x-10 gap-y-5 sm:grid-cols-2">
          {t.modules.items.map((item, index) => {
            const Icon = moduleIcons[index];
            return (
              <li key={item.title} className="border-t border-navy/10 pt-3">
                <p className="flex items-center gap-2 text-sm font-semibold text-navy">
                  <Icon className="h-3.5 w-3.5 shrink-0 text-navy/35" strokeWidth={1.5} aria-hidden />
                  {item.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-navy/52">{item.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
