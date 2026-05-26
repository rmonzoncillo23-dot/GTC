import { ArrowRight, BookOpenCheck } from "lucide-react";
import type { LearningCourse } from "@/lib/types";

type CourseProgressCardProps = {
  course: LearningCourse;
};

export function CourseProgressCard({ course }: CourseProgressCardProps) {
  const statusLabel = {
    activo: "Activo",
    realizado: "Realizado",
    recomendado: "Recomendado"
  }[course.status];

  return (
    <article className="surface rounded-3xl p-6 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-skybrand/14 text-corporate">
          <BookOpenCheck className="h-6 w-6" />
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{statusLabel}</span>
      </div>
      <h3 className="mt-5 text-lg font-bold text-navy">{course.title}</h3>
      <p className="mt-2 text-sm text-slate-500">{course.category} · {course.modality} · {course.duration}</p>
      <div className="mt-5">
        <div className="mb-2 flex justify-between text-xs font-bold text-slate-500">
          <span>Progreso</span>
          <span>{course.progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-gradient-to-r from-corporate to-skybrand" style={{ width: `${course.progress}%` }} />
        </div>
      </div>
      <button className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-corporate transition hover:text-navy">
        Ver detalle <ArrowRight className="h-4 w-4" />
      </button>
    </article>
  );
}
