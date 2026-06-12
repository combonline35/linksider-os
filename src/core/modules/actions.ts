"use server";

import { revalidatePath } from "next/cache";
import { getUser } from "@/core/auth/server";
import { createAdminClient } from "@/core/auth/admin";
import { hasPermission } from "@/core/permissions/can";
import { getCurrentOrganization } from "@/shared/lib/current-organization";
import { MODULES } from "./registry";
import { createAuditLog } from "@/core/audit-log/actions";

export async function toggleModule(formData: FormData) {
  const context = await getCurrentOrganization();
  const user = await getUser();
  if (!context || !user) throw new Error("Необходима авторизация");
  if (!hasPermission(context.permissions, "core.modules.manage")) throw new Error("Недостаточно прав");

  const moduleKey = String(formData.get("module_key") ?? "");
  const enabled = formData.get("enabled") === "true";
  if (!MODULES.some((module) => module.key === moduleKey)) throw new Error("Неизвестный модуль");

  const supabase = createAdminClient();
  const { error } = await supabase.from("organization_modules").upsert({
    organization_id: context.organization.id,
    module_key: moduleKey,
    enabled,
    updated_at: new Date().toISOString(),
  }, { onConflict: "organization_id,module_key" });
  if (error) throw new Error(error.message);

  await createAuditLog({
    organizationId: context.organization.id,
    userId: user.id,
    action: enabled ? "module.enabled" : "module.disabled",
    entityType: "organization_module",
    entityId: context.organization.id,
    metadata: { moduleKey, enabled },
  });
  revalidatePath("/modules");
  revalidatePath("/dashboard");
  return;
}
