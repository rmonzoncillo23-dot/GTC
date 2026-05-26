import { CheckCircle2, Target, TrendingUp } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { FeatureCard } from "@/components/FeatureCard";
import { Hero } from "@/components/Hero";
import { SectionTitle } from "@/components/SectionTitle";
import { benefits, trainingAreas } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="container-page py-16">
        <div className="grid gap-8 rounded-3xl bg-white p-8 shadow-soft lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
          <SectionTitle
            align="left"
            eyebrow="GTC Soluciones"
            title="Talento, confiabilidad y resultados que perduran"
            description="Alineamos capacitacion, competencias y seguimiento para que el aprendizaje se transforme en mejores practicas de trabajo."
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { title: "Talento", icon: Target, text: "Rutas formativas conectadas con brechas reales." },
              { title: "Confiabilidad", icon: CheckCircle2, text: "Metodologias claras, medibles y sostenibles." },
              { title: "Resultados", icon: TrendingUp, text: "Transferencia al puesto y foco en desempeno." }
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <item.icon className="h-7 w-7 text-skybrand" />
                <h3 className="mt-4 font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <SectionTitle
          eyebrow="Que hacemos"
          title="Formacion tecnica y humana para organizaciones exigentes"
          description="Creamos programas online, presenciales y corporativos para equipos que necesitan aprender rapido, aplicar mejor y sostener estandares."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {trainingAreas.map((area) => (
            <FeatureCard key={area.title} {...area} />
          ))}
        </div>
      </section>

      <section className="bg-white/70 py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionTitle
            align="left"
            eyebrow="Beneficios"
            title="Una base preparada para escalar a plataforma de aprendizaje"
            description="La experiencia informativa queda lista para avanzar hacia usuarios, cursos inscritos, certificados y reporteria academica."
          />
          <div className="grid gap-4">
            {benefits.map((benefit) => (
              <div key={benefit} className="surface flex gap-4 rounded-2xl p-5">
                <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-skybrand" />
                <p className="leading-7 text-slate-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
