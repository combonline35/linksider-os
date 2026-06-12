import { createClient } from "@/core/auth/server";

export async function listAuditLogs(organizationId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("audit_logs")
    .select("*")
    .eq("organization_id", organizationId)
    .order("created_at", { ascending: false })
    .limit(50);
  return data ?? [];
}
