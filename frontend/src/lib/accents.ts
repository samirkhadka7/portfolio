import type { AccentColor } from '@/types';

export const accentText: Record<AccentColor, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  tertiary: 'text-tertiary',
  error: 'text-error',
};

export const accentBg: Record<AccentColor, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
  error: 'bg-error',
};

export const accentBgSoft: Record<AccentColor, string> = {
  primary: 'bg-primary/10',
  secondary: 'bg-secondary/10',
  tertiary: 'bg-tertiary/10',
  error: 'bg-error/10',
};

export const accentBgTag: Record<AccentColor, string> = {
  primary: 'bg-primary/20 text-primary border-primary/30',
  secondary: 'bg-secondary/20 text-secondary border-secondary/30',
  tertiary: 'bg-tertiary/20 text-tertiary border-tertiary/30',
  error: 'bg-error/20 text-error border-error/30',
};

export const accentBorderLeft: Record<AccentColor, string> = {
  primary: 'border-l-primary',
  secondary: 'border-l-secondary',
  tertiary: 'border-l-tertiary',
  error: 'border-l-error',
};

export const accentHoverBg: Record<AccentColor, string> = {
  primary: 'hover:bg-primary/20',
  secondary: 'hover:bg-secondary/20',
  tertiary: 'hover:bg-tertiary/20',
  error: 'hover:bg-error/20',
};

export const timelineDot: Record<AccentColor | 'muted', string> = {
  primary: 'bg-primary shadow-[0_0_10px_#4cd7f6]',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
  error: 'bg-error',
  muted: 'bg-outline-variant',
};

export const timelinePeriod: Record<AccentColor | 'muted', string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  tertiary: 'text-tertiary',
  error: 'text-error',
  muted: 'text-on-surface-variant',
};
