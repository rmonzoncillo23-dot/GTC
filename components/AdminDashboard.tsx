"use client";

import {
  AlertCircle,
  Award,
  BarChart3,
  BookOpen,
  Building2,
  CheckCircle2,
  Edit3,
  Eye,
  FileBadge,
  GraduationCap,
  Loader2,
  Plus,
  Power,
  Search,
  Settings,
  Trash2,
  Users,
  X
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  createCourse,
  deleteCourse as deleteCourseAction,
  getCourses,
  toggleCourseStatus,
  updateCourse
} from "@/lib/courses/actions";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/client";
import type { AdminCourse, CoursePayload, Profile } from "@/lib/types";

type CourseFormState = {
  title: string;
  description: string;
  category: string;
  modality: string;
  duration: string;
  price: string;
  image_url: string;
  is_active: boolean;
};

const emptyCourseForm: CourseFormState = {
  title: "",
  description: "",
  category: "",
  modality: "Online",
  duration: "",
  price: "",
  image_url: "",
  is_active: true
};

const modalityOptions = ["Online", "Clases en vivo", "Corporativo", "Presencial", "On Demand"];

export function AdminDashboard() {
  const [courses, setCourses] = useState<AdminCourse[]>([]);
  const [users, setUsers] = useState<Profile[]>([]);
  const [stats, setStats] = useState({
    users: 0,
    courses: 0,
    enrollments: 0,
    certificates: 0
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<AdminCourse | null>(null);
  const [editingCourse, setEditingCourse] = useState<AdminCourse | null>(null);
  const [form, setForm] = useState<CourseFormState>(emptyCourseForm);
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const filteredCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return courses;
    }

    return courses.filter((course) =>
      [course.title, course.category, course.modality]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(normalizedQuery))
    );
  }, [courses, query]);

  const topCourses = useMemo(
    () => [...courses].sort((a, b) => (b.views_count ?? 0) - (a.views_count ?? 0)).slice(0, 5),
    [courses]
  );

  useEffect(() => {
    loadAdminData();
  }, []);

  async function loadAdminData() {
    if (!isSupabaseConfigured()) {
      setMessage("Configura Supabase para cargar el panel admin.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setMessage(null);

    const supabase = createClient();

    try {
      const getDashboardStats = async () => {
        const { data, error } = await supabase.rpc("get_admin_dashboard_stats");

        if (!error && data) {
          const row = Array.isArray(data) ? data[0] : data;

          if (row) {
            return {
              users: Number(row.total_users ?? 0),
              courses: Number(row.total_courses ?? 0),
              enrollments: Number(row.total_enrollments ?? 0),
              certificates: Number(row.total_certificates ?? 0)
            };
          }
        }

        const getExactCount = async (table: "profiles" | "courses" | "enrollments" | "certificates") => {
          const { count, error: countError } = await supabase
            .from(table)
            .select("id", { count: "exact", head: true });

          if (countError) {
            throw new Error(`${table}: ${countError.message}`);
          }

          return count ?? 0;
        };

        const [users, courses, enrollments, certificates] = await Promise.all([
          getExactCount("profiles"),
          getExactCount("courses"),
          getExactCount("enrollments"),
          getExactCount("certificates")
        ]);

        return { users, courses, enrollments, certificates };
      };

      const [coursesData, usersResponse, dashboardStats] =
        await Promise.all([
          getCourses(true),
          supabase
            .from("profiles")
            .select("id, full_name, email, role, company, phone, created_at")
            .order("created_at", { ascending: false })
            .limit(5),
          getDashboardStats()
        ]);

      setCourses(coursesData);

      if (usersResponse.error) {
        throw new Error(`profiles: ${usersResponse.error.message}`);
      }

      setUsers((usersResponse.data ?? []) as Profile[]);

      setStats(dashboardStats);
    } catch (error) {
      const text = error instanceof Error ? error.message : "No se pudo cargar el panel admin.";
      setMessage(text);
      showToast("error", text);
    } finally {
      setLoading(false);
    }
  }

  function openCreateModal() {
    setEditingCourse(null);
    setForm(emptyCourseForm);
    setModalOpen(true);
    setMessage(null);
  }

  function openEditModal(course: AdminCourse) {
    setEditingCourse(course);
    setForm({
      title: course.title,
      description: course.description ?? "",
      category: course.category ?? "",
      modality: course.modality ?? "Online",
      duration: course.duration ?? "",
      price: course.price?.toString() ?? "",
      image_url: course.image_url ?? "",
      is_active: course.is_active
    });
    setModalOpen(true);
    setMessage(null);
  }

  function showToast(type: "success" | "error", text: string) {
    setToast({ type, text });
    window.setTimeout(() => setToast(null), 3600);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage(null);

    const payload: CoursePayload = {
      title: form.title.trim(),
      description: form.description.trim() || null,
      category: form.category.trim() || null,
      modality: form.modality,
      duration: form.duration.trim() || null,
      price: form.price ? Number(form.price) : null,
      image_url: form.image_url.trim() || null,
      is_active: form.is_active
    };

    try {
      if (editingCourse) {
        await updateCourse(editingCourse.id, payload);
        showToast("success", "Curso actualizado correctamente.");
      } else {
        await createCourse(payload);
        showToast("success", "Curso creado correctamente.");
      }

      setModalOpen(false);
      await loadAdminData();
    } catch (error) {
      const text = error instanceof Error ? error.message : "No se pudo guardar el curso.";
      setMessage(text);
      showToast("error", text);
    } finally {
      setSaving(false);
    }
  }

  async function toggleCourse(course: AdminCourse) {
    try {
      const updatedCourse = await toggleCourseStatus(course.id, !course.is_active);
      setCourses((current) =>
        current.map((item) => (item.id === course.id ? updatedCourse : item))
      );
      showToast("success", updatedCourse.is_active ? "Curso activado." : "Curso desactivado.");
    } catch (error) {
      const text = error instanceof Error ? error.message : "No se pudo cambiar el estado.";
      setMessage(text);
      showToast("error", text);
    }
  }

  async function confirmDeleteCourse() {
    if (!courseToDelete) {
      return;
    }

    try {
      await deleteCourseAction(courseToDelete.id);
      setCourses((current) => current.filter((item) => item.id !== courseToDelete.id));
      showToast("success", "Curso eliminado correctamente.");
      setCourseToDelete(null);
    } catch (error) {
      const text = error instanceof Error ? error.message : "No se pudo eliminar el curso.";
      setMessage(text);
      showToast("error", text);
    }
  }

  return (
    <div className="grid gap-8">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-navy via-corporate to-skybrand p-8 text-white shadow-soft">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">Dashboard general</p>
            <h1 className="mt-3 text-3xl font-black sm:text-4xl">Centro de administracion GTC</h1>
            <p className="mt-3 max-w-3xl leading-7 text-white/78">
              Administra cursos, usuarios, inscripciones y certificados desde una interfaz conectada a Supabase.
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-corporate shadow-lg transition hover:bg-slate-50"
          >
            <Plus className="h-4 w-4" />
            Crear curso
          </button>
        </div>
      </div>

      {message ? (
        <div className="flex items-start gap-3 rounded-3xl border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-700">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-none" />
          {message}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Users} label="Total usuarios" value={stats.users} />
        <StatCard icon={GraduationCap} label="Total cursos" value={stats.courses} />
        <StatCard icon={BarChart3} label="Total inscripciones" value={stats.enrollments} />
        <StatCard icon={FileBadge} label="Certificados emitidos" value={stats.certificates} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <section id="usuarios" className="surface rounded-3xl p-6">
          <SectionHeader icon={Users} title="Ultimos usuarios registrados" />
          <div className="mt-5 grid gap-3">
            {users.length ? users.map((user) => (
              <div key={user.id} className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div>
                  <p className="font-bold text-navy">{user.full_name ?? "Usuario sin nombre"}</p>
                  <p className="mt-1 text-sm text-slate-500">{user.email}</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-corporate ring-1 ring-slate-200">
                  {user.role}
                </span>
              </div>
            )) : <EmptyState text="Aun no hay usuarios registrados." />}
          </div>
        </section>

        <section className="surface rounded-3xl p-6">
          <SectionHeader icon={Eye} title="Cursos mas vistos" />
          <div className="mt-5 grid gap-3">
            {topCourses.length ? topCourses.map((course) => (
              <div key={course.id} className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div>
                  <p className="font-bold text-navy">{course.title}</p>
                  <p className="mt-1 text-sm text-slate-500">{course.category ?? "Sin categoria"}</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-skybrand/12 px-3 py-1 text-xs font-bold text-corporate">
                  <Eye className="h-3.5 w-3.5" />
                  {course.views_count ?? 0}
                </span>
              </div>
            )) : <EmptyState text="Aun no hay cursos cargados." />}
          </div>
        </section>
      </div>

      <section id="cursos" className="surface overflow-hidden rounded-3xl">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-6 lg:flex-row lg:items-center lg:justify-between">
          <SectionHeader icon={GraduationCap} title="Cursos" />
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar curso"
                className="focus-ring w-full rounded-full border border-slate-200 py-3 pl-11 pr-4 text-sm sm:w-72"
              />
            </label>
            <button
              onClick={openCreateModal}
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-corporate px-5 py-3 text-sm font-bold text-white transition hover:bg-navy"
            >
              <Plus className="h-4 w-4" />
              Crear curso
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid min-h-64 place-items-center text-slate-500">
            <Loader2 className="mb-3 h-8 w-8 animate-spin text-skybrand" />
            Cargando informacion...
          </div>
        ) : (
          <CoursesTable
            courses={filteredCourses}
            onEdit={openEditModal}
            onDelete={setCourseToDelete}
            onToggle={toggleCourse}
          />
        )}
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminModule id="inscripciones" icon={BarChart3} title="Inscripciones" text="Gestion de usuarios inscritos, estado, avance y fechas de finalizacion." />
        <AdminModule id="certificados" icon={Award} title="Certificados" text="Emision, revision y descarga de certificados asociados a cursos." />
        <AdminModule id="contenido" icon={BookOpen} title="Contenido gratuito" text="Capsulas, documentos, videos, webinars y material abierto." />
        <AdminModule id="empresas" icon={Building2} title="Empresas" text="Clientes corporativos, contactos, convenios y programas asignados." />
        <AdminModule id="configuracion" icon={Settings} title="Configuracion" text="Parametros generales, roles, permisos y apariencia de plataforma." />
      </div>

      {modalOpen ? (
        <CourseModal
          editingCourse={editingCourse}
          form={form}
          saving={saving}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
          onChange={setForm}
        />
      ) : null}

      {courseToDelete ? (
        <DeleteConfirmModal
          course={courseToDelete}
          onCancel={() => setCourseToDelete(null)}
          onConfirm={confirmDeleteCourse}
        />
      ) : null}

      {toast ? <Toast type={toast.type} text={toast.text} /> : null}
    </div>
  );
}

type StatCardProps = {
  icon: typeof Users;
  label: string;
  value: number;
};

function StatCard({ icon: Icon, label, value }: StatCardProps) {
  return (
    <article className="surface rounded-3xl p-6 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-black text-navy">{value}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-skybrand/12 text-corporate">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </article>
  );
}

type CoursesTableProps = {
  courses: AdminCourse[];
  onEdit: (course: AdminCourse) => void;
  onDelete: (course: AdminCourse) => void;
  onToggle: (course: AdminCourse) => void;
};

function CoursesTable({ courses, onEdit, onDelete, onToggle }: CoursesTableProps) {
  if (!courses.length) {
    return <div className="p-6"><EmptyState text="No hay cursos para mostrar." /></div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[920px] text-left text-sm">
        <thead className="bg-slate-50 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
          <tr>
            <th className="px-6 py-4">Curso</th>
            <th className="px-6 py-4">Categoria</th>
            <th className="px-6 py-4">Modalidad</th>
            <th className="px-6 py-4">Duracion</th>
            <th className="px-6 py-4">Precio</th>
            <th className="px-6 py-4">Estado</th>
            <th className="px-6 py-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {courses.map((course) => (
            <tr key={course.id} className="bg-white transition hover:bg-skybrand/5">
              <td className="px-6 py-5">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-16 overflow-hidden rounded-2xl bg-gradient-to-br from-corporate to-skybrand">
                    {course.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={course.image_url} alt="" className="h-full w-full object-cover" />
                    ) : null}
                  </div>
                  <div>
                    <p className="font-bold text-navy">{course.title}</p>
                    <p className="mt-1 line-clamp-1 max-w-sm text-xs text-slate-500">
                      {course.description ?? "Sin descripcion"}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-5 text-slate-600">{course.category ?? "-"}</td>
              <td className="px-6 py-5 text-slate-600">{course.modality ?? "-"}</td>
              <td className="px-6 py-5 text-slate-600">{course.duration ?? "-"}</td>
              <td className="px-6 py-5 font-semibold text-navy">
                {course.price ? new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(course.price) : "Sin precio"}
              </td>
              <td className="px-6 py-5">
                <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${course.is_active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {course.is_active ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td className="px-6 py-5">
                <div className="flex justify-end gap-2">
                  <IconButton label="Editar" onClick={() => onEdit(course)} icon={Edit3} />
                  <IconButton label={course.is_active ? "Desactivar" : "Activar"} onClick={() => onToggle(course)} icon={Power} />
                  <IconButton label="Eliminar" onClick={() => onDelete(course)} icon={Trash2} danger />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type IconButtonProps = {
  label: string;
  onClick: () => void;
  icon: typeof Edit3;
  danger?: boolean;
};

function IconButton({ label, onClick, icon: Icon, danger }: IconButtonProps) {
  return (
    <button
      type="button"
      title={label}
      onClick={onClick}
      className={`focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full transition ${
        danger ? "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white" : "bg-slate-100 text-slate-600 hover:bg-corporate hover:text-white"
      }`}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

type CourseModalProps = {
  editingCourse: AdminCourse | null;
  form: CourseFormState;
  saving: boolean;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (form: CourseFormState) => void;
};

function CourseModal({ editingCourse, form, saving, onClose, onSubmit, onChange }: CourseModalProps) {
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-navy/55 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 p-6 backdrop-blur">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-skybrand">Cursos</p>
            <h2 className="mt-1 text-2xl font-black text-navy">
              {editingCourse ? "Editar curso" : "Crear curso"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-navy hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="grid gap-5 p-6">
          <label className="grid gap-2 text-sm font-bold text-navy">
            Titulo
            <input
              required
              value={form.title}
              onChange={(event) => onChange({ ...form, title: event.target.value })}
              className="focus-ring rounded-2xl border border-slate-200 px-4 py-3 font-normal text-slate-700"
              placeholder="Nombre del curso"
            />
          </label>

          <label className="grid gap-2 text-sm font-bold text-navy">
            Descripcion
            <textarea
              value={form.description}
              onChange={(event) => onChange({ ...form, description: event.target.value })}
              className="focus-ring min-h-28 rounded-2xl border border-slate-200 px-4 py-3 font-normal text-slate-700"
              placeholder="Resumen comercial y academico"
            />
          </label>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-navy">
              Categoria
              <input
                value={form.category}
                onChange={(event) => onChange({ ...form, category: event.target.value })}
                className="focus-ring rounded-2xl border border-slate-200 px-4 py-3 font-normal text-slate-700"
                placeholder="Liderazgo, Mineria, Seguridad"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-navy">
              Modalidad
              <select
                value={form.modality}
                onChange={(event) => onChange({ ...form, modality: event.target.value })}
                className="focus-ring rounded-2xl border border-slate-200 px-4 py-3 font-normal text-slate-700"
              >
                {modalityOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-bold text-navy">
              Duracion
              <input
                value={form.duration}
                onChange={(event) => onChange({ ...form, duration: event.target.value })}
                className="focus-ring rounded-2xl border border-slate-200 px-4 py-3 font-normal text-slate-700"
                placeholder="16 horas"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-navy">
              Precio
              <input
                type="number"
                min="0"
                value={form.price}
                onChange={(event) => onChange({ ...form, price: event.target.value })}
                className="focus-ring rounded-2xl border border-slate-200 px-4 py-3 font-normal text-slate-700"
                placeholder="0"
              />
            </label>
          </div>

          <label className="grid gap-2 text-sm font-bold text-navy">
            Imagen URL
            <input
              type="url"
              value={form.image_url}
              onChange={(event) => onChange({ ...form, image_url: event.target.value })}
              className="focus-ring rounded-2xl border border-slate-200 px-4 py-3 font-normal text-slate-700"
              placeholder="https://..."
            />
          </label>

          <label className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-bold text-navy">
            Curso activo
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(event) => onChange({ ...form, is_active: event.target.checked })}
              className="h-5 w-5 rounded border-slate-300 text-corporate focus:ring-skybrand"
            />
          </label>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="focus-ring rounded-full border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-corporate px-5 py-3 text-sm font-bold text-white transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-70"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
              {editingCourse ? "Guardar cambios" : "Crear curso"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

type DeleteConfirmModalProps = {
  course: AdminCourse;
  onCancel: () => void;
  onConfirm: () => void;
};

function DeleteConfirmModal({ course, onCancel, onConfirm }: DeleteConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-[75] grid place-items-center bg-navy/55 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
          <Trash2 className="h-6 w-6" />
        </div>
        <h2 className="mt-5 text-2xl font-black text-navy">Eliminar curso</h2>
        <p className="mt-3 leading-7 text-slate-600">
          Esta accion eliminara <span className="font-bold text-navy">{course.title}</span>. No se puede deshacer desde el panel.
        </p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="focus-ring rounded-full border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="focus-ring rounded-full bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

function Toast({ type, text }: { type: "success" | "error"; text: string }) {
  return (
    <div className="fixed bottom-5 right-5 z-[90] max-w-sm animate-[fadeIn_180ms_ease-out] rounded-3xl border border-white/80 bg-white p-4 shadow-2xl">
      <div className="flex items-start gap-3">
        <div className={`flex h-9 w-9 flex-none items-center justify-center rounded-2xl ${type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
          {type === "success" ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
        </div>
        <p className="pt-1 text-sm font-semibold leading-6 text-slate-700">{text}</p>
      </div>
    </div>
  );
}

type SectionHeaderProps = {
  icon: typeof Users;
  title: string;
};

function SectionHeader({ icon: Icon, title }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-corporate text-white">
        <Icon className="h-5 w-5" />
      </div>
      <h2 className="text-2xl font-black text-navy">{title}</h2>
    </div>
  );
}

type AdminModuleProps = {
  id: string;
  icon: typeof Users;
  title: string;
  text: string;
};

function AdminModule({ id, icon: Icon, title, text }: AdminModuleProps) {
  return (
    <article id={id} className="surface rounded-3xl p-6 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <Icon className="h-7 w-7 text-skybrand" />
      <h3 className="mt-4 text-lg font-bold text-navy">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
    </article>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm font-semibold text-slate-500">
      {text}
    </div>
  );
}
