'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { SiteConfig } from '@/types';
import { api } from '@/lib/api';
import { FormField, inputCls, textareaCls } from './FormField';
import { ImageUpload } from './ImageUpload';

interface SiteConfigFormProps {
  initial: SiteConfig;
}

export function SiteConfigForm({ initial }: SiteConfigFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<SiteConfig>(initial);
  const [terminalPhrasesText, setTerminalPhrasesText] = useState(
    initial.terminalPhrases.join('\n'),
  );
  const [aboutStatsText, setAboutStatsText] = useState(
    JSON.stringify(initial.aboutStats, null, 2),
  );
  const [githubStatsText, setGithubStatsText] = useState(
    JSON.stringify(initial.githubStats, null, 2),
  );
  const [topLanguagesText, setTopLanguagesText] = useState(
    JSON.stringify(initial.topLanguages, null, 2),
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const update = <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) =>
    setValues((v) => ({ ...v, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const aboutStats = JSON.parse(aboutStatsText) as SiteConfig['aboutStats'];
      const githubStats = JSON.parse(githubStatsText) as SiteConfig['githubStats'];
      const topLanguages = JSON.parse(topLanguagesText) as SiteConfig['topLanguages'];
      const terminalPhrases = terminalPhrasesText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        ...values,
        terminalPhrases,
        aboutStats,
        githubStats,
        topLanguages,
      };

      await api('/api/site', {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
      setSuccess(true);
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
        <FormField label="Name (full name)" htmlFor="name">
          <input
            id="name"
            value={values.name}
            onChange={(e) => update('name', e.target.value)}
            required
            className={inputCls}
          />
        </FormField>
        <FormField label="Brand (shown in nav/footer)" htmlFor="brand">
          <input
            id="brand"
            value={values.brand}
            onChange={(e) => update('brand', e.target.value)}
            required
            className={inputCls}
          />
        </FormField>
      </div>

      <FormField label="Tagline" htmlFor="tagline">
        <input
          id="tagline"
          value={values.tagline}
          onChange={(e) => update('tagline', e.target.value)}
          required
          className={inputCls}
        />
      </FormField>

      <FormField label="Description (hero subtitle)" htmlFor="description">
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
        <FormField label="Location" htmlFor="location">
          <input
            id="location"
            value={values.location}
            onChange={(e) => update('location', e.target.value)}
            className={inputCls}
          />
        </FormField>
        <FormField label="Status" htmlFor="status">
          <input
            id="status"
            value={values.status}
            onChange={(e) => update('status', e.target.value)}
            className={inputCls}
          />
        </FormField>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="Email" htmlFor="email">
          <input
            id="email"
            type="email"
            value={values.email}
            onChange={(e) => update('email', e.target.value)}
            required
            className={inputCls}
          />
        </FormField>
        <FormField label="Resume URL" htmlFor="resumeUrl">
          <input
            id="resumeUrl"
            value={values.resumeUrl}
            onChange={(e) => update('resumeUrl', e.target.value)}
            className={inputCls}
          />
        </FormField>
      </div>

      <FormField label="Avatar">
        <ImageUpload value={values.avatar} onChange={(url) => update('avatar', url)} />
      </FormField>

      <div className="grid gap-6 md:grid-cols-3">
        <FormField label="Twitter" htmlFor="twitter">
          <input
            id="twitter"
            value={values.socials.twitter}
            onChange={(e) => update('socials', { ...values.socials, twitter: e.target.value })}
            className={inputCls}
          />
        </FormField>
        <FormField label="GitHub" htmlFor="github">
          <input
            id="github"
            value={values.socials.github}
            onChange={(e) => update('socials', { ...values.socials, github: e.target.value })}
            className={inputCls}
          />
        </FormField>
        <FormField label="LinkedIn" htmlFor="linkedin">
          <input
            id="linkedin"
            value={values.socials.linkedin}
            onChange={(e) => update('socials', { ...values.socials, linkedin: e.target.value })}
            className={inputCls}
          />
        </FormField>
      </div>

      <FormField label="Terminal phrases" hint="One phrase per line. Shown in the hero terminal.">
        <textarea
          value={terminalPhrasesText}
          onChange={(e) => setTerminalPhrasesText(e.target.value)}
          rows={6}
          className={textareaCls}
        />
      </FormField>

      <FormField
        label="About Stats (JSON)"
        hint='Array of {"label", "value", "accent"}. Shown in About section.'
      >
        <textarea
          value={aboutStatsText}
          onChange={(e) => setAboutStatsText(e.target.value)}
          rows={6}
          className={`${textareaCls} font-mono text-sm`}
        />
      </FormField>

      <FormField label="GitHub Stats (JSON)" hint="Same shape as About Stats.">
        <textarea
          value={githubStatsText}
          onChange={(e) => setGithubStatsText(e.target.value)}
          rows={5}
          className={`${textareaCls} font-mono text-sm`}
        />
      </FormField>

      <FormField
        label="Top Languages (JSON)"
        hint='Array of {"name", "percentage", "accent"}. Percentages should sum to 100.'
      >
        <textarea
          value={topLanguagesText}
          onChange={(e) => setTopLanguagesText(e.target.value)}
          rows={5}
          className={`${textareaCls} font-mono text-sm`}
        />
      </FormField>

      {error && (
        <p className="rounded-xl border border-error/30 bg-error/10 p-3 text-sm text-error">
          {error}
        </p>
      )}
      {success && (
        <p className="rounded-xl border border-primary/30 bg-primary/10 p-3 text-sm text-primary">
          Saved.
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-xl bg-gradient-primary px-6 py-3 font-label-md font-bold text-on-primary-container transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] disabled:opacity-50"
      >
        {submitting ? 'Saving...' : 'Save site config'}
      </button>
    </form>
  );
}
