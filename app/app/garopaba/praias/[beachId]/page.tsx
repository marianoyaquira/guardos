"use client";

import { useParams } from "next/navigation";
import { BeachDetail } from "@/components/garopaba/CoastalWorkspace";
import { pt } from "@/i18n/pt";
import { I18nProvider } from "@/lib/i18n-context";

export default function BeachPage() {
  const params = useParams<{ beachId: string }>();
  return (
    <I18nProvider locale="pt" t={pt}>
      <BeachDetail slug={params.beachId} />
    </I18nProvider>
  );
}
