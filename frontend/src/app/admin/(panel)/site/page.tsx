'use client';

import { useEffect, useState } from 'react';
import type { SiteConfig } from '@/types';
import { api } from '@/lib/api';
import { siteConfig as fallbackSite } from '@/data/site';
import { SiteConfigForm } from '@/components/admin/SiteConfigForm';

export default function SiteConfigPage() {
  const [site, setSite] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api<SiteConfig | null>('/api/site')
      .then((data) => setSite(data ?? fallbackSite))
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load');
        setSite(fallbackSite);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-headline-lg text-headline-lg">Site Config</h1>
        <p className="mt-2 font-body-md text-on-surface-variant">
          Hero copy, social links, stats, terminal phrases — controls every section of the public
          site.
        </p>
      </header>

      {loading && <p className="text-on-surface-variant">Loading...</p>}
      {error && (
        <p className="rounded-xl border border-error/30 bg-error/10 p-3 text-sm text-error">
          {error} (showing fallback values; saving will create a new DB record)
        </p>
      )}
      {site && <SiteConfigForm initial={site} />}
    </div>
  );
}
