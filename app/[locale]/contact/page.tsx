import type { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Mail, Globe, MapPin, Clock } from 'lucide-react';
import { Section } from '@/components/section';
import { FadeIn } from '@/components/fade-in';
import { ContactForm } from '@/components/contact-form';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.contact' });
  return buildMetadata({
    locale,
    path: '/contact',
    title: t('title'),
    description: t('description'),
  });
}

export default function ContactPage({
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
          { name: 'Contact', path: '/contact' },
        ])}
      />
      <ContactContent />
    </>
  );
}

function ContactContent() {
  const t = useTranslations('contact');

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
        <div className="grid items-start gap-12 lg:grid-cols-3">
          {/* Form */}
          <FadeIn className="lg:col-span-2">
            <div className="rounded-2xl bg-white p-8 shadow-card sm:p-10">
              <ContactForm />
            </div>
          </FadeIn>

          {/* Details card */}
          <FadeIn delay={0.15}>
            <aside className="rounded-2xl bg-navy p-8 text-white shadow-card">
              <h2 className="font-heading text-2xl font-bold uppercase tracking-wide">
                {t('detailsTitle')}
              </h2>
              <ul className="mt-7 space-y-5 text-sm">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-teal" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-white/90">{t('emailLabel')}</p>
                    <a
                      href={`mailto:${site.email}`}
                      className="text-white/70 transition-colors hover:text-teal"
                    >
                      {site.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Globe className="mt-0.5 h-5 w-5 shrink-0 text-teal" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-white/90">{t('websiteLabel')}</p>
                    <a
                      href={site.url}
                      className="text-white/70 transition-colors hover:text-teal"
                    >
                      www.scdc.com.np
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-teal" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-white/90">{t('locationLabel')}</p>
                    <p className="text-white/70">{t('locationValue')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 rounded-xl bg-white/10 p-4">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-teal" aria-hidden="true" />
                  <p className="text-white/85">{t('responsepromise')}</p>
                </li>
              </ul>
            </aside>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
