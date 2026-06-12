import { createClient } from "@/core/auth/server";

type RolePermissionRow = {
  permissions: { key: string } | null;
};

export async function getPermissionsForRole(roleId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("role_permissions")
    .select("permissions(key)")
    .eq("role_id", roleId);

  return ((data ?? []) as RolePermissionRow[])
    .map((row) => row.permissions?.key)
    .filter((key): key is string => Boolean(key));
}
