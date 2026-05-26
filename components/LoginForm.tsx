"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LockKeyhole, LogIn, Mail } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isSupabaseConfigured()) {
      setMessage("Configura NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local para activar el login.");
      return;
    }

    setLoading(true);
    setMessage(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      setMessage("No pudimos iniciar sesion. Revisa tus credenciales de Supabase.");
      return;
    }

    router.push(searchParams.get("next") ?? "/dashboard");
    router.refresh();
  }

  return (
    <div className="surface w-full max-w-md rounded-3xl p-8">
      <div className="mb-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-corporate to-skybrand text-white">
          <LockKeyhole className="h-7 w-7" />
        </div>
        <h1 className="mt-5 text-3xl font-black text-navy">Acceso usuarios</h1>
        <p className="mt-2 text-slate-600">Ingresa con una cuenta registrada en Supabase.</p>
      </div>
      <form onSubmit={handleLogin} className="grid gap-5">
        <label className="grid gap-2 text-sm font-semibold text-navy">
          Email
          <span className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="focus-ring w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 font-normal"
              placeholder="usuario@empresa.cl"
            />
          </span>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-navy">
          Password
          <input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="focus-ring rounded-2xl border border-slate-200 px-4 py-3 font-normal"
            placeholder="********"
          />
        </label>
        {message ? <p className="rounded-2xl bg-red-50 p-3 text-sm text-red-700">{message}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-corporate px-6 py-3 font-semibold text-white transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-70"
        >
          <LogIn className="h-4 w-4" />
          {loading ? "Ingresando..." : "Iniciar sesion"}
        </button>
      </form>
    </div>
  );
}
