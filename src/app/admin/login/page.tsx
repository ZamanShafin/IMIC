'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, Mail, ShieldAlert, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@imic.com.bd');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        router.push('/admin');
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Login connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-imic-navy flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="relative w-14 h-14 mx-auto rounded-xl overflow-hidden border border-slate-200 p-1">
            <Image src="/images/logo/logo.jpeg" alt="IMIC Logo" fill className="object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-imic-navy">IMIC Admin Portal</h1>
          <p className="text-xs text-slate-500">Sign in to access patient bookings, CMS, and analytics</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-imic-teal focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-imic-teal focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-imic-navy hover:bg-imic-navy-dark text-white font-bold text-sm py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4 text-imic-teal" />
          </button>
        </form>

        <div className="pt-2 border-t border-slate-100 text-center text-[11px] text-slate-400">
          Demo Admin Credentials: <span className="font-mono text-slate-600 font-bold">admin@imic.com.bd</span>
        </div>
      </div>
    </div>
  );
}
