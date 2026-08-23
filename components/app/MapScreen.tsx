"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { FatigueSummary } from "@/components/app/FatigueSummary";
import { GuardOSSidebar } from "@/components/app/GuardOSSidebar";
import { OperationalMap } from "@/components/app/OperationalMap";
import { SessionBreaks } from "@/components/app/SessionBreaks";
import { SessionSummary } from "@/components/app/SessionSummary";
import { SessionTabs } from "@/components/app/SessionTabs";
import { defaultSessionId, demoSessions } from "@/data/demoSessions";

export function MapScreen() {
  const [sessionId, setSessionId] = useState(defaultSessionId);
  const [menuOpen, setMenuOpen] = useState(false);
  const session =
    demoSessions.find((item) => item.id === sessionId) ?? demoSessions[1];

  return (
    <div className="flex min-h-screen bg-app-bg text-navy">
      <GuardOSSidebar className="hidden lg:flex" />

      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-navy/30"
            aria-label="Fechar menu"
            onClick={() => setMenuOpen(false)}
          />
          <GuardOSSidebar
            className="relative z-50 h-full shadow-2xl"
            onNavigate={() => setMenuOpen(false)}
          />
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-[#E6EEF2] bg-white px-4 py-3 lg:hidden">
          <p className="text-sm font-semibold tracking-[0.12em] text-navy">
            GUARD<span className="text-cyan">OS</span>
          </p>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl text-navy"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </header>

        <div className="flex min-w-0 flex-1 flex-col gap-4 p-4 md:p-5">
          <SessionSummary session={session} />

          <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
            <OperationalMap session={session} />
            <div className="flex flex-col gap-4">
              <FatigueSummary rows={session.fatigueSummary} />
              <SessionBreaks breaks={session.breaks} />
            </div>
          </div>

          <SessionTabs
            sessions={demoSessions}
            activeId={session.id}
            onChange={setSessionId}
          />
        </div>
      </div>
    </div>
  );
}
