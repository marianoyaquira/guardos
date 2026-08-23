"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { FatigueSummary } from "@/components/app/FatigueSummary";
import { GuardOSSidebar } from "@/components/app/GuardOSSidebar";
import { OperationalMap } from "@/components/app/OperationalMap";
import { PostLegend } from "@/components/app/PostLegend";
import { SessionBreaks } from "@/components/app/SessionBreaks";
import { SessionSummary } from "@/components/app/SessionSummary";
import { SessionTabs } from "@/components/app/SessionTabs";
import {
  defaultSessionId,
  demoSessions,
  postIdForInitials,
  type PostId,
} from "@/data/demoSessions";
import { useI18n } from "@/lib/i18n-context";
import { cn } from "@/lib/cn";

export function MapScreen({
  sessionId: controlledId,
  onSessionChange,
  embedded = false,
  showSidebar = true,
  onOpenFatigue,
}: {
  sessionId?: string;
  onSessionChange?: (id: string) => void;
  embedded?: boolean;
  showSidebar?: boolean;
  onOpenFatigue?: () => void;
}) {
  const { t } = useI18n();
  const [internalId, setInternalId] = useState(defaultSessionId);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostId | null>(null);
  const sessionId = controlledId ?? internalId;
  const session =
    demoSessions.find((item) => item.id === sessionId) ?? demoSessions[1];

  function changeSession(id: string) {
    onSessionChange?.(id);
    if (controlledId === undefined) setInternalId(id);
  }

  return (
    <div
      className={cn(
        "flex w-full max-w-full overflow-x-hidden bg-app-bg text-navy",
        embedded || !showSidebar ? "min-h-0" : "min-h-screen",
      )}
    >
      {showSidebar && <GuardOSSidebar className="hidden lg:flex" />}

      {menuOpen && !embedded && showSidebar && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-navy/30"
            aria-label={t.header.closeMenu}
            onClick={() => setMenuOpen(false)}
          />
          <GuardOSSidebar
            className="relative z-50 h-full shadow-2xl"
            onNavigate={() => setMenuOpen(false)}
          />
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        {!embedded && showSidebar && (
          <header className="flex items-center justify-between border-b border-[#E6EEF2] bg-white px-4 py-3 lg:hidden">
            <p className="text-sm font-semibold tracking-[0.12em] text-navy">
              GUARD<span className="text-cyan">OS</span>
            </p>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-xl text-navy"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label={menuOpen ? t.header.closeMenu : t.header.openMenu}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </header>
        )}

        <div className="flex min-w-0 flex-1 flex-col gap-4 p-3 md:p-4 lg:p-5">
          <SessionSummary session={session} />

          <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
            <div className="min-w-0">
              <OperationalMap
                session={session}
                size={embedded ? "capture" : "app"}
                selected={selectedPost}
                onSelectedChange={setSelectedPost}
              />
              {!embedded && <PostLegend className="mt-3 px-1" />}
            </div>
            <div className="flex flex-col gap-4">
              <FatigueSummary
                rows={session.fatigueSummary}
                selectedInitials={
                  selectedPost ? session.assignments[selectedPost].initials : null
                }
                onViewDetails={onOpenFatigue}
                onSelect={(initials) => {
                  const id = postIdForInitials(session, initials);
                  setSelectedPost((current) =>
                    current && session.assignments[current].initials === initials
                      ? null
                      : id,
                  );
                }}
              />
              <SessionBreaks breaks={session.breaks} />
            </div>
          </div>

          <SessionTabs
            sessions={demoSessions}
            activeId={session.id}
            onChange={changeSession}
          />
        </div>
      </div>
    </div>
  );
}
