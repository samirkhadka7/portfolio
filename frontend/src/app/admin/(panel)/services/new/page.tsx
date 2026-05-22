import Link from 'next/link';
import { ServiceForm } from '@/components/admin/ServiceForm';

export default function NewServicePage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <Link
          href="/admin/services"
          className="font-label-sm text-sm text-on-surface-variant hover:text-primary"
        >
          ← Back to services
        </Link>
        <h1 className="font-headline-lg text-headline-lg">New Service</h1>
      </header>
      <ServiceForm mode="create" />
    </div>
  );
}
