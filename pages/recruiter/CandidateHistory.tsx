import React, { useState } from 'react';
import { Search, TrendingUp } from 'lucide-react';
import { StatusBadge, Card } from '../../components/shared';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const perfData = [
  { interview: 'Mar 2026', score: 64, technical: 58, communication: 71 },
  { interview: 'Sep 2026', score: 82, technical: 84, communication: 78 },
];

export default function CandidateHistory() {
  const [search, setSearch] = useState('');

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Candidate History</h1>
        <p className="text-sm text-gray-500 mt-0.5">Company-specific interview history with privacy controls.</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <p className="text-sm font-medium text-gray-700 mb-3">Search Candidate</p>
        <div className="grid md:grid-cols-4 gap-3">
          {['Candidate ID', 'Name', 'Email', 'Phone'].map(p => (
            <div key={p} className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
              <Search size={14} className="text-gray-400" />
              <input placeholder={p} className="flex-1 text-sm focus:outline-none placeholder:text-gray-400" />
            </div>
          ))}
        </div>
      </div>

      {/* Privacy notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
        <strong>Privacy Notice:</strong> Candidate data is identified by unique Candidate ID. Home addresses are not stored as identifiers. Access to sensitive data is logged and restricted to authorized recruiters.
      </div>

      {/* Candidate Card */}
      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="p-5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center font-bold text-indigo-700">AK</div>
            <div>
              <p className="font-semibold text-gray-900">Aisha Khan</p>
              <p className="text-xs text-gray-400">AI-2026-001</p>
            </div>
          </div>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Email</span><span className="text-gray-800">aisha.khan@gmail.com</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Phone</span><span className="text-gray-800">+92 300 1234567</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Interviews</span><span className="font-semibold text-indigo-600">2</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-500">Latest Status</span><StatusBadge status="Qualified" /></div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          {/* Timeline */}
          <Card className="p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Interview Timeline</h3>
            <div className="relative space-y-5 pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
              {[
                { n: 1, role: 'Machine Learning Internship', date: 'March 2026', score: 64, status: 'Not Qualified' },
                { n: 2, role: 'AI Engineer', date: 'September 2026', score: 82, status: 'Qualified' },
              ].map(item => (
                <div key={item.n} className="relative">
                  <div className="absolute -left-6 top-0 w-4 h-4 bg-indigo-600 rounded-full border-2 border-white shadow" />
                  <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Interview #{item.n} — {item.role}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{item.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-xl text-gray-900">{item.score}%</p>
                        <StatusBadge status={item.status} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Improvement Chart */}
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} className="text-emerald-600" />
              <h3 className="font-semibold text-gray-900">Performance Improvement</h3>
              <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full ml-auto">+18% Overall</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={perfData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="interview" tick={{ fontSize: 12, fill: '#6b7280' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="score" name="Overall" stroke="#4f46e5" strokeWidth={2} dot={{ r: 5, fill: '#4f46e5' }} />
                <Line type="monotone" dataKey="technical" name="Technical" stroke="#7c3aed" strokeWidth={2} dot={{ r: 5, fill: '#7c3aed' }} />
                <Line type="monotone" dataKey="communication" name="Communication" stroke="#06b6d4" strokeWidth={2} dot={{ r: 5, fill: '#06b6d4' }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </div>
  );
}
