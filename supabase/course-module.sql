-- GTC Soluciones - migracion especifica para modulo CRUD de cursos.
-- Ejecutar en Supabase SQL Editor si el modulo de cursos falla por columnas inexistentes.
--
-- Columnas usadas por el codigo:
-- id, title, description, category, modality, duration, price, image_url,
-- is_active, views_count, created_at.
--
-- El codigo NO usa estas columnas: students_count, level, instructor,
-- certificate_available. No las crees salvo que luego se agreguen al producto.

create extension if not exists "pgcrypto";

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text,
  modality text,
  duration text,
  price numeric(12, 2),
  image_url text,
  is_active boolean not null default true,
  views_count integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.courses
  add column if not exists description text,
  add column if not exists category text,
  add column if not exists modality text,
  add column if not exists duration text,
  add column if not exists price numeric(12, 2),
  add column if not exists image_url text,
  add column if not exists is_active boolean not null default true,
  add column if not exists views_count integer not null default 0,
  add column if not exists created_at timestamptz not null default now();

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'courses_views_count_check'
      and conrelid = 'public.courses'::regclass
  ) then
    alter table public.courses
      add constraint courses_views_count_check check (views_count >= 0);
  end if;
end $$;

create or replace function public.increment_course_views(course_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update public.courses
  set views_count = coalesce(views_count, 0) + 1
  where id = course_id
    and is_active = true;
$$;

-- Requiere la tabla public.profiles del flujo Auth. Se incluye aqui para que
-- las politicas de cursos puedan validar escritura solo de superadmin.
create or replace function public.is_superadmin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'superadmin'
  );
$$;

alter table public.courses enable row level security;

drop policy if exists "courses_public_read" on public.courses;
create policy "courses_public_read"
  on public.courses for select
  using (is_active = true or public.is_superadmin());

drop policy if exists "courses_admin_write" on public.courses;
create policy "courses_admin_write"
  on public.courses for all
  using (public.is_superadmin())
  with check (public.is_superadmin());
