import * as React from "react";
import { cn } from "@/shared/lib/utils";
export function Table({ className, ...props }: React.TableHTMLAttributes<HTMLTableElement>) { return <table className={cn("w-full caption-bottom text-sm", className)} {...props} />; }
export function TableHeader(props: React.HTMLAttributes<HTMLTableSectionElement>) { return <thead {...props} />; }
export function TableBody(props: React.HTMLAttributes<HTMLTableSectionElement>) { return <tbody {...props} />; }
export function TableRow({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) { return <tr className={cn("border-b", className)} {...props} />; }
export function TableHead({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) { return <th className={cn("h-10 px-4 text-left font-medium text-slate-500", className)} {...props} />; }
export function TableCell({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) { return <td className={cn("p-4 align-middle", className)} {...props} />; }
