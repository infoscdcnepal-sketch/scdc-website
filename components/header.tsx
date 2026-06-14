'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { Link, usePathname } from '@/navigation';
import { LanguageToggle } from '@/components/language-toggle';
import { cn } from '@/lib/utils';

const navItems = [
  { key: 'services', href: '/services' },
  { key: 'whyScdc', href: '/why-scdc' },
  { key: 'portfolio', href: '/portfolio' },
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
] as const;

export function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile drawer on navigation.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/85 shadow-sm backdrop-blur-md'
          : 'bg-white/0'
      )}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" aria-label="SCDC — Home">
          <Image
            src="/scdc-logo.png"
            alt="SCDC Logo"
            width={44}
            height={44}
            className="h-11 w-11 object-contain"
            priority
          />
          <span className="leading-tight">
            <span className={cn('block font-heading text-xl font-bold tracking-wide transition-colors', scrolled ? 'text-navy' : 'text-white')}>
              SCDC
            </span>
            <span className={cn('block text-[10px] font-semibold tracking-[0.25em] transition-colors', scrolled ? 'text-ink-muted' : 'text-white/70')}>
              {t('common.engineeringFirm')}
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                'text-sm font-semibold transition-colors hover:text-accent',
                scrolled
                  ? (pathname.startsWith(item.href) ? 'text-accent' : 'text-ink')
                  : (pathname.startsWith(item.href) ? 'text-accent' : 'text-white/90')
              )}
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="hidden items-center gap-4 lg:flex">
          <LanguageToggle onDark={!scrolled} />
          <Link
            href="/contact"
            className="inline-flex h-11 items-center rounded-full bg-accent px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-hover"
          >
            {t('common.getQuote')}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className={cn('rounded-lg p-2 lg:hidden', scrolled ? 'text-navy' : 'text-white')}
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile slide-out drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden border-t border-gray-100 bg-white shadow-lg lg:hidden"
            aria-label="Mobile"
          >
            <div className="space-y-1 px-4 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="block rounded-lg px-3 py-3 text-base font-semibold text-ink hover:bg-surface"
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
              <div className="flex items-center justify-between gap-4 px-3 pt-4">
                <LanguageToggle />
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center rounded-full bg-accent px-6 text-sm font-semibold text-white"
                >
                  {t('common.getQuote')}
                </Link>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

