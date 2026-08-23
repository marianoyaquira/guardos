"use client";

import { LocateFixed, Maximize2, Minimize2, Minus, Plus } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { cn } from "@/lib/cn";

export function MapControls({
  onZoomIn,
  onZoomOut,
  onCenter,
  onFullscreen,
  expanded,
  hideFullscreen = false,
}: {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onCenter: () => void;
  onFullscreen: () => void;
  expanded: boolean;
  hideFullscreen?: boolean;
}) {
  const { t } = useI18n();
  const buttonClass =
    "grid h-10 w-10 place-items-center bg-white text-navy/70 transition-colors hover:bg-[#F3F8FA] hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan";

  return (
    <div className="absolute top-1/2 right-3 z-20 flex -translate-y-1/2 flex-col overflow-hidden rounded-xl border border-[#E6EEF2] bg-white shadow-[0_10px_24px_rgb(7_27_51_/_0.08)]">
      {!hideFullscreen && (
        <button
          type="button"
          className={buttonClass}
          onClick={onFullscreen}
          aria-label={expanded ? t.ui.exitFullscreen : t.ui.fullscreen}
        >
          {expanded ? (
            <Minimize2 className="h-4 w-4" />
          ) : (
            <Maximize2 className="h-4 w-4" />
          )}
        </button>
      )}
      <button
        type="button"
        className={cn(buttonClass, !hideFullscreen && "border-t border-[#E6EEF2]")}
        onClick={onCenter}
        aria-label={t.ui.centerMap}
      >
        <LocateFixed className="h-4 w-4" />
      </button>
      <button
        type="button"
        className={`${buttonClass} border-t border-[#E6EEF2]`}
        onClick={onZoomIn}
        aria-label={t.ui.zoomIn}
      >
        <Plus className="h-4 w-4" />
      </button>
      <button
        type="button"
        className={`${buttonClass} border-t border-[#E6EEF2]`}
        onClick={onZoomOut}
        aria-label={t.ui.zoomOut}
      >
        <Minus className="h-4 w-4" />
      </button>
    </div>
  );
}
