export function hasPermission(userPermissions: string[], permissionKey: string): boolean {
  return userPermissions.includes(permissionKey);
}

export function createCan(userPermissions: string[]) {
  return (permissionKey: string) => hasPermission(userPermissions, permissionKey);
}
