import Image from 'next/image';
import type { HelpItem } from '@/types';
import { accentText } from '@/lib/accents';
import { Icon } from './ui/Icon';
import { RevealOnScroll } from './ui/RevealOnScroll';

interface HelpGridProps {
  items: HelpItem[];
}

export function HelpGrid({ items }: HelpGridProps) {
  return (
    <RevealOnScroll className="py-24">
      <h2 className="mb-12 font-headline-lg text-headline-lg">
        What I Can <span className="text-gradient">Help With</span>
      </h2>
      <div className="grid h-auto grid-cols-1 gap-6 md:h-[600px] md:grid-cols-12">
        {items.map((item) => (
          <HelpCard key={item.title} item={item} />
        ))}
      </div>
    </RevealOnScroll>
  );
}

function HelpCard({ item }: { item: HelpItem }) {
  const spanClass = item.span === 8 ? 'md:col-span-8' : 'md:col-span-4';

  if (item.image) {
    return (
      <div className={`glass-card group relative overflow-hidden rounded-3xl p-8 ${spanClass}`}>
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover opacity-20 transition-transform duration-1000 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 60vw"
        />
        <div className="relative z-10 flex h-full flex-col justify-end">
          <h3 className="mb-2 font-headline-md text-3xl">{item.title}</h3>
          <p className="max-w-md text-on-surface-variant">{item.description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`glass-card flex flex-col justify-between rounded-3xl p-8 ${spanClass}`}>
      {item.icon && <Icon name={item.icon} className={`text-5xl ${accentText[item.accent]}`} />}
      <div>
        <h3 className="mb-2 font-headline-md text-2xl">{item.title}</h3>
        <p className="text-on-surface-variant">{item.description}</p>
      </div>
    </div>
  );
}
