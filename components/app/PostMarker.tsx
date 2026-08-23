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
  onSelect,
}: {
  post: MapPost;
  assignment: PostAssignment;
  selected: boolean;
  zoom?: number;
  onSelect: (id: typeof post.id) => void;
}) {
  const { t } = useI18n();
  const attention = assignment.status !== "OK";

  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onSelect(post.id);
      }}
      aria-label={`${postLabel(post.id, t)}, ${assignment.name}, ${t.fatigue.status[assignment.status]}`}
      aria-pressed={selected}
      className="absolute z-10 origin-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
      style={{
        left: `${post.x}%`,
        top: `${post.y}%`,
        transform: `translate(-50%, -50%) scale(${1 / zoom})`,
      }}
    >
      <span
        className={cn(
          "flex flex-col items-center transition-transform duration-200",
          selected ? "scale-110" : "hover:scale-105",
        )}
      >
        <span
          className={cn(
            "grid h-8 min-w-8 place-items-center rounded-full px-1.5 text-[10px] font-semibold text-white shadow-[0_6px_16px_rgb(7_27_51_/_0.18)]",
            attention && !selected ? "bg-[#D97706]" : "bg-cyan",
            selected && "ring-4 ring-cyan/30",
          )}
        >
          {post.code}
        </span>
        <span
          className={cn(
            "-mt-1 overflow-hidden rounded-full bg-navy shadow-[0_4px_12px_rgb(7_27_51_/_0.16)]",
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
      </span>
    </button>
  );
}
