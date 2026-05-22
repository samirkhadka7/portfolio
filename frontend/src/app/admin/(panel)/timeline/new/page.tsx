import Link from 'next/link';
import { TimelineForm } from '@/components/admin/TimelineForm';

export default function NewTimelineEntryPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <Link
          href="/admin/timeline"
          className="font-label-sm text-sm text-on-surface-variant hover:text-primary"
        >
          ← Back to timeline
        </Link>
        <h1 className="font-headline-lg text-headline-lg">New Timeline Entry</h1>
      </header>
      <TimelineForm mode="create" />
    </div>
  );
}
