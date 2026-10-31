'use client';

import {
  startTransition,
  useDeferredValue,
  useMemo,
  useState,
} from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

type Project = {
  id: string;
  category: string;
  title: string;
  preview: string;
  overview: string;
  delivery: string;
  metrics: { label: string; value: string }[];
  stack: string[];
};

const projectContent = {
  it: {
    kicker: 'Progetti',
    title: 'Pochi case study, davvero leggibili.',
    intro:
      'In home ho lasciato solo i progetti che raccontano meglio il mio modo di costruire. Il resto si scopre dopo.',
    detailsLabel: 'Cosa ho costruito',
    stackLabel: 'Stack',
    moreTitle: 'Altro lavoro',
    moreBody:
      'Forecasting, predictive analytics, medical imaging, dashboard interne e altri esperimenti pubblici vivono fuori da questa selezione.',
    moreButton: 'Apri GitHub',
    projects: [
      {
        id: 'email',
        category: 'NLP / Operations',
        title: 'Email AI Classifier',
        preview: 'Classificazione ad alto volume con accuratezza forte e tempi di risposta credibili.',
        overview:
          'Il punto non era solo classificare bene, ma costruire un sistema affidabile, leggibile e facile da integrare nei flussi operativi.',
        delivery:
          'Ho lavorato su fine-tuning transformer, API backend e logica di integrazione per portare il sistema a un livello realmente utilizzabile in produzione.',
        metrics: [
          { label: 'Accuratezza', value: '94%' },
          { label: 'Tempo risposta', value: '<100ms' },
          { label: 'Volumi', value: '10K+/giorno' },
        ],
        stack: ['Python', 'PyTorch', 'Transformers', 'FastAPI', 'Docker'],
      },
      {
        id: 'vision',
        category: 'Computer Vision',
        title: 'Industrial Vision Pipeline',
        preview: 'Una pipeline visiva pensata per scenari reali, non per benchmark fini a se stessi.',
        overview:
          'L obiettivo era ridurre il peso dell ispezione manuale mantenendo throughput, stabilita operativa e inferenza coerente con l ambiente di produzione.',
        delivery:
          'Ho progettato detection, tracking e ottimizzazione inference con un approccio end-to-end, mantenendo sempre al centro robustezza e usabilita.',
        metrics: [
          { label: 'Riduzione tempi', value: '-75%' },
          { label: 'Accuratezza', value: '92%' },
          { label: 'Prestazioni', value: '30+ FPS' },
        ],
        stack: ['YOLO', 'OpenCV', 'TensorFlow', 'Python', 'AWS'],
      },
      {
        id: 'assistant',
        category: 'LLM / Product',
        title: 'LLM Chat Assistant',
        preview: 'Un assistente enterprise con retrieval pensato per essere davvero usato.',
        overview:
          'La difficolta vera era evitare il classico chatbot demo e costruire invece un esperienza che reggesse documenti, multi-turn e knowledge base personalizzata.',
        delivery:
          'Ho curato orchestrazione, retrieval, gestione del contesto e UX conversazionale per avvicinare il sistema a un prodotto piu credibile e usabile.',
        metrics: [
          { label: 'Utenti', value: '1K+' },
          { label: 'Uptime', value: '99.9%' },
          { label: 'Rating', value: '4.8/5' },
        ],
        stack: ['OpenAI', 'LangChain', 'Vector DB', 'Python', 'React'],
      },
    ] as Project[],
  },
  en: {
    kicker: 'Projects',
    title: 'A few case studies, actually readable.',
    intro:
      'On the homepage I kept only the projects that best describe how I build. The rest can be discovered later.',
    detailsLabel: 'What I built',
    stackLabel: 'Stack',
    moreTitle: 'More work',
    moreBody:
      'Forecasting, predictive analytics, medical imaging, internal dashboards and other public experiments live outside this small selection.',
    moreButton: 'Open GitHub',
    projects: [
      {
        id: 'email',
        category: 'NLP / Operations',
        title: 'Email AI Classifier',
        preview: 'High-volume classification with strong accuracy and credible response times.',
        overview:
          'The point was not only strong classification, but building a system that stayed reliable, readable and easy to integrate into operational flows.',
        delivery:
          'I worked on transformer fine-tuning, backend APIs and integration logic to bring the system to a truly usable production level.',
        metrics: [
          { label: 'Accuracy', value: '94%' },
          { label: 'Response time', value: '<100ms' },
          { label: 'Volume', value: '10K+/day' },
        ],
        stack: ['Python', 'PyTorch', 'Transformers', 'FastAPI', 'Docker'],
      },
      {
        id: 'vision',
        category: 'Computer Vision',
        title: 'Industrial Vision Pipeline',
        preview: 'A visual pipeline designed for real environments, not for vanity benchmarks.',
        overview:
          'The goal was reducing manual inspection while keeping throughput, operational stability and inference aligned with production constraints.',
        delivery:
          'I designed detection, tracking and optimized inference end-to-end, always keeping robustness and usability at the center.',
        metrics: [
          { label: 'Time reduction', value: '-75%' },
          { label: 'Accuracy', value: '92%' },
          { label: 'Performance', value: '30+ FPS' },
        ],
        stack: ['YOLO', 'OpenCV', 'TensorFlow', 'Python', 'AWS'],
      },
      {
        id: 'assistant',
        category: 'LLM / Product',
        title: 'LLM Chat Assistant',
        preview: 'An enterprise assistant with retrieval designed to be genuinely used.',
        overview:
          'The real challenge was avoiding the typical chatbot demo and building an experience that could handle documents, multi-turn context and a custom knowledge base.',
        delivery:
          'I handled orchestration, retrieval, context management and conversational UX to move the system much closer to a credible product.',
        metrics: [
          { label: 'Users', value: '1K+' },
          { label: 'Uptime', value: '99.9%' },
          { label: 'Rating', value: '4.8/5' },
        ],
        stack: ['OpenAI', 'LangChain', 'Vector DB', 'Python', 'React'],
      },
    ] as Project[],
  },
};

export function ProjectsSection() {
  const { language } = useLanguage();
  const t = projectContent[language];
  const [activeId, setActiveId] = useState(t.projects[0].id);
  const deferredId = useDeferredValue(activeId);

  const activeProject = useMemo(
    () => t.projects.find((project) => project.id === deferredId) ?? t.projects[0],
    [deferredId, t.projects]
  );

  return (
    <section id="projects" className="relative py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="max-w-3xl" offset="sm">
            <span className="section-kicker">{t.kicker}</span>
            <h2 className="section-title mt-6 text-slate-950 dark:text-white">
              {t.title}
            </h2>
            <p className="section-copy mt-6">{t.intro}</p>
          </ScrollReveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="space-y-4">
              {t.projects.map((project, index) => {
                const isActive = project.id === activeId;

                return (
                  <ScrollReveal key={project.id} delay={index * 80} offset="sm">
                    <button
                      type="button"
                      onClick={() =>
                        startTransition(() => {
                          setActiveId(project.id);
                        })
                      }
                      className={`w-full border-t px-1 py-5 text-left transition-colors duration-300 ${
                        isActive
                          ? 'border-slate-950 text-slate-950 dark:border-white dark:text-white'
                          : 'border-slate-200 text-slate-500 hover:text-slate-950 dark:border-slate-800 dark:text-slate-400 dark:hover:text-white'
                      }`}
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em]">
                        {project.category}
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold">{project.title}</h3>
                      <p className="mt-3 max-w-lg text-base leading-8">
                        {project.preview}
                      </p>
                    </button>
                  </ScrollReveal>
                );
              })}
            </div>

            <ScrollReveal offset="sm">
              <div className="border-l border-slate-200 pl-8 dark:border-slate-800 sm:pl-10">
                <div key={activeProject.id} className="animate-fadeIn">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="section-kicker">{activeProject.category}</span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                      {String(t.projects.findIndex((project) => project.id === activeProject.id) + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="mt-6 text-4xl font-semibold text-slate-950 dark:text-white">
                    {activeProject.title}
                  </h3>
                  <p className="mt-6 max-w-3xl text-lg leading-9 text-slate-600 dark:text-slate-300">
                    {activeProject.overview}
                  </p>

                  <div className="mt-10 border-l border-slate-300 pl-6 dark:border-slate-700">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                      {t.detailsLabel}
                    </p>
                    <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
                      {activeProject.delivery}
                    </p>
                  </div>

                  <div className="mt-10 section-divider" />
                  <div className="mt-6 grid gap-5 sm:grid-cols-3">
                    {activeProject.metrics.map((metric) => (
                      <div key={metric.label}>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                          {metric.label}
                        </p>
                        <p className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">
                          {metric.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                      {t.stackLabel}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {activeProject.stack.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal className="mt-12" delay={220}>
            <div className="section-divider" />
            <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                  {t.moreTitle}
                </p>
                <p className="mt-3 text-base leading-8 text-slate-600 dark:text-slate-300">
                  {t.moreBody}
                </p>
              </div>
              <a
                href="https://github.com/carboxx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950 transition-colors duration-300 hover:text-cyan-600 dark:text-white dark:hover:text-cyan-300"
              >
                {t.moreButton}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
