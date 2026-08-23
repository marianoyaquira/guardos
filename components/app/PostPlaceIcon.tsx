import { Anchor, DoorOpen, MapPin, RadioTower } from "lucide-react";
import { mapPosts, type PostId } from "@/data/demoSessions";
import { cn } from "@/lib/cn";

export function PostPlaceIcon({
  id,
  className,
}: {
  id: PostId;
  className?: string;
}) {
  const post = mapPosts.find((item) => item.id === id);
  const code = post?.code ?? id.toUpperCase();
  const Icon =
    id === "pier" ? Anchor : id === "ct" ? RadioTower : id === "lobby" ? DoorOpen : MapPin;

  return (
    <span
      className={cn(
        "grid h-8 w-8 shrink-0 place-items-center rounded-full bg-navy text-white",
        className,
      )}
      aria-hidden
    >
      {post?.kind === "edge" ? (
        <span className="text-[10px] font-semibold tracking-wide">{code}</span>
      ) : (
        <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
      )}
    </span>
  );
}
