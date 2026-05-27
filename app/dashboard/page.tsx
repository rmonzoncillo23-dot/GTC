import { StudentDashboard } from "@/components/StudentDashboard";
import { StudentLayout } from "@/components/StudentLayout";
import { requireRole } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import type { Certificate, LearningCourse } from "@/lib/types";

export const dynamic = "force-dynamic";

function normalizeCourseStatus(status: string): LearningCourse["status"] {
  if (status === "en_progreso" || status === "finalizado") {
    return status;
  }

  return "inscrito";
}

export default async function DashboardPage() {
  const { user, profile } = await requireRole(["alumno"]);
  const supabase = createClient();

  const [enrollmentsResponse, certificatesResponse] = await Promise.all([
    supabase
      .from("enrollments")
      .select(`
        id,
        status,
        progress,
        enrolled_at,
        courses (
          id,
          title,
          description,
          category,
          modality,
          duration,
          image_url
        )
      `)
      .eq("user_id", user.id)
      .order("enrolled_at", { ascending: false }),
    supabase
      .from("certificates")
      .select(`
        id,
        status,
        issued_at,
        certificate_url,
        courses (
          title
        )
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
  ]);

  const courses = (enrollmentsResponse.data ?? []).reduce<LearningCourse[]>((acc, enrollment) => {
      const course = Array.isArray(enrollment.courses)
        ? enrollment.courses[0]
        : enrollment.courses;

      if (!course) {
        return acc;
      }

      acc.push({
        id: course.id,
        title: course.title,
        description: course.description,
        category: course.category,
        modality: course.modality,
        duration: course.duration,
        image_url: course.image_url,
        status: normalizeCourseStatus(enrollment.status),
        progress: enrollment.progress ?? 0
      });

      return acc;
    }, []);

  const certificates: Certificate[] = (certificatesResponse.data ?? []).map((certificate) => {
    const course = Array.isArray(certificate.courses)
      ? certificate.courses[0]
      : certificate.courses;

    return {
      id: certificate.id,
      title: course?.title ?? "Certificado GTC",
      issuedAt: certificate.issued_at
        ? new Date(certificate.issued_at).toLocaleDateString("es-CL")
        : "Pendiente",
      status: certificate.status === "pending" ? "pendiente" : "disponible",
      certificateUrl: certificate.certificate_url
    };
  });

  const error =
    enrollmentsResponse.error?.message ??
    certificatesResponse.error?.message ??
    null;

  return (
    <StudentLayout>
      <StudentDashboard profile={profile} courses={courses} certificates={certificates} error={error} />
    </StudentLayout>
  );
}
