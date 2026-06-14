import type { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Quote } from 'lucide-react';
import { Section, SectionHeading } from '@/components/section';
import { FadeIn } from '@/components/fade-in';
import { StatsBar } from '@/components/stats-bar';
import { ReasonCard } from '@/components/reason-card';
import { JsonLd, breadcrumbSchema, faqSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.whyScdc' });
  return buildMetadata({
    locale,
    path: '/why-scdc',
    title: t('title'),
    description: t('description'),
  });
}

export default async function WhyScdcPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'why.faq' });
  const faqItems = [1, 2, 3, 4].map((i) => ({
    question: t(`${i}.q`),
    answer: t(`${i}.a`),
  }));

  return (
    <>
      <JsonLd
        data={[
          faqSchema(faqItems),
          breadcrumbSchema(locale, [
            { name: 'Home', path: '' },
            { name: 'Why SCDC', path: '/why-scdc' },
          ]),
        ]}
      />
      <WhyContent />
    </>
  );
}

function WhyContent() {
  const t = useTranslations('why');

  return (
    <>
      <section className="bg-hero-gradient pb-20 pt-44 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h1 className="font-heading text-4xl font-bold uppercase tracking-wide sm:text-5xl">
              {t('pageTitle')}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/80">{t('subtitle')}</p>
          </FadeIn>
        </div>
      </section>

      <div className="mx-auto -mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <StatsBar />
      </div>

      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          {([1, 2, 3, 4] as const).map((i) => (
            <FadeIn key={i} delay={(i % 2) * 0.1}>
              <ReasonCard index={i} />
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Client voices */}
      <Section className="bg-white">
        <FadeIn>
          <SectionHeading title={t('voicesTitle')} />
        </FadeIn>
        <div className="grid gap-8 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <figure className="flex h-full flex-col rounded-2xl bg-surface p-8 shadow-card">
                <Quote className="h-8 w-8 text-teal" aria-hidden="true" />
                <blockquote className="mt-4 flex-1 leading-relaxed text-ink">
                  {t(`voices.${i}.quote`)}
                </blockquote>
                <figcaption className="mt-6 text-sm font-semibold text-ink-muted">
                  — {t(`voices.${i}.source`)}
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </Section>
    </>
  );
}
