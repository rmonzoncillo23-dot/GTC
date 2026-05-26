import { CTASection } from "@/components/CTASection";
import { FeatureCard } from "@/components/FeatureCard";
import { SectionTitle } from "@/components/SectionTitle";
import { freeContent } from "@/data/site";

export default function FreeContentPage() {
  return (
    <>
      <section className="container-page py-16">
        <SectionTitle
          eyebrow="Contenido Gratuito"
          title="Recursos para aprender, compartir y aplicar"
          description="Material inicial para fortalecer cultura de aprendizaje, liderazgo y mejora continua en equipos."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {freeContent.map((item) => (
            <FeatureCard key={item.title} {...item} />
          ))}
        </div>
      </section>
      <CTASection title="Lleva estos contenidos a una ruta formativa completa" />
    </>
  );
}
