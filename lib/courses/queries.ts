import { unstable_noStore as noStore } from "next/cache";
import { courses as fallbackCourses } from "@/data/site";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import type { AdminCourse } from "@/lib/types";

const courseSelect =
  "id, title, description, category, modality, duration, price, image_url, is_active, views_count, created_at";

function fallbackAdminCourses(): AdminCourse[] {
  return fallbackCourses.map((course, index) => ({
    id: `mock-${index + 1}`,
    title: course.title,
    description: course.description,
    category: course.category,
    modality: course.modality,
    duration: course.duration,
    price: null,
    image_url: null,
    is_active: true,
    views_count: 0,
    created_at: new Date().toISOString()
  }));
}

export async function getPublishedCourses() {
  noStore();

  if (!isSupabaseConfigured()) {
    return fallbackAdminCourses();
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("courses")
    .select(courseSelect)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    return fallbackAdminCourses();
  }

  return (data ?? []) as AdminCourse[];
}

export async function getCourseById(id: string) {
  noStore();

  if (!isSupabaseConfigured()) {
    return fallbackAdminCourses().find((course) => course.id === id) ?? null;
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("courses")
    .select(courseSelect)
    .eq("id", id)
    .eq("is_active", true)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  await supabase.rpc("increment_course_views", { course_id: id });

  return data as AdminCourse;
}
