create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  owner_id uuid references auth.users(id),
  status text not null default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  name text not null,
  scope text not null default 'organization',
  created_at timestamptz default now()
);

create table if not exists public.permissions (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  name text not null,
  description text,
  module_key text not null default 'core',
  created_at timestamptz default now()
);

create table if not exists public.role_permissions (
  role_id uuid references public.roles(id) on delete cascade,
  permission_id uuid references public.permissions(id) on delete cascade,
  primary key (role_id, permission_id)
);

create table if not exists public.organization_members (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  role_id uuid references public.roles(id),
  status text not null default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(organization_id, user_id)
);

create table if not exists public.organization_modules (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete cascade,
  module_key text not null,
  enabled boolean not null default false,
  settings jsonb not null default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(organization_id, module_key)
);

create table if not exists public.invitations (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete cascade,
  email text not null,
  role_id uuid references public.roles(id),
  token text unique not null,
  status text not null default 'pending',
  expires_at timestamptz not null,
  created_at timestamptz default now(),
  accepted_at timestamptz
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete cascade,
  user_id uuid references auth.users(id),
  action text not null,
  entity_type text,
  entity_id uuid,
  metadata jsonb not null default '{}',
  created_at timestamptz default now()
);

create index if not exists idx_organization_members_user_id on public.organization_members(user_id);
create index if not exists idx_organization_members_organization_id on public.organization_members(organization_id);
create index if not exists idx_organization_modules_organization_id on public.organization_modules(organization_id);
create index if not exists idx_audit_logs_organization_id on public.audit_logs(organization_id);
create index if not exists idx_invitations_token on public.invitations(token);
