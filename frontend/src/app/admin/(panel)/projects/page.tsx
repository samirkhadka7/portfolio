'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Project } from '@/types';
import { api } from '@/lib/api';
import { accentText } from '@/lib/accents';
import { Icon } from '@/components/ui/Icon';

interface ProjectRow extends Project {
  _id: string;
}

export default function ProjectsListPage() {
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api<ProjectRow[]>('/api/projects');
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete project "${title}"? This can't be undone.`)) return;
    setDeletingId(id);
    try {
      await api(`/api/projects/${id}`, { method: 'DELETE' });
      setProjects((p) => p.filter((x) => x._id !== id));
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
          <h1 className="font-headline-lg text-headline-lg">Projects</h1>
          <p className="mt-2 font-body-md text-on-surface-variant">
            {projects.length} {projects.length === 1 ? 'project' : 'projects'} total.
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 rounded-xl bg-gradient-primary px-5 py-3 font-label-md font-bold text-on-primary-container transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
        >
          <Icon name="add" />
          New project
        </Link>
      </header>

      {loading && <p className="text-on-surface-variant">Loading...</p>}

      {error && (
        <p className="rounded-xl border border-error/30 bg-error/10 p-3 text-sm text-error">
          {error}
        </p>
      )}

      {!loading && !error && projects.length === 0 && (
        <div className="glass-card rounded-2xl p-12 text-center">
          <Icon name="folder_open" className="mb-4 text-5xl text-on-surface-variant" />
          <p className="text-on-surface-variant">
            No projects yet. Create your first one to get started.
          </p>
        </div>
      )}

      {!loading && projects.length > 0 && (
        <div className="space-y-3">
          {projects.map((p) => (
            <div
              key={p._id}
              className="glass-card flex items-center justify-between gap-4 rounded-2xl p-5"
            >
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center gap-3">
                  <h2 className="truncate font-headline-md text-lg">{p.title}</h2>
                  <span
                    className={`rounded-full border border-current/30 px-2 py-0.5 font-label-sm text-xs ${accentText[p.accent]}`}
                  >
                    {p.size}
                  </span>
                </div>
                <p className="truncate text-sm text-on-surface-variant">{p.description}</p>
                <p className="font-label-sm text-xs text-on-surface-variant/70">
                  /{p.slug} · {p.tags.join(', ') || 'no tags'}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Link
                  href={`/admin/projects/${p._id}`}
                  className="rounded-xl border border-primary/30 bg-primary/10 px-4 py-2 font-label-md text-sm text-primary transition-colors hover:bg-primary/20"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(p._id, p.title)}
                  disabled={deletingId === p._id}
                  className="rounded-xl border border-error/30 bg-error/10 px-4 py-2 font-label-md text-sm text-error transition-colors hover:bg-error/20 disabled:opacity-50"
                >
                  {deletingId === p._id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
