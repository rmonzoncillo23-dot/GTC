import type { ReactNode } from "react";
import { requireRole } from "@/lib/auth/roles";
import type { UserRole } from "@/lib/types";

type RoleGuardProps = {
  allowedRoles: UserRole[];
  children: ReactNode;
};

export async function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  await requireRole(allowedRoles);
  return <>{children}</>;
}
