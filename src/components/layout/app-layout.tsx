import { AppLayoutClient } from './app-layout-client';
import { getSubstackPosts } from '@/lib/substack';
import type { NavigationItem } from '@/lib/types';

interface AppLayoutProps {
  children: React.ReactNode;
}

// Navigation items configuration
const navigationItems: NavigationItem[] = [
  { label: 'Home', href: '#hero', shortcut: 'H' },
  { label: 'About', href: '#about', shortcut: 'A' },
  { label: 'Knowledge', href: '#knowledge', shortcut: 'K' },
  { label: 'Skills', href: '#skills', shortcut: 'S' },
  { label: 'Portfolio', href: '#portfolio', shortcut: 'P' },
  { label: 'Contact', href: '#contact', shortcut: 'C' },
];

// Section IDs for intersection observer
const sectionIds = navigationItems
  .filter(item => !item.external)
  .map(item => item.href.replace('#', ''));

export async function AppLayout({ children }: AppLayoutProps) {
  // Fetch latest articles for the top bar
  const posts = await getSubstackPosts(5);
  const articles = posts.map(post => ({
    title: post.title,
    url: post.url,
    reading: post.reading,
  }));

  return (
    <AppLayoutClient
      navigationItems={navigationItems}
      sectionIds={sectionIds}
      articles={articles}
    >
      {children}
    </AppLayoutClient>
  );
}
