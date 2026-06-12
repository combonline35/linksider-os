import { createClient } from "@/core/auth/server";
import type { OrganizationMember } from "./types";

export async function getMembers(organizationId: string): Promise<OrganizationMember[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("organization_members")
    .select("*, profiles(*), roles(*)")
    .eq("organization_id", organizationId)
    .order("created_at", { ascending: true });
  return (data ?? []) as OrganizationMember[];
}
