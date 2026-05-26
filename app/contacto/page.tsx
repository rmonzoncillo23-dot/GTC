import { Mail, MapPin, Phone } from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";

export default function ContactPage() {
  return (
    <section className="container-page py-16">
      <SectionTitle
        eyebrow="Contacto"
        title="Hablemos de tu proximo programa de capacitacion"
        description="Cuentanos que necesita tu equipo y coordinaremos una propuesta alineada a tus objetivos."
      />
      <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="surface rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-navy">Datos de contacto</h2>
          <div className="mt-6 grid gap-5 text-slate-600">
            <span className="inline-flex items-center gap-3"><Mail className="h-5 w-5 text-skybrand" /> contacto@gtcsoluciones.cl</span>
            <span className="inline-flex items-center gap-3"><Phone className="h-5 w-5 text-skybrand" /> +56 9 0000 0000</span>
            <span className="inline-flex items-center gap-3"><MapPin className="h-5 w-5 text-skybrand" /> Chile</span>
          </div>
        </div>
        <form className="surface grid gap-5 rounded-3xl p-8">
          {["Nombre", "Empresa", "Email", "Telefono"].map((label) => (
            <label key={label} className="grid gap-2 text-sm font-semibold text-navy">
              {label}
              <input className="focus-ring rounded-2xl border border-slate-200 px-4 py-3 font-normal text-slate-700" placeholder={label} />
            </label>
          ))}
          <label className="grid gap-2 text-sm font-semibold text-navy">
            Mensaje
            <textarea className="focus-ring min-h-36 rounded-2xl border border-slate-200 px-4 py-3 font-normal text-slate-700" placeholder="Cuentanos que tipo de capacitacion necesitas" />
          </label>
          <button type="button" className="focus-ring rounded-full bg-corporate px-6 py-3 font-semibold text-white transition hover:bg-navy">
            Enviar solicitud
          </button>
        </form>
      </div>
    </section>
  );
}
