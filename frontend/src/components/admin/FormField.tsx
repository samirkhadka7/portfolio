import type { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}

export function FormField({ label, htmlFor, hint, error, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="block font-label-sm text-label-sm text-on-surface-variant">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p className="font-label-sm text-xs text-on-surface-variant/70">{hint}</p>
      )}
      {error && <p className="font-label-sm text-xs text-error">{error}</p>}
    </div>
  );
}

export const inputCls =
  'w-full rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-3 text-on-surface transition-colors focus:border-primary focus:outline-none';

export const textareaCls = inputCls;
export const selectCls = `${inputCls} appearance-none`;
