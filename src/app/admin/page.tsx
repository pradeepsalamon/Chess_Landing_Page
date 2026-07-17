'use client';

import React, { useCallback, useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, UserPlus, TrendingUp, Filter, ChevronRight } from 'lucide-react';

export default function AdminDashboardPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState<any>(null);
  
  // Theme testing state (retained from previous request)
  const [testColor, setTestColor] = useState('#fff8e6');

  useEffect(() => {
    const authStatus = localStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchMetrics();
    }
    const savedColor = localStorage.getItem("test_bg_color");
    if (savedColor) {
      setTestColor(savedColor);
    }
  }, []);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setTestColor(newColor);
    document.body.style.backgroundColor = newColor;
    localStorage.setItem("test_bg_color", newColor);
  };

  const fetchMetrics = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/metrics');
      if (res.ok) {
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setMetrics(data);
      } else if (res.status === 401) {
        setIsAuthenticated(false);
        localStorage.removeItem('adminAuth');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
        localStorage.setItem('adminAuth', 'true');
        fetchMetrics();
      } else {
        setError('Invalid password');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    localStorage.removeItem('adminAuth');
    await fetch('/api/admin/auth', { method: 'DELETE' });
    setIsAuthenticated(false);
    setMetrics(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f5f1e8] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-xl border border-[#d8c49a] shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#24180d] mb-2">Admin Access</h1>
            <p className="text-[#6b5b47]">Enter password to access CRM dashboard</p>
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
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-4 sm:p-8 pb-20">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col gap-5 sm:flex-row sm:justify-between sm:items-center mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">CRM Dashboard</h1>
            <p className="text-gray-500 mt-2">Marketing performance and lead tracking overview</p>
          </div>
          <div className="flex gap-4">
            <Link 
              href="/admin/leads" 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2 shadow-sm"
            >
              Open Leads Pipeline <ChevronRight className="w-4 h-4" />
            </Link>
            <button onClick={logout} className="border border-red-200 text-red-600 bg-white px-6 py-2 rounded-lg font-semibold hover:bg-red-50 transition">
              Logout
            </button>
          </div>
        </header>

        {loading || !metrics ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Top Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Visitors</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.visitors?.total || 0}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                    <Users className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-sm text-green-600 font-medium mt-4">+{metrics.visitors?.today || 0} today</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Leads</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.leads?.total || 0}</p>
                  </div>
                  <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                    <UserPlus className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-sm text-green-600 font-medium mt-4">+{metrics.leads?.today || 0} today</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.conversion?.rate || 0}%</p>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-sm text-gray-500 font-medium mt-4">{metrics.conversion?.count || 0} converted leads</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Pipeline Sources</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">Organic: {metrics.sourceDistribution?.Organic || 0}</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
                    <Filter className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-sm text-gray-500 font-medium mt-4">Meta/Ads: {
                  Object.entries(metrics.sourceDistribution || {})
                    .filter(([k]) => k !== 'Organic')
                    .reduce((sum, [_, v]) => sum + Number(v), 0)
                }</p>
              </div>

            </div>
          </div>
        )}

        {/* Theme Tester Retained */}
        <div className="mt-12 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Site Theme Testing</h2>
          <p className="text-gray-500 mb-4">Select a color below to instantly test how it looks as the background color on the site. This only changes the color for you locally.</p>
          <div className="flex flex-wrap items-center gap-4">
            <input 
              type="color" 
              value={testColor} 
              onChange={handleColorChange} 
              className="w-16 h-16 cursor-pointer border-0 rounded"
            />
            <input 
              type="text" 
              value={testColor} 
              onChange={handleColorChange} 
              placeholder="#F8F7F2"
              className="font-mono text-gray-900 font-bold text-lg p-3 w-32 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button 
              onClick={() => {
                setTestColor('#fff8e6');
                document.body.style.backgroundColor = '#fff8e6';
                localStorage.setItem("test_bg_color", '#fff8e6');
              }}
              className="border border-gray-300 text-gray-700 bg-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Reset to Default
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
