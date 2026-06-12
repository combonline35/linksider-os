export type OrganizationModule = {
  id: string;
  organization_id: string;
  module_key: string;
  enabled: boolean;
  settings: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};
