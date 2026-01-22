'use client';

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { sitePaths } from '@/lib/path/sitePaths';

export default function Signup() {
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    const form = new FormData(e.currentTarget);

    const email = form.get('email');
    const name = form.get('name');
    const password = form.get('password');

    // 1. Create user via your API
    const res = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({ email, name, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      setError('Could not create account');
      return;
    }

    // 2. Automatically sign in the user
    await signIn('credentials', {
      email,
      password,
      redirect: true,
      callbackUrl: sitePaths.home.href,
    });
  }

  return (
    <div className="flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4">
        <h2 className="text-2xl font-semibold text-gray-200">Create your account</h2>

        {error && <p className="text-sm text-red-400">{error}</p>}

        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 shadow-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-300">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your name"
            className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 shadow-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-300">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 shadow-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}