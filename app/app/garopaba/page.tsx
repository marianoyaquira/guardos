"use client";

import { CoastalWorkspace } from "@/components/garopaba/CoastalWorkspace";
import { pt } from "@/i18n/pt";
import { I18nProvider } from "@/lib/i18n-context";

export default function GaropabaAppPage() {
  return (
    <I18nProvider locale="pt" t={pt}>
      <CoastalWorkspace />
    </I18nProvider>
  );
}
