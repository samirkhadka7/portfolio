import type { SkillCategory } from '@/types';
import { accentText } from '@/lib/accents';
import { Icon } from './ui/Icon';
import { RevealOnScroll } from './ui/RevealOnScroll';
import { SkillBar } from './SkillBar';
import { TiltCard } from './ui/TiltCard';

interface SkillsProps {
  categories: SkillCategory[];
}

export function Skills({ categories }: SkillsProps) {
  return (
    <RevealOnScroll id="skills" className="py-24">
      <div className="mb-16 space-y-4 text-center">
        <h2 className="font-headline-lg text-headline-lg">Tech Ecosystem</h2>
        <p className="mx-auto max-w-2xl font-body-md text-body-md text-on-surface-variant">
          Modern tools I use to build, scale, and analyze digital products.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <TiltCard key={category.key} className="glass-card rounded-2xl p-6">
            <div className="mb-6 flex items-center gap-3">
              <Icon name={category.icon} className={accentText[category.accent]} />
              <h3 className="font-headline-md text-lg text-headline-md">{category.title}</h3>
            </div>
            <ul className="space-y-4">
              {category.skills.map((skill) => (
                <SkillBar key={skill.name} skill={skill} accent={category.accent} />
              ))}
            </ul>
          </TiltCard>
        ))}
      </div>
    </RevealOnScroll>
  );
}
