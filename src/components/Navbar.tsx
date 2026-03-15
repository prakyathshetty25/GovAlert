'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the dropdown if the user clicks outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full py-4 px-6 sm:px-12 flex justify-between items-center border-b border-gray-800 bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="text-2xl font-bold text-blue-400">
        <Link href="/">GovAlert</Link>
      </div>
      
      {/* Center Links */}
      <nav className="hidden md:flex gap-8">
        <Link href="/#features" className="hover:text-blue-400 font-medium transition-colors text-gray-200">Features</Link>
        <Link href="/#how-it-works" className="hover:text-blue-400 font-medium transition-colors text-gray-200">How It Works</Link>
        <Link href="/#impact" className="hover:text-blue-400 font-medium transition-colors text-gray-200">Impact</Link>
      </nav>

      {/* Auth & CTA Buttons */}
      <div className="flex items-center gap-4">
        
        {/* The Dropdown Container */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="hidden sm:flex items-center gap-1 text-gray-300 hover:text-white font-medium transition-colors"
          >
            Log In
            <span className="text-xs">▼</span>
          </button>

          {/* The Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-4 w-48 bg-gray-900 border border-gray-800 rounded-lg shadow-xl overflow-hidden z-50">
              <Link 
                href="/login" 
                className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 hover:text-blue-400 transition-colors border-b border-gray-800"
                onClick={() => setIsDropdownOpen(false)}
              >
                Citizen Login
              </Link>
              <Link 
                href="/admin/login" 
                className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 hover:text-blue-400 transition-colors"
                onClick={() => setIsDropdownOpen(false)}
              >
                Official / Admin Login
              </Link>
            </div>
          )}
        </div>

        <Link href="/signup" className="bg-blue-600 text-white px-5 py-2 rounded-md font-medium hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20">
          Sign Up
        </Link>
      </div>
    </header>
  );
}