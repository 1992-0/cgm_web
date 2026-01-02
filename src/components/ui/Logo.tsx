import { cn } from "@/lib/utils";
import { useId } from "react";

interface LogoProps {
  className?: string;
  variant?: "default" | "vertical" | "icon";
  theme?: "light" | "dark";
}

export function Logo({ className, variant = "default", theme = "light" }: LogoProps) {
  const gradientId = useId();
  const isDark = theme === "dark";
  const textColor = isDark ? "text-white" : "text-slate-900";
  const subTextColor = isDark ? "text-slate-400" : "text-slate-500";
  const primaryColor = "var(--color-primary)";
  const secondaryColor = "var(--color-secondary)";
  const accentColor = "var(--color-accent)";

  return (
    <div className={cn(
      "flex items-center",
      variant === "vertical" ? "flex-col text-center gap-3" : "flex-row gap-3",
      className
    )}>
      <div className="relative shrink-0">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn(variant === "vertical" ? "h-20 w-20" : "h-10 w-10")}
        >
          <defs>
            <linearGradient id={gradientId} x1="4" y1="44" x2="44" y2="4" gradientUnits="userSpaceOnUse">
              <stop stopColor={primaryColor} />
              <stop offset="1" stopColor={secondaryColor} />
            </linearGradient>
          </defs>

          {/* Abstract Globe / C-Shape Base */}
          <path
            d="M24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42C30.6 42 36.4 38.4 39.5 33"
            stroke={`url(#${gradientId})`}
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Dynamic Swoosh (Global Connection) */}
          <path
            d="M42 24C42 14.0589 33.9411 6 24 6"
            stroke={secondaryColor}
            strokeWidth="5"
            strokeLinecap="round"
            strokeOpacity="0.3"
          />

          {/* Inner Arc (Trade Route) */}
          <path 
            d="M16 24C16 19.5817 19.5817 16 24 16"
            stroke={primaryColor}
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Accent Core (Market/Value/Sun) */}
          <circle cx="24" cy="24" r="3.5" fill={accentColor} />
          
          {/* Right Arrow/Leaf Element (Export/Growth) */}
          <path 
            d="M34 24L40 18M40 18H35M40 18V23"
            stroke={accentColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {variant !== "icon" && (
        <div className={cn("flex flex-col justify-center", variant === "vertical" ? "items-center" : "items-start")}>
          <span className={cn(
            "font-heading font-bold leading-none tracking-tight",
            variant === "vertical" ? "text-2xl" : "text-xl",
            textColor
          )}>
            ChadGlobal
          </span>
          <span className={cn(
            "font-medium uppercase tracking-widest",
            variant === "vertical" ? "text-sm" : "text-[0.65rem]",
            subTextColor
          )}>
            Market
          </span>
        </div>
      )}
    </div>
  );
}
