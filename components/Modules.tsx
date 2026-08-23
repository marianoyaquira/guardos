"use client";

import Image from "next/image";
import {
  CalendarRange,
  ClipboardList,
  Package,
  Shield,
  UserPlus,
  Users,
} from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { cn } from "@/lib/cn";

const icons = [CalendarRange, ClipboardList, Shield, UserPlus, Users, Package];

export function Modules() {
  const { t } = useI18n();

  return (
    <section id="recursos" className="bg-aqua">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/surf-wave.jpg"
            alt={t.modules.imageAlt}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/55 to-navy/30" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <p className="kicker text-cyan">{t.modules.kicker}</p>
          <h2 className="section-title mt-3 max-w-2xl text-white">
            {t.modules.title}
          </h2>
          <p className="mt-4 max-w-xl text-white/70">{t.modules.body}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {t.modules.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <article
                key={item.title}
                className={cn(
                  "rounded-[20px] border border-transparent pt-5 transition-colors hover:border-cyan/30",
                  "border-t border-navy/10",
                  item.weight === "primary" && "lg:pt-6",
                )}
              >
                <Icon className="h-5 w-5 text-cyan-deep" strokeWidth={1.6} />
                <h3
                  className={cn(
                    "mt-4 font-semibold tracking-[-0.02em] text-navy",
                    item.weight === "primary" ? "text-xl" : "text-base",
                  )}
                >
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/58">
                  {item.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
