'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

const Header = () => {
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialMode = savedMode ?? systemDark;
    setDarkMode(initialMode);
    document.documentElement.classList.toggle('dark', initialMode);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-600 dark:from-gray-900 dark:to-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-yellow-400">🎫</span>
            <span className="text-xl font-semibold text-white dark:text-yellow-300">
              Ticketing System
            </span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <nav>
              <ul className="flex space-x-4">
                {user ? (
                  <>
                    <li>
                      <Link
                        href={user.role === 'admin' ? '/dashboard/admin' : '/dashboard/user'}
                        className="px-3 py-2 rounded-md text-sm font-medium text-white dark:text-yellow-300 hover:bg-blue-600 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={logout}
                        className="px-3 py-2 rounded-md text-sm font-medium text-white dark:text-yellow-300 hover:bg-blue-600 dark:hover:bg-gray-700 transition-colors duration-200"
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
                        className="px-3 py-2 rounded-md text-sm font-medium text-white dark:text-yellow-300 hover:bg-blue-600 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/signup"
                        className="px-3 py-2 rounded-md text-sm font-medium text-white dark:text-yellow-300 hover:bg-blue-600 dark:hover:bg-gray-700 transition-colors duration-200"
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
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 dark:bg-gray-700/50 dark:hover:bg-gray-600/70 transition-colors duration-300"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <MoonIcon className="h-6 w-6 text-yellow-400" />
              ) : (
                <SunIcon className="h-6 w-6 text-yellow-400" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;