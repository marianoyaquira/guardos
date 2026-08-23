"use client";

import type { GuardAssignment, PostId } from "@/data/demoRotationData";
import { rotationPosts } from "@/data/demoRotationData";
import { useI18n } from "@/lib/i18n-context";
import { cn } from "@/lib/cn";

export function PoolDiagram({
  assignments,
  compact = false,
}: {
  assignments: Record<PostId, GuardAssignment>;
  compact?: boolean;
}) {
  const { t } = useI18n();
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-[#0a2c36]",
        compact ? "aspect-[16/11] min-h-[220px]" : "aspect-[16/11] min-h-[280px] sm:min-h-[380px]",
      )}
    >
      <svg
        viewBox="0 0 1000 700"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <rect width="1000" height="700" fill="#0a2c36" />
        <path
          d="M90 210 C 90 110, 910 110, 910 210 L 910 470 C 910 580, 90 580, 90 470 Z"
          fill="#0e5c6b"
        />
        <path
          d="M130 230 C 130 150, 870 150, 870 230 L 870 450 C 870 540, 130 540, 130 450 Z"
          fill="#1494a6"
        />
        <path
          d="M180 250 C 260 190, 720 190, 820 250 C 760 280, 260 280, 180 250 Z"
          fill="#7fd4df"
          opacity="0.55"
        />
        <path
          d="M170 330 C 280 300, 740 300, 830 340 C 740 370, 270 360, 170 330 Z"
          fill="#0d7484"
          opacity="0.45"
        />
        <path
          d="M190 410 C 320 380, 700 385, 810 425 C 690 455, 300 445, 190 410 Z"
          fill="#ffffff"
          opacity="0.16"
        />
        <rect x="360" y="92" width="280" height="38" rx="4" fill="#c4a574" />
        <text
          x="500"
          y="78"
          textAnchor="middle"
          fill="rgba(255,255,255,0.55)"
          fontSize="16"
          letterSpacing="4"
        >
          {t.map.pool.toUpperCase()}
        </text>
      </svg>

      {rotationPosts.map((post) => {
        const guard = assignments[post.id];
        const isRest = guard.initials === "—";
        return (
          <div
            key={post.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-center transition-all duration-500"
            style={{ left: `${post.x}%`, top: `${post.y}%` }}
          >
            <div
              className={cn(
                "mx-auto grid place-items-center rounded-full border font-semibold text-white transition-all duration-500",
                compact
                  ? "h-7 w-7 text-[9px]"
                  : "h-8 w-8 text-[10px] sm:h-9 sm:w-9 sm:text-[11px]",
                isRest
                  ? "border-white/15 bg-white/10 text-white/50"
                  : "border-cyan/70 bg-[#0c2744] shadow-[0_0_0_3px_rgb(0_168_181_/_0.16)]",
              )}
            >
              {isRest ? "—" : guard.initials}
            </div>
            <p
              className={cn(
                "mt-1 font-medium tracking-[0.14em] text-white/70",
                compact ? "text-[8px]" : "text-[9px]",
              )}
            >
              {post.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
