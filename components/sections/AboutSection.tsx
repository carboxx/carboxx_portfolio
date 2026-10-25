'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const content = {
  it: {
    kicker: 'Profilo',
    title: 'Meno demo, piu giudizio.',
    intro:
      'Mi trovo bene dove AI, business e execution si incontrano. Mi interessa soprattutto costruire qualcosa che abbia senso, che si lasci usare e che non crolli appena esce dalla presentazione.',
    body:
      'Negli ultimi anni ho lavorato su machine learning, computer vision, NLP e conversational AI seguendo progetti dalla discovery fino al rilascio. Quello che porto non e solo profondita tecnica: porto ordine, priorita e una sensibilita di prodotto che aiuta a scegliere bene cosa vale la pena costruire.',
    quote:
      'Preferisco una soluzione leggibile e utile a una demo spettacolare ma fragile.',
    principles: [
      {
        title: 'Chiarezza prima di tutto',
        description: 'Capire obiettivi, vincoli e utilita prima di decidere stack, modello o complessita.',
      },
      {
        title: 'Profondita quando serve',
        description: 'Scendere nel dettaglio tecnico senza perdere il perche del sistema che stiamo costruendo.',
      },
      {
        title: 'Shipping mindset',
        description: 'Arrivare a qualcosa che possa essere usato, mantenuto e capito anche dal team.',
      },
    ],
    facts: [
      { label: 'Ruolo', value: 'AI Engineer & Innovation Lead' },
      { label: 'Approccio', value: 'full-cycle delivery' },
      { label: 'Base', value: 'Salerno, Italia' },
    ],
  },
  en: {
    kicker: 'Profile',
    title: 'Less demo energy, more judgement.',
    intro:
      'I work best where AI, business and execution meet. What I care about most is building something that makes sense, that feels usable and that does not collapse the moment it leaves the presentation.',
    body:
      'Over the last few years I have worked across machine learning, computer vision, NLP and conversational AI following projects from discovery to release. What I bring is not only technical depth: I also bring order, prioritization and product judgement that helps decide what is worth building.',
    quote:
      'I prefer a readable and useful solution over a spectacular but fragile demo.',
    principles: [
      {
        title: 'Clarity first',
        description: 'Understand goals, constraints and usefulness before deciding stack, model or complexity.',
      },
      {
        title: 'Depth when needed',
        description: 'Go deep technically without losing the reason why the system exists.',
      },
      {
        title: 'Shipping mindset',
        description: 'Reach something that can actually be used, maintained and understood by the team.',
      },
    ],
    facts: [
      { label: 'Role', value: 'AI Engineer & Innovation Lead' },
      { label: 'Approach', value: 'full-cycle delivery' },
      { label: 'Base', value: 'Salerno, Italy' },
    ],
  },
};

export function AboutSection() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <section id="about" className="relative py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.92fr] lg:gap-16">
            <ScrollReveal offset="sm">
              <div>
                <span className="section-kicker">{t.kicker}</span>
                <h2 className="section-title mt-6 max-w-3xl text-slate-950 dark:text-white">
                  {t.title}
                </h2>
                <p className="section-copy mt-6 max-w-2xl">{t.intro}</p>
                <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
                  {t.body}
                </p>

                <div className="mt-10 max-w-2xl border-l border-slate-300 pl-6 dark:border-slate-700">
                  <p className="text-xl leading-9 text-slate-900 dark:text-white">
                    {t.quote}
                  </p>
                </div>

                <div className="mt-10 section-divider max-w-2xl" />
                <div className="mt-6 grid max-w-2xl gap-5 sm:grid-cols-3">
                  {t.facts.map((item) => (
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
              </div>
            </ScrollReveal>

            <div className="space-y-8">
              {t.principles.map((item, index) => (
                <ScrollReveal key={item.title} delay={index * 100} offset="sm">
                  <article className="border-t border-slate-200 pt-6 dark:border-slate-800">
                    <div className="flex items-start gap-5">
                      <span className="pt-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-300">
                        0{index + 1}
                      </span>
                      <div>
                        <h3 className="text-2xl font-semibold text-slate-950 dark:text-white">
                          {item.title}
                        </h3>
                        <p className="mt-4 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
