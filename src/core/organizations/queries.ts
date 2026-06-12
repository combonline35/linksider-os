import { createClient } from "@/core/auth/server";
import type { Organization } from "./types";

type MembershipOrganizationRow = {
  organizations: Organization | null;
};

export async function getOrganizationsForUser(userId: string): Promise<Organization[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("organization_members")
    .select("organizations(*)")
    .eq("user_id", userId)
    .eq("status", "active");

  return ((data ?? []) as MembershipOrganizationRow[])
    .map((row) => row.organizations)
    .filter((organization): organization is Organization => Boolean(organization));
}
