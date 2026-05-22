'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { api } from '@/lib/api';
import { Icon } from '@/components/ui/Icon';

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: 'dashboard' },
  { href: '/admin/projects', label: 'Projects', icon: 'folder' },
  { href: '/admin/skills', label: 'Skills', icon: 'stars' },
  { href: '/admin/services', label: 'Services', icon: 'design_services' },
  { href: '/admin/timeline', label: 'Timeline', icon: 'timeline' },
  { href: '/admin/help', label: 'Help Grid', icon: 'handyman' },
  { href: '/admin/contacts', label: 'Contacts', icon: 'inbox' },
  { href: '/admin/site', label: 'Site Config', icon: 'settings' },
];

interface AdminShellProps {
  children: ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await api('/api/auth/logout', { method: 'POST' });
    } catch {
      // ignore — push to login regardless
    }
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="flex min-h-screen">
      <header className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between border-b border-outline-variant/10 bg-surface/80 px-4 py-3 backdrop-blur-xl md:hidden">
        <Link href="/admin" className="font-headline-md text-lg font-bold text-primary">
          Admin
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="text-on-surface"
        >
          <Icon name="menu" className="text-2xl" />
        </button>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`glass-card fixed left-0 top-0 z-50 flex h-screen w-64 flex-col gap-2 rounded-none border-r border-outline-variant/20 p-6 transition-transform duration-300 md:sticky ${
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="mb-8 flex items-start justify-between">
          <div>
            <Link
              href="/admin"
              className="font-headline-md text-headline-md font-bold text-primary"
              onClick={() => setOpen(false)}
            >
              Admin
            </Link>
            <p className="font-label-sm text-label-sm text-on-surface-variant">Portfolio CMS</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-on-surface-variant md:hidden"
            aria-label="Close menu"
          >
            <Icon name="close" className="text-2xl" />
          </button>
        </div>
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 font-label-md text-label-md transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-on-surface-variant hover:bg-surface-container/40 hover:text-on-surface'
                }`}
              >
                <Icon name={item.icon} className="text-xl" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 rounded-xl px-4 py-3 font-label-md text-label-md text-error transition-colors hover:bg-error/10"
        >
          <Icon name="logout" className="text-xl" />
          Logout
        </button>
      </aside>

      <main className="flex-1 px-6 pb-8 pt-20 md:px-12 md:pb-12 md:pt-12">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
