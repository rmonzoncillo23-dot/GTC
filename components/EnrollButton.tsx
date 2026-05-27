"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2, Loader2, UserPlus } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/client";

type EnrollButtonProps = {
  courseId: string;
};

export function EnrollButton({ courseId }: EnrollButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleEnroll() {
    if (loading) {
      return;
    }

    if (!isSupabaseConfigured()) {
      setMessage({ type: "error", text: "Configura Supabase para activar inscripciones." });
      return;
    }

    setLoading(true);
    setMessage(null);

    const supabase = createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      router.push(`/login?next=/cursos/${courseId}`);
      return;
    }

    const { data: existingEnrollment, error: lookupError } = await supabase
      .from("enrollments")
      .select("id")
      .eq("user_id", user.id)
      .eq("course_id", courseId)
      .maybeSingle();

    if (lookupError) {
      setLoading(false);
      setMessage({ type: "error", text: lookupError.message });
      return;
    }

    if (existingEnrollment) {
      setLoading(false);
      setMessage({ type: "success", text: "Ya estás inscrito en este curso" });
      return;
    }

    const { error } = await supabase.from("enrollments").insert({
      user_id: user.id,
      course_id: courseId,
      status: "inscrito",
      progress: 0
    });

    setLoading(false);

    if (error) {
      if (error.code === "23505") {
        setMessage({ type: "success", text: "Ya estás inscrito en este curso" });
        return;
      }

      setMessage({ type: "error", text: error.message });
      return;
    }

    setMessage({ type: "success", text: "Inscripcion registrada. Ya puedes verla en tu dashboard." });
  }

  return (
    <div className="grid gap-3">
      <button
        type="button"
        onClick={handleEnroll}
        disabled={loading}
        className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-corporate px-6 py-3 font-bold text-white transition hover:bg-navy disabled:cursor-wait disabled:bg-corporate/75"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
        {loading ? "Inscribiendo..." : "Inscribirse"}
      </button>
      {message ? (
        <p className={`flex items-start gap-2 rounded-2xl p-3 text-sm font-semibold ${message.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
          {message.type === "success" ? <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none" /> : <AlertCircle className="mt-0.5 h-4 w-4 flex-none" />}
          {message.text}
        </p>
      ) : null}
    </div>
  );
}
