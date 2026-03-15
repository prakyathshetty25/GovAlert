import React from 'react';
import Link from 'next/link';

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full bg-gray-900/90 backdrop-blur-md p-8 border border-gray-800 rounded-2xl shadow-2xl relative overflow-hidden">
        
        {/* Top Security Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-900"></div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block px-3 py-1 rounded-full bg-red-900/20 text-red-400 text-xs font-bold tracking-widest uppercase mb-4 border border-red-900/50">
            Restricted Access
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            GovAlert <span className="text-gray-500 font-light">Admin</span>
          </h1>
          <h2 className="mt-4 text-xl font-bold text-gray-200">
            Official Portal Login
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            For authorized municipal personnel only.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" action="#" method="POST">
          <div className="space-y-4">
            <div>
              <label htmlFor="municipality-id" className="block text-sm font-medium text-gray-300 mb-1">
                Municipality / Department ID
              </label>
              <input
                id="municipality-id"
                name="municipality-id"
                type="text"
                required
                className="appearance-none relative block w-full px-4 py-3 bg-gray-950 border border-gray-700 placeholder-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm transition-colors"
                placeholder="e.g. CITY-001"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-300 mb-1">
                Official Government Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-4 py-3 bg-gray-950 border border-gray-700 placeholder-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm transition-colors"
                placeholder="name@citygov.org"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none relative block w-full px-4 py-3 bg-gray-950 border border-gray-700 placeholder-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-gray-400 hover:text-white transition-colors">
                Contact IT Support
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-red-700 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-red-500 transition-colors shadow-lg shadow-red-900/20"
            >
              Authenticate Session
            </button>
          </div>
        </form>

        {/* Back to Citizen Site */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-300 transition-colors flex items-center justify-center gap-2">
            <span>&larr;</span> Return to Public Homepage
          </Link>
        </div>

      </div>
    </div>
  );
}