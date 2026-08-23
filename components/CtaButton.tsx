import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: "arrow" | "launch" | "none";
  className?: string;
};

export function CtaButton({
  href,
  children,
  variant = "primary",
  icon = "arrow",
  className,
}: Props) {
  const classes = cn(
    "group inline-flex min-h-12 items-center justify-center gap-2 rounded-[12px] px-5 text-[15px] font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2",
    variant === "primary" &&
      "bg-cyan text-white shadow-[0_8px_24px_rgb(0_168_181_/_0.28)] hover:-translate-y-px hover:bg-cyan-deep hover:shadow-[0_12px_28px_rgb(0_168_181_/_0.34)]",
    variant === "secondary" &&
      "border border-navy/15 bg-white/70 text-navy hover:-translate-y-px hover:border-navy/30 hover:bg-white hover:shadow-[0_8px_20px_rgb(7_27_51_/_0.06)]",
    variant === "ghost" &&
      "border border-white/20 bg-white/5 text-white hover:-translate-y-px hover:border-white/40 hover:bg-white/10",
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {icon === "arrow" && (
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
      {icon === "launch" && (
        <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </>
  );

  if (href.startsWith("/") && !href.startsWith("//")) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={classes}>
      {content}
    </a>
  );
}
