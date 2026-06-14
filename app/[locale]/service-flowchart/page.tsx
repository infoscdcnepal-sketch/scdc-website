import type { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/section';
import { FadeIn } from '@/components/fade-in';
import { WorkflowStep } from '@/components/workflow-step';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.workflow' });
  return buildMetadata({
    locale,
    path: '/service-flowchart',
    title: t('title'),
    description: t('description'),
  });
}

export default function WorkflowPage({
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
          { name: 'Workflow', path: '/service-flowchart' },
        ])}
      />
      <WorkflowContent />
    </>
  );
}

function WorkflowContent() {
  const t = useTranslations('workflow');

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
        <ol className="mx-auto flex max-w-xl flex-col">
          {Array.from({ length: 9 }, (_, i) => i + 1).map((i) => (
            <WorkflowStep key={i} index={i} isLast={i === 9} />
          ))}
        </ol>
      </Section>
    </>
  );
}
