'use client';

import React, { useActionState } from 'react';
import Link from 'next/link';
import { smartLogin } from '@/app/actions/authActions';

export default function LoginPage() {
  // useActionState handles the loading state and captures any errors returned from the server
  const [state, formAction, isPending] = useActionState(smartLogin, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full bg-gray-900/80 backdrop-blur-sm p-8 border border-gray-800 rounded-2xl shadow-2xl">
        
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-extrabold text-blue-500 hover:text-blue-400 transition-colors">
            GovAlert
          </Link>
          <h2 className="mt-6 text-2xl font-bold text-white">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-400">
            Or{' '}
            <Link href="/signup" className="font-medium text-blue-500 hover:text-blue-400 transition-colors">
              create a new account
            </Link>
          </p>
        </div>

        {/* The form uses the formAction tied to our Supabase server action */}
        <form className="space-y-6" action={formAction}>
          
          {/* Display any error messages returned from Supabase */}
          {state?.error && (
            <div className="p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">
              {state.error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-4 py-3 bg-gray-950 border border-gray-700 placeholder-gray-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-4 py-3 bg-gray-950 border border-gray-700 placeholder-gray-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transition-colors shadow-lg shadow-blue-900/20"
            >
              {isPending ? 'Authenticating...' : 'Sign In'}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-400">
            Are you a municipal official?{' '}
            <Link href="/admin/login" className="font-medium text-blue-500 hover:text-blue-400 transition-colors">
              Go to the Admin Portal
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}