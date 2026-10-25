'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function ContactSection() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const content = {
    it: {
      kicker: 'Contatti',
      title: 'Se il progetto e serio, partiamo da una conversazione chiara.',
      description:
        'Preferisco scambi diretti, con contesto e obiettivi. Puoi scrivermi in modo semplice qui oppure usare i contatti diretti.',
      labels: {
        name: 'Nome',
        email: 'Email',
        message: 'Messaggio',
      },
      placeholders: {
        name: 'Il tuo nome',
        email: 'la-tua-email@azienda.com',
        message: 'Cosa state costruendo e dove posso essere utile?',
      },
      submit: 'Apri email',
    },
    en: {
      kicker: 'Contact',
      title: 'If the project is serious, let us start with a clear conversation.',
      description:
        'I prefer direct exchanges, with context and goals. You can write in a simple way here or use the direct contacts.',
      labels: {
        name: 'Name',
        email: 'Email',
        message: 'Message',
      },
      placeholders: {
        name: 'Your name',
        email: 'your-email@company.com',
        message: 'What are you building and where can I be useful?',
      },
      submit: 'Open email',
    },
  };

  const t = content[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject =
      language === 'it' ? 'Nuova conversazione dal portfolio' : 'New conversation from portfolio';
    const mailtoLink = `mailto:a.carbone613@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      label: 'Email',
      value: 'a.carbone613@gmail.com',
      href: 'mailto:a.carbone613@gmail.com',
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/antoniocarbone97',
      href: 'https://www.linkedin.com/in/antoniocarbone97',
    },
    {
      label: 'GitHub',
      value: 'github.com/carboxx',
      href: 'https://github.com/carboxx',
    },
  ];

  return (
    <section id="contact" className="relative py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <ScrollReveal offset="sm">
              <div>
                <span className="section-kicker">{t.kicker}</span>
                <h2 className="section-title mt-6 text-slate-950 dark:text-white">
                  {t.title}
                </h2>
                <p className="section-copy mt-6 max-w-xl">{t.description}</p>

                <div className="mt-10 space-y-5">
                  {contactInfo.map((info, index) => (
                    <ScrollReveal key={info.label} delay={index * 90} offset="sm">
                      <a
                        href={info.href}
                        target={info.href.startsWith('http') ? '_blank' : '_self'}
                        rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="block border-t border-slate-200 pt-5 transition-colors duration-300 hover:text-slate-950 dark:border-slate-800 dark:hover:text-white"
                      >
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                          {info.label}
                        </p>
                        <p className="mt-3 break-all text-base font-medium text-slate-950 dark:text-white">
                          {info.value}
                        </p>
                      </a>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal offset="sm" delay={120}>
              <form onSubmit={handleSubmit} className="space-y-7 border-t border-slate-200 pt-5 dark:border-slate-800">
                <div>
                  <label htmlFor="name" className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                    {t.labels.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-4 w-full border-b border-slate-300 bg-transparent px-0 pb-3 text-base text-slate-950 outline-none transition-colors focus:border-cyan-500 dark:border-slate-700 dark:text-white dark:focus:border-cyan-300"
                    placeholder={t.placeholders.name}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                    {t.labels.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-4 w-full border-b border-slate-300 bg-transparent px-0 pb-3 text-base text-slate-950 outline-none transition-colors focus:border-cyan-500 dark:border-slate-700 dark:text-white dark:focus:border-cyan-300"
                    placeholder={t.placeholders.email}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                    {t.labels.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="mt-4 w-full resize-none border-b border-slate-300 bg-transparent px-0 pb-3 text-base text-slate-950 outline-none transition-colors focus:border-cyan-500 dark:border-slate-700 dark:text-white dark:focus:border-cyan-300"
                    placeholder={t.placeholders.message}
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950 transition-colors duration-300 hover:text-cyan-600 dark:text-white dark:hover:text-cyan-300"
                >
                  {t.submit}
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
