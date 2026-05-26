"use client";

import { createClient } from "@/lib/supabase/client";
import type { AdminCourse, CoursePayload } from "@/lib/types";

const courseSelect =
  "id, title, description, category, modality, duration, price, image_url, is_active, views_count, created_at";

export async function getCourses(includeInactive = true) {
  const supabase = createClient();
  let query = supabase.from("courses").select(courseSelect).order("created_at", { ascending: false });

  if (!includeInactive) {
    query = query.eq("is_active", true);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as AdminCourse[];
}

export async function createCourse(payload: CoursePayload) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("courses")
    .insert(payload)
    .select(courseSelect)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as AdminCourse;
}

export async function updateCourse(id: string, payload: CoursePayload) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("courses")
    .update(payload)
    .eq("id", id)
    .select(courseSelect)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as AdminCourse;
}

export async function deleteCourse(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("courses").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function toggleCourseStatus(id: string, isActive: boolean) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("courses")
    .update({ is_active: isActive })
    .eq("id", id)
    .select(courseSelect)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as AdminCourse;
}
