import React from 'react';
import { Play, CheckCircle, TrendingUp, MessageSquare, Code2, Eye } from 'lucide-react';
import { StatCard, StatusBadge, SectionHeader, PrimaryBtn, Card } from '../../components/shared';
import { Page } from '../../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const sessions = [
  { role: 'AI Engineer', difficulty: 'Hard', date: 'Sep 28, 2026', score: 78, duration: '45 min' },
  { role: 'ML Engineer', difficulty: 'Medium', date: 'Sep 25, 2026', score: 72, duration: '30 min' },
  { role: 'Backend Developer', difficulty: 'Medium', date: 'Sep 21, 2026', score: 65, duration: '30 min' },
  { role: 'Data Scientist', difficulty: 'Hard', date: 'Sep 17, 2026', score: 61, duration: '45 min' },
];

const progressData = [
  { date: 'Sep 1', score: 58 },
  { date: 'Sep 8', score: 63 },
  { date: 'Sep 15', score: 68 },
  { date: 'Sep 21', score: 72 },
  { date: 'Sep 28', score: 78 },
];

const diffColor = (d: string) => d === 'Hard' ? 'bg-red-50 text-red-700 border-red-200' : d === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200';

export default function StudentDashboard({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-6 text-white">
        <p className="text-violet-200 text-sm font-medium mb-1">Good morning 👋</p>
        <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Welcome back, Sarah!</h1>
        <p className="text-violet-200 text-sm">Ready for your next interview? Keep improving your skills.</p>
        <PrimaryBtn onClick={() => navigate('create-practice')} className="mt-4 bg-white text-violet-700 hover:bg-violet-50 flex items-center gap-2">
          <Play size={15} /> Start New Interview
        </PrimaryBtn>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Interviews Completed" value="14" sub="↑ 3 this month" icon={<CheckCircle size={20} />} color="bg-violet-50" iconColor="text-violet-600" />
        <StatCard label="Average Score" value="72%" sub="↑ 8% improvement" icon={<TrendingUp size={20} />} color="bg-indigo-50" iconColor="text-indigo-600" />
        <StatCard label="Technical Score" value="74%" sub="Strong performance" icon={<Code2 size={20} />} color="bg-blue-50" iconColor="text-blue-600" />
        <StatCard label="Communication" value="69%" sub="Area to improve" icon={<MessageSquare size={20} />} color="bg-purple-50" iconColor="text-purple-600" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Recent Sessions */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Recent Practice Sessions</h2>
            <button className="text-sm text-violet-600 font-medium hover:underline">View all</button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                {['Role', 'Difficulty', 'Date', 'Score', 'Duration', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sessions.map((s, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3.5 font-medium text-gray-900">{s.role}</td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${diffColor(s.difficulty)}`}>{s.difficulty}</span>
                  </td>
                  <td className="px-4 py-3.5 text-gray-500">{s.date}</td>
                  <td className={`px-4 py-3.5 font-semibold ${s.score >= 75 ? 'text-emerald-600' : s.score >= 60 ? 'text-amber-600' : 'text-red-600'}`}>{s.score}%</td>
                  <td className="px-4 py-3.5 text-gray-500">{s.duration}</td>
                  <td className="px-4 py-3.5">
                    <button onClick={() => navigate('interview-results')} className="flex items-center gap-1 text-violet-600 hover:text-violet-800 text-xs font-medium">
                      <Eye size={13} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card className="p-5">
            <SectionHeader title="Improvement Graph" />
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#6b7280' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#6b7280' }} />
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 11 }} />
                <Line type="monotone" dataKey="score" name="Score" stroke="#7c3aed" strokeWidth={2} dot={{ r: 3, fill: '#7c3aed' }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-5 space-y-3">
            <h3 className="font-semibold text-gray-900 text-sm">Recommended Next Steps</h3>
            {[
              { text: 'Practice system design questions', tag: 'Technical' },
              { text: 'Work on structured STAR answers', tag: 'Communication' },
              { text: 'Try a Hard difficulty interview', tag: 'Challenge' },
            ].map(r => (
              <div key={r.text} className="flex items-start gap-2 text-sm">
                <span className="text-violet-500 mt-0.5">→</span>
                <div>
                  <p className="text-gray-700">{r.text}</p>
                  <span className="text-xs text-violet-600 font-medium">{r.tag}</span>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
