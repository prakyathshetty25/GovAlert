'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.42, 0, 1, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const floatAnimation = {
  y: [0, -20, 0],
  transition: { duration: 6, repeat: Infinity, ease: ["easeInOut"] }
};

export default function GovAlertHomePage() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-200 bg-gray-950 overflow-hidden">
      <Navbar />

      <main className="flex-grow">
        
        {/* Animated Hero Section */}
        <section className="relative px-6 py-20 sm:px-12 sm:py-32 text-center flex flex-col items-center justify-center min-h-[85vh]">
          {/* Animated Background Orbs */}
          <motion.div 
            animate={floatAnimation} 
            className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10 pointer-events-none"
          />
          <motion.div 
            animate={{ y: [0, 20, 0], transition: { duration: 8, repeat: Infinity, ease: "easeInOut" } }} 
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] -z-10 pointer-events-none"
          />

          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="relative z-10">
            <motion.div variants={fadeInUp} className="inline-block px-4 py-1.5 rounded-full bg-blue-900/30 text-blue-400 text-sm font-semibold mb-6 border border-blue-500/30 backdrop-blur-sm">
              🚀 Now live in over 500 municipalities
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Report Issues. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Transform Your City.
              </span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-400 mb-10">
              Snap a photo of a pothole, litter, or broken streetlight. We instantly route it to the right department and track it until it&apos;s fixed.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/report" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:-translate-y-1 flex items-center justify-center">
                Report an Issue Now
              </Link>
              <Link href="/signup" className="bg-gray-900 text-gray-300 border border-gray-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-800 hover:text-white transition-all hover:-translate-y-1 flex items-center justify-center">
                Create Account
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <div className="text-center mb-16">
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white mb-4">Smart tools for active citizens</motion.h2>
              <motion.p variants={fadeInUp} className="text-gray-400 max-w-2xl mx-auto">Everything you need to make sure your voice is heard and action is taken.</motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: '📍', title: 'Auto-Routing', desc: 'Our AI detects your exact location and finds the correct jurisdiction automatically.' },
                { icon: '📸', title: 'Visual Evidence', desc: 'Upload photos directly from your phone. A picture is worth a thousand emails.' },
                { icon: '🔔', title: 'Live Tracking', desc: 'Get push notifications the moment a city worker is assigned to your report.' }
              ].map((feature, idx) => (
                <motion.div key={idx} variants={fadeInUp} whileHover={{ y: -10, scale: 1.02 }} className="p-8 bg-gray-900/40 backdrop-blur-md border border-gray-800 rounded-2xl hover:bg-gray-800/80 hover:border-blue-500/50 transition-all group shadow-xl">
                  <div className="w-14 h-14 bg-gray-950 text-blue-400 border border-gray-800 rounded-xl flex items-center justify-center text-2xl mb-6 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Animated How It Works Section */}
        <section id="how-it-works" className="py-24 px-6 sm:px-12 bg-gray-900/30 border-y border-gray-900/50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="text-center mb-16">
              <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-white mb-4">How GovAlert Works</motion.h2>
              <motion.p variants={fadeInUp} className="text-gray-400 max-w-2xl mx-auto">Three simple steps to a better neighborhood.</motion.p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Desktop connecting line */}
              <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-blue-900 via-blue-500 to-blue-900 opacity-30 -z-10"></div>

              {[
                { step: '1', title: 'Spot an Issue', desc: 'See a pothole, broken street light, or overgrown lot.' },
                { step: '2', title: 'Snap & Send', desc: 'Take a photo and hit submit. We handle the routing.' },
                { step: '3', title: 'Get It Fixed', desc: 'The right department is notified and gets to work.' }
              ].map((item, idx) => (
                <motion.div key={idx} variants={fadeInUp} className="flex flex-col items-center text-center relative">
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="w-16 h-16 bg-gray-950 text-blue-400 rounded-full flex items-center justify-center text-2xl font-bold mb-6 border-2 border-blue-500/50 shadow-[0_0_15px_rgba(37,99,235,0.3)] z-10">
                    {item.step}
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

      </main>

      {/* Expanded Multi-Column Footer */}
      <footer className="bg-black text-gray-400 border-t border-gray-900 pt-20 pb-10 px-6 sm:px-12 relative overflow-hidden">
        {/* Footer Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-blue-900/5 blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Brand Column */}
            <div className="space-y-4">
              <div className="text-2xl font-bold text-white mb-4">GovAlert</div>
              <p className="text-sm leading-relaxed">
                Empowering citizens and municipalities to work together to build safer, cleaner, and more efficient communities.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-6">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="#features" className="hover:text-blue-400 transition-colors">Features</Link></li>
                <li><Link href="#how-it-works" className="hover:text-blue-400 transition-colors">How it Works</Link></li>
                <li><Link href="/report" className="hover:text-blue-400 transition-colors">Report an Issue</Link></li>
                <li><Link href="/signup" className="hover:text-blue-400 transition-colors">Sign Up</Link></li>
              </ul>
            </div>

            {/* Support & Admin */}
            <div>
              <h4 className="text-white font-semibold mb-6">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Help Center</Link></li>
                <li><Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                <li><Link href="/admin/login" className="text-blue-500 hover:text-blue-400 transition-colors font-medium">Official Portal Login</Link></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-white font-semibold mb-6">Stay Updated</h4>
              <p className="text-sm mb-4">Subscribe to our newsletter for civic tech updates.</p>
              <form className="flex" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  suppressHydrationWarning={true}
                  className="bg-gray-900 border border-gray-800 text-white text-sm rounded-l-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-r-lg transition-colors">
                  Join
                </button>
              </form>
            </div>

          </div>

          <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>&copy; {new Date().getFullYear()} GovAlert Mockup App. All rights reserved.</p>
            <div className="flex gap-4">
              <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
              <span className="hover:text-white cursor-pointer transition-colors">LinkedIn</span>
              <span className="hover:text-white cursor-pointer transition-colors">GitHub</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}