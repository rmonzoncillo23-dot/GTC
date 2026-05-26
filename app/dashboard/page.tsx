import { redirect } from "next/navigation";
import { Award, BookOpenCheck, Clock3, UserCircle } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { dashboardCourses } from "@/data/site";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  if (!isSupabaseConfigured()) {
    redirect("/login?next=/dashboard");
  }

  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/dashboard");
  }

  const userName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split("@")[0] ||
    "Usuario";

  return (
    <section className="container-page py-16">
      <div className="mb-10 rounded-3xl bg-gradient-to-r from-navy to-corporate p-8 text-white shadow-soft">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-skybrand">Dashboard privado</p>
            <h1 className="mt-3 text-3xl font-black sm:text-4xl">Hola, {userName}</h1>
            <p className="mt-3 text-white/75">Aqui veras tus cursos, certificados e historial academico.</p>
          </div>
          <UserCircle className="h-16 w-16 text-white/70" />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="surface rounded-3xl p-8">
          <div className="mb-6 flex items-center gap-3">
            <BookOpenCheck className="h-6 w-6 text-skybrand" />
            <h2 className="text-2xl font-bold text-navy">Cursos inscritos</h2>
          </div>
          <div className="grid gap-4">
            {dashboardCourses.map((course, index) => (
              <div key={course} className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-navy">{course}</h3>
                    <p className="mt-2 text-sm text-slate-600">Progreso simulado: {index === 0 ? "72%" : index === 1 ? "35%" : "12%"}</p>
                  </div>
                  <span className="rounded-full bg-skybrand/12 px-3 py-1 text-xs font-bold text-corporate">
                    Activo
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          <div className="surface rounded-3xl p-8">
            <Award className="h-7 w-7 text-skybrand" />
            <h2 className="mt-4 text-xl font-bold text-navy">Certificados</h2>
            <p className="mt-3 leading-7 text-slate-600">Proximamente podras descargar certificados validados por curso y programa.</p>
          </div>
          <div className="surface rounded-3xl p-8">
            <Clock3 className="h-7 w-7 text-skybrand" />
            <h2 className="mt-4 text-xl font-bold text-navy">Historial academico</h2>
            <p className="mt-3 leading-7 text-slate-600">Proximamente se mostraran avances, horas cursadas y rutas completadas.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
