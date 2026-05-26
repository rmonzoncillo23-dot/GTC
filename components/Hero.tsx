import Image from "next/image";
import { ArrowRight, PlayCircle } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { trustStats } from "@/data/site";

export function Hero() {
  return (
    <section className="container-page py-10 sm:py-14">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.95fr]">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex rounded-full border border-skybrand/30 bg-skybrand/10 px-4 py-2 text-sm font-semibold text-corporate">
            Capacitacion corporativa para equipos que sostienen operaciones criticas
          </p>
          <h1 className="text-4xl font-black leading-tight text-navy sm:text-5xl lg:text-6xl">
            Gestion & Talento Confiable
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600 sm:text-xl">
            En GTC Soluciones disenamos experiencias de aprendizaje para mineria, industria, liderazgo y formacion tecnica, con foco en desempeno, confiabilidad y resultados que perduran.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/cursos">Ver Cursos <ArrowRight className="ml-2 h-4 w-4" /></ButtonLink>
            <ButtonLink href="/contenido-gratuito" variant="secondary"><PlayCircle className="mr-2 h-4 w-4" /> Contenido Gratuito</ButtonLink>
            <ButtonLink href="/contacto" variant="ghost">Contacto</ButtonLink>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-corporate/20 via-skybrand/20 to-white blur-2xl" />
          <div className="surface relative overflow-hidden rounded-[2rem]">
            <Image
              src="/images/gtc-hero.png"
              alt="Profesionales en entorno industrial revisando capacitaciones digitales"
              width={1400}
              height={1000}
              priority
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {trustStats.map((stat) => (
          <div key={stat.label} className="surface rounded-2xl px-5 py-4">
            <div className="text-2xl font-black text-corporate">{stat.value}</div>
            <div className="mt-1 text-sm font-medium text-slate-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
