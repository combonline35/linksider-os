import type { Organization } from "@/core/organizations/types";
export function OrganizationSwitcher({ organization }: { organization: Organization }) { return <div className="rounded-md border bg-white px-3 py-2 text-sm font-medium">{organization.name}</div>; }
