'use client';

import Image from 'next/image';
import { useTypewriter } from '@/hooks/useTypewriter';
import type { SiteConfig } from '@/types';
import { Icon } from './ui/Icon';

interface HeroProps {
  site: SiteConfig;
}

export function Hero({ site }: HeroProps) {
  const typewriterText = useTypewriter(site.terminalPhrases);

  return (
    <section
      id="home"
      className="flex min-h-screen flex-col items-center justify-between gap-12 py-20 md:flex-row"
    >
      <div className="flex-1 space-y-8">
        <div className="bloom-cyan inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 font-label-sm text-label-sm text-primary">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Freelance Available
        </div>

        <h1 className="font-display-lg-mobile text-display-lg-mobile leading-tight md:font-display-lg md:text-display-lg">
          Part-Time <span className="text-gradient">Full Stack</span> Developer &{' '}
          <span className="text-gradient">Data Engineer</span>
        </h1>

        <p className="max-w-xl font-body-lg text-body-lg text-on-surface-variant">
          {site.description}
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <a
            href="#projects"
            className="animate-pulse-glow rounded-xl bg-gradient-primary px-8 py-4 font-label-md text-label-md font-bold text-on-primary transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]"
          >
            View Projects
          </a>
          <a
            href={site.resumeUrl}
            className="rounded-xl border border-outline-variant bg-surface-container-lowest/50 px-8 py-4 font-label-md text-label-md font-bold text-on-surface backdrop-blur-md transition-all hover:bg-surface-variant/20"
          >
            Download Resume
          </a>
        </div>
      </div>

      <div className="relative flex aspect-square w-full max-w-lg flex-1 items-center justify-center">
        <div className="absolute inset-0 animate-pulse rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-tertiary/20 blur-3xl" />

        <div className="glass-card terminal-glow relative z-10 w-full overflow-hidden rounded-2xl">
          <div className="flex items-center gap-2 border-b border-outline-variant/20 bg-surface-container-highest px-4 py-2">
            <div className="h-3 w-3 rounded-full bg-error" />
            <div className="h-3 w-3 rounded-full bg-tertiary" />
            <div className="h-3 w-3 rounded-full bg-primary" />
            <div className="ml-4 font-label-sm text-label-sm text-on-surface-variant">
              bash — portfolio.sh
            </div>
          </div>
          <div className="space-y-4 p-6 font-label-md text-label-md text-on-surface">
            <div className="flex gap-3">
              <span className="text-primary">$</span>
              <span>{typewriterText}</span>
              <span className="animate-blink text-primary">|</span>
            </div>
            <div className="flex justify-center py-6">
              {site.avatar && (
                <Image
                  src={site.avatar}
                  alt={`${site.brand} portrait`}
                  width={192}
                  height={192}
                  className="h-48 w-48 rounded-2xl border-2 border-primary/30 object-cover shadow-2xl transition-all duration-700 hover:scale-105"
                />
              )}
            </div>
            <div className="border-t border-outline-variant/10 pt-4 text-sm text-on-surface-variant">
              <p>Location: {site.location}</p>
              <p>Status: {site.status}</p>
            </div>
          </div>
        </div>

        <div
          className="glass-card absolute -left-4 -top-4 animate-float rounded-xl p-4"
          style={{ animationDelay: '0s' }}
        >
          <Icon name="database" className="text-3xl text-primary" />
        </div>
        <div
          className="glass-card absolute -right-4 bottom-10 animate-float rounded-xl p-4"
          style={{ animationDelay: '1s' }}
        >
          <Icon name="deployed_code" className="text-3xl text-tertiary" />
        </div>
        <div
          className="glass-card absolute -left-12 top-1/2 animate-float rounded-xl p-4"
          style={{ animationDelay: '2s' }}
        >
          <Icon name="monitoring" className="text-3xl text-secondary" />
        </div>
      </div>
    </section>
  );
}
