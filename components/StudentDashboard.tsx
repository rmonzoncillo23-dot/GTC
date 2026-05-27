import { AlertCircle, Award, Clock3, GraduationCap, UserCircle } from "lucide-react";
import { CertificateCard } from "@/components/CertificateCard";
import { CourseProgressCard } from "@/components/CourseProgressCard";
import { UserCard } from "@/components/UserCard";
import type { Certificate, LearningCourse, Profile } from "@/lib/types";

type StudentDashboardProps = {
  profile: Profile;
  courses: LearningCourse[];
  certificates: Certificate[];
  error?: string | null;
};

const activeStatuses = ["inscrito", "en_progreso"];
const completedStatuses = ["finalizado"];

export function StudentDashboard({ profile, courses, certificates, error }: StudentDashboardProps) {
  const activeCourses = courses.filter((course) => activeStatuses.includes(course.status));
  const completedCourses = courses.filter((course) => completedStatuses.includes(course.status));
  const availableCertificates = certificates.filter((certificate) => certificate.status === "disponible");
  const completedHours = completedCourses.length;

  return (
    <div className="grid gap-8">
      <div className="rounded-3xl bg-gradient-to-r from-navy via-corporate to-skybrand p-8 text-white shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">Panel alumno</p>
        <h1 className="mt-3 text-3xl font-black sm:text-4xl">Bienvenido, {profile.full_name ?? "Alumno"}</h1>
        <p className="mt-3 max-w-3xl leading-7 text-white/78">
          Revisa tus cursos inscritos, avances, certificados e historial academico.
        </p>
        <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold text-white/82">
          <span className="rounded-full bg-white/12 px-4 py-2">{profile.email ?? "Correo no disponible"}</span>
          <span className="rounded-full bg-white/12 px-4 py-2">{profile.company ?? "Sin empresa registrada"}</span>
        </div>
      </div>

      {error ? (
        <div className="flex items-start gap-3 rounded-3xl border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-700">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-none" />
          {error}
        </div>
      ) : null}

      <section id="mis-cursos" className="grid gap-4">
        <SectionHeader icon={GraduationCap} title="Mis cursos activos" />
        {activeCourses.length ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {activeCourses.map((course) => (
              <CourseProgressCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <EmptyState text="Aún no tienes cursos inscritos." />
        )}
      </section>

      <section id="realizados" className="grid gap-4">
        <SectionHeader icon={Clock3} title="Cursos finalizados" />
        {completedCourses.length ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {completedCourses.map((course) => (
              <CourseProgressCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <EmptyState text="Aún no tienes cursos finalizados." />
        )}
      </section>

      <section id="certificados" className="grid gap-4">
        <SectionHeader icon={Award} title="Certificados disponibles" />
        {availableCertificates.length ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {availableCertificates.map((certificate) => (
              <CertificateCard key={certificate.id} certificate={certificate} />
            ))}
          </div>
        ) : (
          <EmptyState text="Aún no tienes certificados disponibles." />
        )}
      </section>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <section id="perfil" className="grid gap-4">
          <SectionHeader icon={UserCircle} title="Perfil del alumno" />
          <UserCard profile={profile} />
        </section>

        <section id="historial" className="surface rounded-3xl p-6">
          <SectionHeader icon={Clock3} title="Historial academico" />
          <div className="mt-5 grid gap-4">
            <Metric text={`${courses.length} cursos inscritos`} />
            <Metric text={`${activeCourses.length} cursos activos`} />
            <Metric text={`${completedHours} cursos finalizados`} />
            <Metric text={`${availableCertificates.length} certificados disponibles`} />
          </div>
        </section>
      </div>
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

function EmptyState({ text }: { text: string }) {
  return (
    <div className="surface rounded-3xl p-8 text-center">
      <p className="font-semibold text-slate-600">{text}</p>
    </div>
  );
}

function Metric({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm font-semibold text-slate-700">
      {text}
    </div>
  );
}
