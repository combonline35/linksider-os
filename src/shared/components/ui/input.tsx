import * as React from "react";
import { cn } from "@/shared/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm outline-none ring-offset-white placeholder:text-slate-400 focus:ring-2 focus:ring-slate-300", className)} {...props} />;
}
