import type { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/section';
import { FadeIn } from '@/components/fade-in';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';
import { site, company } from '@/lib/site';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.privacy' });
  return buildMetadata({
    locale,
    path: '/privacy',
    title: t('title'),
    description: t('description'),
  });
}

export default function PrivacyPage({
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
          { name: 'Privacy Policy', path: '/privacy' },
        ])}
      />
      <PrivacyContent />
    </>
  );
}

const sectionOrder = [
  'who',
  'collect',
  'use',
  'confidentiality',
  'retention',
  'sharing',
  'rights',
  'security',
  'changes',
] as const;

function PrivacyContent() {
  const t = useTranslations('privacy');
  const tf = useTranslations('footer');
  const tc = useTranslations('contact');

  const values = {
    company: company.legalName,
    address: company.address,
    email: site.email,
  };

  return (
    <>
      <section className="bg-hero-gradient pb-20 pt-44 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h1 className="font-heading text-4xl font-bold uppercase tracking-wide sm:text-5xl">
              {t('title')}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/80">
              {t('subtitle', values)}
            </p>
          </FadeIn>
        </div>
      </section>

      <Section>
        <FadeIn>
          <div className="max-w-3xl space-y-10 text-base leading-relaxed text-ink-muted">
            <p className="text-sm font-semibold uppercase tracking-wider text-teal">
              {t('updated')}
            </p>

            {sectionOrder.map((key) => (
              <section key={key} aria-labelledby={`privacy-${key}`}>
                <h2
                  id={`privacy-${key}`}
                  className="text-xl font-bold text-navy sm:text-2xl"
                >
                  {t(`sections.${key}.title`)}
                </h2>

                {key === 'collect' ? (
                  <div className="mt-3 space-y-3">
                    <p>{t('sections.collect.intro')}</p>
                    <ul className="list-disc space-y-2 pl-6">
                      {(t.raw('sections.collect.items') as string[]).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <p>{t('sections.collect.note')}</p>
                  </div>
                ) : (
                  <p className="mt-3">{t(`sections.${key}.body`, values)}</p>
                )}
              </section>
            ))}

            <section aria-labelledby="privacy-contact">
              <h2
                id="privacy-contact"
                className="text-xl font-bold text-navy sm:text-2xl"
              >
                {t('sections.contact.title')}
              </h2>
              <address className="mt-3 space-y-1 not-italic">
                <p className="font-semibold text-navy">{company.legalName}</p>
                <p>{company.address}</p>
                <p>
                  {tc('phoneLabel')}:{' '}
                  <a
                    href={company.phoneHref}
                    className="text-accent underline-offset-2 hover:underline"
                  >
                    {company.phone}
                  </a>
                </p>
                <p>
                  {tc('emailLabel')}:{' '}
                  <a
                    href={`mailto:${site.email}`}
                    className="text-accent underline-offset-2 hover:underline"
                  >
                    {site.email}
                  </a>
                </p>
                <p>{tf('registration')}</p>
                <p>{tf('pan', { pan: company.pan })}</p>
              </address>
            </section>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
