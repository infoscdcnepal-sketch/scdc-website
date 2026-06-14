import { useTranslations } from 'next-intl';
import { Linkedin, Mail, Globe } from 'lucide-react';
import { Link } from '@/navigation';
import { site } from '@/lib/site';

export function Footer() {
  const t = useTranslations('footer');
  const tc = useTranslations('common');

  const columns = [
    {
      title: t('servicesTitle'),
      links: [
        { label: t('links.shopDrawings'), href: '/services/shop-drawings' },
        { label: t('links.structuralDrawings'), href: '/services/structural-drawings' },
        { label: t('links.bimSupport'), href: '/services/bim-support' },
      ],
    },
    {
      title: t('companyTitle'),
      links: [
        { label: t('links.about'), href: '/about' },
        { label: t('links.whyScdc'), href: '/why-scdc' },
        { label: t('links.portfolio'), href: '/portfolio' },
      ],
    },
    {
      title: t('resourcesTitle'),
      links: [
        { label: t('links.plans'), href: '/service-plan' },
        { label: t('links.workflow'), href: '/service-flowchart' },
      ],
    },
  ];

  return (
    <footer className="bg-navy-deep text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 font-heading text-sm font-bold tracking-widest">
                SC
              </span>
              <span className="leading-tight">
                <span className="block font-heading text-xl font-bold tracking-wide">
                  SCDC
                </span>
                <span className="block text-[10px] font-semibold tracking-[0.25em] text-white/60">
                  {tc('engineeringFirm')}
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              {t('tagline')}
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white/90">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/65 transition-colors hover:text-teal"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/90">
              {t('contactTitle')}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/65">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-teal"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.url}
                  className="inline-flex items-center gap-2 transition-colors hover:text-teal"
                >
                  <Globe className="h-4 w-4" aria-hidden="true" />
                  www.scdc.com.np
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/50">{t('rights')}</p>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="SCDC on LinkedIn"
            className="rounded-full bg-white/10 p-2 transition-colors hover:bg-teal"
          >
            <Linkedin className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
