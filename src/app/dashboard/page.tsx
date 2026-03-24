'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

// --- Mock Data ---
const myReports = [
  { id: 'REP-8042', title: 'Deep Pothole on Main St', date: 'Oct 12, 2026', status: 'Resolved', image: '🛣️' },
  { id: 'REP-8105', title: 'Flickering Streetlight', date: 'Oct 15, 2026', status: 'In Progress', image: '💡' },
  { id: 'REP-8199', title: 'Overgrown Lot blocking stop sign', date: 'Oct 18, 2026', status: 'Pending', image: '🌿' },
];

const myBadges = [
  { icon: '🥉', name: 'First Report', desc: 'Submitted your first civic issue.' },
  { icon: '👁️', name: 'Eagle Eye', desc: 'Reported 5 issues that were successfully verified.' },
  { icon: '🛠️', name: 'Problem Solver', desc: 'Had 3 of your reported issues fully resolved by the city.' },
];

// --- Animation Variants ---
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function CitizenDashboard() {
  const [user, setUser] = useState<unknown>(null);
  const [profile, setProfile] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
  );

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: userData, error } = await supabase.auth.getUser();

        if (error || !userData?.user) {
          router.push('/login');
          return;
        }

        setUser(userData.user);

        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userData.user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') { // PGRST116 is "not found"
          console.error('Error fetching profile:', profileError);
        } else {
          setProfile(profileData);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          router.push('/login');
        } else {
          setUser(session.user);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [router, supabase]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-950 flex font-sans text-gray-200 overflow-hidden">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 hidden md:flex flex-col z-20">
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-500 hover:text-blue-400 transition-colors">GovAlert</Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/dashboard" className="block px-4 py-3 bg-blue-600/10 text-blue-400 rounded-lg font-medium border border-blue-500/20">
            My Dashboard
          </Link>
          <Link href="/report" className="block px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            ➕ New Report
          </Link>
          <Link href="#" className="block px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            🗺️ Community Map
          </Link>
          <Link href="#" className="block px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            ⚙️ Settings
          </Link>
        </nav>
        
        {/* User Profile Snippet */}
        <div className="p-4 border-t border-gray-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold shadow-lg">
            {(profile?.full_name || user?.email || 'U')[0].toUpperCase()}
          </div>
          <div>
            <div className="text-sm font-bold text-white">{profile?.full_name || user?.email?.split('@')[0]}</div>
            <button 
              onClick={async () => {
                await supabase.auth.signOut();
                router.push('/');
              }}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        <div className="p-6 md:p-10 max-w-6xl mx-auto w-full">
          
          {/* Welcome Header */}
          <motion.header initial="hidden" animate="visible" variants={fadeUp} className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
                Welcome back, {profile?.full_name || user?.email?.split('@')[0] || 'User'}! 👋
              </h1>
              <p className="text-gray-400">Here is the latest impact you&apos;ve made in your community.</p>
            </div>
            <Link href="/report" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20 flex items-center gap-2 whitespace-nowrap">
              <span>Report New Issue</span>
            </Link>
          </motion.header>

          {/* Impact Stats */}
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { label: 'Total Reports', value: '8', icon: '📝', color: 'text-blue-400' },
              { label: 'Issues Resolved', value: '5', icon: '✅', color: 'text-green-400' },
              { label: 'Civic Impact Score', value: '450', icon: '🌟', color: 'text-yellow-400' }
            ].map((stat, idx) => (
              <motion.div key={idx} variants={fadeUp} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 flex items-center justify-between shadow-sm hover:border-gray-700 transition-colors">
                <div>
                  <div className="text-gray-400 text-sm font-medium mb-1">{stat.label}</div>
                  <div className={`text-3xl font-extrabold ${stat.color}`}>{stat.value}</div>
                </div>
                <div className="text-4xl opacity-80">{stat.icon}</div>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Left Column: My Reports */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Your Recent Reports</h2>
                <button className="text-sm text-blue-500 hover:text-blue-400 transition-colors font-medium">View All &rarr;</button>
              </div>
              
              <div className="space-y-4">
                {myReports.map((report) => (
                  <div key={report.id} className="bg-gray-900/40 border border-gray-800 rounded-xl p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between hover:bg-gray-800/40 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-950 border border-gray-700 rounded-lg flex items-center justify-center text-2xl shadow-inner">
                        {report.image}
                      </div>
                      <div>
                        <h3 className="text-white font-bold group-hover:text-blue-400 transition-colors">{report.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{report.id} • Submitted {report.date}</p>
                      </div>
                    </div>
                    
                    {/* Dynamic Status Badge */}
                    <div className={`px-3 py-1 rounded-full text-xs font-bold border whitespace-nowrap
                      ${report.status === 'Resolved' ? 'bg-green-500/10 text-green-400 border-green-500/20' : ''}
                      ${report.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : ''}
                      ${report.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : ''}
                    `}>
                      {report.status}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column: Gamification / Badges */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="space-y-6">
              <h2 className="text-xl font-bold text-white">Civic Achievements</h2>
              
              <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-6">
                <div className="space-y-6">
                  {myBadges.map((badge, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="w-12 h-12 rounded-full bg-gray-950 border-2 border-yellow-500/30 flex items-center justify-center text-2xl shadow-[0_0_10px_rgba(234,179,8,0.1)]">
                        {badge.icon}
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm">{badge.name}</h4>
                        <p className="text-xs text-gray-400 mt-1 leading-relaxed">{badge.desc}</p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Locked Badge (Teaser) */}
                  <div className="flex gap-4 items-start opacity-50 grayscale">
                    <div className="w-12 h-12 rounded-full bg-gray-950 border-2 border-gray-700 flex items-center justify-center text-xl">
                      🔒
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">Community Hero</h4>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed">Resolve 10 issues to unlock.</p>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </main>
    </div>
  );
}