import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/providers/query-provider';
import { ThemeProvider } from '@/providers/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title:
    'Marcel Scognamiglio Senra Lourenço - Senior Software Engineer | System Architect | AI & Automation Specialist',
  description:
    "Personal portfolio website showcasing Marcel Scognamiglio's expertise as a Senior Software Engineer, featuring projects, skills, and professional journey.",
  keywords: [
    'Marcel Scognamiglio',
    'Software Engineer',
    'Portfolio',
    'React',
    'TypeScript',
    'Next.js',
  ],
  authors: [{ name: 'Marcel Scognamiglio' }],
  creator: 'Marcel Scognamiglio',
  metadataBase: new URL('https://marcel-scognamiglio.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://marcel-scognamiglio.com',
    title:
      'Marcel Scognamiglio Senra Lourenço - Senior Software Engineer | System Architect | AI & Automation Specialist',
    description:
      "Personal portfolio website showcasing Marcel Scognamiglio's expertise as a Senior Software Engineer.",
    siteName: 'Marcel Scognamiglio Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marcel Scognamiglio - Senior Software Engineer',
    description:
      "Personal portfolio website showcasing Marcel Scognamiglio's expertise as a Senior Software Engineer.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#f1e5c4" />
        <meta
          name="theme-color"
          content="#2f2f2f"
          media="(prefers-color-scheme: dark)"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
