'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const content = {
  it: {
    kicker: 'Percorso',
    title: 'Una parte importante del mio profilo nasce fuori dal codice.',
    intro:
      'Lapio, StudentIngegneria e il Consiglio di Amministrazione spiegano bene da dove arrivano leadership, responsabilita e il mio modo di stare nei progetti.',
    cards: [
      {
        title: 'Lapio',
        description: 'Origini, senso del posto e una misura umana che porto ancora nel lavoro.',
        image: '/lapio.jpg',
      },
      {
        title: 'StudentIngegneria',
        description: 'Il luogo in cui ho imparato collaborazione, rappresentanza e costruzione collettiva.',
        image: '/studentingegneria.jpg',
      },
      {
        title: 'Consiglio di Amministrazione Unisa',
        description: 'Una palestra concreta di responsabilita, decisione e dialogo con contesti complessi.',
        image: '/piazzadelsapere.jpeg',
      },
    ],
    path: 'Scopri il percorso completo',
    cv: 'Scarica il CV',
  },
  en: {
    kicker: 'Journey',
    title: 'An important part of my profile was built outside of code.',
    intro:
      'Lapio, StudentIngegneria and the Board of Directors explain where leadership, responsibility and my way of working on projects actually come from.',
    cards: [
      {
        title: 'Lapio',
        description: 'Origins, sense of place and a human scale I still bring into work.',
        image: '/lapio.jpg',
      },
      {
        title: 'StudentIngegneria',
        description: 'The place where I learned collaboration, representation and collective building.',
        image: '/studentingegneria.jpg',
      },
      {
        title: 'Board of Directors, Unisa',
        description: 'A concrete training ground for responsibility, decision-making and dialogue in complex contexts.',
        image: '/piazzadelsapere.jpeg',
      },
    ],
    path: 'Explore the full journey',
    cv: 'Download CV',
  },
};

export function PersonalSection() {
  const { language } = useLanguage();
  const t = content[language];
  const cvPath = language === 'it' ? '/cv_it.pdf' : '/cv_en.pdf';

  return (
    <section id="journey" className="relative py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="max-w-3xl" offset="sm">
            <span className="section-kicker">{t.kicker}</span>
            <h2 className="section-title mt-6 text-slate-950 dark:text-white">
              {t.title}
            </h2>
            <p className="section-copy mt-6">{t.intro}</p>
          </ScrollReveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {t.cards.map((card, index) => (
              <ScrollReveal key={card.title} delay={index * 100} offset="sm">
                <article className="group relative overflow-hidden rounded-[28px] border border-slate-200/60 dark:border-slate-800/70">
                  <div className="relative aspect-[4/4.8]">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
                        0{index + 1}
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold text-white">
                        {card.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-white/78">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" delay={220}>
            <Link
              href="/percorso"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950 transition-colors duration-300 hover:text-cyan-600 dark:text-white dark:hover:text-cyan-300"
            >
              {t.path}
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a
              href={cvPath}
              download
              className="text-sm font-semibold text-slate-500 transition-colors duration-300 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
            >
              {t.cv}
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
