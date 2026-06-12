import * as React from "react";
import { cn } from "@/shared/lib/utils";
export function Select({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) { return <select className={cn("h-10 w-full rounded-md border bg-white px-3 py-2 text-sm", className)} {...props} />; }
