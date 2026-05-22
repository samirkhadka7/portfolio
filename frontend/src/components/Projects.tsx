import Image from 'next/image';
import type { Project } from '@/types';
import { accentBgTag, accentText } from '@/lib/accents';
import { Icon } from './ui/Icon';
import { RevealOnScroll } from './ui/RevealOnScroll';
import { TiltCard } from './ui/TiltCard';

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  const main = projects.find((p) => p.size === 'main');
  const medium = projects.filter((p) => p.size === 'medium');
  const small = projects.filter((p) => p.size === 'small');

  return (
    <RevealOnScroll id="projects" className="py-24">
      <h2 className="mb-12 font-headline-lg text-headline-lg">Featured Engineering Work</h2>

      <div className="grid h-auto grid-cols-1 gap-6 md:h-[800px] md:grid-cols-6 md:grid-rows-2">
        {main && (
          <div className="glass-card group relative overflow-hidden rounded-3xl md:col-span-4 md:row-span-2">
            {main.image && (
              <Image
                src={main.image}
                alt={main.title}
                fill
                className="object-cover opacity-40 transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            )}
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-surface to-transparent p-10">
              <div className="mb-4 flex translate-y-4 gap-2 transition-transform group-hover:translate-y-0">
                {main.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-full border px-3 py-1 font-label-md text-xs ${accentBgTag[main.accent]}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="mb-4 font-headline-lg text-headline-lg">{main.title}</h3>
              <p className="max-w-xl font-body-md text-body-md text-on-surface-variant opacity-0 transition-opacity group-hover:opacity-100">
                {main.description}
              </p>
            </div>
          </div>
        )}

        {medium.map((project) => (
          <TiltCard
            key={project.slug}
            className="glass-card group relative overflow-hidden rounded-3xl md:col-span-2"
          >
            <div className="flex h-full flex-col justify-between p-8">
              <div>
                {project.icon && (
                  <Icon
                    name={project.icon}
                    className={`mb-4 text-4xl ${accentText[project.accent]}`}
                  />
                )}
                <h3 className="font-headline-md text-headline-md">{project.title}</h3>
              </div>
              <p className="mt-4 text-sm text-on-surface-variant">{project.description}</p>
              <div className="mt-4 flex gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className={`font-label-md text-xs ${accentText[project.accent]}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </TiltCard>
        ))}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {small.map((project) => (
          <TiltCard
            key={project.slug}
            className="glass-card flex items-center gap-6 rounded-2xl p-6"
          >
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-surface-container-high">
              {project.icon && (
                <Icon name={project.icon} className={`text-4xl ${accentText[project.accent]}`} />
              )}
            </div>
            <div>
              <h4 className="font-headline-md text-lg">{project.title}</h4>
              <p className="text-sm text-on-surface-variant">{project.description}</p>
            </div>
          </TiltCard>
        ))}
      </div>
    </RevealOnScroll>
  );
}
