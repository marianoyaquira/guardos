"use client";

import { useEffect, useState } from "react";
import { MapControls } from "@/components/app/MapControls";
import { PostLegend } from "@/components/app/PostLegend";
import { PostMarker } from "@/components/app/PostMarker";
import { PostPopover } from "@/components/app/PostPopover";
import {
  mapPosts,
  type DemoSession,
  type PostId,
} from "@/data/demoSessions";
import { cn } from "@/lib/cn";

export function OperationalMap({
  session,
  preview = false,
  size = "app",
}: {
  session: DemoSession;
  preview?: boolean;
  size?: "preview" | "section" | "app";
}) {
  const [zoom, setZoom] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<PostId | null>(null);
  const [imageFailed, setImageFailed] = useState(false);

  const selectedPost = mapPosts.find((post) => post.id === selected);
  const selectedAssignment = selected ? session.assignments[selected] : null;

  useEffect(() => {
    setSelected(null);
  }, [session.id]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelected(null);
        setExpanded(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
          !preview && size === "app" && "h-[min(68vh,720px)] min-h-[420px]",
        )}
        onClick={() => setSelected(null)}
      >
        <div
          className="map-motion absolute inset-0 origin-center transition-transform duration-500 ease-out"
          style={{ transform: `scale(${zoom})` }}
        >
          {!imageFailed ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/guardos/wave-pool-map.jpg"
              alt="Mapa operacional da piscina de ondas"
              className="h-full w-full object-cover object-center"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <WavePoolFallback />
          )}
        </div>

        <div className="absolute inset-0">
          {mapPosts.map((post) => (
            <div
              key={post.id}
              className="contents"
              onClick={(event) => event.stopPropagation()}
            >
              <PostMarker
                post={post}
                assignment={session.assignments[post.id]}
                selected={selected === post.id}
                onSelect={(id) =>
                  setSelected((current) => (current === id ? null : id))
                }
              />
            </div>
          ))}
          {selectedPost && selectedAssignment && (
            <div onClick={(event) => event.stopPropagation()}>
              <PostPopover post={selectedPost} assignment={selectedAssignment} />
            </div>
          )}
        </div>

        {!preview && <PostLegend />}
        <MapControls
          expanded={expanded}
          hideFullscreen={preview}
          onFullscreen={() => {
            if (preview) return;
            setExpanded((value) => !value);
          }}
          onCenter={() => {
            setZoom(1);
            setSelected(null);
          }}
          onZoomIn={() => setZoom((value) => Math.min(1.7, Number((value + 0.15).toFixed(2))))}
          onZoomOut={() => setZoom((value) => Math.max(1, Number((value - 0.15).toFixed(2))))}
        />
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
