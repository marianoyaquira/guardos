"use client";

import { MapStatusPill } from "@/components/app/MapStatusPill";
import type { MapPost, PostAssignment } from "@/data/demoSessions";

export function PostPopover({
  post,
  assignment,
}: {
  post: MapPost;
  assignment: PostAssignment;
}) {
  return (
    <div
      className="absolute z-20 w-[220px] -translate-x-1/2 rounded-2xl border border-[#E6EEF2] bg-white p-3 shadow-[0_16px_40px_rgb(7_27_51_/_0.12)]"
      style={{
        left: `${Math.min(88, Math.max(14, post.x))}%`,
        top: post.y > 68 ? undefined : `calc(${post.y}% + 42px)`,
        bottom: post.y > 68 ? `calc(${100 - post.y}% + 42px)` : undefined,
      }}
      role="dialog"
      aria-label={`Detalhes de ${post.label}`}
    >
      <p className="text-sm font-semibold text-navy">{post.label}</p>
      <p className="text-sm text-navy/60">{assignment.name}</p>
      <dl className="mt-3 space-y-1.5 text-xs text-navy/65">
        <div className="flex justify-between gap-3">
          <dt>Tempo neste posto</dt>
          <dd className="tabular font-medium text-navy">
            {assignment.minutesOnPost} min
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt>Status</dt>
          <dd>
            <MapStatusPill status={assignment.status} compact />
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt>Próxima troca</dt>
          <dd className="tabular font-medium text-navy">{assignment.nextSwap}</dd>
        </div>
      </dl>
    </div>
  );
}
