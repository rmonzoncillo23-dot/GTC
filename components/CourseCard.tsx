import { ArrowRight, Clock, MonitorPlay, Tag } from "lucide-react";
import Link from "next/link";

type CourseCardProps = {
  id?: string;
  title: string;
  category: string | null;
  modality: string | null;
  duration: string | null;
  description: string | null;
  price?: number | null;
  image_url?: string | null;
};

export function CourseCard({
  id,
  title,
  category,
  modality,
  duration,
  description,
  price,
  image_url
}: CourseCardProps) {
  const detailHref = id ? `/cursos/${id}` : "/cursos";

  return (
    <article className="surface flex h-full flex-col overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="aspect-[16/9] bg-gradient-to-br from-corporate to-skybrand">
        {image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image_url} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-3xl font-black text-white/70">
            GTC
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-full bg-skybrand/12 px-3 py-1 text-corporate">{category ?? "General"}</span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">{modality ?? "Online"}</span>
        </div>
        <h3 className="mt-5 text-xl font-bold text-navy">{title}</h3>
        <p className="mt-3 line-clamp-3 flex-1 leading-7 text-slate-600">{description ?? "Curso GTC Soluciones."}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="inline-flex items-center gap-2">
            <Clock className="h-4 w-4 text-skybrand" />
            {duration ?? "Flexible"}
          </span>
          <span className="inline-flex items-center gap-2">
            <MonitorPlay className="h-4 w-4 text-skybrand" />
            {modality ?? "Online"}
          </span>
        </div>
        <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-navy">
          <Tag className="h-4 w-4 text-skybrand" />
          {price ? new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(price) : "Consultar valor"}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={detailHref} className="focus-ring inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-corporate">
            Ver detalle <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/contacto" className="focus-ring rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-corporate transition hover:bg-corporate/10">
            Solicitar informacion
          </Link>
        </div>
      </div>
    </article>
  );
}
