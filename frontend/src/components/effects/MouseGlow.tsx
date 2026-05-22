'use client';

import { useEffect, useRef } from 'react';

export function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    const grid = gridRef.current;
    if (!glow || !grid) return;

    const onMove = (e: MouseEvent) => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
      glow.style.opacity = '1';

      const xPct = (e.clientX / window.innerWidth) * 100;
      const yPct = (e.clientY / window.innerHeight) * 100;
      grid.style.setProperty('--mouse-x', `${xPct}%`);
      grid.style.setProperty('--mouse-y', `${yPct}%`);
    };

    const onLeave = () => {
      glow.style.opacity = '0';
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <>
      <div ref={gridRef} className="bg-grid pointer-events-none fixed inset-0" aria-hidden="true" />
      <div ref={glowRef} id="mouse-glow" aria-hidden="true" />
    </>
  );
}
