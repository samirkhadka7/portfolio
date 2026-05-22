import Link from 'next/link';
import { HelpItemForm } from '@/components/admin/HelpItemForm';

export default function NewHelpItemPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <Link
          href="/admin/help"
          className="font-label-sm text-sm text-on-surface-variant hover:text-primary"
        >
          ← Back to help grid
        </Link>
        <h1 className="font-headline-lg text-headline-lg">New Help Item</h1>
      </header>
      <HelpItemForm mode="create" />
    </div>
  );
}
