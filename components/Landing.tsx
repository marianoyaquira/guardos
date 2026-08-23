"use client";

import { FairnessRanking } from "@/components/FairnessRanking";
import { FatigueChart } from "@/components/FatigueChart";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Modules } from "@/components/Modules";
import { Pricing } from "@/components/Pricing";
import { ProblemSection } from "@/components/ProblemSection";
import { Roadmap } from "@/components/Roadmap";
import { RotationExpress } from "@/components/RotationExpress";
import { RotationMap } from "@/components/RotationMap";
import { SurflandProof } from "@/components/SurflandProof";
import { TrackingMessage } from "@/components/TrackingMessage";
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
          <ProblemSection />
          <section id="solucao" className="bg-aqua">
            <div className="mx-auto max-w-7xl px-4 py-[var(--space-section)] sm:px-6 lg:px-8">
              <h2 className="section-title max-w-3xl text-navy">
                {t.product.title}
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-navy/58">{t.product.body}</p>
              <div className="mt-10 space-y-6">
                <RotationMap />
                <TrackingMessage />
                <RotationExpress />
                <FatigueChart />
                <FairnessRanking />
              </div>
            </div>
          </section>
          <Modules />
          <SurflandProof />
          <Pricing />
          <Roadmap />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </I18nProvider>
  );
}
