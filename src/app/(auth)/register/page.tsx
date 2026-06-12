import Link from "next/link";
import { register } from "@/core/auth/actions";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

export default function RegisterPage() {
  return <div className="flex min-h-screen items-center justify-center p-6"><Card className="w-full max-w-lg"><CardHeader><CardTitle>Создать workspace</CardTitle><CardDescription>Будут созданы профиль, организация, роль owner и выключенные модули.</CardDescription></CardHeader><CardContent><form action={register} className="space-y-4"><div className="space-y-2"><Label htmlFor="full_name">Имя</Label><Input id="full_name" name="full_name" required /></div><div className="space-y-2"><Label htmlFor="organization_name">Организация</Label><Input id="organization_name" name="organization_name" required /></div><div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required /></div><div className="space-y-2"><Label htmlFor="password">Пароль</Label><Input id="password" name="password" type="password" minLength={6} required /></div><Button className="w-full">Зарегистрироваться</Button></form><p className="mt-4 text-sm text-slate-600">Уже есть аккаунт? <Link className="font-medium text-slate-900" href="/login">Войти</Link></p></CardContent></Card></div>;
}
