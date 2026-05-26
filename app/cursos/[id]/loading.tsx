export default function CourseDetailLoading() {
  return (
    <section className="container-page py-12">
      <div className="mb-8 h-5 w-32 animate-pulse rounded-full bg-slate-200" />
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="aspect-[16/10] animate-pulse rounded-3xl bg-slate-200" />
        <div className="self-center">
          <div className="h-5 w-40 animate-pulse rounded-full bg-skybrand/20" />
          <div className="mt-5 h-12 w-4/5 animate-pulse rounded-2xl bg-slate-200" />
          <div className="mt-6 h-28 animate-pulse rounded-3xl bg-slate-100" />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-28 animate-pulse rounded-2xl bg-slate-100" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
