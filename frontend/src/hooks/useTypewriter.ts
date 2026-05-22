'use client';

import { useEffect, useState } from 'react';

interface UseTypewriterOptions {
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  pauseBeforeNext?: number;
}

export function useTypewriter(
  phrases: string[],
  {
    typeSpeed = 60,
    deleteSpeed = 30,
    pauseDuration = 2000,
    pauseBeforeNext = 500,
  }: UseTypewriterOptions = {},
): string {
  const [text, setText] = useState('');

  useEffect(() => {
    if (phrases.length === 0) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const currentPhrase = phrases[phraseIndex] ?? '';

      if (isDeleting) {
        charIndex -= 1;
        setText(currentPhrase.substring(0, charIndex));
      } else {
        charIndex += 1;
        setText(currentPhrase.substring(0, charIndex));
      }

      let nextDelay = isDeleting ? deleteSpeed : typeSpeed;

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        nextDelay = pauseDuration;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        nextDelay = pauseBeforeNext;
      }

      timeout = setTimeout(tick, nextDelay);
    };

    tick();

    return () => clearTimeout(timeout);
  }, [phrases, typeSpeed, deleteSpeed, pauseDuration, pauseBeforeNext]);

  return text;
}
