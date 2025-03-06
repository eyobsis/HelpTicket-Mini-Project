'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import Spinner from '@/components/Spinner';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const { login, user, loading } = useAuth();
  const router = useRouter();

  const { email, password } = formData;

  useEffect(() => {
    if (user && !loading) {
      router.push(user.role === 'admin' ? '/dashboard/admin' : '/dashboard/user');
    }
  }, [user, loading, router]);

  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return setError('Please fill in all fields');
    
    const result = await login(formData);
    if (!result.success) setError(result.message || 'Invalid credentials');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <Spinner className="h-12 w-12 text-orange-500 dark:text-orange-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-light dark:bg-gradient-dark p-4">
      <div className="gradient-border max-w-md w-full">
        <div className="gradient-border-inner">
          <h1 className="text-3xl font-bold mb-8 text-center dark:text-yellow-300">
            Welcome Back
          </h1>

          {error && (
            <div className="mb-6 p-3 bg-red-100/80 dark:bg-red-900/30 rounded-lg flex items-center gap-2 text-red-600 dark:text-red-300">
              <ExclamationTriangleIcon className="h-5 w-5" />
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 dark:text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                  bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-orange-500 
                  focus:border-orange-500 dark:focus:ring-orange-400 transition-all"
                placeholder="name@company.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={onChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                  bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-orange-500 
                  focus:border-orange-500 dark:focus:ring-orange-400 transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="primary-button w-full py-3"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link 
                href="/signup" 
                className="text-orange-500 dark:text-orange-400 hover:underline font-semibold"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}