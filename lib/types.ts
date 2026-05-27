export type UserRole = "superadmin" | "alumno";

export type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  role: UserRole;
  company: string | null;
  phone: string | null;
  created_at: string;
};

export type LearningCourse = {
  id: string;
  title: string;
  description?: string | null;
  category: string | null;
  modality: string | null;
  progress: number;
  status: "activo" | "realizado" | "recomendado" | "inscrito" | "en_progreso" | "finalizado" | "completed";
  duration: string | null;
  image_url?: string | null;
};

export type Certificate = {
  id: string;
  title: string;
  issuedAt: string;
  status: "disponible" | "pendiente";
  certificateUrl?: string | null;
};

export type AdminCourse = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  modality: string | null;
  duration: string | null;
  price: number | null;
  image_url: string | null;
  is_active: boolean;
  views_count: number | null;
  created_at: string;
};

export type CoursePayload = {
  title: string;
  description: string | null;
  category: string | null;
  modality: string | null;
  duration: string | null;
  price: number | null;
  image_url: string | null;
  is_active: boolean;
};
