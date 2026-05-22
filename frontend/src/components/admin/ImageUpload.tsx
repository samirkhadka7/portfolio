'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { uploadFile } from '@/lib/api';
import { Icon } from '@/components/ui/Icon';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const { url } = await uploadFile(file);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-start gap-4">
        {value ? (
          <div className="relative h-32 w-32 overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-low">
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover"
              sizes="128px"
              unoptimized
            />
          </div>
        ) : (
          <div className="flex h-32 w-32 items-center justify-center rounded-xl border border-dashed border-outline-variant/40 bg-surface-container-low text-on-surface-variant">
            <Icon name="image" className="text-3xl" />
          </div>
        )}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="rounded-xl border border-primary/30 bg-primary/10 px-4 py-2 font-label-md text-sm text-primary transition-colors hover:bg-primary/20 disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : value ? 'Replace image' : 'Upload image'}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="rounded-xl border border-error/30 bg-error/10 px-4 py-2 font-label-md text-sm text-error transition-colors hover:bg-error/20"
            >
              Remove
            </button>
          )}
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = '';
        }}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or paste an image URL"
        className="w-full rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-3 text-sm text-on-surface focus:border-primary focus:outline-none"
      />
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
}
