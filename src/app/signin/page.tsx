'use client';

import { signIn } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import { sitePaths } from '@/lib/path/sitePaths';

export default function SigninForm() {
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const res = await signIn('credentials', {
      email: form.get('email'),
      password: form.get('password'),
      redirect: true,
      callbackUrl: sitePaths.home.href,
    });

    if (res?.error) setError('Invalid email or password');
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4">
        <h2 className="text-2xl font-semibold text-gray-200">Sign in to your account</h2>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-300">Email</label>
          <input
            name="email"
            type="email"
            className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-300">Password</label>
          <input
            name="password"
            type="password"
            className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}