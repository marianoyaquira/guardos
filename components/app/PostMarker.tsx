"use client";

import type { MapPost, PostAssignment } from "@/data/demoSessions";
import { postLabel } from "@/lib/localizeDemo";
import { useI18n } from "@/lib/i18n-context";
import { cn } from "@/lib/cn";

export function PostMarker({
  post,
  assignment,
  selected,
  zoom = 1,
  minutesUntilSwap,
  dragging = false,
  onDragStart,
  onDragMove,
  onDragEnd,
}: {
  post: MapPost;
  assignment: PostAssignment;
  selected: boolean;
  zoom?: number;
  minutesUntilSwap: number;
  dragging?: boolean;
  onDragStart: (id: typeof post.id, event: React.PointerEvent<HTMLButtonElement>) => void;
  onDragMove: (event: React.PointerEvent<HTMLButtonElement>) => void;
  onDragEnd: (event: React.PointerEvent<HTMLButtonElement>) => void;
}) {
  const { t } = useI18n();
  const attention = assignment.status !== "OK";
  const overdue = minutesUntilSwap < 0;
  const dueNow = minutesUntilSwap === 0;
  const swapLabel = overdue
    ? t.ui.swapOverduePin.replace("{n}", String(Math.abs(minutesUntilSwap)))
    : dueNow
      ? t.ui.swapNow
      : t.ui.nextSwapPin.replace("{n}", String(minutesUntilSwap));
  const swapSpoken = overdue
    ? t.ui.swapOverdue.replace("{n}", String(Math.abs(minutesUntilSwap)))
    : dueNow
      ? t.ui.swapNow
      : t.ui.nextSwapIn.replace("{n}", String(minutesUntilSwap));

  return (
    <button
      type="button"
      onPointerDown={(event) => {
        event.stopPropagation();
        onDragStart(post.id, event);
      }}
      onPointerMove={onDragMove}
      onPointerUp={onDragEnd}
      aria-label={`${postLabel(post.id, t)}, ${assignment.name}, ${t.fatigue.status[assignment.status]}, ${swapSpoken}`}
      aria-pressed={selected}
      className={cn(
        "absolute origin-center touch-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan",
        dragging ? "z-30 cursor-grabbing" : "z-10 cursor-grab",
      )}
      style={{
        left: `${post.x}%`,
        top: `${post.y}%`,
        transform: `translate(-50%, -50%) scale(${1 / zoom})`,
      }}
    >
      <span
        className={cn(
          "relative flex transition-transform duration-200",
          selected ? "scale-110" : "hover:scale-105",
        )}
      >
        <span
          className={cn(
            "absolute bottom-full left-1/2 z-10 mb-0.5 -translate-x-1/2 grid h-8 min-w-8 place-items-center rounded-full px-1.5 text-[10px] font-semibold text-white shadow-[0_6px_16px_rgb(7_27_51_/_0.18)]",
            attention && !selected ? "bg-[#D97706]" : "bg-cyan",
            selected && "ring-4 ring-cyan/30",
          )}
        >
          {post.code}
        </span>
        <span
          className={cn(
            "overflow-hidden rounded-full bg-navy shadow-[0_4px_12px_rgb(7_27_51_/_0.16)]",
            selected && "ring-2 ring-white",
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={assignment.photo}
            alt={assignment.name}
            width={32}
            height={32}
            className="h-8 w-8 object-cover"
          />
        </span>
        <span
          className={cn(
            "absolute top-full left-1/2 mt-0.5 -translate-x-1/2 whitespace-nowrap rounded-full px-1.5 py-0.5 text-[9px] font-semibold leading-none shadow-[0_4px_10px_rgb(7_27_51_/_0.12)]",
            overdue || assignment.status === "ALTO"
              ? "bg-[#C24141] text-white"
              : assignment.status === "ATENÇÃO"
                ? "bg-[#D97706] text-white"
                : "border border-[#E6EEF2] bg-white text-navy",
          )}
        >
          {swapLabel}
        </span>
      </span>
    </button>
  );
}
