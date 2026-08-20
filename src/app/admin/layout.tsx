'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  FileText, 
  Inbox, 
  Building2, 
  Stethoscope, 
  BookOpen, 
  MessageSquare, 
  BarChart3, 
  Users, 
  Settings, 
  LogOut, 
  ExternalLink, 
  ShieldCheck 
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // If on login page, render without sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Bookings', href: '/admin/bookings', icon: CalendarCheck },
    { label: 'Quote Requests', href: '/admin/quotes', icon: FileText },
    { label: 'Contact Messages', href: '/admin/contacts', icon: Inbox },
    { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { label: 'Hospitals CMS', href: '/admin/cms/hospitals', icon: Building2 },
    { label: 'Doctors CMS', href: '/admin/cms/doctors', icon: Stethoscope },
    { label: 'Specialties CMS', href: '/admin/cms/specialties', icon: ShieldCheck },
    { label: 'Blog CMS', href: '/admin/cms/blog', icon: BookOpen },
    { label: 'Testimonials CMS', href: '/admin/cms/testimonials', icon: MessageSquare },
    { label: 'Team Members', href: '/admin/cms/team', icon: Users },
    { label: 'Site Settings', href: '/admin/cms/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-slate-100 text-slate-800">
      {/* Sidebar */}
      <aside className="w-64 bg-imic-navy text-white flex flex-col justify-between shrink-0 shadow-2xl z-30">
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700 pb-4">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white p-1">
              <Image src="/images/logo/logo.jpeg" alt="IMIC Logo" fill priority className="object-contain" />
            </div>
            <div>
              <span className="font-bold text-base text-white block">IMIC Admin</span>
              <span className="text-[10px] text-imic-teal block uppercase font-semibold">Management Console</span>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-imic-teal text-white shadow-md'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 space-y-2 text-xs">
          <Link
            href="/"
            target="_blank"
            prefetch={true}
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-imic-teal" />
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 font-bold transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 py-4 px-8 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <div>
            <h2 className="text-lg font-bold text-imic-navy">IMIC Staff Operations</h2>
            <p className="text-xs text-slate-500">Dhaka CPAC International Patient Coordination System</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-600">System Live & Connected</span>
          </div>
        </header>

        {/* Dynamic Page Container */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
