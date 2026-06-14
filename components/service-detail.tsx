import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { CheckCircle2, ShieldCheck } from 'lucide-react';
import { Link } from '@/navigation';
import { Section } from '@/components/section';
import { FadeIn } from '@/components/fade-in';
import { Badge } from '@/components/ui/badge';
import type { ServiceKey } from '@/components/service-card';

const serviceImages: Record<ServiceKey, { src: string; width: number; height: number }> = {
  structuralDrawings: { src: '/structural-drawing-sample.png', width: 1122, height: 791 },
  shopDrawings:       { src: '/shop-drawing-sample.png',       width: 2132, height: 1503 },
  bimSupport:         { src: '/bim-model.png',                 width: 2132, height: 1503 },
};

type ServiceDetailProps = {
  service: ServiceKey;
  listKind: 'deliverables' | 'software';
  listCount: number;
  showJassBadge?: boolean;
};

export function ServiceDetail({
  service,
  listKind,
  listCount,
  showJassBadge = false,
}: ServiceDetailProps) {
  const t = useTranslations('services');
  const img = serviceImages[service];

  return (
    <>
      {/* Page hero */}
      <section className="relative overflow-hidden bg-hero-gradient pb-24 pt-44 text-white">
        <div className="blueprint-grid absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            {showJassBadge && (
              <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold backdrop-blur">
                <ShieldCheck className="h-4 w-4 text-teal" aria-hidden="true" />
                {t('jassBadge')}
              </span>
            )}
            <h1 className="max-w-3xl font-heading text-4xl font-bold uppercase leading-tight tracking-wide sm:text-5xl">
              {t(`${service}.title`)}
            </h1>
          </FadeIn>
        </div>
      </section>

      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <FadeIn>
            <div>
              <p className="text-lg leading-relaxed text-ink-muted">
                {t(`${service}.description`)}
              </p>

              <h2 className="mt-10 font-heading text-2xl font-bold uppercase tracking-wide text-navy">
                {listKind === 'deliverables' ? t('deliverablesTitle') : t('softwareTitle')}
              </h2>

              {listKind === 'deliverables' ? (
                <ul className="mt-5 space-y-3">
                  {Array.from({ length: listCount }, (_, i) => i + 1).map((i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                      <span className="font-medium text-ink">
                        {t(`${service}.${listKind}.${i}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-5 flex flex-wrap gap-3">
                  {Array.from({ length: listCount }, (_, i) => i + 1).map((i) => (
                    <Badge key={i} className="px-4 py-2 text-sm">
                      {t(`${service}.${listKind}.${i}`)}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </FadeIn>

          {/* Real sample image */}
          <FadeIn delay={0.15}>
            <figure className="overflow-hidden rounded-2xl shadow-card">
              <Image
                src={img.src}
                alt={t(`${service}.imageAlt`)}
                width={img.width}
                height={img.height}
                className="w-full object-cover"
              />
            </figure>
          </FadeIn>
        </div>
      </Section>

      {/* CTA */}
      <Section className="pt-0">
        <FadeIn>
          <div className="rounded-2xl bg-dark-gradient p-10 text-center text-white sm:p-14">
            <h2 className="font-heading text-3xl font-bold uppercase tracking-wide">
              {t('ctaTitle')}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/80">{t('ctaBody')}</p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center rounded-full bg-accent px-9 py-3.5 font-semibold text-white shadow-md transition-all hover:bg-accent-hover"
            >
              <ContactLabel />
            </Link>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}

function ContactLabel() {
  const t = useTranslations('common');
  return <>{t('contactUs')}</>;
}
