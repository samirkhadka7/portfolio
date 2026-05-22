import type { Service } from '@/types';
import { accentBgSoft, accentText } from '@/lib/accents';
import { Icon } from './ui/Icon';
import { RevealOnScroll } from './ui/RevealOnScroll';
import { TiltCard } from './ui/TiltCard';

interface ServicesProps {
  services: Service[];
}

export function Services({ services }: ServicesProps) {
  return (
    <RevealOnScroll id="services" className="py-24">
      <div className="mb-16 text-center">
        <h2 className="font-headline-lg text-headline-lg">Expert Freelance Services</h2>
        <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-secondary" />
      </div>
      <div className="grid gap-8 md:grid-cols-4">
        {services.map((service) => (
          <TiltCard
            key={service.title}
            className="glass-card space-y-4 rounded-3xl p-8 text-center"
          >
            <div
              className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${accentBgSoft[service.accent]}`}
            >
              <Icon name={service.icon} className={`text-3xl ${accentText[service.accent]}`} />
            </div>
            <h3 className="font-headline-md text-xl">{service.title}</h3>
            <p className="text-sm text-on-surface-variant">{service.description}</p>
          </TiltCard>
        ))}
      </div>
    </RevealOnScroll>
  );
}
