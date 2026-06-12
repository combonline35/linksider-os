create or replace function public.is_org_member(target_organization_id uuid, target_user_id uuid default auth.uid())
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.organization_members om
    where om.organization_id = target_organization_id
      and om.user_id = target_user_id
      and om.status = 'active'
  );
$$;

create or replace function public.is_org_owner(target_organization_id uuid, target_user_id uuid default auth.uid())
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.organizations o
    where o.id = target_organization_id
      and o.owner_id = target_user_id
  );
$$;

alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.organization_modules enable row level security;
alter table public.invitations enable row level security;
alter table public.audit_logs enable row level security;
alter table public.roles enable row level security;
alter table public.permissions enable row level security;
alter table public.role_permissions enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

drop policy if exists "organizations_select_member" on public.organizations;
create policy "organizations_select_member" on public.organizations
  for select using (public.is_org_member(id));

drop policy if exists "organizations_insert_owner" on public.organizations;
create policy "organizations_insert_owner" on public.organizations
  for insert with check (auth.uid() = owner_id);

drop policy if exists "organizations_update_owner" on public.organizations;
create policy "organizations_update_owner" on public.organizations
  for update using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

drop policy if exists "organization_members_select_same_org" on public.organization_members;
create policy "organization_members_select_same_org" on public.organization_members
  for select using (public.is_org_member(organization_id));

drop policy if exists "organization_members_insert_self_owner" on public.organization_members;
create policy "organization_members_insert_self_owner" on public.organization_members
  for insert with check (auth.uid() = user_id);

drop policy if exists "organization_modules_select_same_org" on public.organization_modules;
create policy "organization_modules_select_same_org" on public.organization_modules
  for select using (public.is_org_member(organization_id));

drop policy if exists "organization_modules_insert_owner_org" on public.organization_modules;
create policy "organization_modules_insert_owner_org" on public.organization_modules
  for insert with check (public.is_org_owner(organization_id));

drop policy if exists "organization_modules_update_owner_org" on public.organization_modules;
create policy "organization_modules_update_owner_org" on public.organization_modules
  for update using (public.is_org_owner(organization_id)) with check (public.is_org_owner(organization_id));

drop policy if exists "invitations_select_same_org" on public.invitations;
create policy "invitations_select_same_org" on public.invitations
  for select using (public.is_org_member(organization_id));

-- TODO: replace owner-only write policies with permission-aware RPC/server action policies.
drop policy if exists "invitations_insert_owner_org" on public.invitations;
create policy "invitations_insert_owner_org" on public.invitations
  for insert with check (public.is_org_owner(organization_id));

drop policy if exists "audit_logs_select_same_org" on public.audit_logs;
create policy "audit_logs_select_same_org" on public.audit_logs
  for select using (public.is_org_member(organization_id));

drop policy if exists "audit_logs_insert_member_org" on public.audit_logs;
create policy "audit_logs_insert_member_org" on public.audit_logs
  for insert with check (public.is_org_member(organization_id));

drop policy if exists "roles_select_authenticated" on public.roles;
create policy "roles_select_authenticated" on public.roles
  for select using (auth.uid() is not null);

drop policy if exists "permissions_select_authenticated" on public.permissions;
create policy "permissions_select_authenticated" on public.permissions
  for select using (auth.uid() is not null);

drop policy if exists "role_permissions_select_authenticated" on public.role_permissions;
create policy "role_permissions_select_authenticated" on public.role_permissions
  for select using (auth.uid() is not null);
