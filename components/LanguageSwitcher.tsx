/* eslint-disable @next/next/no-html-link-for-pages -- Language changes refresh the document, including html lang and server metadata. */

type LanguageSwitcherProps = {
  locale: 'it' | 'en';
  className?: string;
};

export default function LanguageSwitcher({ locale, className = '' }: LanguageSwitcherProps) {
  return (
    <div className={`language-switcher ${className}`.trim()} aria-label={locale === 'it' ? 'Lingua' : 'Language'}>
      <a
        href="/"
        hrefLang="it"
        lang="it"
        title="Italiano"
        aria-current={locale === 'it' ? 'page' : undefined}
      >
        IT
      </a>
      <span aria-hidden="true">/</span>
      <a
        href="/en"
        hrefLang="en"
        lang="en"
        title="English"
        aria-current={locale === 'en' ? 'page' : undefined}
      >
        EN
      </a>
    </div>
  );
}
