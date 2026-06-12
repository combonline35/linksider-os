import * as React from "react";
import { cn } from "@/shared/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "outline" | "ghost" | "destructive"; size?: "default" | "sm" };

export function Button({ className, variant = "default", size = "default", ...props }: ButtonProps) {
  return <button className={cn("inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50", variant === "default" && "bg-slate-900 text-white hover:bg-slate-800", variant === "outline" && "border bg-white hover:bg-slate-50", variant === "ghost" && "hover:bg-slate-100", variant === "destructive" && "bg-red-600 text-white hover:bg-red-700", size === "default" && "h-10 px-4 py-2", size === "sm" && "h-8 px-3", className)} {...props} />;
}
