import { Award, Compass, ShieldCheck } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { FeatureCard } from "@/components/FeatureCard";
import { SectionTitle } from "@/components/SectionTitle";

export default function AboutPage() {
  return (
    <>
      <section className="container-page py-16">
        <SectionTitle
          eyebrow="Quienes Somos"
          title="Socios de aprendizaje para empresas que operan con altos estandares"
          description="GTC Soluciones nace para conectar gestion, talento y confiabilidad mediante capacitacion aplicable, moderna y preparada para ambientes corporativos."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <FeatureCard title="Proposito" description="Desarrollar capacidades que mejoren el desempeno, la seguridad y la colaboracion en equipos tecnicos." icon={Compass} />
          <FeatureCard title="Metodo" description="Diagnostico, diseno instruccional, ejecucion y seguimiento con foco en transferencia al trabajo." icon={ShieldCheck} />
          <FeatureCard title="Estandar" description="Experiencias limpias, medibles y escalables para organizaciones que necesitan confianza." icon={Award} />
        </div>
      </section>
      <CTASection title="Construyamos una estrategia formativa confiable" />
    </>
  );
}
