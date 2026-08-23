"use client";

import { useEffect, useRef, useState } from "react";
import { PanelRight } from "lucide-react";
import { MapControls } from "@/components/app/MapControls";
import { MapPositionsPanel } from "@/components/app/MapPositionsPanel";
import { PostMarker } from "@/components/app/PostMarker";
import { PostPopover } from "@/components/app/PostPopover";
import {
  mapPosts,
  minutesUntilSwap,
  type DemoSession,
  type PostId,
} from "@/data/demoSessions";
import {
  clientToMapPercent,
  defaultPlacements,
  type PlacementMap,
} from "@/lib/mapPlacements";
import { useI18n } from "@/lib/i18n-context";
import { cn } from "@/lib/cn";

export function OperationalMap({
  session,
  preview = false,
  size = "app",
  selected: selectedProp,
  onSelectedChange,
}: {
  session: DemoSession;
  preview?: boolean;
  size?: "preview" | "section" | "capture" | "app";
  selected?: PostId | null;
  onSelectedChange?: (id: PostId | null) => void;
}) {
  const { t } = useI18n();
  const layerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ id: PostId; startX: number; startY: number; moved: boolean } | null>(
    null,
  );
  const [zoom, setZoom] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [draggingId, setDraggingId] = useState<PostId | null>(null);
  const [placements, setPlacements] = useState<PlacementMap>(defaultPlacements);
  const [internalSelected, setInternalSelected] = useState<PostId | null>(null);
  const [imageFailed, setImageFailed] = useState(false);
  const selected = selectedProp !== undefined ? selectedProp : internalSelected;
  const showPanel = !preview && size === "app";

  function setSelected(id: PostId | null) {
    if (selectedProp !== undefined) onSelectedChange?.(id);
    else setInternalSelected(id);
  }

  const livePosts = mapPosts.map((post) => ({
    ...post,
    x: placements[post.id].x,
    y: placements[post.id].y,
  }));
  const selectedPost = livePosts.find(
    (post) => post.id === selected && placements[post.id].onMap,
  );
  const selectedAssignment = selectedPost ? session.assignments[selectedPost.id] : null;

  useEffect(() => {
    setSelected(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reset when the session changes
  }, [session.id]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelected(null);
        setExpanded(false);
        setPanelOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function pointOnMap(clientX: number, clientY: number) {
    const rect = layerRef.current?.getBoundingClientRect();
    if (!rect) return null;
    return clientToMapPercent(clientX, clientY, rect);
  }

  function movePlacement(id: PostId, x: number, y: number, onMap = true) {
    setPlacements((current) => ({
      ...current,
      [id]: { x, y, onMap },
    }));
  }

  function finishPointerDrag() {
    const drag = dragRef.current;
    dragRef.current = null;
    setDraggingId(null);
    return drag;
  }

  function startMarkerDrag(id: PostId, event: React.PointerEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      id,
      startX: event.clientX,
      startY: event.clientY,
      moved: false,
    };
    setDraggingId(id);
  }

  function onMarkerPointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    const drag = dragRef.current;
    if (!drag) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (!drag.moved && dx * dx + dy * dy < 25) return;
    drag.moved = true;
    const next = pointOnMap(event.clientX, event.clientY);
    if (next) movePlacement(drag.id, next.x, next.y, true);
  }

  function onMarkerPointerUp(event: React.PointerEvent<HTMLButtonElement>) {
    const drag = finishPointerDrag();
    if (!drag) return;
    if (!drag.moved) {
      setSelected(selected === drag.id ? null : drag.id);
    }
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      /* already released */
    }
  }

  function startPlaceFromPanel(id: PostId, event: React.PointerEvent<HTMLLIElement>) {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      id,
      startX: event.clientX,
      startY: event.clientY,
      moved: false,
    };
    setDraggingId(id);
  }

  function onPanelPointerMove(event: React.PointerEvent<HTMLLIElement>) {
    const drag = dragRef.current;
    if (!drag) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (!drag.moved && dx * dx + dy * dy < 25) return;
    drag.moved = true;
    const next = pointOnMap(event.clientX, event.clientY);
    if (next) movePlacement(drag.id, next.x, next.y, true);
  }

  function onPanelPointerUp() {
    finishPointerDrag();
  }

  function removePost(id: PostId) {
    setPlacements((current) => ({
      ...current,
      [id]: { ...current[id], onMap: false },
    }));
    if (selected === id) setSelected(null);
  }

  function addPost(id: PostId) {
    const fallback = mapPosts.find((post) => post.id === id);
    setPlacements((current) => ({
      ...current,
      [id]: {
        x: current[id]?.x ?? fallback?.x ?? 50,
        y: current[id]?.y ?? fallback?.y ?? 50,
        onMap: true,
      },
    }));
  }

  const popoverLeft = selectedPost ? 50 + (selectedPost.x - 50) * zoom : 0;
  const popoverTop = selectedPost ? 50 + (selectedPost.y - 50) * zoom : 0;

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-white",
        preview
          ? "rounded-xl border border-[#E6EEF2]"
          : "rounded-2xl border border-[#E6EEF2] shadow-[0_8px_24px_rgb(7_27_51_/_0.03)]",
        expanded && "fixed inset-3 z-50 rounded-3xl shadow-2xl",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-[#d7e8ea]",
          (preview || size === "preview") &&
            "aspect-[16/10] min-h-[220px] sm:min-h-[260px]",
          size === "section" && "h-[min(52vh,520px)] min-h-[320px]",
          size === "capture" && "h-[min(56vh,620px)] min-h-[300px]",
          !preview && size === "app" && "h-[min(68vh,720px)] min-h-[420px]",
        )}
        onClick={() => setSelected(null)}
      >
        <div
          ref={layerRef}
          className={cn(
            "map-motion absolute inset-0 origin-center",
            draggingId ? "transition-none" : "transition-transform duration-500 ease-out",
          )}
          style={{ transform: `scale(${zoom})` }}
        >
          {!imageFailed ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/guardos/wave-pool-map.jpg"
              alt={t.ui.mapAlt}
              className="h-full w-full object-cover object-[center_42%]"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <WavePoolFallback />
          )}
          {livePosts
            .filter((post) => placements[post.id].onMap)
            .map((post) => (
              <div
                key={post.id}
                className="contents"
                onClick={(event) => event.stopPropagation()}
              >
                <PostMarker
                  post={post}
                  assignment={session.assignments[post.id]}
                  selected={selected === post.id}
                  zoom={zoom}
                  dragging={draggingId === post.id}
                  minutesUntilSwap={minutesUntilSwap(
                    session,
                    session.assignments[post.id],
                  )}
                  onDragStart={startMarkerDrag}
                  onDragMove={onMarkerPointerMove}
                  onDragEnd={onMarkerPointerUp}
                />
              </div>
            ))}
        </div>

        {selectedPost && selectedAssignment && !draggingId && (
          <div onClick={(event) => event.stopPropagation()}>
            <PostPopover
              post={selectedPost}
              assignment={selectedAssignment}
              session={session}
              left={popoverLeft}
              top={popoverTop}
            />
          </div>
        )}

        {showPanel && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setPanelOpen((value) => !value);
            }}
            className={cn(
              "absolute top-3 z-20 inline-flex items-center gap-1.5 rounded-xl border border-[#E6EEF2] bg-white px-2.5 py-2 text-xs font-semibold text-navy shadow-[0_8px_20px_rgb(7_27_51_/_0.08)]",
              panelOpen ? "right-[min(19rem,calc(88%+0.75rem))]" : "right-3",
            )}
            aria-expanded={panelOpen}
            aria-label={panelOpen ? t.ui.closePositions : t.ui.openPositions}
          >
            <PanelRight className="h-3.5 w-3.5" />
            {t.ui.positionsPanel}
          </button>
        )}

        <MapControls
          expanded={expanded}
          hideFullscreen={preview || size === "capture"}
          insetRight={panelOpen && showPanel}
          onFullscreen={() => {
            if (preview || size === "capture") return;
            setExpanded((value) => !value);
          }}
          onCenter={() => {
            setZoom(1);
            setSelected(null);
          }}
          onZoomIn={() => setZoom((value) => Math.min(1.7, Number((value + 0.15).toFixed(2))))}
          onZoomOut={() => setZoom((value) => Math.max(1, Number((value - 0.15).toFixed(2))))}
        />

        {showPanel && panelOpen && (
          <div onClick={(event) => event.stopPropagation()}>
            <MapPositionsPanel
              session={session}
              posts={mapPosts}
              placements={placements}
              onRemove={removePost}
              onAdd={addPost}
              onPlaceStart={startPlaceFromPanel}
              onPlaceMove={onPanelPointerMove}
              onPlaceEnd={onPanelPointerUp}
              onReset={() => {
                setPlacements(defaultPlacements());
                setSelected(null);
              }}
              onClose={() => setPanelOpen(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function WavePoolFallback() {
  return (
    <div className="absolute inset-0 bg-[#c5dfe3]">
      <svg viewBox="0 0 1600 900" className="h-full w-full" aria-hidden>
        <rect width="1600" height="900" fill="#c8d9c4" />
        <ellipse cx="820" cy="780" rx="640" ry="90" fill="#d8c39a" />
        <path
          d="M180 430 C 260 140, 980 90, 1420 280 C 1480 360, 1360 640, 980 720 C 520 800, 120 680, 180 430 Z"
          fill="#0e7c8a"
        />
        <path
          d="M240 430 C 320 190, 960 150, 1340 300 C 1390 360, 1280 600, 940 670 C 540 740, 190 640, 240 430 Z"
          fill="#19a8b8"
        />
        <path
          d="M360 360 C 560 300, 980 280, 1220 360 C 1080 400, 620 410, 360 360 Z"
          fill="#d7f4f7"
          opacity="0.55"
        />
        <rect x="760" y="210" width="36" height="430" rx="8" fill="#f3efe6" />
      </svg>
    </div>
  );
}
