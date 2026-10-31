'use client';

import Link from 'next/link';

type LanguageSwitcherProps = {
  locale: 'it' | 'en';
  className?: string;
};

export default function LanguageSwitcher({ locale, className = '' }: LanguageSwitcherProps) {
  const rememberLanguage = (language: 'it' | 'en') => {
    document.cookie = `portfolio_language=${language}; path=/; max-age=31536000; SameSite=Lax`;
    document.documentElement.lang = language;
  };

  return (
    <div className={`language-switcher ${className}`.trim()} aria-label="Language selection">
      <Link
        href="/"
        hrefLang="it"
        aria-current={locale === 'it' ? 'page' : undefined}
        onClick={() => rememberLanguage('it')}
      >
        IT
      </Link>
      <span aria-hidden="true">/</span>
      <Link
        href="/en"
        hrefLang="en"
        aria-current={locale === 'en' ? 'page' : undefined}
        onClick={() => rememberLanguage('en')}
      >
        EN
      </Link>
    </div>
  );
}
