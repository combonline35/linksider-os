"use server";

import { revalidatePath } from "next/cache";
import { getUser } from "@/core/auth/server";
import { createAdminClient } from "@/core/auth/admin";
import { createAuditLog } from "@/core/audit-log/actions";
import { getCurrentOrganization } from "@/shared/lib/current-organization";
import { hasPermission } from "@/core/permissions/can";

export async function updateOrganizationName(formData: FormData) {
  const context = await getCurrentOrganization();
  const user = await getUser();
  if (!context || !user) throw new Error("Необходима авторизация");
  if (!hasPermission(context.permissions, "core.organization.manage")) throw new Error("Недостаточно прав");

  const name = String(formData.get("name") ?? "").trim();
  if (name.length < 2) throw new Error("Название должно быть длиннее 2 символов");

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("organizations")
    .update({ name, updated_at: new Date().toISOString() })
    .eq("id", context.organization.id);
  if (error) throw new Error(error.message);

  await createAuditLog({
    organizationId: context.organization.id,
    userId: user.id,
    action: "organization.updated",
    entityType: "organization",
    entityId: context.organization.id,
    metadata: { name },
  });
  revalidatePath("/settings");
  revalidatePath("/dashboard");
  return;
}
