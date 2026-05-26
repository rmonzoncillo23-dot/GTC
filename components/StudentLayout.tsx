import Link from "next/link";
import type { ReactNode } from "react";
import { Award, BookOpenCheck, Clock3, GraduationCap, UserCircle } from "lucide-react";

const studentNav = [
  { label: "Mis cursos", href: "#mis-cursos", icon: BookOpenCheck },
  { label: "Realizados", href: "#realizados", icon: GraduationCap },
  { label: "Certificados", href: "#certificados", icon: Award },
  { label: "Historial", href: "#historial", icon: Clock3 },
  { label: "Perfil", href: "#perfil", icon: UserCircle }
];

type StudentLayoutProps = {
  children: ReactNode;
};

export function StudentLayout({ children }: StudentLayoutProps) {
  return (
    <section className="container-page py-8">
      <div className="mb-6 overflow-x-auto rounded-3xl border border-white/70 bg-white/86 p-2 shadow-soft backdrop-blur">
        <nav className="flex min-w-max gap-2">
          {studentNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-corporate hover:text-white"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      {children}
    </section>
  );
}
