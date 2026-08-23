import { postPlaceBadge, postPlaceImage, postPlaceTint } from "@/data/postPlaces";
import type { PostId } from "@/data/demoSessions";
import { cn } from "@/lib/cn";

export function PostPlaceIcon({
  id,
  className,
}: {
  id: PostId;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-navy/10",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={postPlaceImage[id]}
        alt=""
        className="h-full w-full object-cover"
      />
      <span
        className={cn(
          "absolute right-0.5 bottom-0.5 rounded px-1 text-[8px] font-bold tracking-wide text-white",
          postPlaceTint[id],
        )}
      >
        {postPlaceBadge[id]}
      </span>
    </span>
  );
}
