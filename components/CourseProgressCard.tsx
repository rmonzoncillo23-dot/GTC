import { ArrowRight, BookOpenCheck } from "lucide-react";
import Link from "next/link";
import type { LearningCourse } from "@/lib/types";

type CourseProgressCardProps = {
  course: LearningCourse;
};

export function CourseProgressCard({ course }: CourseProgressCardProps) {
  const statusLabel = {
    activo: "Activo",
    realizado: "Realizado",
    recomendado: "Recomendado",
    inscrito: "Inscrito",
    en_progreso: "En progreso",
    finalizado: "Finalizado",
    completed: "Completado"
  }[course.status];

  return (
    <article className="surface overflow-hidden rounded-3xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="aspect-[16/8] bg-gradient-to-br from-corporate to-skybrand">
        {course.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={course.image_url} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-2xl font-black text-white/70">
            GTC
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-skybrand/14 text-corporate">
            <BookOpenCheck className="h-6 w-6" />
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
            {statusLabel}
          </span>
        </div>
        <h3 className="mt-5 text-lg font-bold text-navy">{course.title}</h3>
        {course.description ? (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{course.description}</p>
        ) : null}
        <p className="mt-2 text-sm text-slate-500">
          {course.category ?? "General"} · {course.modality ?? "Online"} · {course.duration ?? "Flexible"}
        </p>
        <div className="mt-5">
          <div className="mb-2 flex justify-between text-xs font-bold text-slate-500">
            <span>Progreso</span>
            <span>{course.progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-corporate to-skybrand"
              style={{ width: `${course.progress}%` }}
            />
          </div>
        </div>
        <Link
          href={`/cursos/${course.id}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-corporate transition hover:text-navy"
        >
          Ver detalle <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
