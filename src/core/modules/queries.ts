import { createClient } from "@/core/auth/server";
import type { OrganizationModule } from "./types";

export async function getOrganizationModules(organizationId: string): Promise<OrganizationModule[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("organization_modules").select("*").eq("organization_id", organizationId);
  return (data ?? []) as OrganizationModule[];
}
