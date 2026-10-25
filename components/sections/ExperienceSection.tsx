'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const content = {
  it: {
    kicker: 'Esperienza',
    title: 'Un percorso tecnico, ma leggibile.',
    intro:
      'Anche qui ho tolto il superfluo: pochi passaggi chiari, con il tipo di responsabilita che porto quando un progetto deve muoversi davvero.',
    periods: ['2022 - oggi', '2021 - 2022', '2020 - 2021'],
    educationTitle: 'Formazione',
    educationPeriods: ['2019 - 2021', '2016 - 2019'],
  },
  en: {
    kicker: 'Experience',
    title: 'A technical path, but readable.',
    intro:
      'Here too I removed the excess: a few clear steps showing the kind of responsibility I bring when a project needs to move for real.',
    periods: ['2022 - present', '2021 - 2022', '2020 - 2021'],
    educationTitle: 'Education',
    educationPeriods: ['2019 - 2021', '2016 - 2019'],
  },
};

const techByRole = [
  ['Python', 'PyTorch', 'AWS'],
  ['Transformers', 'FastAPI', 'Computer Vision'],
  ['Scikit-learn', 'Pandas', 'Dashboards'],
];

export function ExperienceSection() {
  const { language, t } = useLanguage();
  const copy = content[language];

  return (
    <section id="experience" className="relative py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <ScrollReveal offset="sm">
              <div className="lg:sticky lg:top-28">
                <span className="section-kicker">{copy.kicker}</span>
                <h2 className="section-title mt-6 text-slate-950 dark:text-white">
                  {copy.title}
                </h2>
                <p className="section-copy mt-6">{copy.intro}</p>
              </div>
            </ScrollReveal>

            <div className="space-y-10">
              <div className="space-y-8 border-l border-slate-200 pl-6 dark:border-slate-800 sm:pl-8">
                {t.experience.roles.map((role, index) => (
                  <ScrollReveal key={`${role.title}-${role.company}`} delay={index * 90} offset="sm">
                    <article className="relative">
                      <span className="absolute -left-[2.05rem] top-2 h-3 w-3 rounded-full bg-slate-950 dark:bg-white sm:-left-[2.55rem]" />
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                        {copy.periods[index]}
                      </p>
                      <h3 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">
                        {role.title}
                      </h3>
                      <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-base font-medium text-cyan-600 dark:text-cyan-300">
                          {role.company}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {role.location}
                        </p>
                      </div>
                      <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
                        {role.description[0]}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
                        {techByRole[index]?.map((tech, techIndex) => (
                          <span key={tech} className="inline-flex items-center gap-4">
                            <span>{tech}</span>
                            {techIndex < (techByRole[index]?.length ?? 0) - 1 && (
                              <span className="text-slate-300 dark:text-slate-700">/</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </article>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal offset="sm">
                <div className="section-divider" />
                <div className="mt-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                    {copy.educationTitle}
                  </p>
                  <div className="mt-6 space-y-6">
                    {t.experience.educationList.map((item, index) => (
                      <div key={`${item.degree}-${item.school}`} className="border-t border-slate-200 pt-5 dark:border-slate-800">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                          {copy.educationPeriods[index]}
                        </p>
                        <h4 className="mt-3 text-xl font-semibold text-slate-950 dark:text-white">
                          {item.degree}
                        </h4>
                        <p className="mt-1 text-sm font-medium text-cyan-600 dark:text-cyan-300">
                          {item.school}
                        </p>
                        <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
