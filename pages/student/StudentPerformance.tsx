import React from 'react';
import { TrendingUp, Target } from 'lucide-react';
import { Card, SectionHeader, ScoreBar } from '../../components/shared';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar,
} from 'recharts';

const overallProgress = [
  { date: 'Sep 1', score: 58, technical: 52, communication: 64 },
  { date: 'Sep 8', score: 63, technical: 60, communication: 67 },
  { date: 'Sep 15', score: 68, technical: 66, communication: 70 },
  { date: 'Sep 21', score: 72, technical: 71, communication: 73 },
  { date: 'Sep 28', score: 78, technical: 78, communication: 65 },
];

const rolePerformance = [
  { role: 'AI Engineer', score: 78 },
  { role: 'ML Engineer', score: 72 },
  { role: 'Backend Dev', score: 65 },
  { role: 'Data Scientist', score: 61 },
];

export default function StudentPerformance() {
  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Performance Progress</h1>
        <p className="text-sm text-gray-500 mt-0.5">Track your improvement over time across all practice interviews.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Overall Progress', value: '+20%', sub: 'Since first interview', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Best Score', value: '78%', sub: 'AI Engineer (Sep 28)', color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Total Practice Time', value: '7.5h', sub: 'Across 14 sessions', color: 'text-violet-600', bg: 'bg-violet-50' },
          { label: 'Recommended Level', value: 'Hard', sub: 'Ready to level up!', color: 'text-blue-600', bg: 'bg-blue-50' },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <p className="text-xs text-gray-500 mb-1">{k.label}</p>
            <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{k.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Overall Score Over Time */}
        <Card className="p-5">
          <SectionHeader title="Overall Score Over Time" />
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={overallProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#6b7280' }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#6b7280' }} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="score" name="Overall" stroke="#7c3aed" strokeWidth={2.5} dot={{ r: 4, fill: '#7c3aed' }} />
              <Line type="monotone" dataKey="technical" name="Technical" stroke="#4f46e5" strokeWidth={2} dot={{ r: 3 }} strokeDasharray="4 2" />
              <Line type="monotone" dataKey="communication" name="Communication" stroke="#06b6d4" strokeWidth={2} dot={{ r: 3 }} strokeDasharray="4 2" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Role Performance */}
        <Card className="p-5">
          <SectionHeader title="Performance by Role" />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={rolePerformance} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#6b7280' }} />
              <YAxis type="category" dataKey="role" tick={{ fontSize: 11, fill: '#6b7280' }} width={90} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="score" fill="#7c3aed" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Skill Analysis */}
        <Card className="p-5 space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-emerald-600" />
            <h3 className="font-semibold text-gray-900">Strongest Skills</h3>
          </div>
          <ScoreBar label="Python & ML Fundamentals" value={85} color="bg-emerald-500" />
          <ScoreBar label="Problem Solving" value={80} color="bg-blue-500" />
          <ScoreBar label="Coding Challenges" value={82} color="bg-indigo-500" />
          <ScoreBar label="Technical Explanations" value={78} color="bg-violet-500" />
        </Card>

        <Card className="p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Target size={16} className="text-amber-500" />
            <h3 className="font-semibold text-gray-900">Skills to Improve</h3>
          </div>
          <ScoreBar label="Answer Structure (STAR)" value={58} color="bg-amber-400" />
          <ScoreBar label="Filler Word Reduction" value={52} color="bg-amber-400" />
          <ScoreBar label="System Design" value={61} color="bg-orange-400" />
          <ScoreBar label="Database Optimization" value={55} color="bg-red-400" />
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Recommended Practice Topics</h3>
        <div className="grid md:grid-cols-3 gap-3">
          {[
            { topic: 'System Design Fundamentals', priority: 'High', time: '~3 sessions', tag: 'Technical' },
            { topic: 'STAR Method for Behavioral Questions', priority: 'High', time: '~2 sessions', tag: 'Communication' },
            { topic: 'SQL & Database Optimization', priority: 'Medium', time: '~2 sessions', tag: 'Technical' },
          ].map(r => (
            <div key={r.topic} className="bg-gray-50 rounded-xl border border-gray-200 p-4">
              <div className="flex justify-between items-start mb-2">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${r.priority === 'High' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}>{r.priority}</span>
                <span className="text-xs text-gray-400">{r.time}</span>
              </div>
              <p className="text-sm font-semibold text-gray-800">{r.topic}</p>
              <span className="text-xs text-indigo-600 mt-1 block">{r.tag}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
