'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function PortfolioMotion() {
  useGSAP(() => {
    const nav = document.querySelector<HTMLElement>('.site-nav');
    const profile = document.querySelector<HTMLElement>('.career-section');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const syncNav = () => {
      if (!nav || !profile) return;
      const visible = window.scrollY >= profile.offsetTop - 100;
      nav.classList.toggle('is-visible', visible);
      nav.classList.toggle('is-scrolled', visible);
    };

    syncNav();
    window.addEventListener('scroll', syncNav, { passive: true });

    if (reducedMotion) {
      return () => window.removeEventListener('scroll', syncNav);
    }

    const media = gsap.matchMedia();

    media.add('(min-width: 801px)', () => {
      const transition = gsap.timeline({
        scrollTrigger: {
          trigger: '.chat-hero',
          start: 'top top',
          end: '+=115%',
          pin: '.chat-stage',
          scrub: 0.28,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      transition
        .to('.chat-card', {
          scale: 0.72,
          opacity: 0,
          ease: 'power2.in',
          duration: 0.52,
        }, 0)
        .to('.chat-enter', {
          y: 18,
          opacity: 0,
          ease: 'none',
          duration: 0.24,
        }, 0)
        .to('.chat-reveal-layer', {
          clipPath: 'circle(150% at 50% 52%)',
          ease: 'power2.inOut',
          duration: 0.72,
        }, 0.18)
        .fromTo('.chat-reveal-copy > p', {
          y: 28,
          opacity: 0,
        }, {
          y: 0,
          opacity: 1,
          ease: 'power3.out',
          duration: 0.3,
        }, 0.56)
        .fromTo('.chat-reveal-copy h1', {
          y: 70,
          opacity: 0,
        }, {
          y: 0,
          opacity: 1,
          ease: 'power3.out',
          duration: 0.42,
        }, 0.52)
        .fromTo('.inline-portrait', {
          scale: 0.25,
          rotate: 16,
        }, {
          scale: 1,
          rotate: -3,
          ease: 'back.out(1.7)',
          duration: 0.36,
        }, 0.64)
        .fromTo('.chat-reveal-bottom > *', {
          y: 24,
          opacity: 0,
        }, {
          y: 0,
          opacity: 1,
          stagger: 0.07,
          ease: 'power2.out',
          duration: 0.3,
        }, 0.68);

      const journeyViewport = document.querySelector<HTMLElement>('.journey-viewport');
      const journeyTrack = document.querySelector<HTMLElement>('.journey-track');

      if (journeyViewport && journeyTrack) {
        const distance = () => Math.max(0, journeyTrack.scrollWidth - window.innerWidth);
        gsap.to(journeyTrack, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: journeyViewport,
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: 0.22,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

      }
    });

    media.add('(max-width: 800px)', () => {
      const transition = gsap.timeline({
        scrollTrigger: {
          trigger: '.chat-hero',
          start: 'top top',
          end: '+=85%',
          pin: '.chat-stage',
          scrub: 0.25,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      transition
        .to('.chat-card', {
          scale: 0.82,
          opacity: 0,
          ease: 'power2.in',
          duration: 0.48,
        }, 0)
        .to('.chat-enter', { opacity: 0, duration: 0.2 }, 0)
        .to('.chat-reveal-layer', {
          clipPath: 'circle(155% at 50% 54%)',
          ease: 'power2.inOut',
          duration: 0.7,
        }, 0.18)
        .fromTo('.chat-reveal-copy > p, .chat-reveal-copy h1, .chat-reveal-bottom > *', {
          y: 34,
          opacity: 0,
        }, {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          ease: 'power3.out',
          duration: 0.36,
        }, 0.54);

      gsap.utils.toArray<HTMLElement>('.journey-slide').forEach((slide) => {
        gsap.from(slide, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: slide,
            start: 'top 86%',
            once: true,
          },
        });
      });
    });

    gsap.utils.toArray<HTMLElement>(
      '.career-header, .work-header, .github-header, .journey-header',
    ).forEach((element) => {
      gsap.from(element.children, {
        y: 52,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 82%',
          once: true,
        },
      });
    });

    gsap.utils.toArray<HTMLElement>('.reveal-row').forEach((row) => {
      gsap.from(row.children, {
        y: 36,
        opacity: 0,
        duration: 0.8,
        stagger: 0.07,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: row,
          start: 'top 84%',
          once: true,
        },
      });
    });

    ScrollTrigger.refresh();

    return () => {
      media.revert();
      window.removeEventListener('scroll', syncNav);
    };
  }, []);

  return null;
}
