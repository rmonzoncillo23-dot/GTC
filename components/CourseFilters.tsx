"use client";

import { useMemo, useState } from "react";
import { CourseCard } from "@/components/CourseCard";
import type { AdminCourse } from "@/lib/types";

const modalities = ["Online", "Clases en vivo", "Corporativo", "Presencial", "On Demand"];

type CourseFiltersProps = {
  courses: AdminCourse[];
};

export function CourseFilters({ courses }: CourseFiltersProps) {
  const categories = [
    "Todos",
    ...Array.from(
      new Set(courses.map((course) => course.category).filter((category): category is string => Boolean(category)))
    )
  ];
  const [active, setActive] = useState("Todos");

  const filteredCourses = useMemo(
    () => (active === "Todos" ? courses : courses.filter((course) => course.category === active)),
    [active]
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActive(category)}
            className={`focus-ring rounded-full px-4 py-2 text-sm font-semibold transition ${
              active === category ? "bg-corporate text-white" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:text-corporate"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="mb-8 flex flex-wrap gap-2">
        {modalities.map((modality) => (
          <span key={modality} className="rounded-full bg-skybrand/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-corporate">
            {modality}
          </span>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </div>
  );
}
