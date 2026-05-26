import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import type { Profile, UserRole } from "@/lib/types";

export async function getCurrentUserProfile() {
  if (!isSupabaseConfigured()) {
    return { user: null, profile: null };
  }

  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return { user: null, profile: null };
  }

  const { data } = await supabase
    .from("profiles")
    .select("id, full_name, email, role, company, phone, created_at")
    .eq("id", user.id)
    .maybeSingle();

  const profile: Profile = data ?? {
    id: user.id,
    full_name: user.user_metadata?.full_name ?? user.user_metadata?.name ?? null,
    email: user.email ?? null,
    role: "alumno",
    company: null,
    phone: null,
    created_at: new Date().toISOString()
  };

  return { user, profile };
}

export async function requireRole(allowedRoles: UserRole[]) {
  const { user, profile } = await getCurrentUserProfile();

  if (!user || !profile) {
    redirect("/login");
  }

  if (!allowedRoles.includes(profile.role)) {
    redirect(profile.role === "superadmin" ? "/admin" : "/dashboard");
  }

  return { user, profile };
}
