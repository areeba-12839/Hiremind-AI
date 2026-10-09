import React, { useState } from 'react';
import {
  LayoutDashboard, Play, FileText, TrendingUp,
  FileSearch, BookOpen, Target, User, ChevronLeft, ChevronRight, Brain, Bell, Search,
} from 'lucide-react';
import { Page } from '../types';

const NAV = [
  { label: 'Dashboard', icon: LayoutDashboard, page: 'student-dashboard' as Page },
  { label: 'Practice Interview', icon: Play, page: 'create-practice' as Page },
  { label: 'My Interviews', icon: FileText, page: 'interview-results' as Page },
  { label: 'Performance', icon: TrendingUp, page: 'student-performance' as Page },
  { label: 'Resume Analyzer', icon: FileSearch, page: 'resume-analysis' as Page },
  { label: 'Question Bank', icon: BookOpen, page: 'question-bank' as Page },
  { label: 'Progress', icon: Target, page: 'student-performance' as Page },
  { label: 'Profile', icon: User, page: 'student-dashboard' as Page },
];

export default function StudentLayout({
  children, currentPage, navigate,
}: {
  children: React.ReactNode; currentPage: Page; navigate: (p: Page) => void;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <aside className={`${collapsed ? 'w-16' : 'w-60'} flex-shrink-0 bg-white border-r border-gray-200 flex flex-col transition-all duration-200`}>
        <div className="flex items-center gap-2.5 px-4 py-4 border-b border-gray-100">
          <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Brain size={18} className="text-white" />
          </div>
          {!collapsed && (
            <span className="font-bold text-gray-900 text-base" style={{ fontFamily: 'var(--font-heading)' }}>
              HireMind AI
            </span>
          )}
        </div>

        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
          {NAV.map(({ label, icon: Icon, page }) => {
            const active = currentPage === page;
            return (
              <button
                key={label}
                onClick={() => navigate(page)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                  active ? 'bg-violet-50 text-violet-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={18} className={active ? 'text-violet-600' : 'text-gray-400'} />
                {!collapsed && <span>{label}</span>}
              </button>
            );
          })}
        </nav>

        <button
          onClick={() => setCollapsed(c => !c)}
          className="m-3 p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors self-end"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 bg-white border-b border-gray-200 flex items-center px-6 gap-4 flex-shrink-0">
          <div className="flex-1 flex items-center gap-2 max-w-sm">
            <Search size={16} className="text-gray-400" />
            <input
              placeholder="Search questions, interviews..."
              className="flex-1 text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder:text-gray-400"
            />
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <button className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100">
              <Bell size={18} />
            </button>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold text-violet-700">SA</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-800">Sarah Ahmed</p>
                <p className="text-xs text-gray-400">CS Student</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
