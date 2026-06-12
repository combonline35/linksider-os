import Link from "next/link";
import { login } from "@/core/auth/actions";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

export default function LoginPage() {
  return <div className="flex min-h-screen items-center justify-center p-6"><Card className="w-full max-w-md"><CardHeader><CardTitle>Вход</CardTitle><CardDescription>Войдите в Linksider OS через Supabase Auth.</CardDescription></CardHeader><CardContent><form action={login} className="space-y-4"><div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required /></div><div className="space-y-2"><Label htmlFor="password">Пароль</Label><Input id="password" name="password" type="password" required /></div><Button className="w-full">Войти</Button></form><div className="mt-4 flex justify-between text-sm"><Link className="text-slate-600 hover:text-slate-900" href="/register">Регистрация</Link><Link className="text-slate-600 hover:text-slate-900" href="/forgot-password">Забыли пароль?</Link></div></CardContent></Card></div>;
}
