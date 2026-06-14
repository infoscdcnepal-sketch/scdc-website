import { useTranslations } from 'next-intl';
import { FadeIn } from '@/components/fade-in';

const stats = [
  { value: 'projectsValue', label: 'projects' },
  { value: 'satisfactionValue', label: 'satisfaction' },
  { value: 'structuresValue', label: 'structures' },
  { value: 'responseValue', label: 'response' },
] as const;

export function StatsBar() {
  const t = useTranslations('stats');

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <FadeIn key={stat.label} delay={i * 0.08}>
          <div className="rounded-2xl bg-white p-6 text-center shadow-card">
            <p className="font-heading text-3xl font-bold text-navy sm:text-4xl">
              {t(stat.value)}
            </p>
            <p className="mt-1 text-sm font-medium text-ink-muted">
              {t(stat.label)}
            </p>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}
