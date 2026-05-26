import { Suspense } from "react";
import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <section className="container-page grid min-h-[calc(100vh-10rem)] place-items-center py-16">
      <Suspense fallback={<div className="surface w-full max-w-md rounded-3xl p-8 text-center text-slate-600">Cargando acceso...</div>}>
        <LoginForm />
      </Suspense>
    </section>
  );
}
