"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, CheckCircle2, KeyRound, Loader2, LockKeyhole, LogIn, Mail, UserPlus } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"login" | "register" | "recovery">("login");
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"error" | "success">("error");

  const titleByMode = {
    login: "Acceso usuarios",
    register: "Registro alumno",
    recovery: "Recuperar contraseña"
  };

  const descriptionByMode = {
    login: "Ingresa con una cuenta registrada en Supabase.",
    register: "Crea una cuenta de alumno para acceder al dashboard.",
    recovery: "Ingresa tu correo y enviaremos instrucciones para restablecer tu acceso."
  };

  const loadingTextByMode = {
    login: "Ingresando...",
    register: "Creando cuenta...",
    recovery: "Enviando instrucciones..."
  };

  async function redirectByRole(userId: string) {
    const supabase = createClient();
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .maybeSingle();

    const role = profile?.role === "superadmin" ? "superadmin" : "alumno";
    const destination = role === "superadmin" ? "/admin" : "/dashboard";
    const requestedPath = searchParams.get("next");

    router.push(requestedPath === destination ? requestedPath : destination);
    router.refresh();
  }

  function showMessage(type: "error" | "success", text: string) {
    setMessageType(type);
    setMessage(text);
  }

  async function handleAuth(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) {
      return;
    }

    if (!isSupabaseConfigured()) {
      showMessage("error", "Configura NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local para activar el login.");
      return;
    }

    setLoading(true);
    setMessage(null);

    const supabase = createClient();

    if (mode === "recovery") {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`
      });

      setLoading(false);

      if (error) {
        showMessage("error", error.message);
        return;
      }

      showMessage("success", "Te enviamos un correo con instrucciones para recuperar tu contraseña.");
      return;
    }

    if (mode === "register") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            company,
            phone
          }
        }
      });

      if (error) {
        setLoading(false);
        showMessage("error", error.message);
        return;
      }

      if (!data.session || !data.user) {
        setLoading(false);
        showMessage("success", "Registro creado. Revisa tu correo para confirmar la cuenta antes de iniciar sesion.");
        setMode("login");
        return;
      }

      await redirectByRole(data.user.id);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data.user) {
      setLoading(false);
      showMessage("error", "No pudimos iniciar sesion. Revisa tus credenciales de Supabase.");
      return;
    }

    await redirectByRole(data.user.id);
  }

  return (
    <div className="surface w-full max-w-md rounded-3xl p-8">
      <div className="mb-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-corporate to-skybrand text-white">
          <LockKeyhole className="h-7 w-7" />
        </div>
        <h1 className="mt-5 text-3xl font-black text-navy">{titleByMode[mode]}</h1>
        <p className="mt-2 text-slate-600">{descriptionByMode[mode]}</p>
      </div>
      <div className="mb-6 grid grid-cols-2 rounded-2xl bg-slate-100 p-1">
        <button
          type="button"
          disabled={loading}
          onClick={() => {
            setMode("login");
            setMessage(null);
          }}
          className={`rounded-xl px-4 py-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-60 ${mode === "login" ? "bg-white text-corporate shadow-sm" : "text-slate-500"}`}
        >
          Iniciar sesion
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={() => {
            setMode("register");
            setMessage(null);
          }}
          className={`rounded-xl px-4 py-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-60 ${mode === "register" ? "bg-white text-corporate shadow-sm" : "text-slate-500"}`}
        >
          Registrarse
        </button>
      </div>
      <form onSubmit={handleAuth} className="grid gap-5">
        {mode === "register" ? (
          <>
            <label className="grid gap-2 text-sm font-semibold text-navy">
              Nombre completo
              <input
                required
                disabled={loading}
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className="focus-ring rounded-2xl border border-slate-200 px-4 py-3 font-normal disabled:bg-slate-50"
                placeholder="Nombre Apellido"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-navy">
              Empresa
              <input
                value={company}
                disabled={loading}
                onChange={(event) => setCompany(event.target.value)}
                className="focus-ring rounded-2xl border border-slate-200 px-4 py-3 font-normal disabled:bg-slate-50"
                placeholder="Empresa"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-navy">
              Telefono
              <input
                value={phone}
                disabled={loading}
                onChange={(event) => setPhone(event.target.value)}
                className="focus-ring rounded-2xl border border-slate-200 px-4 py-3 font-normal disabled:bg-slate-50"
                placeholder="+56 9 0000 0000"
              />
            </label>
          </>
        ) : null}
        <label className="grid gap-2 text-sm font-semibold text-navy">
          Email
          <span className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              required
              disabled={loading}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="focus-ring w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 font-normal disabled:bg-slate-50"
              placeholder="usuario@empresa.cl"
            />
          </span>
        </label>
        {mode !== "recovery" ? (
          <label className="grid gap-2 text-sm font-semibold text-navy">
            Password
            <input
              type="password"
              required
              minLength={6}
              disabled={loading}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="focus-ring rounded-2xl border border-slate-200 px-4 py-3 font-normal disabled:bg-slate-50"
              placeholder="********"
            />
          </label>
        ) : null}
        {message ? (
          <p
            className={`flex items-start gap-3 rounded-2xl p-4 text-sm font-semibold ${
              messageType === "success"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {messageType === "success" ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none" />
            ) : (
              <AlertCircle className="mt-0.5 h-4 w-4 flex-none" />
            )}
            {message}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={loading}
          aria-busy={loading}
          className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-corporate px-6 py-3 font-semibold text-white transition hover:bg-navy disabled:cursor-wait disabled:bg-corporate/75"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : mode === "login" ? (
            <LogIn className="h-4 w-4" />
          ) : mode === "register" ? (
            <UserPlus className="h-4 w-4" />
          ) : (
            <KeyRound className="h-4 w-4" />
          )}
          {loading ? loadingTextByMode[mode] : mode === "login" ? "Iniciar sesion" : mode === "register" ? "Crear cuenta" : "Recuperar contraseña"}
        </button>
        {mode === "login" ? (
          <button
            type="button"
            disabled={loading}
            onClick={() => {
              setMode("recovery");
              setMessage(null);
            }}
            className="text-center text-sm font-bold text-corporate transition hover:text-navy disabled:cursor-not-allowed disabled:opacity-60"
          >
            Olvide mi contraseña
          </button>
        ) : (
          <button
            type="button"
            disabled={loading}
            onClick={() => {
              setMode("login");
              setMessage(null);
            }}
            className="text-center text-sm font-bold text-corporate transition hover:text-navy disabled:cursor-not-allowed disabled:opacity-60"
          >
            Volver al inicio de sesion
          </button>
        )}
      </form>
    </div>
  );
}
