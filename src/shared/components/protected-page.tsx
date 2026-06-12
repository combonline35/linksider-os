import { redirect } from "next/navigation";
import { hasPermission } from "@/core/permissions/can";
import {
  getCurrentOrganization,
  type CurrentOrganizationContext,
} from "@/shared/lib/current-organization";

export async function requireOrganization(permission?: string): Promise<CurrentOrganizationContext> {
  const context = await getCurrentOrganization();

  if (!context) redirect("/login");
  if (permission && !hasPermission(context.permissions, permission)) redirect("/dashboard");

  return context;
}
