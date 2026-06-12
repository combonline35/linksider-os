import { MODULES } from "@/core/modules/registry";
import { toggleModule } from "@/core/modules/actions";
import { hasPermission } from "@/core/permissions/can";
import { requireOrganization } from "@/shared/components/protected-page";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Switch } from "@/shared/components/ui/switch";

export default async function ModulesPage() {
  const context = await requireOrganization("core.modules.view");
  const canManage = hasPermission(context.permissions, "core.modules.manage");
  const enabled = new Set(context.enabledModules.map((module) => module.module_key));
  return <div className="space-y-6"><div><h1 className="text-2xl font-semibold">Модули</h1><p className="text-slate-500">Подключайте будущие бизнес-разделы для организации.</p></div><div className="grid gap-4 lg:grid-cols-2">{MODULES.map((module) => { const isEnabled = enabled.has(module.key); return <Card key={module.key}><CardHeader><div className="flex items-start justify-between gap-4"><div><CardTitle>{module.name}</CardTitle><CardDescription>{module.description}</CardDescription></div><Badge className={isEnabled ? "bg-green-50 text-green-700" : "bg-slate-50 text-slate-600"}>{isEnabled ? "enabled" : "disabled"}</Badge></div></CardHeader><CardContent><form action={toggleModule} className="flex items-center justify-between"><input type="hidden" name="module_key" value={module.key} /><input type="hidden" name="enabled" value={String(!isEnabled)} /><Switch checked={isEnabled} disabled={!canManage} /><Button variant="outline" size="sm" disabled={!canManage}>{isEnabled ? "Отключить" : "Включить"}</Button></form></CardContent></Card>; })}</div></div>;
}
