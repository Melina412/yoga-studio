export function getRoleFromLocation(location: string | null): string | null {
  if (!location) return null;
  if (location.startsWith('/admin')) return 'admin';
  if (location.startsWith('/dashboard')) return 'customer';
  if (location.startsWith('/staff')) return 'staff';
  return null;
}
