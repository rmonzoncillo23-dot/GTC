import { StudentDashboard } from "@/components/StudentDashboard";
import { StudentLayout } from "@/components/StudentLayout";
import { requireRole } from "@/lib/auth/roles";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { profile } = await requireRole(["alumno"]);
  return (
    <StudentLayout>
      <StudentDashboard profile={profile} />
    </StudentLayout>
  );
}
