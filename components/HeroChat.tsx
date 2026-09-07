'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const heroCopy = {
  it: {
    messages: [
      'Ciao, sono Antonio.',
      'Sono un ingegnere informatico specializzato in Intelligenza Artificiale.',
      'Oggi in Affinity porto soluzioni AI dall’idea all’integrazione: modelli, software e prodotto.',
      'Ma il codice è solo una parte. Ho guidato una community universitaria e rappresentato gli studenti nel Consiglio di Amministrazione di UniSa.',
      'Qui trovi ciò che costruisco e il percorso che mi ha portato fin qui.',
    ],
    typing: 'Antonio sta scrivendo',
    choose: 'Scegli dove entrare',
    projects: 'Cosa costruisco',
    journey: 'Chi sono davvero',
    continue: 'Continua',
    beforePortrait: 'Ingegnere informatico.',
    afterPortrait: <em>AI Engineer.</em>,
    subtitle: 'Intelligenza artificiale, software e visione di prodotto per problemi reali.',
    role: 'Ingegnere informatico · AI Engineer',
  },
  en: {
    messages: [
      'Hi, I’m Antonio.',
      'I’m a Computer Engineer specialising in Artificial Intelligence.',
      'At Affinity, I take AI solutions from idea to integration: models, software and product.',
      'But code is only part of the story. I led a university community and represented students on the UniSa Board of Directors.',
      'Here you can explore what I build and the journey that brought me here.',
    ],
    typing: 'Antonio is typing',
    choose: 'Choose where to begin',
    projects: 'What I build',
    journey: 'Who I really am',
    continue: 'Continue',
    beforePortrait: 'Computer Engineer.',
    afterPortrait: <em>AI Engineer.</em>,
    subtitle: 'Artificial intelligence, software and product thinking applied to real problems.',
    role: 'Computer Engineer · AI Engineer',
  },
} as const;

export default function HeroChat({ locale }: { locale: 'it' | 'en' }) {
  const copy = heroCopy[locale];
  const introMessages = copy.messages;
  const [visibleMessages, setVisibleMessages] = useState<string[]>([]);
  const [typing, setTyping] = useState(true);
  const timersRef = useRef<number[]>([]);
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      setVisibleMessages([...introMessages]);
      setTyping(false);
      return;
    }

    introMessages.forEach((message, index) => {
      const timer = window.setTimeout(() => {
        setTyping(false);
        setVisibleMessages((current) => [...current, message]);

        if (index < introMessages.length - 1) {
          const typingTimer = window.setTimeout(() => setTyping(true), 260);
          timersRef.current.push(typingTimer);
        }
      }, 430 + index * 720);
      timersRef.current.push(timer);
    });

    return () => timersRef.current.forEach((timer) => window.clearTimeout(timer));
  }, [introMessages]);

  useGSAP(() => {
    gsap.from('.chat-card', {
      y: 36,
      scale: 0.97,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
    });
  }, []);

  useGSAP(() => {
    const latest = threadRef.current?.querySelector('[data-message]:last-of-type');
    if (!latest) return;
    gsap.fromTo(latest, { y: 12, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: 0.42,
      ease: 'power3.out',
    });
  }, [visibleMessages.length]);

  return (
    <section className="chat-hero" aria-labelledby="hero-title">
        <div className="chat-stage">
          <div className="chat-ambient" aria-hidden="true" />

          <div className="chat-card chat-card--intro">
          <header className="chat-card-header">
            <div className="chat-avatar">
              <Image src="/antonio-photo.jpg" alt="" fill sizes="44px" priority />
            </div>
            <div className="chat-identity">
              <strong>Antonio Carbone</strong>
              <span><i aria-hidden="true" /> {copy.role}</span>
            </div>
            <div className="chat-card-meta">
              <p>Salerno · IT</p>
              <LanguageSwitcher locale={locale} className="language-switcher--dark" />
            </div>
          </header>

          <div className="chat-thread chat-thread--intro" ref={threadRef} aria-live="polite">
            {visibleMessages.map((message, index) => (
              <div className="chat-message chat-message--antonio" data-message key={message}>
                <p className={index === 1 ? 'chat-message-highlight' : undefined}>{message}</p>
              </div>
            ))}

            {typing && (
              <div className="chat-message chat-message--antonio" aria-label={copy.typing}>
                <div className="typing-bubble" aria-hidden="true"><span /><span /><span /></div>
              </div>
            )}
          </div>

          <div className={`chat-card-footer chat-card-footer--intro ${visibleMessages.length === introMessages.length ? 'is-ready' : ''}`}>
            <p>{copy.choose}</p>
            <div className="chat-replies chat-replies--intro">
              <a href="#progetti">{copy.projects} <span aria-hidden="true">↘</span></a>
              <a href="#percorso">{copy.journey} <span aria-hidden="true">↘</span></a>
            </div>
          </div>
        </div>

        <a className="chat-enter" href="#esperienza">
          <span>{copy.continue}</span>
          <i aria-hidden="true">↓</i>
        </a>

        <div className="chat-reveal-layer">
          <div className="chat-reveal-copy">
            <h1 id="hero-title">
              {copy.beforePortrait}
              <span className="inline-portrait" aria-hidden="true">
                <Image src="/antonio-photo.jpg" alt="" fill sizes="130px" priority />
              </span>
              <br />{copy.afterPortrait}
            </h1>
            <div className="chat-reveal-bottom">
              <p>{copy.subtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
