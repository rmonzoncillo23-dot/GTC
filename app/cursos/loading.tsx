export default function CoursesLoading() {
  return (
    <section className="container-page py-16">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mx-auto h-4 w-32 animate-pulse rounded-full bg-skybrand/20" />
        <div className="mx-auto mt-5 h-10 w-2/3 animate-pulse rounded-2xl bg-slate-200" />
        <div className="mx-auto mt-4 h-5 w-full max-w-xl animate-pulse rounded-full bg-slate-100" />
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="surface overflow-hidden rounded-2xl">
            <div className="aspect-[16/9] animate-pulse bg-slate-200" />
            <div className="grid gap-4 p-6">
              <div className="h-4 w-24 animate-pulse rounded-full bg-slate-100" />
              <div className="h-6 w-4/5 animate-pulse rounded-full bg-slate-200" />
              <div className="h-16 animate-pulse rounded-2xl bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
