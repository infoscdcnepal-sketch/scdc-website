import type { Metadata } from 'next';
import {
  getTranslations,
  unstable_setRequestLocale,
} from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/navigation';
import { Section, SectionHeading } from '@/components/section';
import { FadeIn } from '@/components/fade-in';
import { StatsBar } from '@/components/stats-bar';
import { ReasonCard } from '@/components/reason-card';
import { ServiceCard } from '@/components/service-card';
import { ProjectCard } from '@/components/project-card';
import { projects } from '@/lib/projects';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.home' });
  return buildMetadata({
    locale,
    path: '',
    title: t('title'),
    description: t('description'),
  });
}

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <HomeContent locale={locale} />;
}

function HomeContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const featured = projects.slice(0, 3);

  return (
    <>
      <JsonLd data={breadcrumbSchema(locale, [{ name: 'Home', path: '' }])} />

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-hero-gradient pb-32 pt-44 text-white">
        <div
          className="blueprint-grid animate-grid-pan absolute inset-0 opacity-60"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h1 className="max-w-4xl font-heading text-4xl font-bold uppercase leading-tight tracking-wide sm:text-5xl lg:text-6xl">
              {t('hero.headline')}
            </h1>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
              {t('hero.subheadline')}
            </p>
          </FadeIn>
          <FadeIn delay={0.24}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/service-plan"
                className="inline-flex h-13 items-center rounded-full bg-accent px-8 py-3.5 font-semibold text-white shadow-md transition-all hover:bg-accent-hover hover:shadow-lg"
              >
                {t('hero.ctaPrimary')}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full border-2 border-white/70 px-8 py-3.5 font-semibold text-white transition-all hover:bg-white hover:text-navy"
              >
                {t('hero.ctaSecondary')}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Stats bar (overlapping hero) ───────────────────────── */}
      <div className="relative z-10 mx-auto -mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <StatsBar />
      </div>

      {/* ── Why SCDC preview ───────────────────────────────────── */}
      <Section>
        <FadeIn>
          <SectionHeading title={t('why.homeTitle')} subtitle={t('why.subtitle')} />
        </FadeIn>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {([1, 2, 3, 4] as const).map((i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <ReasonCard index={i} condensed />
            </FadeIn>
          ))}
        </div>
        <FadeIn>
          <div className="mt-10">
            <Link
              href="/why-scdc"
              className="inline-flex items-center gap-2 font-semibold text-accent hover:underline"
            >
              {t('common.learnMore')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </FadeIn>
      </Section>

      {/* ── Services overview ──────────────────────────────────── */}
      <Section className="bg-white">
        <FadeIn>
          <SectionHeading
            title={t('servicesOverview.title')}
            subtitle={t('servicesOverview.subtitle')}
          />
        </FadeIn>
        <div className="grid gap-8 lg:grid-cols-3">
          <FadeIn delay={0}>
            <ServiceCard service="structuralDrawings" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <ServiceCard service="shopDrawings" />
          </FadeIn>
          <FadeIn delay={0.2}>
            <ServiceCard service="bimSupport" />
          </FadeIn>
        </div>
      </Section>

      {/* ── Industries served ──────────────────────────────────── */}
      <Section>
        <FadeIn>
          <SectionHeading title={t('industries.title')} />
        </FadeIn>
        <FadeIn>
          <ul className="flex flex-wrap gap-3">
            {Array.from({ length: 8 }, (_, i) => i + 1).map((i) => (
              <li
                key={i}
                className="rounded-full border border-teal/40 bg-teal-light px-5 py-2.5 text-sm font-semibold text-navy"
              >
                {t(`industries.items.${i}`)}
              </li>
            ))}
          </ul>
        </FadeIn>
      </Section>

      {/* ── Portfolio CTA ──────────────────────────────────────── */}
      <Section className="bg-white">
        <FadeIn>
          <SectionHeading
            title={t('portfolioCta.title')}
            subtitle={t('portfolioCta.subtitle')}
          />
        </FadeIn>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <FadeIn key={project.id} delay={i * 0.1}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>
        <FadeIn>
          <div className="mt-12 text-center">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-full border-2 border-navy px-8 py-3 font-semibold text-navy transition-all hover:bg-navy hover:text-white"
            >
              {t('common.viewAll')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </FadeIn>
      </Section>

      {/* ── Workflow CTA ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-dark-gradient py-24 text-white">
        <div className="blueprint-grid absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold uppercase tracking-wide sm:text-4xl">
              {t('workflowCta.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
              {t('workflowCta.body')}
            </p>
            <div className="mt-9">
              <Link
                href="/service-flowchart"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-9 py-4 font-semibold text-white shadow-md transition-all hover:bg-accent-hover"
              >
                {t('workflowCta.button')}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
