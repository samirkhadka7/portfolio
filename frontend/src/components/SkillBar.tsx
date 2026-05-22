'use client';

import { motion } from 'framer-motion';
import type { AccentColor, Skill } from '@/types';
import { accentBg } from '@/lib/accents';

interface SkillBarProps {
  skill: Skill;
  accent: AccentColor;
}

export function SkillBar({ skill, accent }: SkillBarProps) {
  const barColor = accent === 'primary' ? `${accentBg[accent]} bloom-cyan` : accentBg[accent];

  return (
    <li className="space-y-2">
      <div className="flex justify-between font-label-sm text-label-sm">
        <span>{skill.name}</span>
        <span>{skill.level}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container-highest">
        <motion.div
          className={`h-full ${barColor}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
        />
      </div>
    </li>
  );
}
