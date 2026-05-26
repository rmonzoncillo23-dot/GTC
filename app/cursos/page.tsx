import { CourseFilters } from "@/components/CourseFilters";
import { SectionTitle } from "@/components/SectionTitle";

export default function CoursesPage() {
  return (
    <section className="container-page py-16">
      <SectionTitle
        eyebrow="Cursos"
        title="Programas para equipos tecnicos, lideres y empresas"
        description="Explora cursos listos para adaptar por categoria, modalidad y necesidad organizacional."
      />
      <div className="mt-12">
        <CourseFilters />
      </div>
    </section>
  );
}
