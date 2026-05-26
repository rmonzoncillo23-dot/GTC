import { CourseFilters } from "@/components/CourseFilters";
import { SectionTitle } from "@/components/SectionTitle";
import { getPublishedCourses } from "@/lib/courses/queries";

export default async function CoursesPage() {
  const courses = await getPublishedCourses();

  return (
    <section className="container-page py-16">
      <SectionTitle
        eyebrow="Cursos"
        title="Programas para equipos tecnicos, lideres y empresas"
        description="Explora cursos listos para adaptar por categoria, modalidad y necesidad organizacional."
      />
      <div className="mt-12">
        <CourseFilters courses={courses} />
      </div>
    </section>
  );
}
