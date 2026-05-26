"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems } from "@/data/site";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/client";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dashboardHref, setDashboardHref] = useState("/dashboard");
  const [dashboardLabel, setDashboardLabel] = useState("Dashboard");

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      return;
    }

    const supabase = createClient();

    async function loadSessionRole() {
      const { data } = await supabase.auth.getUser();
      setIsLoggedIn(Boolean(data.user));
      setDashboardHref("/dashboard");
      setDashboardLabel("Dashboard");

      if (data.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .maybeSingle();

        if (profile?.role === "superadmin") {
          setDashboardHref("/admin");
          setDashboardLabel("Admin");
        }
      }
    }

    loadSessionRole();
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      loadSessionRole();
      setIsLoggedIn(Boolean(session?.user));
      router.refresh();
    });

    return () => subscription.unsubscribe();
  }, [router]);

  async function handleSignOut() {
    if (!isSupabaseConfigured()) {
      return;
    }

    const supabase = createClient();
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setDashboardHref("/dashboard");
    setDashboardLabel("Dashboard");
    router.push("/");
    router.refresh();
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/70 bg-white/88 backdrop-blur-xl">
      <nav className="container-page flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-corporate to-skybrand text-base font-black text-white shadow-lg shadow-corporate/25">
            GTC
          </span>
          <span>
            <span className="block text-base font-black leading-5 text-navy">GTC Soluciones</span>
            <span className="block text-xs font-medium text-slate-500">Gestion & Talento Confiable</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                pathname === item.href ? "bg-corporate text-white" : "text-slate-600 hover:bg-corporate/10 hover:text-corporate"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {isLoggedIn ? (
            <>
              <Link href={dashboardHref} className="rounded-full px-4 py-2 text-sm font-semibold text-corporate hover:bg-corporate/10">
                {dashboardLabel}
              </Link>
              <button onClick={handleSignOut} className="focus-ring rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-corporate">
                Salir
              </button>
            </>
          ) : (
            <Link href="/login" className="focus-ring rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-corporate">
              Login
            </Link>
          )}
        </div>

        <button
          aria-label="Abrir menu"
          onClick={() => setOpen((value) => !value)}
          className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-navy lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-slate-100 bg-white lg:hidden">
          <div className="container-page flex flex-col gap-2 py-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                {item.label}
              </Link>
            ))}
            <Link href={isLoggedIn ? dashboardHref : "/login"} onClick={() => setOpen(false)} className="rounded-xl bg-navy px-4 py-3 text-sm font-semibold text-white">
              {isLoggedIn ? dashboardLabel : "Login"}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
