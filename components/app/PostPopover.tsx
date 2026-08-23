"use client";

import { MapStatusPill } from "@/components/app/MapStatusPill";
import type { MapPost, PostAssignment } from "@/data/demoSessions";
import { postLabel } from "@/lib/localizeDemo";
import { useI18n } from "@/lib/i18n-context";

export function PostPopover({
  post,
  assignment,
  left,
  top,
}: {
  post: MapPost;
  assignment: PostAssignment;
  left?: number;
  top?: number;
}) {
  const { t } = useI18n();
  const label = postLabel(post.id, t);
  const x = left ?? post.x;
  const y = top ?? post.y;

  return (
    <div
      className="absolute z-20 w-[240px] -translate-x-1/2 rounded-2xl border border-[#E6EEF2] bg-white p-3 shadow-[0_16px_40px_rgb(7_27_51_/_0.12)]"
      style={{
        left: `${Math.min(88, Math.max(14, x))}%`,
        top: y > 68 ? undefined : `calc(${y}% + 28px)`,
        bottom: y > 68 ? `calc(${100 - y}% + 28px)` : undefined,
      }}
      role="dialog"
      aria-label={label}
    >
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={assignment.photo}
          alt={assignment.name}
          width={56}
          height={56}
          className="h-14 w-14 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-navy">{assignment.name}</p>
          <p className="text-xs text-navy/50">
            {assignment.initials} · {label}
          </p>
        </div>
      </div>
      <dl className="mt-3 space-y-1.5 text-xs text-navy/65">
        <div className="flex justify-between gap-3">
          <dt>{t.ui.timeOnPost}</dt>
          <dd className="tabular font-medium text-navy">
            {assignment.minutesOnPost} {t.ui.minutes}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt>{t.ui.status}</dt>
          <dd>
            <MapStatusPill status={assignment.status} compact />
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt>{t.ui.nextSwap}</dt>
          <dd className="tabular font-medium text-navy">{assignment.nextSwap}</dd>
        </div>
      </dl>
    </div>
  );
}
