"use server";

import { redirect } from "next/navigation";
import { createAdminClient } from "@/core/auth/admin";
import { createClient } from "@/core/auth/server";
import { MODULES } from "@/core/modules/registry";
import { getPublicEnv } from "@/shared/lib/env";
import { slugify } from "@/shared/lib/utils";

export async function login(formData: FormData) {
  const supabase = await createClient();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);

  redirect("/dashboard");
}

export async function register(formData: FormData) {
  const supabase = await createClient();
  const adminSupabase = createAdminClient();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("full_name") ?? "").trim();
  const organizationName = String(formData.get("organization_name") ?? "").trim();
  const env = getPublicEnv();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/dashboard`,
    },
  });

  if (error) throw new Error(error.message);
  if (!data.user) throw new Error("Пользователь не создан");

  const { data: ownerRole, error: ownerRoleError } = await adminSupabase
    .from("roles")
    .select("id")
    .eq("key", "owner")
    .single();

  if (ownerRoleError) throw new Error(ownerRoleError.message);

  const { error: profileError } = await adminSupabase.from("profiles").upsert({
    id: data.user.id,
    email,
    full_name: fullName,
    updated_at: new Date().toISOString(),
  });

  if (profileError) throw new Error(profileError.message);

  const baseSlug = slugify(organizationName) || "organization";
  const slug = `${baseSlug}-${data.user.id.slice(0, 8)}`;
  const { data: organization, error: organizationError } = await adminSupabase
    .from("organizations")
    .insert({ name: organizationName, slug, owner_id: data.user.id })
    .select("id")
    .single();

  if (organizationError) throw new Error(organizationError.message);

  const { error: membershipError } = await adminSupabase.from("organization_members").insert({
    organization_id: organization.id,
    user_id: data.user.id,
    role_id: ownerRole.id,
    status: "active",
  });

  if (membershipError) throw new Error(membershipError.message);

  const { error: modulesError } = await adminSupabase.from("organization_modules").insert(
    MODULES.map((module) => ({
      organization_id: organization.id,
      module_key: module.key,
      enabled: false,
    })),
  );

  if (modulesError) throw new Error(modulesError.message);

  const { error: auditLogError } = await adminSupabase.from("audit_logs").insert({
    organization_id: organization.id,
    user_id: data.user.id,
    action: "organization.created",
    entity_type: "organization",
    entity_id: organization.id,
    metadata: { name: organizationName },
  });

  if (auditLogError) throw new Error(auditLogError.message);

  if (!data.session) redirect("/login?check_email=1");
  redirect("/dashboard");
}

export async function forgotPassword(formData: FormData) {
  const supabase = await createClient();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const env = getPublicEnv();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/login`,
  });

  if (error) throw new Error(error.message);
  redirect("/login?reset_sent=1");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
