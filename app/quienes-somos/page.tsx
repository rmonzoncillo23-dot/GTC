import Link from "next/link";
import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  Handshake,
  ShieldCheck,
  Sparkles,
  Target,
  UserRound
} from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";

const cultureItems = [
  {
    title: "Confianza",
    description: "Construimos relaciones transparentes y duraderas con nuestros clientes, alumnos y organizaciones.",
    icon: ShieldCheck
  },
  {
    title: "Excelencia",
    description: "Promovemos altos estándares técnicos y profesionales en cada proceso formativo.",
    icon: Award
  },
  {
    title: "Cercanía",
    description: "Creemos en una experiencia humana, colaborativa y orientada a las personas.",
    icon: Handshake
  },
  {
    title: "Resultados",
    description: "Buscamos generar impacto real y sostenible a través del conocimiento aplicado.",
    icon: Target
  }
];

const executiveTeam = [
  {
    name: "Socios Fundadores",
    role: "Gerencia General",
    initials: "SF"
  },
  {
    name: "Rocío Alvarado A.",
    role: "Gerencia de Asuntos Corporativos",
    initials: "RA"
  },
  {
    name: "Freddy Alvarado L.",
    role: "Gerencia de Confiabilidad Operacional y Gestión de Activos",
    initials: "FA"
  },
  {
    name: "Silvana Alcayaga O.",
    role: "Administración y Gestión Empresarial",
    initials: "SA"
  }
];

const organizations = [
  "Barrick",
  "SD-Gold",
  "Veladero",
  "Municipalidad de Antofagasta",
  "Universidad Nacional de San Juan",
  "Facultad de Ingeniería",
  "CIN Consejo Interuniversitario Nacional",
  "Tellus Mining Productivity"
];

export default function AboutPage() {
  return (
    <>
      <section className="container-page py-12 lg:py-16">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy via-corporate to-skybrand p-8 text-white shadow-soft sm:p-12 lg:p-16">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-56 w-56 rounded-full bg-skybrand/20 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-center">
            <div>
              <p className="mb-5 inline-flex rounded-full border border-white/20 bg-white/12 px-4 py-2 text-sm font-bold text-white/86 backdrop-blur">
                GTC Soluciones · Gestión & Talento Confiable
              </p>
              <h1 className="max-w-5xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                Impulsamos el desarrollo profesional con experiencia, confianza y excelencia técnica
              </h1>
              <div className="mt-6 grid gap-5 text-lg leading-8 text-white/82">
                <p>
                  En GTC Soluciones conectamos conocimiento, experiencia y desarrollo humano para entregar capacitaciones de alto impacto orientadas a personas, empresas e instituciones.
                </p>
                <p>
                  Nuestro enfoque integra excelencia técnica, cercanía y aprendizaje aplicado, promoviendo resultados sostenibles y formación alineada a los desafíos reales de la industria y las organizaciones.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/cursos"
                  className="focus-ring inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-corporate shadow-lg transition hover:bg-slate-50"
                >
                  Conocer programas <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contacto"
                  className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/12"
                >
                  Conversar con GTC
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl border border-white/18 bg-white/12 p-6 backdrop-blur-xl">
                <Sparkles className="h-8 w-8 text-white" />
                <h2 className="mt-5 text-2xl font-black">Formación corporativa moderna</h2>
                <div className="mt-6 grid gap-4">
                  {["Aprendizaje aplicado", "Excelencia técnica", "Acompañamiento profesional"].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4">
                      <CheckCircle2 className="h-5 w-5 flex-none text-cyan-100" />
                      <span className="font-semibold text-white/86">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-skybrand">Nuestra Historia</p>
            <h2 className="text-3xl font-black text-navy sm:text-4xl">
              Experiencia al servicio del desarrollo profesional y organizacional
            </h2>
          </div>
          <div className="surface rounded-3xl p-8">
            <div className="grid gap-5 text-lg leading-8 text-slate-600">
              <p>
                GTC Soluciones nace con el propósito de fortalecer el desarrollo profesional y organizacional mediante programas de capacitación modernos, prácticos y enfocados en resultados.
              </p>
              <p>
                Nuestra experiencia combina formación técnica, gestión organizacional y acompañamiento profesional, construyendo soluciones de aprendizaje adaptadas a las necesidades reales de cada cliente.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white/70 py-16">
        <div className="container-page">
          <SectionTitle
            eyebrow="Nuestra Cultura"
            title="Principios que sostienen nuestra forma de trabajar"
            description="Integramos capacidades técnicas y humanas para diseñar experiencias de aprendizaje confiables, cercanas y orientadas a resultados."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {cultureItems.map((item) => (
              <article
                key={item.title}
                className="surface group rounded-3xl p-6 transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-corporate text-white transition group-hover:bg-skybrand">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-xl font-black text-navy">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <SectionTitle
          eyebrow="Equipo"
          title="Nuestro Equipo Directivo"
          description="Nuestro equipo directivo reúne experiencia en gestión, confiabilidad operacional, administración y desarrollo organizacional, aportando una visión integral orientada a la excelencia y al crecimiento sostenible."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {executiveTeam.map((member) => (
            <article
              key={member.name}
              className="surface group rounded-3xl p-6 text-center transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-skybrand/20 bg-gradient-to-br from-corporate to-skybrand text-2xl font-black text-white shadow-lg shadow-corporate/20 transition group-hover:scale-105">
                <span className="sr-only">Foto pendiente de {member.name}</span>
                {member.initials || <UserRound className="h-9 w-9" />}
              </div>
              <h3 className="mt-6 text-xl font-black text-navy">{member.name}</h3>
              <p className="mt-3 min-h-12 text-sm font-semibold leading-6 text-corporate">
                {member.role}
              </p>
              <div className="mx-auto mt-5 h-1 w-12 rounded-full bg-skybrand/70" />
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-page">
          <SectionTitle
            eyebrow="Empresas e Instituciones"
            title="Organizaciones que han confiado en nuestra experiencia"
            description="Nuestra trayectoria se vincula con instituciones públicas, académicas y productivas que valoran la formación aplicada y la excelencia profesional."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {organizations.map((organization) => (
              <div
                key={organization}
                className="surface group flex min-h-28 items-center justify-center rounded-3xl p-5 text-center transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div>
                  <Building2 className="mx-auto mb-3 h-6 w-6 text-skybrand transition group-hover:text-corporate" />
                  <p className="font-black leading-6 text-navy">{organization}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="rounded-[2rem] bg-gradient-to-r from-navy via-corporate to-skybrand p-8 text-white shadow-soft sm:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/64">Siguiente paso</p>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Potenciemos juntos el desarrollo de personas y organizaciones
              </h2>
            </div>
            <Link
              href="/cursos"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-corporate shadow-lg transition hover:bg-slate-50"
            >
              Conocer nuestros programas <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
