import { cn } from "@/lib/cn";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-[11px] font-semibold tracking-[0.22em] uppercase",
            light ? "text-cyan" : "text-cyan-deep",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-balance text-3xl leading-[1.08] font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem]",
          light ? "text-white" : "text-navy",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-base leading-relaxed sm:text-lg",
            align === "center" && "mx-auto",
            light ? "text-white/65" : "text-navy/60",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
