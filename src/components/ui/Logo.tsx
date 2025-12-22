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
  
  // Icon Colors
  const primaryColor = "#84cc16"; // Lime 500
  const secondaryColor = isDark ? "#ffffff" : "#14532d"; // White or Green 900

  return (
    <div className={cn(
      "flex items-center",
      variant === "vertical" ? "flex-col text-center gap-3" : "flex-row gap-2.5",
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
          className={cn(variant === "vertical" ? "h-16 w-16" : "h-10 w-10")}
        >
          {/* Background Shape (Soft Square/Circle) */}
          <rect x="2" y="2" width="36" height="36" rx="12" fill={primaryColor} fillOpacity="0.15" />
          
          {/* Abstract Leaf / G Shape */}
          <path 
            d="M20 8C13.3726 8 8 13.3726 8 20C8 26.6274 13.3726 32 20 32C26.6274 32 32 26.6274 32 20" 
            stroke={primaryColor} 
            strokeWidth="3" 
            strokeLinecap="round" 
          />
          <path 
            d="M32 20H20V26" 
            stroke={primaryColor} 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          
          {/* Leaf Detail */}
          <path 
            d="M20 8C20 8 26 8 28 12C30 16 28 20 28 20" 
            stroke={secondaryColor} 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          
          {/* Center Growth Dot */}
          <circle cx="20" cy="20" r="3" fill={secondaryColor} />
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
            Green Market
          </span>
          <span className={cn(
            "font-medium uppercase tracking-widest",
            variant === "vertical" ? "text-xs" : "text-[0.65rem]",
            subTextColor
          )}>
            ChadGlobal
          </span>
        </div>
      )}
    </div>
  );
}
