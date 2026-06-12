import type { User } from "@supabase/supabase-js";
import type { CurrentOrganizationContext } from "@/shared/lib/current-organization";
import { OrganizationSwitcher } from "./organization-switcher";
import { UserMenu } from "./user-menu";

export function AppHeader({ context, user }: { context: CurrentOrganizationContext; user: User }) {
  return <header className="flex h-16 items-center justify-between border-b bg-white px-6"><OrganizationSwitcher organization={context.organization} /><UserMenu email={user.email} /></header>;
}
