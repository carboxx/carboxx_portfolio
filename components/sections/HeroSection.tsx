'use client';

import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const heroContent = {
  it: {
    kicker: 'AI Engineer · Product-minded builder',
    titleTop: 'Sistemi AI',
    titleAccent: 'puliti, utili, reali.',
    description:
      'Lavoro tra LLM systems, computer vision e delivery di prodotto per trasformare complessita tecnica in esperienze leggibili e credibili.',
    ctaPrimary: 'Vedi i progetti',
    ctaSecondary: 'Contattami',
    specialties: [
      'LLM systems',
      'Computer vision',
      'AI product delivery',
    ],
    meta: [
      { label: 'Base', value: 'Salerno, Italia' },
      { label: 'Esperienza', value: '4+ anni' },
      { label: 'Progetti', value: '20+' },
    ],
    cardTitle: 'Antonio Carbone',
    cardRole: 'AI Engineer & Innovation Lead',
    cardNote: 'Disponibile per collaborazioni selezionate su prodotti AI e sistemi custom.',
  },
  en: {
    kicker: 'AI Engineer · Product-minded builder',
    titleTop: 'AI systems',
    titleAccent: 'clean, useful, real.',
    description:
      'I work across LLM systems, computer vision and product delivery to turn technical complexity into readable and credible experiences.',
    ctaPrimary: 'View projects',
    ctaSecondary: 'Get in touch',
    specialties: [
      'LLM systems',
      'Computer vision',
      'AI product delivery',
    ],
    meta: [
      { label: 'Base', value: 'Salerno, Italy' },
      { label: 'Experience', value: '4+ years' },
      { label: 'Projects', value: '20+' },
    ],
    cardTitle: 'Antonio Carbone',
    cardRole: 'AI Engineer & Innovation Lead',
    cardNote: 'Available for selected collaborations on AI products and custom systems.',
  },
};

export function HeroSection() {
  const { language } = useLanguage();
  const t = heroContent[language];

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden px-4 pb-24 pt-32 sm:px-6 lg:px-8 lg:pb-32 lg:pt-40"
    >
      <div className="ambient-grid absolute inset-0 opacity-50" />
      <div className="absolute left-[-6rem] top-24 h-64 w-64 rounded-full bg-cyan-400/8 blur-3xl" />
      <div className="absolute right-[-4rem] top-36 h-56 w-56 rounded-full bg-lime-300/6 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-end gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <ScrollReveal offset="sm">
              <span className="section-kicker">{t.kicker}</span>
            </ScrollReveal>

            <ScrollReveal className="mt-6" delay={70}>
              <h1 className="max-w-4xl text-[clamp(3.5rem,10vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-slate-950 dark:text-white">
                <span className="block">{t.titleTop}</span>
                <span className="mt-2 block bg-gradient-to-r from-slate-950 via-cyan-500 to-lime-400 bg-clip-text text-transparent dark:from-white dark:via-cyan-300 dark:to-lime-300">
                  {t.titleAccent}
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={140}>
              <p className="section-copy mt-7 max-w-xl">{t.description}</p>
            </ScrollReveal>

            <ScrollReveal className="mt-9 flex flex-col gap-3 sm:flex-row" delay={220}>
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 dark:bg-cyan-300 dark:text-slate-950"
              >
                {t.ctaPrimary}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-transparent px-6 py-3 text-sm font-semibold text-slate-800 transition-colors duration-300 hover:border-slate-950 dark:border-slate-700 dark:text-slate-100 dark:hover:border-cyan-300 dark:hover:text-cyan-200"
              >
                {t.ctaSecondary}
              </a>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="mt-10 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
                {t.specialties.map((item, index) => (
                  <span key={item} className="inline-flex items-center gap-4">
                    <span>{item}</span>
                    {index < t.specialties.length - 1 && <span className="text-slate-300 dark:text-slate-700">/</span>}
                  </span>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal className="mt-10" delay={380}>
              <div className="section-divider max-w-2xl" />
              <div className="mt-5 grid max-w-2xl gap-5 sm:grid-cols-3">
                {t.meta.map((item) => (
                  <div key={item.label}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-950 dark:text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={160} offset="lg">
            <div className="relative">
              <div className="relative overflow-hidden rounded-[32px] border border-slate-200/60 bg-slate-950/20 dark:border-slate-800/70">
                <div className="relative aspect-[4/4.8]">
                  <Image
                    src="/antonio-photo.jpg"
                    alt="Antonio Carbone portrait"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/18 to-transparent" />
                </div>
              </div>

              <div className="absolute inset-x-4 bottom-4 rounded-[24px] border border-white/10 bg-slate-950/72 p-5 backdrop-blur-md sm:inset-x-6 sm:bottom-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
                  {t.cardRole}
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-white">
                  {t.cardTitle}
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-7 text-white/76">
                  {t.cardNote}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
