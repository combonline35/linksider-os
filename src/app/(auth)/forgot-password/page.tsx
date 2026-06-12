import Link from "next/link";
import { forgotPassword } from "@/core/auth/actions";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

export default function ForgotPasswordPage() {
  return <div className="flex min-h-screen items-center justify-center p-6"><Card className="w-full max-w-md"><CardHeader><CardTitle>Восстановление пароля</CardTitle><CardDescription>Отправим ссылку восстановления через Supabase.</CardDescription></CardHeader><CardContent><form action={forgotPassword} className="space-y-4"><div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required /></div><Button className="w-full">Отправить ссылку</Button></form><Link href="/login" className="mt-4 block text-sm text-slate-600">Вернуться ко входу</Link></CardContent></Card></div>;
}
