'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Registration {
  name: string;
  parentName: string;
  age: string;
  experience: string;
  phone: string;
  registeredDate: string;
  registeredTime: string;
  fullTimestamp: string;
}

export default function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this should be handled server-side with JWT/Session
    // But for a simple private page as requested, a client-side secret check suffices
    if (password === 'chessmaster2026') {
      setIsAuthenticated(true);
      setError('');
      localStorage.setItem('admin_auth', 'true');
    } else {
      setError('Invalid password');
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchRegistrations();
    }
  }, [isAuthenticated]);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/registrations');
      const data = await response.json();
      if (data.registrations) {
        setRegistrations(data.registrations);
      }
    } catch (err) {
      console.error('Failed to fetch:', err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4 chess-pattern">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-max-w-md glass-strong p-8 rounded-2xl gold-border"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold gold-text mb-2">Admin Access</h1>
            <p className="text-text-secondary">Enter password to view registrations</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-dark p-4 rounded-xl border border-white/10 focus:border-gold outline-none transition-colors"
                placeholder="Password"
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            
            <button type="submit" className="w-full btn-gold">
              Login to Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8 chess-pattern">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold gold-text-bright">Registration Dashboard</h1>
            <p className="text-text-secondary mt-2">Manage and view all demo class registrations</p>
          </div>
          <div className="flex gap-4">
            <button onClick={fetchRegistrations} className="btn-outline-gold px-6 py-2">
              Refresh Data
            </button>
            <button onClick={logout} className="bg-red-500/10 text-red-500 border border-red-500/20 px-6 py-2 rounded-lg hover:bg-red-500/20 transition-all">
              Logout
            </button>
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
          </div>
        ) : (
          <div className="glass-strong rounded-2xl gold-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="p-4 font-semibold gold-text">Student Name</th>
                    <th className="p-4 font-semibold gold-text">Parent Name</th>
                    <th className="p-4 font-semibold gold-text">Age</th>
                    <th className="p-4 font-semibold gold-text">Experience</th>
                    <th className="p-4 font-semibold gold-text">Phone Number</th>
                    <th className="p-4 font-semibold gold-text">Registration Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <AnimatePresence>
                    {registrations.length > 0 ? (
                      registrations.map((reg, index) => (
                        <motion.tr 
                          key={reg.fullTimestamp}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="hover:bg-white/5 transition-colors"
                        >
                          <td className="p-4 font-medium text-white">{reg.name}</td>
                          <td className="p-4 text-text-secondary">{reg.parentName}</td>
                          <td className="p-4 text-text-secondary">{reg.age}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              reg.experience === 'intermediate' ? 'bg-blue-500/10 text-blue-400' :
                              reg.experience === 'advanced' ? 'bg-purple-500/10 text-purple-400' :
                              'bg-green-500/10 text-green-400'
                            }`}>
                              {reg.experience.charAt(0).toUpperCase() + reg.experience.slice(1)}
                            </span>
                          </td>
                          <td className="p-4 text-text-secondary font-mono">{reg.phone}</td>
                          <td className="p-4 text-text-muted text-sm">
                            {reg.registeredDate} <br />
                            <span className="opacity-50">{reg.registeredTime}</span>
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="p-12 text-center text-text-muted">
                          No registrations found yet.
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        )}

        <footer className="mt-8 text-center text-text-muted text-sm">
          Total Registrations: {registrations.length}
        </footer>
      </div>
    </div>
  );
}
