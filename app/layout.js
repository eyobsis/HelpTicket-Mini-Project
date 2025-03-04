// app/layout.js
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Header from '@/components/Header'; // Regular import for server component
import dynamic from 'next/dynamic';

const inter = Inter({ subsets: ['latin'] });

// Dynamic import without any SSR configuration
const DarkModeToggle = dynamic(() => import('@/components/DarkModeToggle'));

export const metadata = {
  title: {
    default: 'My App',
    template: '%s | My App',
  },
  description: 'Next.js application with dark mode and authentication',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'My App',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-gray-100 dark:bg-gradient-to-r dark:from-gray-900 dark:to-black">
            <Header />
            <DarkModeToggle />
            <main className="container mx-auto py-8 px-4 text-gray-900 dark:text-yellow-500">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
