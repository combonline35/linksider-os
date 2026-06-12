import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getUser } from "@/core/auth/server";
import { AppHeader } from "@/shared/components/app-header";
import { AppSidebar } from "@/shared/components/app-sidebar";
import { getCurrentOrganization } from "@/shared/lib/current-organization";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await getUser();
  if (!user) redirect("/login");

  const context = await getCurrentOrganization();
  if (!context) redirect("/register");

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <AppSidebar context={context} />
        <main className="min-w-0 flex-1">
          <AppHeader context={context} user={user} />
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
