import { logout } from "@/core/auth/actions";
import { Button } from "@/shared/components/ui/button";
import { Avatar } from "@/shared/components/ui/avatar";

export function UserMenu({ email }: { email?: string }) {
  return <div className="flex items-center gap-3"><Avatar name={email} /><div className="hidden text-sm text-slate-600 sm:block">{email}</div><form action={logout}><Button variant="outline" size="sm">Выйти</Button></form></div>;
}
