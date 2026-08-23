"use client";

import { AppScreenHeader } from "@/components/app/AppScreenHeader";
import { demoReports } from "@/data/demoAppData";
import { demoSessions } from "@/data/demoSessions";
import { useI18n } from "@/lib/i18n-context";

export function ReportsScreen() {
  const { t } = useI18n();

  return (
    <div className="min-w-0 space-y-5">
      <AppScreenHeader title={t.ui.navReports} lead={t.app.reportsLead} />
      <ul className="grid gap-3 md:grid-cols-2">
        {demoReports.map((report) => {
          const session = demoSessions.find((item) => item.id === report.session);
          return (
            <li
              key={report.id}
              className="flex items-start justify-between gap-4 rounded-2xl border border-[#E6EEF2] bg-white p-4"
            >
              <div className="min-w-0">
                <p className="font-semibold text-navy">{t.app[report.key]}</p>
                <p className="mt-1 text-sm text-navy/50">
                  {t.app.periodToday}
                  {session ? ` · ${session.startTime}–${session.endTime}` : ""}
                </p>
              </div>
              <button
                type="button"
                className="shrink-0 rounded-xl border border-[#E6EEF2] px-3 py-2 text-xs font-semibold text-navy/70"
              >
                {t.app.export}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
