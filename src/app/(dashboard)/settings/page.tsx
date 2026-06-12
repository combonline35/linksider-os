import { updateOrganizationName } from "@/core/organizations/actions";
import { hasPermission } from "@/core/permissions/can";
import { requireOrganization } from "@/shared/components/protected-page";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { formatDate } from "@/shared/lib/utils";

export default async function SettingsPage() {
  const context = await requireOrganization("core.organization.view");
  const canManage = hasPermission(context.permissions, "core.organization.manage");
  return <div className="space-y-6"><div><h1 className="text-2xl font-semibold">Настройки</h1><p className="text-slate-500">Параметры текущей организации.</p></div><Card><CardHeader><CardTitle>Организация</CardTitle><CardDescription>Slug: {context.organization.slug} · статус: {context.organization.status} · создана {formatDate(context.organization.created_at)}</CardDescription></CardHeader><CardContent><form action={updateOrganizationName} className="max-w-xl space-y-3"><Label htmlFor="name">Название</Label><Input id="name" name="name" defaultValue={context.organization.name} disabled={!canManage} /><Button disabled={!canManage}>Сохранить</Button></form></CardContent></Card></div>;
}
