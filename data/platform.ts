import type { Certificate, LearningCourse, Profile } from "@/lib/types";

export const mockProfiles: Profile[] = [
  {
    id: "usr-001",
    full_name: "Camila Torres",
    email: "camila@empresa.cl",
    role: "alumno",
    company: "Minera Norte",
    phone: "+56 9 1111 1111",
    created_at: "2026-01-12T09:00:00.000Z"
  },
  {
    id: "usr-002",
    full_name: "Rodrigo Salinas",
    email: "rodrigo@empresa.cl",
    role: "alumno",
    company: "Industrial Pacifico",
    phone: "+56 9 2222 2222",
    created_at: "2026-02-03T09:00:00.000Z"
  },
  {
    id: "usr-003",
    full_name: "Admin GTC",
    email: "admin@gtcsoluciones.cl",
    role: "superadmin",
    company: "GTC Soluciones",
    phone: "+56 9 3333 3333",
    created_at: "2026-01-01T09:00:00.000Z"
  }
];

export const mockLearningCourses: LearningCourse[] = [
  {
    id: "course-001",
    title: "Liderazgo Confiable para Supervisores",
    category: "Liderazgo",
    modality: "Clases en vivo",
    progress: 72,
    status: "activo",
    duration: "16 horas"
  },
  {
    id: "course-002",
    title: "Gestion de Riesgos y Seguridad Conductual",
    category: "Seguridad",
    modality: "Corporativo",
    progress: 35,
    status: "activo",
    duration: "20 horas"
  },
  {
    id: "course-003",
    title: "Induccion Tecnica para Operaciones Mineras",
    category: "Mineria",
    modality: "Online",
    progress: 100,
    status: "realizado",
    duration: "12 horas"
  },
  {
    id: "course-004",
    title: "Formacion de Instructores Internos",
    category: "Educacion",
    modality: "On Demand",
    progress: 0,
    status: "recomendado",
    duration: "24 horas"
  }
];

export const mockCertificates: Certificate[] = [
  {
    id: "cert-001",
    title: "Induccion Tecnica para Operaciones Mineras",
    issuedAt: "2026-03-20",
    status: "disponible"
  },
  {
    id: "cert-002",
    title: "Liderazgo Confiable para Supervisores",
    issuedAt: "Proximamente",
    status: "pendiente"
  }
];

export const adminStats = [
  { label: "Total usuarios", value: "128" },
  { label: "Cursos", value: "24" },
  { label: "Inscripciones", value: "316" },
  { label: "Certificados", value: "89" }
];
