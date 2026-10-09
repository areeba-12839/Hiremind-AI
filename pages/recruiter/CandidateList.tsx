import React, { useState } from 'react';
import { Search, Filter, Eye, MoreHorizontal, Download } from 'lucide-react';
import { StatusBadge, PrimaryBtn } from '../../components/shared';
import { Page } from '../../types';

const candidates = [
  { id: 'AI-2026-001', name: 'Aisha Khan', email: 'aisha.khan@gmail.com', phone: '+92 300 1234567', position: 'ML Engineer', date: 'Sep 28, 2026', tech: 84, comm: 78, overall: 82, warnings: 0, status: 'Qualified' },
  { id: 'AI-2026-002', name: 'Marcus Lee', email: 'marcus.lee@email.com', phone: '+1 415 555 0102', position: 'ML Engineer', date: 'Sep 27, 2026', tech: 61, comm: 55, overall: 59, warnings: 1, status: 'Not Qualified' },
  { id: 'AI-2026-003', name: 'Priya Sharma', email: 'priya.sharma@outlook.com', phone: '+91 98765 43210', position: 'Data Scientist', date: 'Sep 27, 2026', tech: 77, comm: 72, overall: 75, warnings: 0, status: 'Qualified' },
  { id: 'AI-2026-004', name: 'Daniel Osei', email: 'daniel.osei@email.com', phone: '+233 20 123 4567', position: 'AI Intern', date: 'Sep 26, 2026', tech: 48, comm: 61, overall: 52, warnings: 2, status: 'Not Qualified' },
  { id: 'AI-2026-005', name: 'Sofia Martinez', email: 'sofia.m@email.com', phone: '+34 612 345 678', position: 'ML Engineer', date: 'Sep 26, 2026', tech: 71, comm: 69, overall: 70, warnings: 0, status: 'Review Required' },
  { id: 'AI-2026-006', name: 'James Park', email: 'james.park@gmail.com', phone: '+82 10 1234 5678', position: 'Backend Dev', date: 'Sep 25, 2026', tech: 88, comm: 74, overall: 83, warnings: 0, status: 'Qualified' },
  { id: 'AI-2026-007', name: 'Fatima Al-Zahra', email: 'fatima.az@email.com', phone: '+971 50 123 4567', position: 'Data Scientist', date: 'Sep 25, 2026', tech: 65, comm: 80, overall: 70, warnings: 0, status: 'Review Required' },
  { id: 'AI-2026-008', name: 'Yuki Tanaka', email: 'yuki.t@email.com', phone: '+81 90 1234 5678', position: 'Frontend Dev', date: 'Sep 24, 2026', tech: 79, comm: 83, overall: 80, warnings: 0, status: 'Qualified' },
];

const scoreColor = (v: number) => v >= 75 ? 'text-emerald-600' : v >= 60 ? 'text-amber-600' : 'text-red-600';

export default function CandidateList({ navigate }: { navigate: (p: Page) => void }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = candidates.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.position.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Candidates</h1>
          <p className="text-sm text-gray-500 mt-0.5">{filtered.length} candidates found</p>
        </div>
        <PrimaryBtn className="flex items-center gap-2">
          <Download size={15} /> Export Report
        </PrimaryBtn>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <div className="flex items-center gap-2 flex-1 min-w-48">
          <Search size={16} className="text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, position..."
            className="flex-1 text-sm focus:outline-none placeholder:text-gray-400"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={15} className="text-gray-400" />
          <span className="text-sm text-gray-500 font-medium">Status:</span>
          {['All', 'Qualified', 'Review Required', 'Not Qualified', 'Interview Pending'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${statusFilter === s ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['Candidate', 'Email / Phone', 'Position', 'Date', 'Technical', 'Communication', 'Overall', 'Warnings', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-xs font-semibold text-indigo-700">
                        {c.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{c.name}</p>
                        <p className="text-xs text-gray-400">{c.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-gray-700">{c.email}</p>
                    <p className="text-xs text-gray-400">{c.phone}</p>
                  </td>
                  <td className="px-4 py-3.5 text-gray-600">{c.position}</td>
                  <td className="px-4 py-3.5 text-gray-500 whitespace-nowrap">{c.date}</td>
                  <td className={`px-4 py-3.5 font-semibold ${scoreColor(c.tech)}`}>{c.tech}%</td>
                  <td className={`px-4 py-3.5 font-semibold ${scoreColor(c.comm)}`}>{c.comm}%</td>
                  <td className={`px-4 py-3.5 font-semibold ${scoreColor(c.overall)}`}>{c.overall}%</td>
                  <td className="px-4 py-3.5">
                    {c.warnings > 0 ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">{c.warnings} ⚠</span>
                    ) : (
                      <span className="text-gray-400 text-xs">None</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5"><StatusBadge status={c.status} /></td>
                  <td className="px-4 py-3.5">
                    <button onClick={() => navigate('candidate-profile')} className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 text-xs font-medium">
                      <Eye size={13} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
