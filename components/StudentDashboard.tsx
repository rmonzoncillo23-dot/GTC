import { Award, Clock3, GraduationCap, Sparkles, UserCircle } from "lucide-react";
import { CertificateCard } from "@/components/CertificateCard";
import { CourseProgressCard } from "@/components/CourseProgressCard";
import { UserCard } from "@/components/UserCard";
import { mockCertificates, mockLearningCourses } from "@/data/platform";
import type { Profile } from "@/lib/types";

type StudentDashboardProps = {
  profile: Profile;
};

export function StudentDashboard({ profile }: StudentDashboardProps) {
  const activeCourses = mockLearningCourses.filter((course) => course.status === "activo");
  const completedCourses = mockLearningCourses.filter((course) => course.status === "realizado");
  const recommendedCourses = mockLearningCourses.filter((course) => course.status === "recomendado");

  return (
    <div className="grid gap-8">
      <div className="rounded-3xl bg-gradient-to-r from-navy via-corporate to-skybrand p-8 text-white shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">Panel alumno</p>
        <h1 className="mt-3 text-3xl font-black sm:text-4xl">Bienvenido, {profile.full_name ?? "Alumno"}</h1>
        <p className="mt-3 max-w-3xl leading-7 text-white/78">
          Revisa tus cursos activos, certificados, historial academico y proximas recomendaciones formativas.
        </p>
        <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold text-white/82">
          <span className="rounded-full bg-white/12 px-4 py-2">{profile.email ?? "Correo no disponible"}</span>
          <span className="rounded-full bg-white/12 px-4 py-2">{profile.company ?? "Sin empresa registrada"}</span>
        </div>
      </div>

      <section id="mis-cursos" className="grid gap-4">
        <SectionHeader icon={GraduationCap} title="Mis cursos activos" />
        <div className="grid gap-4 lg:grid-cols-2">
          {activeCourses.map((course) => (
            <CourseProgressCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      <section id="realizados" className="grid gap-4">
        <SectionHeader icon={Clock3} title="Cursos realizados" />
        <div className="grid gap-4 lg:grid-cols-2">
          {completedCourses.map((course) => (
            <CourseProgressCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      <section id="certificados" className="grid gap-4">
        <SectionHeader icon={Award} title="Certificados disponibles" />
        <div className="grid gap-4 lg:grid-cols-2">
          {mockCertificates.map((certificate) => (
            <CertificateCard key={certificate.id} certificate={certificate} />
          ))}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <section id="perfil" className="grid gap-4">
          <SectionHeader icon={UserCircle} title="Perfil del alumno" />
          <UserCard profile={profile} />
        </section>

        <section id="historial" className="surface rounded-3xl p-6">
          <SectionHeader icon={Clock3} title="Historial academico" />
          <div className="mt-5 grid gap-4">
            {["12 horas completadas", "2 cursos activos", "1 certificado disponible"].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm font-semibold text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="grid gap-4">
        <SectionHeader icon={Sparkles} title="Cursos recomendados" />
        <div className="grid gap-4 lg:grid-cols-2">
          {recommendedCourses.map((course) => (
            <CourseProgressCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
}

type SectionHeaderProps = {
  icon: typeof Award;
  title: string;
};

function SectionHeader({ icon: Icon, title }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-corporate text-white">
        <Icon className="h-5 w-5" />
      </div>
      <h2 className="text-2xl font-black text-navy">{title}</h2>
    </div>
  );
}
