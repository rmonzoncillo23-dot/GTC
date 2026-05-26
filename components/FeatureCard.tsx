import type { LucideIcon } from "lucide-react";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export function FeatureCard({ title, description, icon: Icon }: FeatureCardProps) {
  return (
    <article className="surface group rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-corporate text-white transition group-hover:bg-skybrand">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-bold text-navy">{title}</h3>
      <p className="mt-3 leading-7 text-slate-600">{description}</p>
    </article>
  );
}
