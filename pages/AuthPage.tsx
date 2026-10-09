import React, { useState } from 'react';
import { Brain, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Page, UserRole } from '../types';

export default function AuthPage({ mode, navigate, setRole }: {
  mode: 'login' | 'signup'; navigate: (p: Page) => void; setRole: (r: UserRole) => void;
}) {
  const [showPw, setShowPw] = useState(false);
  const [role, setLocalRole] = useState<'student' | 'recruiter'>('student');
  const isLogin = mode === 'login';

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back */}
        <button onClick={() => navigate('landing')} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 mb-8 transition-colors">
          <ArrowLeft size={15} /> Back to home
        </button>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Brain size={18} className="text-white" />
            </div>
            <span className="font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>HireMind AI</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            {isLogin ? 'Sign in to continue to your dashboard.' : 'Join thousands of users on HireMind AI.'}
          </p>

          {/* Role Toggle (signup only) */}
          {!isLogin && (
            <div className="grid grid-cols-2 gap-2 mb-6 p-1 bg-gray-100 rounded-xl">
              <button
                onClick={() => setLocalRole('student')}
                className={`py-2 text-sm font-semibold rounded-lg transition-colors ${role === 'student' ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-500'}`}
              >
                Student
              </button>
              <button
                onClick={() => setLocalRole('recruiter')}
                className={`py-2 text-sm font-semibold rounded-lg transition-colors ${role === 'recruiter' ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-500'}`}
              >
                Recruiter
              </button>
            </div>
          )}

          <form onSubmit={e => { e.preventDefault(); setRole(isLogin ? 'student' : role); navigate(isLogin ? 'student-dashboard' : (role === 'recruiter' ? 'recruiter-dashboard' : 'student-dashboard')); }} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" placeholder="Sarah Ahmed" className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" />
            </div>

            {!isLogin && role === 'recruiter' && (
              <>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">Company Name</label>
                  <input type="text" placeholder="TechCorp Inc." className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">Company Size</label>
                  <select className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                    <option>1–10 employees</option>
                    <option>11–50 employees</option>
                    <option>51–200 employees</option>
                    <option>201–500 employees</option>
                    <option>500+ employees</option>
                  </select>
                </div>
              </>
            )}

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">
                {!isLogin && role === 'recruiter' ? 'Work Email' : 'Email Address'}
              </label>
              <input type="email" placeholder="you@example.com" className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                />
                <button type="button" onClick={() => setShowPw(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors mt-2">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => navigate(isLogin ? 'signup' : 'login')} className="text-indigo-600 font-semibold hover:underline">
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
