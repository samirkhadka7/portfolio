'use client';

import type { ReactNode } from 'react';
import { useTilt } from '@/hooks/useTilt';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function TiltCard({ children, className = '', intensity = 20 }: TiltCardProps) {
  const ref = useTilt<HTMLDivElement>(intensity);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
