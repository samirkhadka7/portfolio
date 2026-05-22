import type { StatItem } from '@/types';
import { RevealOnScroll } from './ui/RevealOnScroll';
import { TiltCard } from './ui/TiltCard';

interface AboutProps {
  aboutStats: StatItem[];
}

export function About({ aboutStats }: AboutProps) {
  return (
    <RevealOnScroll id="about" className="py-24">
      <div className="grid items-center gap-16 md:grid-cols-2">
        <div className="space-y-6">
          <div className="font-label-md text-label-md uppercase tracking-widest text-primary">
            My Story
          </div>
          <h2 className="font-headline-lg text-headline-lg">
            Bridging Development <br /> and Data Architecture
          </h2>
          <div className="h-1.5 w-20 rounded-full bg-primary" />
        </div>
        <TiltCard className="glass-card space-y-6 rounded-3xl p-8">
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            My journey began in the world of Full Stack development, building seamless user
            experiences with React and robust backends with Node.js. As I scaled applications, I
            became fascinated by the sheer volume of data they generated.
          </p>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            This led me to explore Data Engineering and Machine Learning. Today, I specialize in
            creating the infrastructure that allows data to flow reliably and using ML to turn that
            data into predictive insights.
          </p>
          <div className="flex gap-8">
            {aboutStats.map((stat) => (
              <div key={stat.label}>
                <div className="font-headline-md text-headline-md text-primary">{stat.value}</div>
                <div className="font-label-sm text-label-sm text-on-surface-variant">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </TiltCard>
      </div>
    </RevealOnScroll>
  );
}
