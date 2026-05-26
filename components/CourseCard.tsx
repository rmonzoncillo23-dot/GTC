import { ArrowRight, Clock, MonitorPlay } from "lucide-react";
import Link from "next/link";

type CourseCardProps = {
  title: string;
  category: string;
  modality: string;
  duration: string;
  description: string;
};

export function CourseCard({
  title,
  category,
  modality,
  duration,
  description
}: CourseCardProps) {
  return (
    <article className="surface flex h-full flex-col rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex flex-wrap gap-2 text-xs font-semibold">
        <span className="rounded-full bg-skybrand/12 px-3 py-1 text-corporate">{category}</span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">{modality}</span>
      </div>
      <h3 className="mt-5 text-xl font-bold text-navy">{title}</h3>
      <p className="mt-3 flex-1 leading-7 text-slate-600">{description}</p>
      <div className="mt-6 flex items-center gap-4 text-sm text-slate-500">
        <span className="inline-flex items-center gap-2">
          <Clock className="h-4 w-4 text-skybrand" />
          {duration}
        </span>
        <span className="inline-flex items-center gap-2">
          <MonitorPlay className="h-4 w-4 text-skybrand" />
          {modality}
        </span>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/cursos" className="focus-ring inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-corporate">
          Ver mas <ArrowRight className="h-4 w-4" />
        </Link>
        <Link href="/contacto" className="focus-ring rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-corporate transition hover:bg-corporate/10">
          Solicitar informacion
        </Link>
      </div>
    </article>
  );
}
