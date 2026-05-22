import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="glass-card max-w-lg space-y-6 rounded-3xl p-12 text-center">
        <div className="font-display-lg text-9xl font-bold leading-none">
          <span className="text-gradient">404</span>
        </div>
        <h1 className="font-headline-md text-headline-md">Page not found</h1>
        <p className="font-body-md text-on-surface-variant">
          The route you&apos;re looking for doesn&apos;t exist. It may have been moved, renamed,
          or never existed in the first place.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-4">
          <Link
            href="/"
            className="rounded-xl bg-gradient-primary px-6 py-3 font-label-md font-bold text-on-primary-container transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
          >
            Back to home
          </Link>
          <Link
            href="/#contact"
            className="rounded-xl border border-outline-variant/40 px-6 py-3 font-label-md text-on-surface-variant transition-colors hover:bg-surface-container/40"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </main>
  );
}
