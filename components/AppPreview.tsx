"use client";

import { AppWorkspace } from "@/components/app/AppWorkspace";

export function AppPreview({
  sessionId,
  onSessionChange,
}: {
  sessionId: string;
  onSessionChange: (id: string) => void;
}) {
  return (
    <div className="min-w-0 overflow-hidden rounded-[8px] border border-navy/10 bg-[#F7FAFC]">
      <AppWorkspace
        embedded
        sessionId={sessionId}
        onSessionChange={onSessionChange}
      />
    </div>
  );
}
