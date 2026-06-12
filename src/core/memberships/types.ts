import type { Role } from "@/core/roles/types";
import type { Profile } from "@/core/users/types";

export type OrganizationMember = {
  id: string;
  organization_id: string;
  user_id: string;
  role_id: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  profiles?: Profile | null;
  roles?: Role | null;
};
