import { ArrowRight, Play } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: "arrow" | "play" | "none";
  className?: string;
};

export function CtaButton({
  href,
  children,
  variant = "primary",
  icon = "arrow",
  className,
}: Props) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex min-h-12 items-center justify-center gap-2 rounded-[12px] px-5 text-[15px] font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2",
        variant === "primary" &&
          "bg-cyan text-white shadow-[0_8px_24px_rgb(0_168_181_/_0.28)] hover:-translate-y-px hover:bg-cyan-deep hover:shadow-[0_12px_28px_rgb(0_168_181_/_0.34)]",
        variant === "secondary" &&
          "border border-navy/15 bg-white/70 text-navy hover:-translate-y-px hover:border-navy/30 hover:bg-white hover:shadow-[0_8px_20px_rgb(7_27_51_/_0.06)]",
        variant === "ghost" && "text-white hover:text-cyan",
        className,
      )}
    >
      {icon === "play" && <Play className="h-3.5 w-3.5 fill-current" />}
      <span>{children}</span>
      {icon === "arrow" && (
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
    </a>
  );
}
