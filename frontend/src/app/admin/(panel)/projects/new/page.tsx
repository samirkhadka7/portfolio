import Link from 'next/link';
import { ProjectForm } from '@/components/admin/ProjectForm';

export default function NewProjectPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <Link
          href="/admin/projects"
          className="font-label-sm text-sm text-on-surface-variant hover:text-primary"
        >
          ← Back to projects
        </Link>
        <h1 className="font-headline-lg text-headline-lg">New Project</h1>
      </header>
      <ProjectForm mode="create" />
    </div>
  );
}
