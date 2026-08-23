"use client";

import { Bell, CheckCircle2, ChevronDown, MoreVertical } from "lucide-react";
import type { DemoSession } from "@/data/demoSessions";
import { coveragePercent } from "@/data/demoSessions";
import { cn } from "@/lib/cn";

export function SessionSummary({ session }: { session: DemoSession }) {
  const coverage = coveragePercent(session);

  return (
    <div className="flex flex-col gap-3 xl:flex-row xl:items-stretch">
      <div className="grid min-w-0 flex-1 grid-cols-2 gap-3 lg:grid-cols-4">
        <SummaryCard label="Sessão atual">
          <p className="tabular text-xl font-semibold tracking-[-0.03em] text-navy">
            {session.startTime} → {session.endTime}
          </p>
          <p className="mt-1 inline-flex items-center gap-1 text-sm text-navy/55">
            {session.team}
            <ChevronDown className="h-3.5 w-3.5" />
          </p>
        </SummaryCard>
        <SummaryCard label="Postos cobertos">
          <p className="flex items-center gap-2 text-xl font-semibold tracking-[-0.03em] text-navy">
            <span className="tabular">
              {session.coveredPosts}/{session.totalPosts}
            </span>
            <CheckCircle2
              className={cn(
                "h-5 w-5",
                coverage === 100 ? "text-ok" : "text-attention",
              )}
            />
          </p>
        </SummaryCard>
        <SummaryCard label="Profissionais ativos">
          <p className="tabular text-xl font-semibold tracking-[-0.03em] text-navy">
            {session.activeProfessionals}
          </p>
        </SummaryCard>
        <SummaryCard label="Cobertura da operação">
          <p className="tabular text-xl font-semibold tracking-[-0.03em] text-navy">
            {coverage}%
          </p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#E6F0EA]">
            <div
              className="h-full rounded-full bg-ok transition-[width] duration-500"
              style={{ width: `${coverage}%` }}
            />
          </div>
        </SummaryCard>
      </div>

      <div className="flex items-center justify-end gap-2 xl:pl-2">
        <button
          type="button"
          className="relative grid h-11 w-11 place-items-center rounded-xl border border-[#E6EEF2] bg-white text-navy/70 hover:text-navy"
          aria-label="Notificações, 2 não lidas"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 grid h-4 min-w-4 place-items-center rounded-full bg-[#E11D48] px-1 text-[9px] font-semibold text-white">
            2
          </span>
        </button>
        <button
          type="button"
          className="inline-flex h-11 items-center rounded-xl bg-cyan px-4 text-sm font-semibold text-white shadow-[0_8px_20px_rgb(7_156_179_/_0.22)] transition-all duration-200 hover:-translate-y-px hover:bg-cyan-deep"
        >
          Editar escala
        </button>
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-xl border border-[#E6EEF2] bg-white text-navy/70 hover:text-navy"
          aria-label="Mais ações"
        >
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#E6EEF2] bg-white px-4 py-3 shadow-[0_8px_24px_rgb(7_27_51_/_0.03)]">
      <p className="text-[11px] font-medium tracking-[0.04em] text-navy/40">
        {label}
      </p>
      <div className="mt-1">{children}</div>
    </div>
  );
}
