"use client";

import { FairnessRanking } from "@/components/FairnessRanking";
import { FatigueChart } from "@/components/FatigueChart";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LiveOperation } from "@/components/LiveOperation";
import { Modules } from "@/components/Modules";
import { Roadmap } from "@/components/Roadmap";
import { RiskNarrative } from "@/components/RiskNarrative";
import { RotationExpress } from "@/components/RotationExpress";
import { ProofStrip } from "@/components/ProofStrip";
import { SurflandProof } from "@/components/SurflandProof";
import { getDictionary, type Locale } from "@/i18n";
import { I18nProvider } from "@/lib/i18n-context";

export function Landing({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <I18nProvider locale={locale} t={t}>
      <div id="topo" className="min-w-0">
        <Header />
        <main>
          <Hero />
          <ProofStrip />
          <LiveOperation />
          <RiskNarrative />
          <section className="overflow-x-hidden bg-white">
            <div className="mx-auto max-w-7xl space-y-20 overflow-x-hidden px-4 py-16 sm:px-6 lg:px-8 lg:space-y-24 lg:py-20">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.16em] text-navy/35 uppercase">
                  {t.triad}
                </p>
                <div className="mt-5">
                  <RotationExpress />
                </div>
              </div>
              <FatigueChart />
              <FairnessRanking />
            </div>
          </section>
          <SurflandProof />
          <Modules />
          <Roadmap />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </I18nProvider>
  );
}
