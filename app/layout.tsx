import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: {
    default: "GTC Soluciones | Gestión & Talento Confiable",
    template: "%s | GTC Soluciones"
  },
  description:
    "Capacitación corporativa, liderazgo y formación técnica para minería, industria y empresas que buscan resultados confiables."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
