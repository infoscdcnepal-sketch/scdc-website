import type { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/section';
import { FadeIn } from '@/components/fade-in';
import { PortfolioGrid } from '@/components/portfolio-grid';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.portfolio' });
  return buildMetadata({
    locale,
    path: '/portfolio',
    title: t('title'),
    description: t('description'),
  });
}

export default function PortfolioPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: 'Home', path: '' },
          { name: 'Portfolio', path: '/portfolio' },
        ])}
      />
      <PortfolioContent />
    </>
  );
}

function PortfolioContent() {
  const t = useTranslations('portfolio');
  const stats = [
    'statsProjects',
    'statsStructures',
    'statsIndustries',
    'statsSatisfaction',
  ] as const;

  return (
    <>
      <section className="bg-hero-gradient pb-20 pt-44 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h1 className="font-heading text-4xl font-bold uppercase tracking-wide sm:text-5xl">
              {t('title')}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/80">{t('subtitle')}</p>
          </FadeIn>
        </div>
      </section>

      <div className="mx-auto -mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {stats.map((key, i) => (
            <FadeIn key={key} delay={i * 0.08}>
              <div className="rounded-2xl bg-white p-6 text-center shadow-card">
                <p className="font-heading text-xl font-bold text-navy sm:text-2xl">
                  {t(key)}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <Section>
        <PortfolioGrid />
      </Section>
    </>
  );
}
