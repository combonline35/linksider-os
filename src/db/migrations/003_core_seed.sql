insert into public.roles (key, name, scope) values
  ('super_admin', 'Super Admin', 'global'),
  ('owner', 'Owner', 'organization'),
  ('admin', 'Admin', 'organization'),
  ('manager', 'Manager', 'organization'),
  ('member', 'Member', 'organization'),
  ('viewer', 'Viewer', 'organization'),
  ('client', 'Client', 'organization')
on conflict (key) do update set name = excluded.name, scope = excluded.scope;

insert into public.permissions (key, name, description, module_key) values
  ('core.dashboard.view', 'View dashboard', null, 'core'),
  ('core.organization.view', 'View organization', null, 'core'),
  ('core.organization.manage', 'Manage organization', null, 'core'),
  ('core.members.view', 'View members', null, 'core'),
  ('core.members.manage', 'Manage members', null, 'core'),
  ('core.roles.view', 'View roles', null, 'core'),
  ('core.roles.manage', 'Manage roles', null, 'core'),
  ('core.modules.view', 'View modules', null, 'core'),
  ('core.modules.manage', 'Manage modules', null, 'core'),
  ('core.audit.view', 'View audit log', null, 'core'),
  ('crm.view', 'View CRM', null, 'crm'),
  ('crm.manage', 'Manage CRM', null, 'crm'),
  ('leads.view', 'View leads', null, 'leads'),
  ('leads.manage', 'Manage leads', null, 'leads'),
  ('finance.view', 'View finance', null, 'finance'),
  ('finance.manage', 'Manage finance', null, 'finance'),
  ('warehouse.view', 'View warehouse', null, 'warehouse'),
  ('warehouse.manage', 'Manage warehouse', null, 'warehouse'),
  ('learning.view', 'View learning', null, 'learning'),
  ('learning.manage', 'Manage learning', null, 'learning'),
  ('analytics.view', 'View analytics', null, 'analytics'),
  ('analytics.manage', 'Manage analytics', null, 'analytics'),
  ('ai.view', 'View AI', null, 'ai'),
  ('ai.manage', 'Manage AI', null, 'ai'),
  ('client_portal.view', 'View client portal', null, 'client_portal'),
  ('client_portal.manage', 'Manage client portal', null, 'client_portal')
on conflict (key) do update set name = excluded.name, description = excluded.description, module_key = excluded.module_key;

insert into public.role_permissions (role_id, permission_id)
select r.id, p.id from public.roles r cross join public.permissions p where r.key in ('owner', 'super_admin')
on conflict do nothing;

insert into public.role_permissions (role_id, permission_id)
select r.id, p.id from public.roles r join public.permissions p on p.module_key = 'core' where r.key = 'admin'
on conflict do nothing;

insert into public.role_permissions (role_id, permission_id)
select r.id, p.id from public.roles r join public.permissions p on p.key in ('core.dashboard.view','core.organization.view','core.members.view','crm.view','crm.manage','leads.view','leads.manage','analytics.view') where r.key = 'manager'
on conflict do nothing;

insert into public.role_permissions (role_id, permission_id)
select r.id, p.id from public.roles r join public.permissions p on p.key in ('core.dashboard.view','core.organization.view','crm.view','leads.view') where r.key = 'member'
on conflict do nothing;

insert into public.role_permissions (role_id, permission_id)
select r.id, p.id from public.roles r join public.permissions p on p.key in ('core.dashboard.view','core.organization.view','crm.view','leads.view','analytics.view') where r.key = 'viewer'
on conflict do nothing;

insert into public.role_permissions (role_id, permission_id)
select r.id, p.id from public.roles r join public.permissions p on p.key = 'client_portal.view' where r.key = 'client'
on conflict do nothing;
