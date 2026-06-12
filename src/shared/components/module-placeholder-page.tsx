import { getModuleByKey } from "@/core/modules/registry";
import { hasPermission } from "@/core/permissions/can";
import { requireOrganization } from "@/shared/components/protected-page";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";

export async function ModulePlaceholderPage({ moduleKey }: { moduleKey: string }) {
  const context = await requireOrganization();
  const module = getModuleByKey(moduleKey);
  const enabled = context.enabledModules.some((item) => item.module_key === moduleKey);
  const permissionKey = `${moduleKey}.view`;

  if (!enabled) {
    return <div className="min-h-screen bg-slate-50 p-6"><Card><CardHeader><CardTitle>{module?.name ?? moduleKey}</CardTitle><CardDescription>Модуль не подключён</CardDescription></CardHeader></Card></div>;
  }

  if (!hasPermission(context.permissions, permissionKey)) {
    return <div className="min-h-screen bg-slate-50 p-6"><Card><CardHeader><CardTitle>{module?.name ?? moduleKey}</CardTitle><CardDescription>Недостаточно прав</CardDescription></CardHeader></Card></div>;
  }

  return <div className="min-h-screen bg-slate-50 p-6"><Card><CardHeader><CardTitle>{module?.name ?? moduleKey}</CardTitle><CardDescription>{module?.description}</CardDescription></CardHeader><CardContent><p className="text-slate-600">Модуль будет реализован позже.</p></CardContent></Card></div>;
}
