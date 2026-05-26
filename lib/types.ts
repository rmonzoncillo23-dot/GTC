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
  category: string;
  modality: string;
  progress: number;
  status: "activo" | "realizado" | "recomendado";
  duration: string;
};

export type Certificate = {
  id: string;
  title: string;
  issuedAt: string;
  status: "disponible" | "pendiente";
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
