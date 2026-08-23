"use client";

import { AppScreenHeader } from "@/components/app/AppScreenHeader";
import { MapStatusPill } from "@/components/app/MapStatusPill";
import { demoInventory } from "@/data/demoAppData";
import { useI18n } from "@/lib/i18n-context";

export function InventoryScreen() {
  const { t } = useI18n();

  return (
    <div className="min-w-0 space-y-5">
      <AppScreenHeader title={t.ui.navInventory} lead={t.app.inventoryLead} />
      <div className="overflow-hidden rounded-2xl border border-[#E6EEF2] bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#E6EEF2] text-[10px] tracking-[0.08em] text-navy/35 uppercase">
              <th className="px-4 py-3 font-medium">{t.app.item}</th>
              <th className="px-4 py-3 font-medium">{t.app.quantity}</th>
              <th className="px-4 py-3 font-medium">{t.app.location}</th>
              <th className="px-4 py-3 font-medium">{t.ui.status}</th>
            </tr>
          </thead>
          <tbody>
            {demoInventory.map((row) => (
              <tr key={row.id} className="border-t border-[#F0F4F7]">
                <td className="px-4 py-3 font-medium text-navy">{row.item}</td>
                <td className="tabular px-4 py-3 text-navy/65">{row.quantity}</td>
                <td className="px-4 py-3 text-navy/65">{row.location}</td>
                <td className="px-4 py-3">
                  <MapStatusPill status={row.status} compact />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
