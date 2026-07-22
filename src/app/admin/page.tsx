'use client';

import React, { useCallback, useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  UserPlus, 
  TrendingUp, 
  Filter, 
  ChevronRight, 
  Palette, 
  Check, 
  RotateCcw, 
  Globe, 
  Save,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const PRESET_COLORS = [
  { name: 'Warm Cream (Default)', hex: '#fff8e6', textDark: true },
  { name: 'Soft Linen', hex: '#f8f7f2', textDark: true },
  { name: 'Pure White', hex: '#ffffff', textDark: true },
  { name: 'Light Gray', hex: '#f3f4f6', textDark: true },
  { name: 'Soft Amber', hex: '#fffbeb', textDark: true },
  { name: 'Mint Fresh', hex: '#f0fdf4', textDark: true },
  { name: 'Dark Navy', hex: '#0f172a', textDark: false },
  { name: 'Midnight Charcoal', hex: '#18181b', textDark: false },
];

export default function AdminDashboardPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState<any>(null);
  
  // Dynamic Theme state
  const [activeGlobalColor, setActiveGlobalColor] = useState('#fff8e6');
  const [selectedColor, setSelectedColor] = useState('#fff8e6');
  const [savingTheme, setSavingTheme] = useState(false);
  const [themeStatus, setThemeStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchThemeSetting = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/theme');
      if (res.ok) {
        const data = await res.json();
        if (data.backgroundColor) {
          setActiveGlobalColor(data.backgroundColor);
          setSelectedColor(data.backgroundColor);
        }
      }
    } catch (err) {
      console.error('Failed to fetch dynamic theme setting:', err);
    }
  }, []);

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

  useEffect(() => {
    const authStatus = localStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchMetrics();
      fetchThemeSetting();
    }
  }, [fetchMetrics, fetchThemeSetting]);

  const handlePreviewColor = (newColor: string) => {
    setSelectedColor(newColor);
    document.body.style.backgroundColor = newColor;
    localStorage.setItem("test_bg_color", newColor);
    window.dispatchEvent(new CustomEvent('themeChange', { detail: { backgroundColor: newColor } }));
  };

  const handleSaveTheme = async (colorToSave?: string) => {
    const color = colorToSave || selectedColor;
    setSavingTheme(true);
    setThemeStatus(null);
    try {
      const res = await fetch('/api/admin/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ backgroundColor: color }),
      });

      if (res.ok) {
        const data = await res.json();
        setActiveGlobalColor(data.backgroundColor);
        setSelectedColor(data.backgroundColor);
        document.body.style.backgroundColor = data.backgroundColor;
        localStorage.setItem("site_bg_color", data.backgroundColor);
        localStorage.setItem("test_bg_color", data.backgroundColor);
        window.dispatchEvent(new CustomEvent('themeChange', { detail: { backgroundColor: data.backgroundColor } }));
        setThemeStatus({ type: 'success', message: 'Global background color published successfully to live website!' });
      } else {
        const errData = await res.json();
        setThemeStatus({ type: 'error', message: errData.error || 'Failed to publish background color.' });
      }
    } catch (err) {
      setThemeStatus({ type: 'error', message: 'An error occurred while saving global theme.' });
    } finally {
      setSavingTheme(false);
    }
  };

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
        fetchThemeSetting();
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

  const isUnsaved = selectedColor.toLowerCase() !== activeGlobalColor.toLowerCase();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-4 sm:p-8 pb-20">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col gap-5 sm:flex-row sm:justify-between sm:items-center mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">CRM Dashboard</h1>
            <p className="text-gray-500 mt-2">Marketing performance, lead tracking & site theme customization</p>
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

        {/* Dynamic Theme Control Card */}
        <div className="mt-10 bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-gray-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Palette className="w-6 h-6 text-amber-600" />
                <h2 className="text-2xl font-bold text-gray-900">Dynamic Site Background Theme</h2>
              </div>
              <p className="text-gray-500 text-sm mt-1">
                Customize and publish the single background color globally across all live site visitors.
              </p>
            </div>

            {/* Active Published Color Badge */}
            <div className="flex items-center gap-3 bg-gray-50 p-2.5 px-4 rounded-lg border border-gray-200 self-start sm:self-auto">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Published:</span>
              <div className="flex items-center gap-2">
                <span 
                  className="w-5 h-5 rounded-full border border-gray-300 shadow-inner inline-block" 
                  style={{ backgroundColor: activeGlobalColor }}
                />
                <code className="font-mono font-bold text-gray-800 text-sm uppercase">{activeGlobalColor}</code>
              </div>
            </div>
          </div>

          {themeStatus && (
            <div className={`p-4 mb-6 rounded-lg flex items-center gap-3 ${
              themeStatus.type === 'success' ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              {themeStatus.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <p className="text-sm font-medium">{themeStatus.message}</p>
            </div>
          )}

          {/* Preset Palettes */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Quick Preset Palettes
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {PRESET_COLORS.map((preset) => {
                const isSelected = selectedColor.toLowerCase() === preset.hex.toLowerCase();
                return (
                  <button
                    key={preset.hex}
                    type="button"
                    onClick={() => handlePreviewColor(preset.hex)}
                    className={`flex flex-col items-center justify-between p-3 rounded-lg border text-left transition-all relative ${
                      isSelected 
                        ? 'border-blue-600 ring-2 ring-blue-500/20 bg-blue-50/20 shadow-sm' 
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div 
                      className="w-full h-10 rounded border border-gray-200 shadow-inner mb-2 flex items-center justify-center"
                      style={{ backgroundColor: preset.hex }}
                    >
                      {isSelected && (
                        <Check className={`w-4 h-4 ${preset.textDark ? 'text-gray-900' : 'text-white'}`} />
                      )}
                    </div>
                    <span className="text-xs font-semibold text-gray-700 text-center leading-tight truncate w-full">
                      {preset.name}
                    </span>
                    <span className="text-[10px] font-mono text-gray-500 mt-1 uppercase">
                      {preset.hex}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Color Selector & Actions */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-gray-50 p-5 rounded-xl border border-gray-200">
            
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Color Picker</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={selectedColor} 
                    onChange={(e) => handlePreviewColor(e.target.value)} 
                    className="w-14 h-12 cursor-pointer border-0 rounded bg-transparent"
                  />
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-mono font-bold">#</span>
                    <input 
                      type="text" 
                      value={selectedColor.replace('#', '')} 
                      onChange={(e) => {
                        const hex = `#${e.target.value.replace(/[^0-9A-Fa-f]/g, '').slice(0, 6)}`;
                        handlePreviewColor(hex);
                      }} 
                      placeholder="FFF8E6"
                      className="font-mono text-gray-900 font-bold text-base p-2.5 pl-7 w-32 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase"
                    />
                  </div>
                </div>
              </div>

              {isUnsaved && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full border border-amber-200">
                  <Globe className="w-3.5 h-3.5" />
                  Previewing locally - click Save to publish live
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <button 
                type="button"
                onClick={() => {
                  handlePreviewColor('#fff8e6');
                  handleSaveTheme('#fff8e6');
                }}
                disabled={savingTheme}
                className="border border-gray-300 text-gray-700 bg-white px-4 py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                <RotateCcw className="w-4 h-4" /> Reset Default (#fff8e6)
              </button>

              <button 
                type="button"
                onClick={() => handleSaveTheme()}
                disabled={savingTheme}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg font-bold transition flex items-center justify-center gap-2 text-sm shadow-sm disabled:opacity-50"
              >
                {savingTheme ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save & Publish Live Background
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
