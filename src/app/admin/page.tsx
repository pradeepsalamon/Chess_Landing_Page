'use client';

import React, { useCallback, useState } from 'react';
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

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/admin/registrations');

      if (response.status === 401) {
        setIsAuthenticated(false);
        setRegistrations([]);
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || 'Failed to fetch registrations');
      }

      setRegistrations(data.registrations || []);
      setIsAuthenticated(true);
    } catch (err) {
      console.error('Failed to fetch:', err);
      setError('Failed to load registrations.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || 'Invalid password');
      }

      setIsAuthenticated(true);
      setPassword('');
      await fetchRegistrations();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid password');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    setIsAuthenticated(false);
    setRegistrations([]);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f5f1e8] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white p-8 rounded-xl border border-[#d8c49a] shadow-xl"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#24180d] mb-2">Admin Access</h1>
            <p className="text-[#6b5b47]">Enter password to view registrations</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white p-4 rounded-lg border border-[#cdbb95] text-[#1c1710] focus:border-[#9b6b18] outline-none transition-colors"
                placeholder="Password"
              />
              {error && <p className="text-red-700 text-sm mt-2">{error}</p>}
            </div>
            
            <button type="submit" className="w-full bg-[#d4a843] text-[#111] font-bold py-3 rounded-lg hover:bg-[#c49732] transition-colors">
              {loading ? 'Checking...' : 'Login to Dashboard'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f1e8] text-[#1c1710] p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col gap-5 sm:flex-row sm:justify-between sm:items-center mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#24180d]">Registration Dashboard</h1>
            <p className="text-[#6b5b47] mt-2">Manage and view all demo class registrations</p>
          </div>
          <div className="flex gap-4">
            <button onClick={fetchRegistrations} className="border border-[#9b6b18] text-[#5d3c07] bg-white px-6 py-2 rounded-lg font-semibold hover:bg-[#fff7df] transition-colors">
              Refresh Data
            </button>
            <button onClick={logout} className="bg-red-700 text-white border border-red-800 px-6 py-2 rounded-lg hover:bg-red-800 transition-all">
              Logout
            </button>
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-[#d8c49a] shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#24180d] border-b border-[#24180d]">
                  <tr>
                    <th className="p-4 font-semibold text-[#f6d77b]">Student Name</th>
                    <th className="p-4 font-semibold text-[#f6d77b]">Parent Name</th>
                    <th className="p-4 font-semibold text-[#f6d77b]">Age</th>
                    <th className="p-4 font-semibold text-[#f6d77b]">Experience</th>
                    <th className="p-4 font-semibold text-[#f6d77b]">Phone Number</th>
                    <th className="p-4 font-semibold text-[#f6d77b]">Registration Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eadfca]">
                  <AnimatePresence>
                    {registrations.length > 0 ? (
                      registrations.map((reg, index) => (
                        <motion.tr 
                          key={reg.fullTimestamp}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="odd:bg-white even:bg-[#fbf8f0] hover:bg-[#fff0c7] transition-colors"
                        >
                          <td className="p-4 font-semibold text-[#1c1710]">{reg.name}</td>
                          <td className="p-4 font-medium text-[#2d2518]">{reg.parentName}</td>
                          <td className="p-4 text-[#2d2518]">{reg.age}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              reg.experience === 'intermediate' ? 'bg-blue-100 text-blue-800' :
                              reg.experience === 'advanced' ? 'bg-purple-100 text-purple-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {reg.experience.charAt(0).toUpperCase() + reg.experience.slice(1)}
                            </span>
                          </td>
                          <td className="p-4 text-[#1c1710] font-mono font-semibold">{reg.phone}</td>
                          <td className="p-4 text-[#4f4639] text-sm">
                            {reg.registeredDate} <br />
                            <span className="text-[#776b5a]">{reg.registeredTime}</span>
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="p-12 text-center text-[#6b5b47]">
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

        <footer className="mt-8 text-center text-[#6b5b47] text-sm">
          Total Registrations: {registrations.length}
        </footer>
      </div>
    </div>
  );
}
