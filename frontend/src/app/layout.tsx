import type { Metadata } from 'next';
import { sora, inter, jetbrainsMono } from '@/lib/fonts';
import { fetchSiteOnly } from '@/lib/content';
import { ParticleBackground } from '@/components/effects/ParticleBackground';
import { MouseGlow } from '@/components/effects/MouseGlow';
import './globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export async function generateMetadata(): Promise<Metadata> {
  const site = await fetchSiteOnly();
  const title = `${site.name} | ${site.tagline}`;
  const description = site.description;
  const ogImages = site.avatar
    ? [{ url: site.avatar, width: 1200, height: 630, alt: site.name }]
    : [];

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    applicationName: site.name,
    authors: [{ name: site.name }],
    keywords: [
      site.name,
      'portfolio',
      'full stack developer',
      'data engineer',
      'freelance',
      'Next.js',
      'TypeScript',
    ],
    openGraph: {
      title,
      description,
      url: SITE_URL,
      siteName: site.name,
      images: ogImages,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: site.avatar ? [site.avatar] : [],
      creator: site.socials.twitter !== '#' ? site.socials.twitter : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: SITE_URL,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="bg-mesh">
        <div className="bg-shimmer"></div>
        <ParticleBackground />
        <MouseGlow />
        {children}
      </body>
    </html>
  );
}
