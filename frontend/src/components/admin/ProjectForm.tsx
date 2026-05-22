'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Project } from '@/types';
import { api } from '@/lib/api';
import { FormField, inputCls, selectCls, textareaCls } from './FormField';
import { ImageUpload } from './ImageUpload';

type ProjectFormValues = Omit<Project, 'tags'> & { tags: string; _id?: string };

interface ProjectFormProps {
  initial?: Partial<Project> & { _id?: string };
  mode: 'create' | 'edit';
}

const blank: ProjectFormValues = {
  slug: '',
  title: '',
  description: '',
  tags: '',
  image: '',
  icon: '',
  accent: 'primary',
  size: 'medium',
  link: '',
};

export function ProjectForm({ initial, mode }: ProjectFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<ProjectFormValues>(() => ({
    ...blank,
    ...initial,
    tags: initial?.tags?.join(', ') ?? '',
  }));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof ProjectFormValues>(key: K, value: ProjectFormValues[K]) =>
    setValues((v) => ({ ...v, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const payload = {
      slug: values.slug,
      title: values.title,
      description: values.description,
      tags: values.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      image: values.image ?? '',
      icon: values.icon ?? '',
      accent: values.accent,
      size: values.size,
      link: values.link ?? '',
    };

    try {
      if (mode === 'edit' && initial?._id) {
        await api(`/api/projects/${initial._id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
      } else {
        await api('/api/projects', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      }
      router.push('/admin/projects');
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
        <FormField label="Slug" htmlFor="slug" hint="URL-friendly identifier, e.g. educonnect-lms">
          <input
            id="slug"
            value={values.slug}
            onChange={(e) => update('slug', e.target.value)}
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
        <FormField label="Tags" htmlFor="tags" hint="Comma-separated, e.g. Next.js, Postgres">
          <input
            id="tags"
            value={values.tags}
            onChange={(e) => update('tags', e.target.value)}
            className={inputCls}
          />
        </FormField>
        <FormField
          label="Icon (Material Symbols name)"
          htmlFor="icon"
          hint="e.g. analytics, database, account_tree"
        >
          <input
            id="icon"
            value={values.icon}
            onChange={(e) => update('icon', e.target.value)}
            className={inputCls}
          />
        </FormField>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="Accent" htmlFor="accent">
          <select
            id="accent"
            value={values.accent}
            onChange={(e) => update('accent', e.target.value as Project['accent'])}
            className={selectCls}
          >
            <option value="primary">Primary (cyan)</option>
            <option value="secondary">Secondary (blue)</option>
            <option value="tertiary">Tertiary (purple)</option>
            <option value="error">Error (orange-red)</option>
          </select>
        </FormField>
        <FormField label="Size" htmlFor="size" hint="main = featured image; medium/small = icon card">
          <select
            id="size"
            value={values.size}
            onChange={(e) => update('size', e.target.value as Project['size'])}
            className={selectCls}
          >
            <option value="main">Main (big, image-backed)</option>
            <option value="medium">Medium (icon card)</option>
            <option value="small">Small (icon + small text)</option>
          </select>
        </FormField>
      </div>

      <FormField label="Image" hint="Upload or paste URL. Used for size=main cards.">
        <ImageUpload value={values.image ?? ''} onChange={(url) => update('image', url)} />
      </FormField>

      <FormField label="External Link (optional)" htmlFor="link">
        <input
          id="link"
          type="url"
          value={values.link ?? ''}
          onChange={(e) => update('link', e.target.value)}
          placeholder="https://..."
          className={inputCls}
        />
      </FormField>

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
          {submitting ? 'Saving...' : mode === 'edit' ? 'Save changes' : 'Create project'}
        </button>
        <Link
          href="/admin/projects"
          className="rounded-xl border border-outline-variant/40 px-6 py-3 font-label-md text-on-surface-variant transition-colors hover:bg-surface-container/40"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
