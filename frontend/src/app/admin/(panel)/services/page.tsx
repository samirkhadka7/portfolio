'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Service } from '@/types';
import { api } from '@/lib/api';
import { accentText } from '@/lib/accents';
import { Icon } from '@/components/ui/Icon';

interface Row extends Service {
  _id: string;
}

export default function ServicesListPage() {
  const [items, setItems] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    api<Row[]>('/api/services')
      .then(setItems)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete service "${title}"?`)) return;
    setDeletingId(id);
    try {
      await api(`/api/services/${id}`, { method: 'DELETE' });
      setItems((p) => p.filter((x) => x._id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg">Services</h1>
          <p className="mt-2 font-body-md text-on-surface-variant">
            {items.length} {items.length === 1 ? 'service' : 'services'}
          </p>
        </div>
        <Link
          href="/admin/services/new"
          className="flex items-center gap-2 rounded-xl bg-gradient-primary px-5 py-3 font-label-md font-bold text-on-primary-container transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
        >
          <Icon name="add" /> New service
        </Link>
      </header>

      {loading && <p className="text-on-surface-variant">Loading...</p>}
      {error && (
        <p className="rounded-xl border border-error/30 bg-error/10 p-3 text-sm text-error">
          {error}
        </p>
      )}

      {!loading && items.length === 0 && !error && (
        <div className="glass-card rounded-2xl p-12 text-center">
          <Icon name="design_services" className="mb-4 text-5xl text-on-surface-variant" />
          <p className="text-on-surface-variant">No services yet.</p>
        </div>
      )}

      {!loading && items.length > 0 && (
        <div className="space-y-3">
          {items.map((s) => (
            <div
              key={s._id}
              className="glass-card flex items-center justify-between gap-4 rounded-2xl p-5"
            >
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center gap-3">
                  <Icon name={s.icon} className={`text-2xl ${accentText[s.accent]}`} />
                  <h2 className="truncate font-headline-md text-lg">{s.title}</h2>
                </div>
                <p className="truncate text-sm text-on-surface-variant">{s.description}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Link
                  href={`/admin/services/${s._id}`}
                  className="rounded-xl border border-primary/30 bg-primary/10 px-4 py-2 font-label-md text-sm text-primary transition-colors hover:bg-primary/20"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(s._id, s.title)}
                  disabled={deletingId === s._id}
                  className="rounded-xl border border-error/30 bg-error/10 px-4 py-2 font-label-md text-sm text-error transition-colors hover:bg-error/20 disabled:opacity-50"
                >
                  {deletingId === s._id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
