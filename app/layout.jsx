// app/layout.jsx
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Header from '@/components/Header';
import DarkModeToggle from '@/components/DarkModeToggle';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'My Application',
  description: 'A Next.js application with dark mode functionality',
  keywords: 'Next.js, React, Dark Mode, Tutorial',
  authors: [{ name: 'Your Name' }],
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  openGraph: {
    title: 'My Application',
    description: 'A Next.js application with dark mode functionality',
    url: 'https://yourdomain.com',
    siteName: 'My Application',
    images: [
      {
        url: '/og-image.jpg',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-gray-100 dark:bg-gradient-to-r dark:from-gray-900 dark:to-black">
            <Header />
            x
            <main className="container mx-auto py-8 px-4 text-gray-900 dark:text-yellow-500">
              {children}
            </main>
          </div>
        </AuthProvider>
        
        {/* Client-side dark mode initialization */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const savedMode = localStorage.getItem('darkMode');
                const isDarkMode = savedMode === 'true';
                if (isDarkMode) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}