'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  offset?: 'sm' | 'md' | 'lg';
};

const hiddenOffset = {
  sm: 'translate-y-4',
  md: 'translate-y-8',
  lg: 'translate-y-12',
};

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  offset = 'md',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={[
        className,
        'transform-gpu transition-[opacity,transform,filter] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transform-none motion-reduce:transition-none',
        isVisible
          ? 'translate-y-0 opacity-100 blur-0'
          : `${hiddenOffset[offset]} opacity-0 blur-[2px]`,
      ].join(' ')}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
