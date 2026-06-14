import { useTranslations } from 'next-intl';
import { Clock, Ruler } from 'lucide-react';
import {
  structureBadgeClasses,
  structureLabels,
  type Project,
} from '@/lib/projects';
import { cn } from '@/lib/utils';

export function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations('portfolio');
  const tc = useTranslations('common');

  return (
    <article className="group flex h-full flex-col rounded-2xl bg-white p-7 shadow-card transition-all duration-300 hover:scale-105 hover:shadow-card-hover">
      <div className="flex items-center justify-between">
        <span
          className={cn(
            'rounded-full px-3 py-1 text-xs font-bold',
            structureBadgeClasses[project.structure]
          )}
        >
          {structureLabels[project.structure]}
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
          {t(`projects.${project.id}.type`)}
        </span>
      </div>
      <h3 className="mt-5 text-lg font-bold text-navy">
        {t(`projects.${project.id}.title`)}
      </h3>
      <dl className="mt-4 flex-1 space-y-2 text-sm text-ink-muted">
        <div className="flex items-start gap-2">
          <dt className="sr-only">{t('scopeLabel')}</dt>
          <Ruler className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden="true" />
          <dd>{t(`projects.${project.id}.scope`)}</dd>
        </div>
        <div className="flex items-center gap-2">
          <dt className="sr-only">{t('durationLabel')}</dt>
          <Clock className="h-4 w-4 shrink-0 text-teal" aria-hidden="true" />
          <dd>{tc('months', { count: project.durationMonths })}</dd>
        </div>
      </dl>
    </article>
  );
}
