'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { AccentColor, Skill, SkillCategory } from '@/types';
import { api } from '@/lib/api';
import { FormField, inputCls, selectCls } from './FormField';
import { Icon } from '@/components/ui/Icon';

type Values = {
  key: string;
  title: string;
  icon: string;
  accent: AccentColor;
  order: number;
  skills: Skill[];
};

interface SkillCategoryFormProps {
  initial?: Partial<SkillCategory> & { _id?: string };
  mode: 'create' | 'edit';
}

const blank: Values = {
  key: '',
  title: '',
  icon: '',
  accent: 'primary',
  order: 0,
  skills: [],
};

export function SkillCategoryForm({ initial, mode }: SkillCategoryFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<Values>(() => ({
    ...blank,
    ...initial,
    skills: initial?.skills ? [...initial.skills] : [],
  }));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof Values>(key: K, value: Values[K]) =>
    setValues((v) => ({ ...v, [key]: value }));

  const addSkill = () =>
    update('skills', [...values.skills, { name: '', level: 50 }]);

  const updateSkill = (index: number, patch: Partial<Skill>) => {
    update(
      'skills',
      values.skills.map((s, i) => (i === index ? { ...s, ...patch } : s)),
    );
  };

  const removeSkill = (index: number) =>
    update(
      'skills',
      values.skills.filter((_, i) => i !== index),
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const payload = { ...values };
      if (mode === 'edit' && initial?._id) {
        await api(`/api/skills/${initial._id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
      } else {
        await api('/api/skills', { method: 'POST', body: JSON.stringify(payload) });
      }
      router.push('/admin/skills');
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
        <FormField label="Key" htmlFor="key" hint="Unique slug, e.g. frontend, data-ml">
          <input
            id="key"
            value={values.key}
            onChange={(e) => update('key', e.target.value)}
            required
            className={inputCls}
          />
        </FormField>
        <FormField label="Title" htmlFor="title">
          <input
            id="title"
            value={values.title}
            onChange={(e) => update('title', e.target.value)}
            required
            className={inputCls}
          />
        </FormField>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <FormField label="Icon" htmlFor="icon" hint="Material Symbols name">
          <input
            id="icon"
            value={values.icon}
            onChange={(e) => update('icon', e.target.value)}
            required
            className={inputCls}
          />
        </FormField>
        <FormField label="Accent" htmlFor="accent">
          <select
            id="accent"
            value={values.accent}
            onChange={(e) => update('accent', e.target.value as AccentColor)}
            className={selectCls}
          >
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="tertiary">Tertiary</option>
            <option value="error">Error</option>
          </select>
        </FormField>
        <FormField label="Order" htmlFor="order">
          <input
            id="order"
            type="number"
            value={values.order}
            onChange={(e) => update('order', Number(e.target.value))}
            className={inputCls}
          />
        </FormField>
      </div>

      <FormField label="Skills" hint="Each skill has a name and a 0–100 proficiency level.">
        <div className="space-y-3">
          {values.skills.map((skill, i) => (
            <div key={i} className="flex items-end gap-3">
              <div className="flex-1">
                <label className="mb-1 block font-label-sm text-xs text-on-surface-variant">
                  Name
                </label>
                <input
                  value={skill.name}
                  onChange={(e) => updateSkill(i, { name: e.target.value })}
                  className={inputCls}
                  placeholder="e.g. React / Next.js"
                />
              </div>
              <div className="w-32">
                <label className="mb-1 block font-label-sm text-xs text-on-surface-variant">
                  Level (%)
                </label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={skill.level}
                  onChange={(e) =>
                    updateSkill(i, { level: Math.max(0, Math.min(100, Number(e.target.value))) })
                  }
                  className={inputCls}
                />
              </div>
              <button
                type="button"
                onClick={() => removeSkill(i)}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-error/30 bg-error/10 text-error hover:bg-error/20"
                aria-label="Remove skill"
              >
                <Icon name="delete" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSkill}
            className="flex items-center gap-2 rounded-xl border border-dashed border-primary/40 px-4 py-2 font-label-md text-sm text-primary transition-colors hover:bg-primary/10"
          >
            <Icon name="add" /> Add skill
          </button>
        </div>
      </FormField>

      {error && (
        <p className="rounded-xl border border-error/30 bg-error/10 p-3 text-sm text-error">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-gradient-primary px-6 py-3 font-label-md font-bold text-on-primary-container transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] disabled:opacity-50"
        >
          {submitting ? 'Saving...' : mode === 'edit' ? 'Save changes' : 'Create category'}
        </button>
        <Link
          href="/admin/skills"
          className="rounded-xl border border-outline-variant/40 px-6 py-3 font-label-md text-on-surface-variant transition-colors hover:bg-surface-container/40"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
