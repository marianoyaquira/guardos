"use client";

import type { MapPost, PostAssignment } from "@/data/demoSessions";
import { cn } from "@/lib/cn";

export function PostMarker({
  post,
  assignment,
  selected,
  onSelect,
}: {
  post: MapPost;
  assignment: PostAssignment;
  selected: boolean;
  onSelect: (id: typeof post.id) => void;
}) {
  const attention = assignment.status !== "OK";

  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onSelect(post.id);
      }}
      aria-label={`${post.label}, ${assignment.name}, status ${assignment.status}`}
      aria-pressed={selected}
      className="map-motion absolute z-10 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
      style={{ left: `${post.x}%`, top: `${post.y}%` }}
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
            "-mt-1 grid h-8 min-w-8 place-items-center rounded-full bg-navy px-1.5 text-[10px] font-semibold text-white",
            selected && "ring-2 ring-white",
          )}
        >
          {assignment.initials}
        </span>
      </span>
    </button>
  );
}
