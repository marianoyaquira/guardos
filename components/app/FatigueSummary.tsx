"use client";

import { MapStatusPill } from "@/components/app/MapStatusPill";
import type { FatigueRow } from "@/data/demoSessions";

export function FatigueSummary({ rows }: { rows: FatigueRow[] }) {
  return (
    <section className="rounded-2xl border border-[#E6EEF2] bg-white p-4 shadow-[0_8px_24px_rgb(7_27_51_/_0.03)]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-navy">Painel de Fadiga</h2>
        <span className="text-xs font-medium text-cyan">Ver detalhes</span>
      </div>
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="text-[10px] tracking-[0.08em] text-navy/35 uppercase">
            <th className="pb-2 font-medium">Guarda-vidas</th>
            <th className="pb-2 font-medium">Tempo total</th>
            <th className="pb-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-[#F0F4F7]">
              <td className="py-2.5 font-medium text-navy">{row.label}</td>
              <td className="tabular py-2.5 text-navy/65">{row.totalTime}</td>
              <td className="py-2.5">
                <MapStatusPill status={row.status} compact />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
