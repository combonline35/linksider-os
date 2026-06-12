import Link from "next/link";
import { MODULES } from "@/core/modules/registry";
import type { CurrentOrganizationContext } from "@/shared/lib/current-organization";
import { hasPermission } from "@/core/permissions/can";

const coreLinks = [
  { href: "/dashboard", label: "Dashboard", permission: "core.dashboard.view" },
  { href: "/users", label: "Пользователи", permission: "core.members.view" },
  { href: "/modules", label: "Модули", permission: "core.modules.view" },
  { href: "/settings", label: "Настройки", permission: "core.organization.view" },
];

export function AppSidebar({ context }: { context: CurrentOrganizationContext }) {
  const enabledKeys = new Set(context.enabledModules.map((module) => module.module_key));
  return (
    <aside className="hidden w-72 shrink-0 border-r bg-white p-6 md:block">
      <div className="mb-8">
        <div className="text-xl font-bold">Linksider OS</div>
        <div className="text-sm text-slate-500">Core platform</div>
      </div>
      <nav className="space-y-1">
        {coreLinks.filter((link) => hasPermission(context.permissions, link.permission)).map((link) => (
          <Link key={link.href} href={link.href} className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-100">{link.label}</Link>
        ))}
      </nav>
      <div className="mt-8 text-xs font-semibold uppercase tracking-wide text-slate-400">Модули</div>
      <nav className="mt-2 space-y-1">
        {MODULES.filter((module) => enabledKeys.has(module.key) && hasPermission(context.permissions, `${module.key === "client_portal" ? "client_portal" : module.key}.view`)).map((module) => (
          <Link key={module.key} href={module.href} className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-100">{module.name}</Link>
        ))}
      </nav>
    </aside>
  );
}
