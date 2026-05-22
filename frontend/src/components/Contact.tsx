'use client';

import { useState } from 'react';
import type { SiteConfig } from '@/types';
import { api } from '@/lib/api';
import { Icon } from './ui/Icon';

const SERVICE_OPTIONS = [
  'Full Stack Web App',
  'Data Pipeline / ETL',
  'ML Model Training',
  'General Consultation',
];

type SubmitStatus = 'idle' | 'success' | 'error';

interface ContactProps {
  site: SiteConfig;
}

export function Contact({ site }: ContactProps) {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus('idle');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      service: String(formData.get('service') ?? ''),
      message: String(formData.get('message') ?? ''),
    };

    try {
      await api('/api/contact', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="glass-card relative grid gap-10 overflow-hidden rounded-3xl p-6 sm:p-8 md:grid-cols-2 md:gap-16 md:rounded-[40px] md:p-12">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-[100px]" />
        <div className="relative z-10 space-y-8">
          <h2 className="font-headline-lg text-headline-lg">
            Let&apos;s build something <br /> intelligent.
          </h2>
          <p className="font-body-lg text-on-surface-variant">
            I&apos;m currently open for freelance projects and technical collaborations in Full
            Stack or Data Engineering.
          </p>
          <div className="space-y-4">
            <a href={`mailto:${site.email}`} className="group flex items-center gap-4">
              <div className="glass-card flex h-12 w-12 items-center justify-center rounded-xl transition-all group-hover:bg-primary/20">
                <Icon name="mail" className="text-primary" />
              </div>
              <span className="font-label-md text-on-surface">{site.email}</span>
            </a>
            <div className="flex gap-4 pt-4">
              <a
                href={site.socials.twitter}
                className="glass-card flex h-12 w-12 items-center justify-center rounded-full text-secondary transition-all hover:bg-secondary/20"
                aria-label="Twitter"
              >
                <Icon name="alternate_email" />
              </a>
              <a
                href={site.socials.github}
                className="glass-card flex h-12 w-12 items-center justify-center rounded-full text-primary transition-all hover:bg-primary/20"
                aria-label="GitHub"
              >
                <Icon name="data_object" />
              </a>
              <a
                href={site.socials.linkedin}
                className="glass-card flex h-12 w-12 items-center justify-center rounded-full text-tertiary transition-all hover:bg-tertiary/20"
                aria-label="LinkedIn"
              >
                <Icon name="hub" />
              </a>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="font-label-sm text-on-surface-variant">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                required
                type="text"
                placeholder="John Doe"
                className="w-full rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-3 text-on-surface transition-colors focus:border-primary focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="font-label-sm text-on-surface-variant">
                Email
              </label>
              <input
                id="email"
                name="email"
                required
                type="email"
                placeholder="john@example.com"
                className="w-full rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-3 text-on-surface transition-colors focus:border-primary focus:outline-none"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="service" className="font-label-sm text-on-surface-variant">
              Service Needed
            </label>
            <select
              id="service"
              name="service"
              className="w-full appearance-none rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-3 text-on-surface transition-colors focus:border-primary focus:outline-none"
            >
              {SERVICE_OPTIONS.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="font-label-sm text-on-surface-variant">
              Project Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              placeholder="Describe your vision..."
              className="w-full rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-3 text-on-surface transition-colors focus:border-primary focus:outline-none"
            />
          </div>
          {status === 'success' && (
            <p className="rounded-xl border border-primary/30 bg-primary/10 p-3 text-sm text-primary">
              Message sent — I&apos;ll get back to you soon.
            </p>
          )}
          {status === 'error' && (
            <p className="rounded-xl border border-error/30 bg-error/10 p-3 text-sm text-error">
              Couldn&apos;t send the message. Backend may be offline.
            </p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="animate-pulse-glow w-full rounded-xl bg-gradient-primary py-4 font-headline-md text-on-primary-container transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}
