"use client";

import { useState } from "react";
import { AppScreenHeader } from "@/components/app/AppScreenHeader";
import { useAppNav } from "@/lib/app-nav";
import { useOperation } from "@/lib/operation-context";
import { useI18n } from "@/lib/i18n-context";
import { cn } from "@/lib/cn";

export function SettingsScreen() {
  const { t } = useI18n();
  const { openSetup, openPlan } = useOperation();
  const openView = useAppNav();
  const [watch, setWatch] = useState(true);
  const [high, setHigh] = useState(true);

  return (
    <div className="min-w-0 space-y-5">
      <AppScreenHeader title={t.ui.navSettings} lead={t.app.settingsLead} />
      <div className="max-w-xl space-y-3 rounded-2xl border border-[#E6EEF2] bg-white p-5">
        <button
          type="button"
          onClick={() => {
            openPlan();
            openView("sessao");
          }}
          className="flex w-full items-center justify-between rounded-xl border border-[#E6EEF2] px-3 py-3 text-left"
        >
          <span>
            <span className="block text-sm font-semibold text-navy">{t.app.postsPlanTitle}</span>
            <span className="mt-0.5 block text-xs text-navy/45">{t.app.postsPlanLead}</span>
          </span>
        </button>
        <button
          type="button"
          onClick={() => {
            openSetup("people");
            openView("sessao");
          }}
          className="flex w-full items-center justify-between rounded-xl border border-[#E6EEF2] px-3 py-3 text-left"
        >
          <span>
            <span className="block text-sm font-semibold text-navy">{t.app.setupTitle}</span>
            <span className="mt-0.5 block text-xs text-navy/45">{t.app.setupLead}</span>
          </span>
        </button>
        <label className="block">
          <span className="text-[11px] font-semibold tracking-[0.08em] text-navy/40 uppercase">
            {t.app.unit}
          </span>
          <span className="mt-1 block rounded-xl border border-[#E6EEF2] bg-[#F7FAFC] px-3 py-2.5 text-sm text-navy">
            {t.app.unitValue}
          </span>
        </label>
        <label className="block">
          <span className="text-[11px] font-semibold tracking-[0.08em] text-navy/40 uppercase">
            {t.app.language}
          </span>
          <span className="mt-1 block rounded-xl border border-[#E6EEF2] bg-[#F7FAFC] px-3 py-2.5 text-sm text-navy">
            {t.app.languageValue}
          </span>
        </label>
        <button
          type="button"
          onClick={() => setWatch((value) => !value)}
          className="flex w-full items-center justify-between rounded-xl border border-[#E6EEF2] px-3 py-3 text-left"
        >
          <span className="text-sm text-navy">{t.app.notifyWatch}</span>
          <span
            className={cn(
              "h-6 w-10 rounded-full p-0.5 transition-colors",
              watch ? "bg-cyan" : "bg-navy/15",
            )}
          >
            <span
              className={cn(
                "block h-5 w-5 rounded-full bg-white transition-transform",
                watch && "translate-x-4",
              )}
            />
          </span>
        </button>
        <button
          type="button"
          onClick={() => setHigh((value) => !value)}
          className="flex w-full items-center justify-between rounded-xl border border-[#E6EEF2] px-3 py-3 text-left"
        >
          <span className="text-sm text-navy">{t.app.notifyHigh}</span>
          <span
            className={cn(
              "h-6 w-10 rounded-full p-0.5 transition-colors",
              high ? "bg-cyan" : "bg-navy/15",
            )}
          >
            <span
              className={cn(
                "block h-5 w-5 rounded-full bg-white transition-transform",
                high && "translate-x-4",
              )}
            />
          </span>
        </button>
      </div>
    </div>
  );
}
