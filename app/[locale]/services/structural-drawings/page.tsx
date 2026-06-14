import type { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { ServiceDetail } from '@/components/service-detail';
import { JsonLd, breadcrumbSchema, serviceSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

const PATH = '/services/structural-drawings';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.structuralDrawings' });
  return buildMetadata({
    locale,
    path: PATH,
    title: t('title'),
    description: t('description'),
  });
}

export default async function StructuralDrawingsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'services.structuralDrawings',
  });

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            locale,
            path: PATH,
            name: t('title'),
            description: t('description'),
          }),
          breadcrumbSchema(locale, [
            { name: 'Home', path: '' },
            { name: 'Services', path: '/services' },
            { name: t('title'), path: PATH },
          ]),
        ]}
      />
      <ServiceDetail service="structuralDrawings" listKind="deliverables" listCount={5} />
    </>
  );
}
