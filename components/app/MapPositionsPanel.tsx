"use client";

import { X } from "lucide-react";
import type { DemoSession, MapPost, PostId } from "@/data/demoSessions";
import { postLabel } from "@/lib/localizeDemo";
import { useI18n } from "@/lib/i18n-context";
import type { PlacementMap } from "@/lib/mapPlacements";

export function MapPositionsPanel({
  session,
  posts,
  placements,
  onRemove,
  onAdd,
  onPlaceStart,
  onPlaceMove,
  onPlaceEnd,
  onReset,
  onClose,
}: {
  session: DemoSession;
  posts: MapPost[];
  placements: PlacementMap;
  onRemove: (id: PostId) => void;
  onAdd: (id: PostId) => void;
  onPlaceStart: (id: PostId, event: React.PointerEvent<HTMLLIElement>) => void;
  onPlaceMove: (event: React.PointerEvent<HTMLLIElement>) => void;
  onPlaceEnd: () => void;
  onReset: () => void;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const onMap = posts.filter((post) => placements[post.id].onMap);
  const offMap = posts.filter((post) => !placements[post.id].onMap);

  return (
    <aside className="absolute inset-y-0 right-0 z-30 flex w-[min(18rem,88%)] flex-col border-l border-[#E6EEF2] bg-white shadow-[-12px_0_32px_rgb(7_27_51_/_0.08)]">
      <div className="flex items-center justify-between gap-2 border-b border-[#E6EEF2] px-3 py-3">
        <p className="text-sm font-semibold text-navy">{t.ui.positionsPanel}</p>
        <button
          type="button"
          onClick={onClose}
          className="grid h-8 w-8 place-items-center rounded-lg text-navy/55 hover:bg-[#F3F8FA] hover:text-navy"
          aria-label={t.ui.closePositions}
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
        <p className="text-[11px] font-semibold tracking-[0.08em] text-navy/40 uppercase">
          {t.ui.onTheMap}
        </p>
        <ul className="mt-2 space-y-1.5">
          {onMap.map((post) => {
            const assignment = session.assignments[post.id];
            return (
              <li
                key={post.id}
                className="flex items-center gap-2 rounded-xl border border-[#E6EEF2] bg-white px-2 py-1.5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={assignment.photo}
                  alt={assignment.name}
                  width={28}
                  height={28}
                  className="h-7 w-7 rounded-full object-cover"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-semibold text-navy">
                    {postLabel(post.id, t)}
                  </span>
                  <span className="block truncate text-[10px] text-navy/45">
                    {assignment.name}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => onRemove(post.id)}
                  className="shrink-0 rounded-lg px-2 py-1 text-[11px] font-semibold text-[#C24141] hover:bg-[#FDECEC]"
                >
                  {t.ui.removePosition}
                </button>
              </li>
            );
          })}
        </ul>

        <p className="mt-4 text-[11px] font-semibold tracking-[0.08em] text-navy/40 uppercase">
          {t.ui.offTheMap}
        </p>
        {offMap.length === 0 ? (
          <p className="mt-2 text-[11px] text-navy/40">{t.ui.dragToPlace}</p>
        ) : (
          <ul className="mt-2 space-y-1.5">
            {offMap.map((post) => {
              const assignment = session.assignments[post.id];
              return (
                <li
                  key={post.id}
                  onPointerDown={(event) => {
                    if ((event.target as HTMLElement).closest("button")) return;
                    onPlaceStart(post.id, event);
                  }}
                  onPointerMove={onPlaceMove}
                  onPointerUp={onPlaceEnd}
                  className="flex cursor-grab items-center gap-2 rounded-xl border border-dashed border-[#C9D8DE] bg-[#F8FBFC] px-2 py-1.5 active:cursor-grabbing"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={assignment.photo}
                    alt={assignment.name}
                    width={28}
                    height={28}
                    className="h-7 w-7 rounded-full object-cover"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-semibold text-navy">
                      {postLabel(post.id, t)}
                    </span>
                    <span className="block truncate text-[10px] text-navy/45">
                      {assignment.name}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => onAdd(post.id)}
                    className="shrink-0 rounded-lg bg-cyan px-2 py-1 text-[11px] font-semibold text-white"
                  >
                    {t.ui.addPosition}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="border-t border-[#E6EEF2] p-3">
        <button
          type="button"
          onClick={onReset}
          className="w-full rounded-xl border border-[#E6EEF2] px-3 py-2 text-xs font-semibold text-navy/70 hover:border-cyan/40 hover:text-navy"
        >
          {t.ui.resetLayout}
        </button>
      </div>
    </aside>
  );
}
