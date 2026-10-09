import React from 'react';
import { Users, CheckCircle, FileText, TrendingUp, MoreHorizontal, Plus, Eye } from 'lucide-react';
import { StatCard, StatusBadge, SectionHeader, PrimaryBtn } from '../../components/shared';
import { Page } from '../../types';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

const interviews = [
  { name: 'ML Engineer Screening', position: 'Machine Learning Engineer', candidates: 24, completed: 18, qualified: 9, status: 'Active' },
  { name: 'Backend Dev Round 1', position: 'Backend Developer', candidates: 31, completed: 31, qualified: 14, status: 'Completed' },
  { name: 'Data Scientist Initial', position: 'Data Scientist', candidates: 12, completed: 8, qualified: 4, status: 'Active' },
  { name: 'AI Intern Screening', position: 'AI Engineer Intern', candidates: 47, completed: 38, qualified: 11, status: 'Completed' },
  { name: 'Frontend Engineer', position: 'React Developer', candidates: 19, completed: 6, qualified: 3, status: 'Active' },
];

const chartData = [
  { name: 'AI / ML', technical: 74, communication: 68, overall: 72 },
  { name: 'Backend', technical: 81, communication: 63, overall: 74 },
  { name: 'Frontend', technical: 72, communication: 71, overall: 72 },
  { name: 'Data Science', technical: 78, communication: 66, overall: 74 },
  { name: 'DevOps', technical: 69, communication: 72, overall: 70 },
];

const activity = [
  { name: 'Aisha Khan', role: 'ML Engineer', score: 84, time: '2h ago', status: 'Qualified' },
  { name: 'Marcus Lee', role: 'Backend Dev', score: 61, time: '4h ago', status: 'Review Required' },
  { name: 'Priya Sharma', role: 'Data Scientist', score: 77, time: '5h ago', status: 'Qualified' },
  { name: 'Daniel Osei', role: 'AI Intern', score: 48, time: '6h ago', status: 'Not Qualified' },
];

export default function RecruiterDashboard({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Monday, September 29, 2026</p>
        </div>
        <PrimaryBtn onClick={() => navigate('create-interview')} className="flex items-center gap-2">
          <Plus size={16} /> Create Interview
        </PrimaryBtn>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Interviews" value="8" sub="+2 this week" icon={<FileText size={20} />} color="bg-indigo-50" iconColor="text-indigo-600" />
        <StatCard label="Candidates Interviewed" value="214" sub="All time" icon={<Users size={20} />} color="bg-blue-50" iconColor="text-blue-600" />
        <StatCard label="Qualified Candidates" value="67" sub="31% qualification rate" icon={<CheckCircle size={20} />} color="bg-emerald-50" iconColor="text-emerald-600" />
        <StatCard label="Interviews Completed" value="189" sub="88% completion rate" icon={<TrendingUp size={20} />} color="bg-purple-50" iconColor="text-purple-600" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Interviews Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Recent Interviews</h2>
            <button className="text-sm text-indigo-600 font-medium hover:underline">View all</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  {['Interview Name', 'Position', 'Candidates', 'Completed', 'Qualified', 'Status', ''].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {interviews.map(i => (
                  <tr key={i.name} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3.5 font-medium text-gray-900">{i.name}</td>
                    <td className="px-4 py-3.5 text-gray-500">{i.position}</td>
                    <td className="px-4 py-3.5 text-gray-700">{i.candidates}</td>
                    <td className="px-4 py-3.5 text-gray-700">{i.completed}</td>
                    <td className="px-4 py-3.5 text-gray-700">{i.qualified}</td>
                    <td className="px-4 py-3.5"><StatusBadge status={i.status} /></td>
                    <td className="px-4 py-3.5">
                      <button onClick={() => navigate('candidate-list')} className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 text-xs font-medium">
                        <Eye size={13} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <SectionHeader title="Recent Activity" />
          <div className="space-y-4">
            {activity.map(a => (
              <div key={a.name} className="flex items-start gap-3">
                <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-xs font-semibold text-gray-600 flex-shrink-0">
                  {a.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-gray-900 truncate">{a.name}</p>
                    <span className="text-xs text-gray-400 flex-shrink-0">{a.time}</span>
                  </div>
                  <p className="text-xs text-gray-500">{a.role} · Score: <span className="font-semibold">{a.score}%</span></p>
                  <StatusBadge status={a.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <SectionHeader title="Candidate Performance by Position" />
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b7280' }} />
            <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} domain={[0, 100]} />
            <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="technical" name="Technical Score" fill="#4f46e5" radius={[3, 3, 0, 0]} />
            <Bar dataKey="communication" name="Communication Score" fill="#7c3aed" radius={[3, 3, 0, 0]} />
            <Bar dataKey="overall" name="Overall Score" fill="#06b6d4" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
