"use client";

import { cn } from "@/lib/utils";

interface RatingScaleProps {
  value: string;
  onChange: (value: string) => void;
  minLabel?: string;
  maxLabel?: string;
  size?: "sm" | "md";
}

export function RatingScale({
  value,
  onChange,
  minLabel = "Laag",
  maxLabel = "Hoog",
  size = "md",
}: RatingScaleProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5">
        {[1, 2, 3, 4, 5].map((n) => {
          const str = String(n);
          const isActive = value === str;
          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(str)}
              className={cn(
                "flex items-center justify-center rounded-lg border-2 font-semibold transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400",
                size === "md" ? "h-10 w-10 text-sm" : "h-8 w-8 text-xs",
                isActive
                  ? "border-violet-600 bg-violet-600 text-white shadow-md shadow-violet-200"
                  : "border-zinc-200 bg-white text-zinc-400 hover:border-violet-300 hover:text-violet-600"
              )}
              aria-label={`Score ${n}`}
            >
              {n}
            </button>
          );
        })}
      </div>
      <div className="flex justify-between text-[11px] text-zinc-400 font-medium px-0.5">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}
