'use client';

import { useState } from 'react';
import { useActiveSection } from '@/hooks/useActiveSection';
import { Icon } from './ui/Icon';
import type { NavLink } from '@/types';

interface NavbarProps {
  brand: string;
  navLinks: NavLink[];
}

export function Navbar({ brand, navLinks }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const sectionIds = navLinks.map((l) => l.href.replace('#', ''));
  const activeId = useActiveSection(sectionIds);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-outline-variant/10 bg-surface/60 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-container-max items-center justify-between px-margin-mobile py-4 md:px-margin-desktop">
        <div className="font-headline-md text-headline-md font-bold text-on-surface">{brand}</div>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const id = link.href.replace('#', '');
            const isActive = id === activeId;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative font-label-md text-label-md transition-colors duration-300 ${
                  isActive
                    ? 'nav-link-active'
                    : 'font-medium text-on-surface-variant hover:text-primary'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <a
          href="#contact"
          className="hidden rounded-full bg-gradient-primary px-6 py-2 font-label-md text-label-md font-bold text-on-primary-container transition-transform duration-200 animate-pulse-glow active:scale-95 md:inline-flex"
        >
          Hire Me
        </a>

        <button
          type="button"
          className="text-on-surface md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <Icon name={open ? 'close' : 'menu'} className="text-3xl" />
        </button>
      </div>

      {open && (
        <div className="border-t border-outline-variant/10 bg-surface/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-container-max flex-col gap-1 px-margin-mobile py-4">
            {navLinks.map((link) => {
              const id = link.href.replace('#', '');
              const isActive = id === activeId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-4 py-3 font-label-md transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-on-surface-variant hover:bg-surface-container/40 hover:text-on-surface'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gradient-primary px-6 py-3 text-center font-label-md font-bold text-on-primary-container"
            >
              Hire Me
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
