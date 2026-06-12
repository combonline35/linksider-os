"use client";

import { cn } from "@/shared/lib/utils";

export function Switch({ checked, disabled }: { checked: boolean; disabled?: boolean }) {
  return (
    <span
      aria-checked={checked}
      className={cn(
        "inline-flex h-6 w-11 items-center rounded-full transition-colors",
        checked ? "bg-slate-900" : "bg-slate-300",
        disabled && "opacity-50",
      )}
      role="switch"
    >
      <span
        className={cn(
          "h-5 w-5 rounded-full bg-white transition-transform",
          checked ? "translate-x-5" : "translate-x-1",
        )}
      />
    </span>
  );
}
