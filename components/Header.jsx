'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

const Header = () => {
  const { user, logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'dark');
  }, []);

  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-600 shadow-lg dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 hover:scale-105 transition-transform">
            <span className="text-2xl font-bold text-yellow-400">🎫</span>
            <span className="text-xl font-semibold text-white dark:text-yellow-300">
              Ticketing System
            </span>
          </Link>
          
          <div className="flex items-center gap-6">
            <nav>
              <ul className="flex gap-4 items-center">
                {user ? (
                  <>
                    <li>
                      <Link
                        href={user.role === 'admin' ? '/dashboard/admin' : '/dashboard/user'}
                        className="px-4 py-2 border-2 border-orange-500 text-orange-500 rounded-lg 
                        hover:bg-orange-500/10 transition-all duration-300 
                        dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-400/10"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={logout}
                        className="px-4 py-2 border-2 border-orange-500 text-orange-500 rounded-lg 
                        hover:bg-orange-500/10 transition-all duration-300 
                        dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-400/10"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        href="/login"
                        className="px-4 py-2 border-2 border-orange-500 text-orange-500 rounded-lg 
                        hover:bg-orange-500/10 transition-all duration-300 
                        dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-400/10"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/signup"
                        className="px-4 py-2 border-2 border-orange-500 text-orange-500 rounded-lg 
                        hover:bg-orange-500/10 transition-all duration-300 
                        dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-400/10"
                      >
                        Signup
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors 
              duration-300 dark:bg-gray-700/50 dark:hover:bg-gray-600/70"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <SunIcon className="h-6 w-6 text-yellow-400 dark:text-orange-400" />
              ) : (
                <MoonIcon className="h-6 w-6 text-yellow-400 dark:text-orange-400" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;