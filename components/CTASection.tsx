import { ButtonLink } from "@/components/ButtonLink";

type CTASectionProps = {
  title?: string;
  description?: string;
};

export function CTASection({
  title = "Impulsemos el talento que sostiene tus resultados",
  description = "Conversemos sobre una ruta formativa para tu equipo, con modalidades flexibles y una base digital preparada para crecer."
}: CTASectionProps) {
  return (
    <section className="container-page py-16">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-navy via-corporate to-skybrand p-8 text-white shadow-soft sm:p-12">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
          <p className="mt-4 text-lg leading-8 text-white/86">{description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contacto" variant="secondary">Solicitar reunion</ButtonLink>
            <ButtonLink href="/cursos" variant="ghost">Ver cursos</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
