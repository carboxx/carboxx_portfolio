'use client';

type LanguageSwitcherProps = {
  locale: 'it' | 'en';
  className?: string;
};

export default function LanguageSwitcher({ locale, className = '' }: LanguageSwitcherProps) {
  const label = locale === 'it' ? 'Selezione lingua' : 'Language selection';

  const rememberLanguage = (language: 'it' | 'en') => {
    document.cookie = `portfolio_language=${language}; path=/; max-age=31536000; SameSite=Lax`;
    document.documentElement.lang = language;
  };

  return (
    <div className={`language-switcher ${className}`.trim()} aria-label={label}>
      <a
        href="/"
        hrefLang="it"
        aria-current={locale === 'it' ? 'page' : undefined}
        onClick={() => rememberLanguage('it')}
      >
        IT
      </a>
      <span aria-hidden="true">/</span>
      <a
        href="/en"
        hrefLang="en"
        aria-current={locale === 'en' ? 'page' : undefined}
        onClick={() => rememberLanguage('en')}
      >
        EN
      </a>
    </div>
  );
}
