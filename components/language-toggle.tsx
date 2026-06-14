'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/navigation';
import { cn } from '@/lib/utils';

/** EN | 日本語 toggle. Switches the locale prefix while keeping the current path. */
export function LanguageToggle({ onDark = false }: { onDark?: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (next: 'en' | 'ja') => {
    if (next !== locale) router.replace(pathname, { locale: next });
  };

  const base = 'px-2 py-1 text-sm font-semibold transition-colors';
  const active = onDark ? 'text-white' : 'text-navy';
  const inactive = onDark
    ? 'text-white/50 hover:text-white'
    : 'text-gray-400 hover:text-navy';

  return (
    <div
      className={cn(
        'flex items-center rounded-full border px-1',
        onDark ? 'border-white/30' : 'border-gray-300'
      )}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => switchTo('en')}
        className={cn(base, locale === 'en' ? active : inactive)}
        aria-pressed={locale === 'en'}
        lang="en"
      >
        EN
      </button>
      <span className={onDark ? 'text-white/30' : 'text-gray-300'} aria-hidden="true">
        |
      </span>
      <button
        type="button"
        onClick={() => switchTo('ja')}
        className={cn(base, locale === 'ja' ? active : inactive)}
        aria-pressed={locale === 'ja'}
        lang="ja"
      >
        日本語
      </button>
    </div>
  );
}
