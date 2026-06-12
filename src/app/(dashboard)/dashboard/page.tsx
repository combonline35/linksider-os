import { requireOrganization } from "@/shared/components/protected-page";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { MODULES } from "@/core/modules/registry";

export default async function DashboardPage() {
  const context = await requireOrganization("core.dashboard.view");
  const enabled = new Set(context.enabledModules.map((module) => module.module_key));
  return <div className="space-y-6"><div><h1 className="text-2xl font-semibold">Dashboard</h1><p className="text-slate-500">{context.organization.name} · роль {context.role?.name ?? "—"}</p></div><Card><CardHeader><CardTitle>Ядро платформы работает</CardTitle><CardDescription>Авторизация, организации, роли, права и модули подключены.</CardDescription></CardHeader><CardContent><div className="flex flex-wrap gap-2">{MODULES.map((module) => <Badge key={module.key} className={enabled.has(module.key) ? "bg-green-50 text-green-700" : "bg-slate-50 text-slate-500"}>{module.name}: {enabled.has(module.key) ? "enabled" : "disabled"}</Badge>)}</div></CardContent></Card></div>;
}
