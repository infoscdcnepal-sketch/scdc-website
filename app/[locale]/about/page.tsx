import type { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import {
  Crosshair,
  Handshake,
  Award,
  Users,
  MapPin,
  Mail,
  Globe,
} from 'lucide-react';
import { Section, SectionHeading } from '@/components/section';
import { FadeIn } from '@/components/fade-in';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.about' });
  return buildMetadata({
    locale,
    path: '/about',
    title: t('title'),
    description: t('description'),
  });
}

const valueIcons = [Crosshair, Handshake, Award, Users] as const;

export default function AboutPage({
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
          { name: 'About', path: '/about' },
        ])}
      />
      <AboutContent />
    </>
  );
}

function AboutContent() {
  const t = useTranslations('about');

  return (
    <>
      <section className="bg-hero-gradient pb-20 pt-44 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h1 className="font-heading text-4xl font-bold uppercase tracking-wide sm:text-5xl">
              {t('title')}
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* Story */}
      <Section>
        <FadeIn>
          <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-ink-muted">
            <p>{t('intro1')}</p>
            <p className="border-l-4 border-teal pl-5 font-medium text-navy">
              {t('intro2')}
            </p>
            <p>{t('intro3')}</p>
          </div>
        </FadeIn>
      </Section>

      {/* Core values */}
      <Section className="bg-white">
        <FadeIn>
          <SectionHeading title={t('valuesTitle')} />
        </FadeIn>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {([1, 2, 3, 4] as const).map((i) => {
            const Icon = valueIcons[i - 1];
            return (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="h-full rounded-2xl bg-surface p-8 shadow-card transition-all duration-300 hover:scale-105 hover:shadow-card-hover">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-navy">
                    {t(`values.${i}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {t(`values.${i}.desc`)}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* Global reach */}
      <Section>
        <FadeIn>
          <SectionHeading title={t('reachTitle')} subtitle={t('reachBody')} />
        </FadeIn>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {([1, 2, 3, 4] as const).map((i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="h-full rounded-2xl bg-white p-8 shadow-card">
                <MapPin className="h-6 w-6 text-teal" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-bold text-navy">
                  {t(`regions.${i}.name`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {t(`regions.${i}.desc`)}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4 rounded-2xl bg-navy p-8 text-white">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 font-medium transition-colors hover:text-teal"
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
              {site.email}
            </a>
            <a
              href={site.url}
              className="inline-flex items-center gap-2 font-medium transition-colors hover:text-teal"
            >
              <Globe className="h-5 w-5" aria-hidden="true" />
              www.scdc.com.np
            </a>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
