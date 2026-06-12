import { createInvitation } from "@/core/memberships/actions";
import { getMembers } from "@/core/memberships/queries";
import { hasPermission } from "@/core/permissions/can";
import { createClient } from "@/core/auth/server";
import { requireOrganization } from "@/shared/components/protected-page";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Select } from "@/shared/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { formatDate } from "@/shared/lib/utils";

export default async function UsersPage() {
  const context = await requireOrganization("core.members.view");
  const members = await getMembers(context.organization.id);
  const canManage = hasPermission(context.permissions, "core.members.manage");
  const supabase = await createClient();
  const { data: roles } = await supabase.from("roles").select("id,key,name").order("name");
  return <div className="space-y-6"><div><h1 className="text-2xl font-semibold">Пользователи</h1><p className="text-slate-500">Участники текущей организации.</p></div>{canManage && <Card><CardHeader><CardTitle>Пригласить пользователя</CardTitle><CardDescription>Email пока не отправляется — создаётся pending invitation.</CardDescription></CardHeader><CardContent><form action={createInvitation} className="grid gap-4 md:grid-cols-[1fr_220px_auto]"><div><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required /></div><div><Label htmlFor="role_id">Роль</Label><Select id="role_id" name="role_id">{roles?.map((role) => <option key={role.id} value={role.id}>{role.name}</option>)}</Select></div><div className="flex items-end"><Button>Пригласить</Button></div></form></CardContent></Card>}<Card><CardContent className="pt-6"><Table><TableHeader><TableRow><TableHead>Имя</TableHead><TableHead>Email</TableHead><TableHead>Роль</TableHead><TableHead>Статус</TableHead><TableHead>Добавлен</TableHead></TableRow></TableHeader><TableBody>{members.map((member) => <TableRow key={member.id}><TableCell>{member.profiles?.full_name ?? "—"}</TableCell><TableCell>{member.profiles?.email ?? member.user_id}</TableCell><TableCell>{member.roles?.name ?? "—"}</TableCell><TableCell>{member.status}</TableCell><TableCell>{formatDate(member.created_at)}</TableCell></TableRow>)}</TableBody></Table></CardContent></Card></div>;
}
