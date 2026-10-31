'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: t.nav.home },
    { href: '#about', label: t.nav.about },
    { href: '#projects', label: t.nav.projects },
    { href: '#journey', label: language === 'it' ? 'Percorso' : 'Journey' },
    { href: '#contact', label: t.nav.contact },
  ];

  const ctaLabel = language === 'it' ? 'Parliamone' : 'Let us talk';

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="pointer-events-none mx-auto max-w-6xl">
        <div
          className={`pointer-events-auto rounded-[28px] border transition-all duration-300 ${
            isScrolled
              ? 'border-slate-200/70 bg-white/78 shadow-[0_10px_30px_-26px_rgba(15,23,42,0.32)] backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/80'
              : 'border-slate-200/50 bg-white/58 shadow-[0_8px_24px_-24px_rgba(15,23,42,0.24)] backdrop-blur-lg dark:border-slate-800/60 dark:bg-slate-950/62'
          }`}
        >
          <nav className="flex items-center justify-between px-4 py-3 sm:px-5">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex min-w-0 items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <Image
                  src="/carboxx-logo.png"
                  alt="Carboxx Logo"
                  width={28}
                  height={28}
                  className="h-7 w-7 object-contain"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                  Antonio Carbone
                </p>
                <p className="truncate text-base font-semibold text-slate-950 dark:text-white">
                  AI Engineer
                </p>
              </div>
            </a>

            <div className="hidden items-center gap-5 lg:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-sm font-medium text-slate-500 transition-colors duration-300 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 sm:flex">
                <LanguageToggle />
                <ThemeToggle />
              </div>

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="hidden rounded-full border border-slate-200 bg-white/66 px-4 py-2 text-sm font-semibold text-slate-950 transition-colors duration-300 hover:border-slate-950 dark:border-slate-800 dark:bg-slate-900/68 dark:text-white dark:hover:border-cyan-300 md:inline-flex"
              >
                {ctaLabel}
              </a>

              <button
                onClick={() => setIsMobileMenuOpen((value) => !value)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-950 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800 lg:hidden"
                aria-label="Toggle menu"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 7h16M4 12h16M4 17h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </nav>

          {isMobileMenuOpen && (
            <div className="border-t border-slate-200/90 px-4 pb-4 pt-3 dark:border-slate-800">
              <div className="flex items-center gap-2 pb-3 sm:hidden">
                <LanguageToggle />
                <ThemeToggle />
              </div>
              <div className="grid gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="mt-2 inline-flex justify-center rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white dark:bg-cyan-300 dark:text-slate-950"
                >
                  {ctaLabel}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
