import React from 'react';
import Link from 'next/link';

export default function GovAlertHomePage() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-200 bg-gray-950">
      {/* Navigation */}
      <header className="w-full py-4 px-6 sm:px-12 flex justify-between items-center border-b border-gray-800 bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="text-2xl font-bold text-blue-400">
          <Link href="/">GovAlert</Link>
        </div>
        
        {/* Center Links */}
        <nav className="hidden md:flex gap-8">
          <Link href="#features" className="hover:text-blue-400 font-medium transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-blue-400 font-medium transition-colors">How It Works</Link>
          <Link href="#impact" className="hover:text-blue-400 font-medium transition-colors">Impact</Link>
        </nav>

        {/* Auth & CTA Buttons */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden sm:block text-gray-300 hover:text-white font-medium transition-colors">
            Log In
          </Link>
          <Link href="/signup" className="bg-blue-600 text-white px-5 py-2 rounded-md font-medium hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20">
            Sign Up
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="px-6 py-20 sm:px-12 sm:py-32 text-center bg-gradient-to-b from-gray-900 to-gray-950">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6">
            Empowering Citizens, <br />
            <span className="text-blue-500">Improving Communities</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-400 mb-10">
            Voice your concerns to local government officials in the time it takes to send a text. Snap a picture of a pothole, litter, or code violation, and we'll route it to the right department instantly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/report" className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20 flex items-center justify-center">
              Report an Issue Now
            </Link>
            <Link href="/signup" className="bg-transparent text-blue-400 border-2 border-blue-500 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-950/50 transition-colors flex items-center justify-center">
              Create an Account
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-6 sm:px-12 max-w-7xl mx-auto border-t border-gray-900">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Why Use GovAlert?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Built for speed and accuracy, ensuring your local government gets the exact information they need to fix the problem.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-6 border border-gray-800 bg-gray-900/50 rounded-xl shadow-sm hover:border-gray-700 transition-colors">
              <div className="w-12 h-12 bg-gray-800 text-blue-400 border border-gray-700 rounded-lg flex items-center justify-center text-2xl mb-4">📍</div>
              <h3 className="text-xl font-bold mb-2 text-white">Location-Based</h3>
              <p className="text-gray-400">Automatically identifies your exact coordinates and routes your report to the correct municipality.</p>
            </div>
            <div className="p-6 border border-gray-800 bg-gray-900/50 rounded-xl shadow-sm hover:border-gray-700 transition-colors">
              <div className="w-12 h-12 bg-gray-800 text-blue-400 border border-gray-700 rounded-lg flex items-center justify-center text-2xl mb-4">📸</div>
              <h3 className="text-xl font-bold mb-2 text-white">Visual Proof</h3>
              <p className="text-gray-400">Snap and upload photos directly from your smartphone so officials can see exactly what you see.</p>
            </div>
            <div className="p-6 border border-gray-800 bg-gray-900/50 rounded-xl shadow-sm hover:border-gray-700 transition-colors">
              <div className="w-12 h-12 bg-gray-800 text-blue-400 border border-gray-700 rounded-lg flex items-center justify-center text-2xl mb-4">⏱️</div>
              <h3 className="text-xl font-bold mb-2 text-white">Real-Time Updates</h3>
              <p className="text-gray-400">Track the status of your reported concerns and receive notifications when issues are resolved.</p>
            </div>
          </div>
        </section>

        {/* NEW: How It Works Section */}
        <section id="how-it-works" className="py-20 px-6 sm:px-12 bg-gray-900/30 border-t border-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-16">How It Works</h2>
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 relative">
              {/* Step 1 */}
              <div className="flex-1 text-center">
                <div className="w-16 h-16 bg-blue-600/20 text-blue-400 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 border border-blue-500/30">1</div>
                <h3 className="text-xl font-bold text-white mb-2">Spot an Issue</h3>
                <p className="text-gray-400">See a pothole, broken street light, or overgrown lot in your neighborhood.</p>
              </div>
              {/* Step 2 */}
              <div className="flex-1 text-center">
                <div className="w-16 h-16 bg-blue-600/20 text-blue-400 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 border border-blue-500/30">2</div>
                <h3 className="text-xl font-bold text-white mb-2">Snap & Send</h3>
                <p className="text-gray-400">Open GovAlert, take a photo, add a brief description, and hit submit.</p>
              </div>
              {/* Step 3 */}
              <div className="flex-1 text-center">
                <div className="w-16 h-16 bg-blue-600/20 text-blue-400 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 border border-blue-500/30">3</div>
                <h3 className="text-xl font-bold text-white mb-2">Get It Fixed</h3>
                <p className="text-gray-400">The right department is notified instantly. We'll alert you when it's resolved.</p>
              </div>
            </div>
          </div>
        </section>

        {/* NEW: Impact/Stats Section */}
        <section id="impact" className="py-20 px-6 sm:px-12 max-w-7xl mx-auto border-t border-gray-900 text-center">
           <h2 className="text-3xl font-bold text-white mb-12">Making a Real Difference</h2>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-extrabold text-blue-500 mb-2">10k+</div>
                <div className="text-gray-400 font-medium">Issues Resolved</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-blue-500 mb-2">500+</div>
                <div className="text-gray-400 font-medium">Municipalities</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-blue-500 mb-2">24h</div>
                <div className="text-gray-400 font-medium">Avg. Response Time</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-blue-500 mb-2">50k+</div>
                <div className="text-gray-400 font-medium">Active Citizens</div>
              </div>
           </div>
        </section>
      </main>

      {/* Footer (Updated with Admin Link) */}
      <footer className="bg-black text-gray-500 border-t border-gray-900 py-12 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-bold text-gray-300">GovAlert</div>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-gray-300 transition-colors">Contact Support</Link>
            {/* NEW ADMIN LINK */}
            <span className="text-gray-700 hidden sm:inline">|</span>
            <Link href="/admin/login" className="text-blue-500 hover:text-blue-400 transition-colors font-medium">
              Official/Admin Login
            </Link>
          </div>
          <p className="text-sm">&copy; {new Date().getFullYear()} GovAlert Mockup App.</p>
        </div>
      </footer>
    </div>
  );
}