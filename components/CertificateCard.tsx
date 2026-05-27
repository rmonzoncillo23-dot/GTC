import { Award, Download } from "lucide-react";
import type { Certificate } from "@/lib/types";

type CertificateCardProps = {
  certificate: Certificate;
};

export function CertificateCard({ certificate }: CertificateCardProps) {
  const isAvailable = certificate.status === "disponible";
  const canDownload = isAvailable && Boolean(certificate.certificateUrl);

  return (
    <article className="surface rounded-3xl p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-corporate text-white">
          <Award className="h-6 w-6" />
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${isAvailable ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
          {isAvailable ? "Disponible" : "Pendiente"}
        </span>
      </div>
      <h3 className="mt-5 font-bold text-navy">{certificate.title}</h3>
      <p className="mt-2 text-sm text-slate-500">Emision: {certificate.issuedAt}</p>
      <a
        href={canDownload ? certificate.certificateUrl! : undefined}
        aria-disabled={!canDownload}
        className={`focus-ring mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
          canDownload
            ? "bg-navy text-white hover:bg-corporate"
            : "pointer-events-none bg-slate-200 text-slate-500"
        }`}
      >
        <Download className="h-4 w-4" />
        Descargar
      </a>
    </article>
  );
}
