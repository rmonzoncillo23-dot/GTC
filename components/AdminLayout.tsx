import Link from "next/link";
import type { ReactNode } from "react";
import {
  BarChart3,
  BookOpen,
  Building2,
  FileBadge,
  GraduationCap,
  LayoutDashboard,
  Settings,
  Users
} from "lucide-react";

const adminNav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Usuarios", href: "/admin#usuarios", icon: Users },
  { label: "Cursos", href: "/admin#cursos", icon: GraduationCap },
  { label: "Inscripciones", href: "/admin#inscripciones", icon: BarChart3 },
  { label: "Certificados", href: "/admin#certificados", icon: FileBadge },
  { label: "Contenido gratuito", href: "/admin#contenido", icon: BookOpen },
  { label: "Empresas", href: "/admin#empresas", icon: Building2 },
  { label: "Configuracion", href: "/admin#configuracion", icon: Settings }
];

type AdminLayoutProps = {
  children: ReactNode;
};

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <section className="container-page py-8">
      <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
        <aside className="surface h-fit rounded-3xl p-4 lg:sticky lg:top-24">
          <div className="px-3 py-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-skybrand">Panel GTC</p>
            <h2 className="mt-2 text-xl font-black text-navy">Administracion</h2>
          </div>
          <nav className="grid gap-1">
            {adminNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-slate-600 transition hover:bg-corporate hover:text-white"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <div>{children}</div>
      </div>
    </section>
  );
}
