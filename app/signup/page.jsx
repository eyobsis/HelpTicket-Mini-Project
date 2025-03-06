'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import Spinner from '@/components/Spinner';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });
  const [error, setError] = useState('');
  const { register, user, loading } = useAuth();
  const router = useRouter();

  const { name, email, password, confirmPassword, role } = formData;

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
    if (!name || !email || !password || !confirmPassword) {
      return setError('Please fill in all fields');
    }
    if (password !== confirmPassword) return setError('Passwords do not match');
    
    const result = await register({ name, email, password, role });
    if (!result.success) setError(result.message || 'Registration failed');
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
            Create Account
          </h1>

          {error && (
            <div className="mb-6 p-3 bg-red-100/80 dark:bg-red-900/30 rounded-lg flex items-center gap-2 text-red-600 dark:text-red-300">
              <ExclamationTriangleIcon className="h-5 w-5" />
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2 dark:text-gray-300">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={onChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                  bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-orange-500 
                  focus:border-orange-500 dark:focus:ring-orange-400 transition-all"
                placeholder="John Doe"
              />
            </div>

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

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2 dark:text-gray-300">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                  bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-orange-500 
                  focus:border-orange-500 dark:focus:ring-orange-400 transition-all"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium mb-2 dark:text-gray-300">
                Account Type
              </label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={onChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                  bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-orange-500 
                  focus:border-orange-500 dark:focus:ring-orange-400 transition-all"
              >
                <option value="user">Standard User</option>
                <option value="admin">Administrator</option>
              </select>
            </div>

            <button
              type="submit"
              className="primary-button w-full py-3"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link 
                href="/login" 
                className="text-orange-500 dark:text-orange-400 hover:underline font-semibold"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}