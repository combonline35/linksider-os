import { createClient } from "@/core/auth/server";

export async function getRoleByKey(key: string) {
  const supabase = await createClient();
  const { data } = await supabase.from("roles").select("*").eq("key", key).single();
  return data;
}
