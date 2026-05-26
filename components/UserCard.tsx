import { Building2, Mail, Phone, ShieldCheck, UserCircle } from "lucide-react";
import type { Profile } from "@/lib/types";

type UserCardProps = {
  profile: Profile;
};

export function UserCard({ profile }: UserCardProps) {
  return (
    <article className="surface rounded-3xl p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-corporate text-white">
          <UserCircle className="h-7 w-7" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-bold text-navy">{profile.full_name ?? "Usuario GTC"}</h3>
            <span className="rounded-full bg-skybrand/12 px-3 py-1 text-xs font-bold text-corporate">
              {profile.role}
            </span>
          </div>
          <div className="mt-4 grid gap-2 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2"><Mail className="h-4 w-4 text-skybrand" /> {profile.email ?? "Sin email"}</span>
            <span className="inline-flex items-center gap-2"><Building2 className="h-4 w-4 text-skybrand" /> {profile.company ?? "Sin empresa"}</span>
            <span className="inline-flex items-center gap-2"><Phone className="h-4 w-4 text-skybrand" /> {profile.phone ?? "Sin telefono"}</span>
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-skybrand" /> Alta: {new Date(profile.created_at).toLocaleDateString("es-CL")}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
