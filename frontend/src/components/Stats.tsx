'use client';

import { motion } from 'framer-motion';
import type { LanguageBreakdown, StatItem, TimelineEntry } from '@/types';
import {
  accentBg,
  accentBorderLeft,
  accentText,
  timelineDot,
  timelinePeriod,
} from '@/lib/accents';
import { TiltCard } from './ui/TiltCard';

interface StatsProps {
  githubStats: StatItem[];
  topLanguages: LanguageBreakdown[];
  timeline: TimelineEntry[];
}

export function Stats({ githubStats, topLanguages, timeline }: StatsProps) {
  return (
    <motion.section
      className="grid gap-16 py-24 lg:grid-cols-2"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: [0.2, 1, 0.3, 1] }}
    >
      <div className="space-y-8">
        <h2 className="font-headline-md text-headline-md">Github Analytics</h2>
        <div className="grid grid-cols-2 gap-4">
          {githubStats.map((stat) => (
            <div
              key={stat.label}
              className={`glass-card rounded-2xl border-l-4 p-6 ${accentBorderLeft[stat.accent]}`}
            >
              <div className={`font-headline-lg ${accentText[stat.accent]}`}>{stat.value}</div>
              <div className="text-sm text-on-surface-variant">{stat.label}</div>
            </div>
          ))}
        </div>
        <TiltCard className="glass-card flex h-64 flex-col justify-center rounded-3xl p-8">
          <h4 className="mb-6 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
            Top Languages
          </h4>
          <div className="space-y-4">
            {topLanguages.map((lang) => (
              <div key={lang.name} className="flex items-center gap-4">
                <span className="w-20 font-label-md text-xs">{lang.name}</span>
                <div className="h-3 flex-1 overflow-hidden rounded-full bg-surface-container">
                  <motion.div
                    className={`h-full ${accentBg[lang.accent]}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.percentage}%` }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </TiltCard>
      </div>

      <div className="space-y-8">
        <h2 className="font-headline-md text-headline-md">Learning Journey</h2>
        <div className="relative space-y-12 pl-8 before:absolute before:bottom-2 before:left-0 before:top-2 before:w-[2px] before:bg-outline-variant/30 before:content-['']">
          {timeline.map((entry) => (
            <div key={entry.title} className="relative">
              <div
                className={`absolute -left-[41px] top-1 h-4 w-4 rounded-full border-4 border-surface ${timelineDot[entry.accent]}`}
              />
              <div className={`mb-1 font-label-md ${timelinePeriod[entry.accent]}`}>
                {entry.period}
              </div>
              <h4 className="font-headline-md text-lg">{entry.title}</h4>
              <p className="text-sm text-on-surface-variant">{entry.description}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
