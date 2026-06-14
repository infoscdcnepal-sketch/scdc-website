import type { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { Link } from '@/navigation';
import { Section } from '@/components/section';
import { FadeIn } from '@/components/fade-in';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.plans' });
  return buildMetadata({
    locale,
    path: '/service-plan',
    title: t('title'),
    description: t('description'),
  });
}

const planDefs = [
  { key: 'basic', features: 4, highlighted: false },
  { key: 'standard', features: 5, highlighted: true },
  { key: 'premium', features: 5, highlighted: false },
] as const;

export default function ServicePlanPage({
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
          { name: 'Service Plans', path: '/service-plan' },
        ])}
      />
      <PlansContent />
    </>
  );
}

function PlansContent() {
  const t = useTranslations('plans');

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

      <Section>
        <div className="grid items-stretch gap-8 lg:grid-cols-3">
          {planDefs.map((plan, i) => (
            <FadeIn key={plan.key} delay={i * 0.1} className="h-full">
              <article
                className={cn(
                  'relative flex h-full flex-col rounded-2xl bg-white p-8 shadow-card transition-all duration-300 hover:scale-105 hover:shadow-card-hover',
                  plan.highlighted && 'border-2 border-accent lg:-translate-y-3'
                )}
              >
                {plan.highlighted && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                    {t('mostPopular')}
                  </span>
                )}
                <h2 className="font-heading text-2xl font-bold uppercase tracking-wide text-navy">
                  {t(`${plan.key}.name`)}
                </h2>
                <p className="mt-3 text-ink-muted">{t(`${plan.key}.description`)}</p>
                <ul className="mt-7 flex-1 space-y-3">
                  {Array.from({ length: plan.features }, (_, j) => j + 1).map((j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Check
                        className="mt-1 h-5 w-5 shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      <span className="text-sm font-medium text-ink">
                        {t(`${plan.key}.features.${j}`)}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={cn(
                    'mt-8 inline-flex items-center justify-center rounded-full px-7 py-3 font-semibold transition-all',
                    plan.highlighted
                      ? 'bg-accent text-white hover:bg-accent-hover'
                      : 'border-2 border-navy text-navy hover:bg-navy hover:text-white'
                  )}
                >
                  {t('choosePlan')}
                </Link>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="mt-16 rounded-2xl bg-teal-light p-8 text-center">
            <p className="text-lg font-medium text-navy">{t('consultation')}</p>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center rounded-full bg-accent px-8 py-3 font-semibold text-white transition-all hover:bg-accent-hover"
            >
              {t('consultationCta')}
            </Link>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
