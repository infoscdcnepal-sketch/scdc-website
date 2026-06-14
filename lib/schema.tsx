import { site } from './site';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.legalName,
    alternateName: 'S.C.D.C エンジニアリングファーム',
    url: site.url,
    logo: `${site.url}/scdc-logo.png`,
    email: site.email,
    address: { '@type': 'PostalAddress', addressCountry: 'NP' },
    areaServed: ['JP', 'AU', 'US', 'EU'],
    sameAs: [site.linkedin],
    description:
      'Nepal-based structural engineering firm delivering JASS 6-compliant steel shop drawings, structural drawing support, and BIM services.',
  };
}

export function serviceSchema(input: {
  locale: string;
  path: string;
  name: string;
  description: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: input.name,
    name: input.name,
    description: input.description,
    url: `${site.url}/${input.locale}${input.path}`,
    provider: { '@type': 'Organization', name: site.legalName, url: site.url },
    areaServed: ['JP', 'AU', 'US', 'EU'],
  };
}

export function breadcrumbSchema(
  locale: string,
  crumbs: { name: string; path: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: `${site.url}/${locale}${crumb.path}`,
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

/** Renders one or more JSON-LD objects into a script tag. */
export function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
