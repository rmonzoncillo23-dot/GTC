import { AdminDashboard } from "@/components/AdminDashboard";
import { AdminLayout } from "@/components/AdminLayout";
import { requireRole } from "@/lib/auth/roles";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireRole(["superadmin"]);

  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  );
}
