import React from 'react';
import { FileText, Users, CheckCircle, TrendingUp } from 'lucide-react';
import { StatCard, Card, SectionHeader } from '../../components/shared';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line, AreaChart, Area,
} from 'recharts';

const scoreDistribution = [
  { range: '0–20%', count: 3 },
  { range: '21–40%', count: 8 },
  { range: '41–60%', count: 22 },
  { range: '61–80%', count: 41 },
  { range: '81–100%', count: 28 },
];

const techVsComm = [
  { position: 'ML Engineer', technical: 74, communication: 68 },
  { position: 'Backend Dev', technical: 81, communication: 63 },
  { position: 'Frontend Dev', technical: 72, communication: 75 },
  { position: 'Data Scientist', technical: 78, communication: 66 },
  { position: 'AI Intern', technical: 65, communication: 70 },
];

const qualifiedData = [
  { name: 'Qualified', value: 67, color: '#10b981' },
  { name: 'Review Required', value: 38, color: '#f59e0b' },
  { name: 'Not Qualified', value: 109, color: '#ef4444' },
];

const monthlyData = [
  { month: 'Apr', interviews: 18 },
  { month: 'May', interviews: 24 },
  { month: 'Jun', interviews: 31 },
  { month: 'Jul', interviews: 27 },
  { month: 'Aug', interviews: 38 },
  { month: 'Sep', interviews: 42 },
];

export default function RecruiterAnalytics() {
  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Analytics</h1>
        <p className="text-sm text-gray-500 mt-0.5">Interview performance insights for TechCorp Inc.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Interviews" value="214" icon={<FileText size={20} />} color="bg-indigo-50" iconColor="text-indigo-600" />
        <StatCard label="Average Score" value="71.4%" sub="↑ 3.2% vs last month" icon={<TrendingUp size={20} />} color="bg-blue-50" iconColor="text-blue-600" />
        <StatCard label="Qualified Candidates" value="67" sub="31.3% qualification rate" icon={<CheckCircle size={20} />} color="bg-emerald-50" iconColor="text-emerald-600" />
        <StatCard label="Completion Rate" value="88.3%" sub="189 of 214 completed" icon={<Users size={20} />} color="bg-purple-50" iconColor="text-purple-600" />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Score Distribution */}
        <Card className="p-5">
          <SectionHeader title="Candidate Score Distribution" />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={scoreDistribution} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="range" tick={{ fontSize: 11, fill: '#6b7280' }} />
              <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="count" name="Candidates" fill="#4f46e5" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Qualified vs Not */}
        <Card className="p-5">
          <SectionHeader title="Qualification Outcomes" />
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={qualifiedData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                {qualifiedData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Tech vs Comm */}
        <Card className="p-5">
          <SectionHeader title="Technical vs Communication by Position" />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={techVsComm} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="position" tick={{ fontSize: 10, fill: '#6b7280' }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#6b7280' }} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="technical" name="Technical" fill="#4f46e5" radius={[3, 3, 0, 0]} />
              <Bar dataKey="communication" name="Communication" fill="#7c3aed" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Monthly Activity */}
        <Card className="p-5">
          <SectionHeader title="Monthly Interview Activity" />
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="colorInterviews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="interviews" name="Interviews" stroke="#4f46e5" strokeWidth={2} fill="url(#colorInterviews)" dot={{ r: 4, fill: '#4f46e5' }} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
