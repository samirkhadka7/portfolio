'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Icon } from '@/components/ui/Icon';

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function ContactsPage() {
  const [items, setItems] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    setError(null);
    api<ContactMessage[]>('/api/contact')
      .then(setItems)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const markRead = async (id: string) => {
    try {
      const updated = await api<ContactMessage>(`/api/contact/${id}/read`, { method: 'PATCH' });
      setItems((items) => items.map((m) => (m._id === id ? updated : m)));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Update failed');
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm('Delete this message? This cannot be undone.')) return;
    try {
      await api(`/api/contact/${id}`, { method: 'DELETE' });
      setItems((items) => items.filter((m) => m._id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  const unreadCount = items.filter((m) => !m.read).length;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-headline-lg text-headline-lg">Contacts</h1>
        <p className="mt-2 font-body-md text-on-surface-variant">
          {items.length} total · {unreadCount} unread
        </p>
      </header>

      {loading && <p className="text-on-surface-variant">Loading...</p>}
      {error && (
        <p className="rounded-xl border border-error/30 bg-error/10 p-3 text-sm text-error">
          {error}
        </p>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="glass-card rounded-2xl p-12 text-center">
          <Icon name="inbox" className="mb-4 text-5xl text-on-surface-variant" />
          <p className="text-on-surface-variant">No contact messages yet.</p>
        </div>
      )}

      {!loading && items.length > 0 && (
        <div className="space-y-3">
          {items.map((m) => (
            <article
              key={m._id}
              className={`glass-card space-y-3 rounded-2xl p-5 ${
                m.read ? 'opacity-70' : 'border-l-4 border-primary'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="font-headline-md text-lg">{m.name}</h2>
                    {!m.read && (
                      <span className="rounded-full bg-primary/20 px-2 py-0.5 font-label-sm text-xs text-primary">
                        NEW
                      </span>
                    )}
                  </div>
                  <a
                    href={`mailto:${m.email}`}
                    className="font-label-sm text-sm text-primary hover:underline"
                  >
                    {m.email}
                  </a>
                  {m.service && (
                    <p className="font-label-sm text-xs text-on-surface-variant">
                      Service: {m.service}
                    </p>
                  )}
                </div>
                <time className="font-label-sm text-xs text-on-surface-variant">
                  {new Date(m.createdAt).toLocaleString()}
                </time>
              </div>
              <p className="whitespace-pre-wrap text-sm text-on-surface">{m.message}</p>
              <div className="flex gap-2 pt-2">
                {!m.read && (
                  <button
                    type="button"
                    onClick={() => markRead(m._id)}
                    className="rounded-xl border border-primary/30 bg-primary/10 px-4 py-2 font-label-md text-sm text-primary transition-colors hover:bg-primary/20"
                  >
                    Mark as read
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => remove(m._id)}
                  className="rounded-xl border border-error/30 bg-error/10 px-4 py-2 font-label-md text-sm text-error transition-colors hover:bg-error/20"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
