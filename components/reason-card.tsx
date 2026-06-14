import { useTranslations } from 'next-intl';
import {
  BadgeCheck,
  Wrench,
  DraftingCompass,
  Boxes,
  type LucideIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const icons: Record<number, LucideIcon> = {
  1: BadgeCheck,
  2: Wrench,
  3: DraftingCompass,
  4: Boxes,
};

export function ReasonCard({
  index,
  condensed = false,
}: {
  index: 1 | 2 | 3 | 4;
  condensed?: boolean;
}) {
  const t = useTranslations('why.reasons');
  const Icon = icons[index];

  return (
    <article
      className={cn(
        'group rounded-2xl bg-white p-8 shadow-card transition-all duration-300 hover:scale-105 hover:shadow-card-hover',
        !condensed && 'lg:p-10'
      )}
    >
      <div className="flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-light text-accent">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <span className="font-heading text-4xl font-bold text-navy/10 transition-colors group-hover:text-teal/30">
          {String(index).padStart(2, '0')}
        </span>
      </div>
      <Badge className="mt-5">{t(`${index}.tag`)}</Badge>
      <h3 className="mt-3 text-xl font-bold text-navy">{t(`${index}.title`)}</h3>
      {!condensed && (
        <p className="mt-3 leading-relaxed text-ink-muted">{t(`${index}.body`)}</p>
      )}
    </article>
  );
}
