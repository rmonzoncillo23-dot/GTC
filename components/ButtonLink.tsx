import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

export function ButtonLink({ href, children, variant = "primary" }: ButtonLinkProps) {
  const variants = {
    primary: "bg-corporate text-white shadow-lg shadow-corporate/20 hover:bg-navy",
    secondary: "bg-white text-corporate ring-1 ring-slate-200 hover:bg-slate-50",
    ghost: "text-corporate hover:bg-corporate/10"
  };

  return (
    <Link
      href={href}
      className={`focus-ring inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${variants[variant]}`}
    >
      {children}
    </Link>
  );
}
