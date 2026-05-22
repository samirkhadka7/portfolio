'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { TimelineEntry } from '@/types';
import { api } from '@/lib/api';
import { FormField, inputCls, selectCls, textareaCls } from './FormField';

type Values = TimelineEntry & { order: number };

interface TimelineFormProps {
  initial?: Partial<TimelineEntry> & { order?: number; _id?: string };
  mode: 'create' | 'edit';
}

const blank: Values = {
  period: '',
  title: '',
  description: '',
  accent: 'primary',
  order: 0,
};

export function TimelineForm({ initial, mode }: TimelineFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<Values>(() => ({ ...blank, ...initial }));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof Values>(key: K, value: Values[K]) =>
    setValues((v) => ({ ...v, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      if (mode === 'edit' && initial?._id) {
        await api(`/api/timeline/${initial._id}`, {
          method: 'PUT',
          body: JSON.stringify(values),
        });
      } else {
        await api('/api/timeline', { method: 'POST', body: JSON.stringify(values) });
      }
      router.push('/admin/timeline');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="Period" htmlFor="period" hint="e.g. 2024 - Present, 2022 - 2023">
          <input
            id="period"
            value={values.period}
            onChange={(e) => update('period', e.target.value)}
            required
            className={inputCls}
          />
        </FormField>
        <FormField label="Title" htmlFor="title">
          <input
            id="title"
            value={values.title}
            onChange={(e) => update('title', e.target.value)}
            required
            className={inputCls}
          />
        </FormField>
      </div>

      <FormField label="Description" htmlFor="description">
        <textarea
          id="description"
          value={values.description}
          onChange={(e) => update('description', e.target.value)}
          required
          rows={3}
          className={textareaCls}
        />
      </FormField>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="Accent" htmlFor="accent" hint="'muted' = grayed-out (use for older entries)">
          <select
            id="accent"
            value={values.accent}
            onChange={(e) => update('accent', e.target.value as TimelineEntry['accent'])}
            className={selectCls}
          >
            <option value="primary">Primary (cyan, glowing dot)</option>
            <option value="secondary">Secondary</option>
            <option value="tertiary">Tertiary</option>
            <option value="error">Error</option>
            <option value="muted">Muted (gray)</option>
          </select>
        </FormField>
        <FormField label="Order" htmlFor="order" hint="Lower = appears first (top)">
          <input
            id="order"
            type="number"
            value={values.order}
            onChange={(e) => update('order', Number(e.target.value))}
            className={inputCls}
          />
        </FormField>
      </div>

      {error && (
        <p className="rounded-xl border border-error/30 bg-error/10 p-3 text-sm text-error">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-gradient-primary px-6 py-3 font-label-md font-bold text-on-primary-container transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] disabled:opacity-50"
        >
          {submitting ? 'Saving...' : mode === 'edit' ? 'Save changes' : 'Create entry'}
        </button>
        <Link
          href="/admin/timeline"
          className="rounded-xl border border-outline-variant/40 px-6 py-3 font-label-md text-on-surface-variant transition-colors hover:bg-surface-container/40"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
