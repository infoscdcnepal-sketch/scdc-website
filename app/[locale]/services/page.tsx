import type { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/section';
import { FadeIn } from '@/components/fade-in';
import { ServiceCard } from '@/components/service-card';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.services' });
  return buildMetadata({
    locale,
    path: '/services',
    title: t('title'),
    description: t('description'),
  });
}

export default function ServicesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <ServicesContent locale={locale} />;
}

function ServicesContent({ locale }: { locale: string }) {
  const t = useTranslations('services');

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: 'Home', path: '' },
          { name: 'Services', path: '/services' },
        ])}
      />
      <section className="bg-hero-gradient pb-20 pt-44 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h1 className="font-heading text-4xl font-bold uppercase tracking-wide sm:text-5xl">
              {t('indexTitle')}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/80">{t('indexSubtitle')}</p>
          </FadeIn>
        </div>
      </section>
      <Section>
        <div className="grid gap-8 lg:grid-cols-3">
          <FadeIn delay={0}>
            <ServiceCard service="shopDrawings" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <ServiceCard service="structuralDrawings" />
          </FadeIn>
          <FadeIn delay={0.2}>
            <ServiceCard service="bimSupport" />
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
