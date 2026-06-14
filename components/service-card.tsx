import { useTranslations } from 'next-intl';
import { FileText, Cog, Layers, ArrowRight, type LucideIcon } from 'lucide-react';
import { Link } from '@/navigation';

export type ServiceKey = 'structuralDrawings' | 'shopDrawings' | 'bimSupport';

const config: Record<ServiceKey, { icon: LucideIcon; href: string }> = {
  structuralDrawings: { icon: FileText, href: '/services/structural-drawings' },
  shopDrawings: { icon: Cog, href: '/services/shop-drawings' },
  bimSupport: { icon: Layers, href: '/services/bim-support' },
};

export function ServiceCard({ service }: { service: ServiceKey }) {
  const t = useTranslations('services');
  const tc = useTranslations('common');
  const { icon: Icon, href } = config[service];

  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-2xl bg-white p-8 shadow-card transition-all duration-300 hover:scale-105 hover:shadow-card-hover"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-navy text-white transition-colors group-hover:bg-accent">
        <Icon className="h-7 w-7" aria-hidden="true" />
      </span>
      <h3 className="mt-6 text-xl font-bold text-navy">
        {t(`${service}.title`)}
      </h3>
      <p className="mt-3 flex-1 leading-relaxed text-ink-muted">
        {t(`${service}.description`)}
      </p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
        {tc('learnMore')}
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
