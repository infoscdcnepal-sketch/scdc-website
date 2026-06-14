import type { Metadata } from 'next';
import { site } from './site';

type PageMetaInput = {
  locale: string;
  /** Path without locale prefix, e.g. "/services/shop-drawings". Use "" for home. */
  path: string;
  title: string;
  description: string;
};

/**
 * Builds per-page metadata including canonical URL, hreflang alternates
 * (en / ja / x-default), Open Graph and Twitter cards.
 */
export function buildMetadata({
  locale,
  path,
  title,
  description,
}: PageMetaInput): Metadata {
  const canonical = `${site.url}/${locale}${path}`;

  return {
    title,
    description,
    metadataBase: new URL(site.url),
    alternates: {
      canonical,
      languages: {
        en: `${site.url}/en${path}`,
        ja: `${site.url}/ja${path}`,
        'x-default': `${site.url}/en${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: site.legalName,
      locale: locale === 'ja' ? 'ja_JP' : 'en_US',
      type: 'website',
      images: [{ url: `${site.url}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${site.url}/og-image.png`],
    },
  };
}
