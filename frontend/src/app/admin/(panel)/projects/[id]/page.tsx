'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import type { Project } from '@/types';
import { api } from '@/lib/api';
import { ProjectForm } from '@/components/admin/ProjectForm';

interface ProjectWithId extends Project {
  _id: string;
}

export default function EditProjectPage() {
  const params = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectWithId | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params.id) return;
    api<ProjectWithId>(`/api/projects/${params.id}`)
      .then(setProject)
      .catch((err) =>
        setError(err instanceof Error ? err.message : 'Failed to load project'),
      )
      .finally(() => setLoading(false));
  }, [params.id]);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <Link
          href="/admin/projects"
          className="font-label-sm text-sm text-on-surface-variant hover:text-primary"
        >
          ← Back to projects
        </Link>
        <h1 className="font-headline-lg text-headline-lg">
          {project ? `Edit: ${project.title}` : 'Edit Project'}
        </h1>
      </header>

      {loading && <p className="text-on-surface-variant">Loading...</p>}
      {error && (
        <p className="rounded-xl border border-error/30 bg-error/10 p-3 text-sm text-error">
          {error}
        </p>
      )}
      {project && <ProjectForm mode="edit" initial={project} />}
    </div>
  );
}
