-- SQL exacto para autentificacion, roles y profiles de GTC Soluciones.
-- Es seguro ejecutarlo sobre una base nueva. Si ya ejecutaste el esquema anterior
-- con role como enum, este script convierte profiles.role a text.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  role text not null default 'alumno',
  company text,
  phone text,
  created_at timestamptz not null default now()
);

alter table public.profiles
  alter column role type text using role::text,
  alter column role set default 'alumno',
  alter column role set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'profiles_role_check'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_role_check check (role in ('superadmin', 'alumno'));
  end if;
end $$;

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  description text,
  category text,
  modality text,
  duration text,
  price numeric(12, 2),
  image_url text,
  is_active boolean not null default true,
  views_count integer not null default 0 check (views_count >= 0),
  created_at timestamptz not null default now()
);

alter table public.courses
  add column if not exists price numeric(12, 2),
  add column if not exists image_url text,
  add column if not exists views_count integer not null default 0;

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

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  status text not null default 'inscrito',
  progress integer not null default 0 check (progress >= 0 and progress <= 100),
  enrolled_at timestamptz not null default now(),
  completed_at timestamptz,
  unique (user_id, course_id)
);

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  certificate_url text,
  issued_at timestamptz,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists public.free_content (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  type text not null,
  description text,
  url text,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, role, company, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.email,
    'alumno',
    new.raw_user_meta_data->>'company',
    new.raw_user_meta_data->>'phone'
  )
  on conflict (id) do update set
    full_name = coalesce(public.profiles.full_name, excluded.full_name),
    email = coalesce(public.profiles.email, excluded.email),
    company = coalesce(public.profiles.company, excluded.company),
    phone = coalesce(public.profiles.phone, excluded.phone);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

insert into public.profiles (id, full_name, email, role, created_at)
select
  id,
  coalesce(raw_user_meta_data->>'full_name', raw_user_meta_data->>'name'),
  email,
  'alumno',
  created_at
from auth.users
on conflict (id) do nothing;

alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.enrollments enable row level security;
alter table public.certificates enable row level security;
alter table public.free_content enable row level security;

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

create or replace function public.get_admin_dashboard_stats()
returns table (
  total_users bigint,
  total_courses bigint,
  total_enrollments bigint,
  total_certificates bigint
)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if not public.is_superadmin() then
    raise exception 'Only superadmin users can read admin dashboard stats';
  end if;

  return query
  select
    (select count(*) from public.profiles) as total_users,
    (select count(*) from public.courses) as total_courses,
    (select count(*) from public.enrollments) as total_enrollments,
    (select count(*) from public.certificates) as total_certificates;
end;
$$;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
  on public.profiles for select
  using (id = auth.uid() or public.is_superadmin());

drop policy if exists "profiles_update_own_or_admin" on public.profiles;
create policy "profiles_update_own_or_admin"
  on public.profiles for update
  using (id = auth.uid() or public.is_superadmin())
  with check (id = auth.uid() or public.is_superadmin());

drop policy if exists "courses_public_read" on public.courses;
create policy "courses_public_read"
  on public.courses for select
  using (is_active = true or public.is_superadmin());

drop policy if exists "courses_admin_write" on public.courses;
create policy "courses_admin_write"
  on public.courses for all
  using (public.is_superadmin())
  with check (public.is_superadmin());

drop policy if exists "enrollments_own_or_admin" on public.enrollments;
create policy "enrollments_own_or_admin"
  on public.enrollments for select
  using (user_id = auth.uid() or public.is_superadmin());

drop policy if exists "enrollments_admin_write" on public.enrollments;
create policy "enrollments_admin_write"
  on public.enrollments for all
  using (public.is_superadmin())
  with check (public.is_superadmin());

drop policy if exists "enrollments_insert_own" on public.enrollments;
create policy "enrollments_insert_own"
  on public.enrollments for insert
  with check (user_id = auth.uid());

drop policy if exists "enrollments_update_own" on public.enrollments;
create policy "enrollments_update_own"
  on public.enrollments for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists "certificates_own_or_admin" on public.certificates;
create policy "certificates_own_or_admin"
  on public.certificates for select
  using (user_id = auth.uid() or public.is_superadmin());

drop policy if exists "certificates_admin_write" on public.certificates;
create policy "certificates_admin_write"
  on public.certificates for all
  using (public.is_superadmin())
  with check (public.is_superadmin());

drop policy if exists "free_content_public_read" on public.free_content;
create policy "free_content_public_read"
  on public.free_content for select
  using (is_published = true or public.is_superadmin());

drop policy if exists "free_content_admin_write" on public.free_content;
create policy "free_content_admin_write"
  on public.free_content for all
  using (public.is_superadmin())
  with check (public.is_superadmin());

-- Despues de crear un usuario en Auth, promocionalo a superadmin con:
-- update public.profiles set role = 'superadmin' where email = 'admin@gtcsoluciones.cl';
