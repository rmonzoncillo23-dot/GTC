export default function DashboardLoading() {
  return (
    <section className="container-page py-8">
      <div className="mb-6 h-14 animate-pulse rounded-3xl bg-slate-100" />
      <div className="grid gap-8">
        <div className="h-48 animate-pulse rounded-3xl bg-slate-200" />
        <div className="grid gap-4 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="surface overflow-hidden rounded-3xl">
              <div className="aspect-[16/8] animate-pulse bg-slate-200" />
              <div className="grid gap-4 p-6">
                <div className="h-5 w-3/4 animate-pulse rounded-full bg-slate-200" />
                <div className="h-4 w-full animate-pulse rounded-full bg-slate-100" />
                <div className="h-2 w-full animate-pulse rounded-full bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
