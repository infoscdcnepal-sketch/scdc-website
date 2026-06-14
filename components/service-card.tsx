import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { FileText, Cog, Layers, ArrowRight, type LucideIcon } from 'lucide-react';
import { Link } from '@/navigation';

export type ServiceKey = 'structuralDrawings' | 'shopDrawings' | 'bimSupport';

const config: Record<ServiceKey, { icon: LucideIcon; href: string; image: string; imageW: number; imageH: number }> = {
  structuralDrawings: {
    icon: FileText,
    href: '/services/structural-drawings',
    image: '/structural-drawing-sample.png',
    imageW: 1122,
    imageH: 791,
  },
  shopDrawings: {
    icon: Cog,
    href: '/services/shop-drawings',
    image: '/shop-drawing-sample.png',
    imageW: 2132,
    imageH: 1503,
  },
  bimSupport: {
    icon: Layers,
    href: '/services/bim-support',
    image: '/bim-model.png',
    imageW: 2132,
    imageH: 1503,
  },
};

export function ServiceCard({ service }: { service: ServiceKey }) {
  const t = useTranslations('services');
  const tc = useTranslations('common');
  const { icon: Icon, href, image, imageW, imageH } = config[service];

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:scale-105 hover:shadow-card-hover"
    >
      {/* Sample image */}
      <div className="aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={t(`${service}.imageAlt`)}
          width={imageW}
          height={imageH}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-8">
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
      </div>
    </Link>
  );
}
