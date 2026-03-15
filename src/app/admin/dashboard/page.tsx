import React from 'react';
import Link from 'next/link';

// Mock data to populate the dashboard table
const recentReports = [
  { id: 'REP-8042', date: '2026-03-15', category: 'Pothole', location: '124 Main St', status: 'Pending' },
  { id: 'REP-8041', date: '2026-03-14', category: 'Streetlight', location: 'Corner of 5th & Elm', status: 'In Progress' },
  { id: 'REP-8040', date: '2026-03-14', category: 'Graffiti', location: 'Downtown Station', status: 'Resolved' },
  { id: 'REP-8039', date: '2026-03-12', category: 'Trash', location: 'Riverside Park', status: 'Pending' },
  { id: 'REP-8038', date: '2026-03-11', category: 'Code Violation', location: '890 Oak Ave', status: 'Resolved' },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-950 flex font-sans text-gray-200">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <div className="text-xl font-bold text-white">GovAlert <span className="text-red-500">Admin</span></div>
          <div className="text-xs text-gray-500 mt-1">City of Metroville</div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin/dashboard" className="block px-4 py-3 bg-gray-800 text-white rounded-lg font-medium border border-gray-700">
            Dashboard
          </Link>
          <Link href="#" className="block px-4 py-3 text-gray-400 hover:bg-gray-800/50 hover:text-white rounded-lg transition-colors">
            All Reports
          </Link>
          <Link href="#" className="block px-4 py-3 text-gray-400 hover:bg-gray-800/50 hover:text-white rounded-lg transition-colors">
            Map View
          </Link>
          <Link href="#" className="block px-4 py-3 text-gray-400 hover:bg-gray-800/50 hover:text-white rounded-lg transition-colors">
            Users & Citizens
          </Link>
          <Link href="#" className="block px-4 py-3 text-gray-400 hover:bg-gray-800/50 hover:text-white rounded-lg transition-colors">
            Department Settings
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <Link href="/admin/login" className="block px-4 py-2 text-sm text-red-400 hover:bg-red-950/30 rounded-lg transition-colors text-center border border-red-900/30">
            Log Out
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 bg-gray-900/50 backdrop-blur-md border-b border-gray-800 flex items-center justify-between px-8">
          <h1 className="text-xl font-bold text-white">Dashboard Overview</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">Welcome, Officer Smith</span>
            <div className="w-8 h-8 bg-gray-800 rounded-full border border-gray-700 flex items-center justify-center text-sm">
              OS
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8">
          
          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-sm">
              <div className="text-sm font-medium text-gray-400 mb-2">Needs Attention</div>
              <div className="text-4xl font-extrabold text-red-500">24</div>
              <div className="text-sm text-red-400 mt-2">↑ 3 new since yesterday</div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-sm">
              <div className="text-sm font-medium text-gray-400 mb-2">In Progress</div>
              <div className="text-4xl font-extrabold text-blue-500">18</div>
              <div className="text-sm text-gray-500 mt-2">Across 4 departments</div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-sm">
              <div className="text-sm font-medium text-gray-400 mb-2">Resolved (This Month)</div>
              <div className="text-4xl font-extrabold text-green-500">142</div>
              <div className="text-sm text-green-400 mt-2">↑ 12% from last month</div>
            </div>
          </div>

          {/* Recent Reports Table */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center bg-gray-900/50">
              <h2 className="text-lg font-bold text-white">Recent Reports</h2>
              <button className="text-sm bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-950/50 text-gray-400 text-sm border-b border-gray-800">
                    <th className="px-6 py-4 font-medium">Report ID</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Category</th>
                    <th className="px-6 py-4 font-medium">Location</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-800">
                  {recentReports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-800/30 transition-colors group">
                      <td className="px-6 py-4 font-medium text-gray-300">{report.id}</td>
                      <td className="px-6 py-4 text-gray-400">{report.date}</td>
                      <td className="px-6 py-4 text-gray-300">{report.category}</td>
                      <td className="px-6 py-4 text-gray-400 truncate max-w-xs">{report.location}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                          ${report.status === 'Pending' ? 'bg-yellow-900/20 text-yellow-500 border-yellow-900/50' : ''}
                          ${report.status === 'In Progress' ? 'bg-blue-900/20 text-blue-400 border-blue-900/50' : ''}
                          ${report.status === 'Resolved' ? 'bg-green-900/20 text-green-400 border-green-900/50' : ''}
                        `}>
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-blue-500 hover:text-blue-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          Review &rarr;
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}