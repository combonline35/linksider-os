"use server";

import crypto from "node:crypto";
import { revalidatePath } from "next/cache";
import { getUser } from "@/core/auth/server";
import { createAdminClient } from "@/core/auth/admin";
import { createAuditLog } from "@/core/audit-log/actions";
import { hasPermission } from "@/core/permissions/can";
import { getCurrentOrganization } from "@/shared/lib/current-organization";

export async function createInvitation(formData: FormData) {
  const context = await getCurrentOrganization();
  const user = await getUser();
  if (!context || !user) throw new Error("Необходима авторизация");
  if (!hasPermission(context.permissions, "core.members.manage")) throw new Error("Недостаточно прав");

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const roleId = String(formData.get("role_id") ?? "");
  if (!email.includes("@")) throw new Error("Укажите корректный email");

  const supabase = createAdminClient();
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  const { data, error } = await supabase
    .from("invitations")
    .insert({ organization_id: context.organization.id, email, role_id: roleId || null, token, expires_at: expiresAt })
    .select("id")
    .single();
  if (error) throw new Error(error.message);

  await createAuditLog({
    organizationId: context.organization.id,
    userId: user.id,
    action: "invitation.created",
    entityType: "invitation",
    entityId: data.id,
    metadata: { email },
  });
  revalidatePath("/users");
  return;
}
