import { BarChart3, Building2, ClipboardList, Users2 } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { FeatureCard } from "@/components/FeatureCard";
import { SectionTitle } from "@/components/SectionTitle";

const companySolutions = [
  { title: "Academias corporativas", description: "Rutas por rol, nivel y brecha para ordenar la capacitacion interna.", icon: Building2 },
  { title: "Programas a medida", description: "Contenidos adaptados a la realidad operacional, cultura y objetivos del negocio.", icon: ClipboardList },
  { title: "Gestion de equipos", description: "Formacion para jefaturas, instructores internos y lideres de terreno.", icon: Users2 },
  { title: "Indicadores", description: "Base preparada para avance, certificados, reportes y trazabilidad academica.", icon: BarChart3 }
];

export default function CompaniesPage() {
  return (
    <>
      <section className="container-page py-16">
        <SectionTitle
          eyebrow="Empresas"
          title="Soluciones formativas para organizaciones"
          description="Acompanamos a areas de personas, seguridad, operaciones y capacitacion con programas flexibles y escalables."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {companySolutions.map((solution) => (
            <FeatureCard key={solution.title} {...solution} />
          ))}
        </div>
      </section>
      <CTASection title="Disenemos un plan para tu empresa" description="Agenda una conversacion para revisar objetivos, perfiles, modalidades y proximos pasos." />
    </>
  );
}
