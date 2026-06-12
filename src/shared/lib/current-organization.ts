import { createClient, getUser } from "@/core/auth/server";
import type { OrganizationMember } from "@/core/memberships/types";
import type { OrganizationModule } from "@/core/modules/types";
import type { Organization } from "@/core/organizations/types";
import type { Role } from "@/core/roles/types";

type MembershipWithRelations = OrganizationMember & {
  organizations: Organization | null;
  roles: Role | null;
};

type RolePermissionRow = {
  permissions: { key: string } | null;
};

export type CurrentOrganizationContext = {
  organization: Organization;
  membership: OrganizationMember;
  role: Role | null;
  permissions: string[];
  enabledModules: OrganizationModule[];
  modules: OrganizationModule[];
};

export async function getCurrentOrganization(): Promise<CurrentOrganizationContext | null> {
  const user = await getUser();
  if (!user) return null;

  const supabase = await createClient();
  const { data: memberships } = await supabase
    .from("organization_members")
    .select("*, organizations(*), roles(*)")
    .eq("user_id", user.id)
    .eq("status", "active")
    .order("created_at", { ascending: true });

  const membershipRow = (memberships?.[0] ?? null) as MembershipWithRelations | null;
  if (!membershipRow?.organizations) return null;

  const role = membershipRow.roles;
  let permissions: string[] = [];

  if (role?.id) {
    const { data: rolePermissions } = await supabase
      .from("role_permissions")
      .select("permissions(key)")
      .eq("role_id", role.id);

    permissions = ((rolePermissions ?? []) as RolePermissionRow[])
      .map((row) => row.permissions?.key)
      .filter((key): key is string => Boolean(key));
  }

  const { data: modules } = await supabase
    .from("organization_modules")
    .select("*")
    .eq("organization_id", membershipRow.organizations.id)
    .order("module_key", { ascending: true });

  const organizationModules = (modules ?? []) as OrganizationModule[];

  return {
    organization: membershipRow.organizations,
    membership: membershipRow,
    role,
    permissions,
    modules: organizationModules,
    enabledModules: organizationModules.filter((module) => module.enabled),
  };
}
