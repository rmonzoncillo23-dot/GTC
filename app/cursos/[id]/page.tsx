import { notFound } from "next/navigation";
import { ArrowLeft, Clock, MonitorPlay, Tag } from "lucide-react";
import Link from "next/link";
import { EnrollButton } from "@/components/EnrollButton";
import { getCourseById } from "@/lib/courses/queries";

type CourseDetailPageProps = {
  params: {
    id: string;
  };
};

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const course = await getCourseById(params.id);

  if (!course) {
    notFound();
  }

  return (
    <section className="container-page py-12">
      <Link href="/cursos" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-corporate transition hover:text-navy">
        <ArrowLeft className="h-4 w-4" />
        Volver a cursos
      </Link>

      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-corporate to-skybrand shadow-soft">
          {course.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={course.image_url} alt="" className="aspect-[16/10] w-full object-cover" />
          ) : (
            <div className="grid aspect-[16/10] place-items-center text-5xl font-black text-white/75">
              GTC
            </div>
          )}
        </div>

        <div className="self-center">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-skybrand/12 px-3 py-1 text-xs font-bold text-corporate">{course.category ?? "General"}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{course.modality ?? "Online"}</span>
          </div>
          <h1 className="mt-5 text-4xl font-black leading-tight text-navy sm:text-5xl">{course.title}</h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">{course.description ?? "Programa de capacitacion GTC Soluciones."}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <InfoPill icon={MonitorPlay} label="Modalidad" value={course.modality ?? "Online"} />
            <InfoPill icon={Clock} label="Duracion" value={course.duration ?? "Flexible"} />
            <InfoPill
              icon={Tag}
              label="Valor"
              value={course.price ? new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(course.price) : "Consultar"}
            />
          </div>

          <div className="mt-8 max-w-sm">
            <EnrollButton courseId={course.id} />
          </div>
        </div>
      </div>
    </section>
  );
}

type InfoPillProps = {
  icon: typeof MonitorPlay;
  label: string;
  value: string;
};

function InfoPill({ icon: Icon, label, value }: InfoPillProps) {
  return (
    <div className="surface rounded-2xl p-4">
      <Icon className="h-5 w-5 text-skybrand" />
      <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <p className="mt-1 font-bold text-navy">{value}</p>
    </div>
  );
}
