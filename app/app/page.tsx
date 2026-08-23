"use client";

import { AppWorkspace } from "@/components/app/AppWorkspace";
import { en } from "@/i18n/en";
import { I18nProvider } from "@/lib/i18n-context";

export default function GuardOSAppPage() {
  return (
    <I18nProvider locale="en" t={en}>
      <div className="max-w-[100vw] overflow-x-hidden">
        <AppWorkspace />
      </div>
    </I18nProvider>
  );
}
