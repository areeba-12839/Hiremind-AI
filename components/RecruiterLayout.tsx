import React, { useState } from 'react';
import {
  LayoutDashboard, PlusCircle, FileText, Users, History,
  BookOpen, BarChart3, Settings, User, Bell, Search,
  ChevronLeft, ChevronRight, Brain,
} from 'lucide-react';
import { Page } from '../types';

const NAV = [
  { label: 'Dashboard', icon: LayoutDashboard, page: 'recruiter-dashboard' as Page },
  { label: 'Create Interview', icon: PlusCircle, page: 'create-interview' as Page },
  { label: 'Interviews', icon: FileText, page: 'create-interview' as Page },
  { label: 'Candidates', icon: Users, page: 'candidate-list' as Page },
  { label: 'Candidate History', icon: History, page: 'candidate-history' as Page },
  { label: 'Question Bank', icon: BookOpen, page: 'question-bank' as Page },
  { label: 'Analytics', icon: BarChart3, page: 'recruiter-analytics' as Page },
  { label: 'Company Settings', icon: Settings, page: 'recruiter-dashboard' as Page },
  { label: 'Profile', icon: User, page: 'recruiter-dashboard' as Page },
];

export default function RecruiterLayout({
  children, currentPage, navigate,
}: {
  children: React.ReactNode; currentPage: Page; navigate: (p: Page) => void;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <aside className={`${collapsed ? 'w-16' : 'w-60'} flex-shrink-0 bg-white border-r border-gray-200 flex flex-col transition-all duration-200`}>
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 py-4 border-b border-gray-100">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Brain size={18} className="text-white" />
          </div>
          {!collapsed && (
            <span className="font-bold text-gray-900 text-base" style={{ fontFamily: 'var(--font-heading)' }}>
              HireMind AI
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
          {NAV.map(({ label, icon: Icon, page }) => {
            const active = currentPage === page;
            return (
              <button
                key={label}
                onClick={() => navigate(page)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                  active ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={18} className={active ? 'text-indigo-600' : 'text-gray-400'} />
                {!collapsed && <span>{label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Collapse btn */}
        <button
          onClick={() => setCollapsed(c => !c)}
          className="m-3 p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors self-end"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center px-6 gap-4 flex-shrink-0">
          <div className="flex-1 flex items-center gap-2 max-w-sm">
            <Search size={16} className="text-gray-400" />
            <input
              placeholder="Search candidates, interviews..."
              className="flex-1 text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400"
            />
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <button className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold text-indigo-700">JD</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-800">James Doyle</p>
                <p className="text-xs text-gray-400">TechCorp Inc.</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
