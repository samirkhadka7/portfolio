'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import type { TimelineEntry } from '@/types';
import { api } from '@/lib/api';
import { TimelineForm } from '@/components/admin/TimelineForm';

interface WithId extends TimelineEntry {
  _id: string;
  order?: number;
}

export default function EditTimelinePage() {
  const params = useParams<{ id: string }>();
  const [item, setItem] = useState<WithId | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params.id) return;
    api<WithId>(`/api/timeline/${params.id}`)
      .then(setItem)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load'))
      .finally(() => setLoading(false));
  }, [params.id]);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <Link
          href="/admin/timeline"
          className="font-label-sm text-sm text-on-surface-variant hover:text-primary"
        >
          ← Back to timeline
        </Link>
        <h1 className="font-headline-lg text-headline-lg">
          {item ? `Edit: ${item.title}` : 'Edit Entry'}
        </h1>
      </header>

      {loading && <p className="text-on-surface-variant">Loading...</p>}
      {error && (
        <p className="rounded-xl border border-error/30 bg-error/10 p-3 text-sm text-error">
          {error}
        </p>
      )}
      {item && <TimelineForm mode="edit" initial={item} />}
    </div>
  );
}
