import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "vertical" | "icon";
  theme?: "light" | "dark";
}

export function Logo({ className, variant = "default", theme = "light" }: LogoProps) {
  const isDark = theme === "dark";
  const textColor = isDark ? "text-white" : "text-slate-900";
  const subTextColor = isDark ? "text-slate-400" : "text-slate-500";
  
  // Brand Colors
  const primaryColor = "#16a34a"; // Green 600 (Agriculture)
  const secondaryColor = "#0284c7"; // Sky 600 (Global/Trade)
  const accentColor = "#facc15"; // Yellow 400 (Sun/Energy/Harvest)

  return (
    <div className={cn(
      "flex items-center",
      variant === "vertical" ? "flex-col text-center gap-3" : "flex-row gap-3",
      className
    )}>
      {/* Logo Icon */}
      <div className="relative shrink-0">
        <svg 
          width="40" 
          height="40" 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={cn(variant === "vertical" ? "h-20 w-20" : "h-10 w-10")}
        >
          {/* Globe Background */}
          <circle cx="20" cy="20" r="18" fill="white" fillOpacity="0.1" />
          
          {/* Globe Lines (Meridians/Parallels) - Abstract */}
          <path 
            d="M20 2C9.94113 2 2 9.94113 2 20C2 30.0589 9.94113 38 20 38C30.0589 38 38 30.0589 38 20C38 9.94113 30.0589 2 20 2Z"
            stroke={secondaryColor}
            strokeWidth="2" 
            strokeLinecap="round" 
          />
          <path 
            d="M20 2C24 2 27 10 27 20C27 30 24 38 20 38C16 38 13 30 13 20C13 10 16 2 20 2Z"
            stroke={secondaryColor}
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeOpacity="0.6"
          />
          <path
            d="M2 20H38"
            stroke={secondaryColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity="0.6"
          />
          
          {/* Leaf / Growth Overlay (Agriculture aspect) */}
          <path 
            d="M20 34C20 34 26 30 28 22C29.5 16 24 10 20 12C16 10 10.5 16 12 22C14 30 20 34 20 34Z"
            fill={primaryColor}
            fillOpacity="0.9"
          />
          <path
            d="M20 34V18"
            stroke="white"
            strokeWidth="1.5" 
            strokeLinecap="round" 
          />
          
          {/* Top 'Sun' or 'Export' accent */}
          <circle cx="32" cy="8" r="3" fill={accentColor} />
        </svg>
      </div>

      {/* Text */}
      {variant !== "icon" && (
        <div className="flex flex-col items-start justify-center">
          <span className={cn(
            "font-heading font-bold leading-none tracking-tight",
            variant === "vertical" ? "text-2xl" : "text-xl",
            textColor
          )}>
            Chad Global
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
