import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn('py-24', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function SectionHeading({
  title,
  subtitle,
  light = false,
}: {
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <div className="mb-14 max-w-3xl">
      <h2
        className={cn(
          'text-3xl font-bold uppercase tracking-wide sm:text-4xl',
          light ? 'text-white' : 'text-navy'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn('mt-4 text-lg', light ? 'text-white/80' : 'text-ink-muted')}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
