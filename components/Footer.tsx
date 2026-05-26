import Link from "next/link";
import { Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { navItems } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-navy text-white">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="text-2xl font-black">GTC Soluciones</div>
          <p className="mt-2 font-medium text-skybrand">Gestion & Talento Confiable</p>
          <p className="mt-5 max-w-md leading-7 text-white/70">
            Capacitacion corporativa y soluciones de aprendizaje para mineria, industria, liderazgo y desarrollo tecnico.
          </p>
        </div>
        <div>
          <h3 className="font-bold">Mapa del sitio</h3>
          <div className="mt-4 grid gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-white/70 transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-bold">Contacto</h3>
          <div className="mt-4 grid gap-3 text-sm text-white/70">
            <span className="inline-flex items-center gap-2"><Mail className="h-4 w-4 text-skybrand" /> contacto@gtcsoluciones.cl</span>
            <span className="inline-flex items-center gap-2"><Phone className="h-4 w-4 text-skybrand" /> +56 9 0000 0000</span>
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-skybrand" /> Chile</span>
            <span className="inline-flex items-center gap-2"><Linkedin className="h-4 w-4 text-skybrand" /> LinkedIn</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-sm text-white/55">
        GTC Soluciones. Plataforma preparada para capacitaciones online.
      </div>
    </footer>
  );
}
