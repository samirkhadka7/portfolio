import Link from 'next/link';
import { SkillCategoryForm } from '@/components/admin/SkillCategoryForm';

export default function NewSkillCategoryPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <Link
          href="/admin/skills"
          className="font-label-sm text-sm text-on-surface-variant hover:text-primary"
        >
          ← Back to skills
        </Link>
        <h1 className="font-headline-lg text-headline-lg">New Skill Category</h1>
      </header>
      <SkillCategoryForm mode="create" />
    </div>
  );
}
