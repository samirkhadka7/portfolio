import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';

const CARDS = [
  {
    href: '/admin/projects',
    label: 'Projects',
    icon: 'folder',
    desc: 'Portfolio projects with image uploads.',
  },
  {
    href: '/admin/skills',
    label: 'Skills',
    icon: 'stars',
    desc: 'Skill categories with progress bars.',
  },
  {
    href: '/admin/services',
    label: 'Services',
    icon: 'design_services',
    desc: 'Freelance service offerings.',
  },
  {
    href: '/admin/timeline',
    label: 'Timeline',
    icon: 'timeline',
    desc: 'Career milestones and learning journey.',
  },
  {
    href: '/admin/help',
    label: 'Help Grid',
    icon: 'handyman',
    desc: 'What I can help with — bento section.',
  },
  {
    href: '/admin/contacts',
    label: 'Contacts',
    icon: 'inbox',
    desc: 'View contact form submissions.',
  },
  {
    href: '/admin/site',
    label: 'Site Config',
    icon: 'settings',
    desc: 'Hero copy, socials, stats, avatar.',
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-headline-lg text-headline-lg">Dashboard</h1>
        <p className="mt-2 font-body-md text-on-surface-variant">
          Manage your portfolio content from here.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="glass-card group rounded-2xl p-6 transition-transform hover:-translate-y-1"
          >
            <Icon
              name={card.icon}
              className="mb-4 text-4xl text-primary transition-transform group-hover:scale-110"
            />
            <h2 className="mb-2 font-headline-md text-xl">{card.label}</h2>
            <p className="text-sm text-on-surface-variant">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
