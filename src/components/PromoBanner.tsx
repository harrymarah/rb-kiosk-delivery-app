import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PromoBannerProps {
  title: string;
  subtitle: string;
  /** Optional artwork shown to the right of the copy. Decorative only. */
  icon?: ReactNode;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  /** Extra padding on the sides, e.g. to clear carousel arrows. */
  contentClassName?: string;
}

const PromoBanner = ({
  title,
  subtitle,
  icon,
  className,
  titleClassName,
  subtitleClassName,
  contentClassName,
}: PromoBannerProps) => {
  return (
    <div className={cn(
      "relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden bg-gradient-to-r from-teal-400 to-cyan-500 p-6 text-white max-h-48",
      className
    )}>
      <div className={cn("relative z-10 min-w-0 flex-1", contentClassName)}>
        <h2 className={cn("text-2xl font-bold mb-2", titleClassName)}>{title}</h2>
        <p className={cn("text-lg opacity-90", subtitleClassName)}>{subtitle}</p>
      </div>

      {icon && (
        // mr-7 matches the copy's px-7 so the icon clears the carousel arrows —
        // without it the icon sits over the "next" control and swallows its
        // clicks. The copy's own px-7 supplies the gap on this side.
        <div
          className="relative z-10 mr-7 shrink-0 text-white/90 pointer-events-none"
          aria-hidden="true"
        >
          {icon}
        </div>
      )}

      {/* Decorative background shape */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-8 -translate-y-8"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/5 rounded-full transform translate-x-4 translate-y-4"></div>
    </div>
  );
};

export default PromoBanner;
