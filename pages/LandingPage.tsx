import React from 'react';
import { Brain, Briefcase, GraduationCap, Check, Zap, Users, BarChart3, ArrowRight, Star } from 'lucide-react';
import { Page, UserRole } from '../types';

export default function LandingPage({ navigate, setRole }: {
  navigate: (p: Page) => void; setRole: (r: UserRole) => void;
}) {
  const features = [
    { icon: Zap, title: 'AI-Powered Questions', desc: 'Dynamically generated questions tailored to each role and skill level.' },
    { icon: Users, title: 'Smart Screening', desc: 'Automatically evaluate candidates against your defined criteria.' },
    { icon: BarChart3, title: 'Deep Analytics', desc: 'Comprehensive performance insights and score breakdowns.' },
    { icon: Brain, title: 'Multilingual Support', desc: 'Conduct interviews in English, Urdu, or mixed language sessions.' },
  ];

  const steps = [
    { n: '01', title: 'Create Your Interview', desc: 'Set up a customized AI interview session with your preferred questions, duration, and evaluation criteria.' },
    { n: '02', title: 'Share with Candidates', desc: 'Send a unique interview link to candidates. They complete it on their own time.' },
    { n: '03', title: 'Review AI Analysis', desc: 'Get detailed scores, transcripts, and AI-generated insights for every candidate.' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Brain size={18} className="text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg" style={{ fontFamily: 'var(--font-heading)' }}>HireMind AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#how" className="hover:text-indigo-600 transition-colors">How It Works</a>
            <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
            <a href="#about" className="hover:text-indigo-600 transition-colors">About</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('login')} className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Login</button>
            <button onClick={() => navigate('signup')} className="text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors">Sign Up</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-20 pb-24">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-indigo-200 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-purple-200 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 text-sm font-medium text-indigo-700 mb-8">
            <Zap size={14} />
            AI-Powered Recruitment &amp; Interview Preparation
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Smarter Interviews.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Better Hiring. Better Preparation.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed">
            An AI-powered recruitment screening and interview preparation platform for recruiters and candidates.
          </p>

          {/* Role Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Recruiter Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 text-left hover:shadow-xl hover:border-indigo-200 transition-all group">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-5">
                <Briefcase size={24} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>I'm a Recruiter</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Create AI interviews, screen candidates, customize evaluation criteria, and discover the best candidates for the next hiring stage.
              </p>
              <ul className="space-y-2 mb-8">
                {['Custom AI interview sessions', 'Automated candidate scoring', 'Bulk candidate management'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <Check size={14} className="text-emerald-500 flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => { setRole('recruiter'); navigate('recruiter-dashboard'); }}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors group-hover:bg-indigo-700"
              >
                Continue as Recruiter <ArrowRight size={16} />
              </button>
            </div>

            {/* Student Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 text-left hover:shadow-xl hover:border-violet-200 transition-all group">
              <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mb-5">
                <GraduationCap size={24} className="text-violet-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>I'm a Student</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Practice realistic AI interviews, improve technical and communication skills, analyze your resume, and prepare for your dream job.
              </p>
              <ul className="space-y-2 mb-8">
                {['Realistic AI interview practice', 'Detailed performance feedback', 'Resume ATS analysis'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <Check size={14} className="text-emerald-500 flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => { setRole('student'); navigate('student-dashboard'); }}
                className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Start Practicing <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>How It Works</h2>
            <p className="text-gray-500">Three simple steps to smarter hiring.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map(s => (
              <div key={s.n} className="bg-white rounded-2xl border border-gray-200 p-7 shadow-sm">
                <div className="text-4xl font-extrabold text-indigo-100 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{s.n}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Platform Features</h2>
            <p className="text-gray-500">Everything you need for modern recruitment and interview prep.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map(f => (
              <div key={f.title} className="flex gap-5 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-11 h-11 bg-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <f.icon size={20} className="text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{f.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-16 bg-indigo-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} size={20} className="text-yellow-300 fill-yellow-300" />)}
          </div>
          <p className="text-white text-xl font-medium italic mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            "HireMind AI cut our screening time by 70% and helped us identify top candidates we would have otherwise missed."
          </p>
          <p className="text-indigo-200 text-sm">— Head of Talent Acquisition, TechCorp Inc.</p>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="py-12 bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Brain size={15} className="text-white" />
            </div>
            <span className="font-bold text-white text-sm">HireMind AI</span>
          </div>
          <p className="text-sm">AI-powered recruitment and interview preparation.</p>
          <p className="text-sm">© 2026 HireMind AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
