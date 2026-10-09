import React, { useState } from 'react';
import { Search, ThumbsUp, ThumbsDown, Plus, Filter, Building } from 'lucide-react';
import { PrimaryBtn, Card } from '../components/shared';
import { Page } from '../types';

const questions = [
  { id: 1, role: 'Machine Learning Engineer', company: 'Google', q: 'What is overfitting and how can you prevent it?', type: 'Technical', difficulty: 'Medium', tags: ['Machine Learning', 'Regularization'], helpful: 142, real: true },
  { id: 2, role: 'AI Engineer', company: 'OpenAI', q: 'Explain the transformer architecture and its key components.', type: 'Technical', difficulty: 'Hard', tags: ['Deep Learning', 'NLP'], helpful: 98, real: true },
  { id: 3, role: 'Data Scientist', company: 'Meta', q: 'How do you handle missing data in a large-scale dataset?', type: 'Technical', difficulty: 'Medium', tags: ['Data Engineering', 'Python'], helpful: 76, real: false },
  { id: 4, role: 'Software Engineer', company: null, q: 'Tell me about a time you had to deal with a difficult team member.', type: 'Behavioral', difficulty: 'Medium', tags: ['Leadership', 'Communication'], helpful: 54, real: true },
  { id: 5, role: 'Backend Developer', company: 'Amazon', q: 'Design a URL shortener service. What are the key considerations?', type: 'Scenario-Based', difficulty: 'Hard', tags: ['System Design', 'Scalability'], helpful: 189, real: true },
  { id: 6, role: 'Data Scientist', company: null, q: 'What is the difference between bagging and boosting?', type: 'Technical', difficulty: 'Easy', tags: ['Ensemble Methods', 'ML'], helpful: 67, real: false },
];

const diffColor = (d: string) => d === 'Hard' ? 'text-red-700 bg-red-50 border-red-200' : d === 'Medium' ? 'text-amber-700 bg-amber-50 border-amber-200' : 'text-emerald-700 bg-emerald-50 border-emerald-200';

export default function QuestionBank({ navigate }: { navigate: (p: Page) => void }) {
  const [search, setSearch] = useState('');
  const [diffFilter, setDiffFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [voted, setVoted] = useState<Record<number, 'up' | 'down'>>({});

  const filtered = questions.filter(q => {
    const matchSearch = q.q.toLowerCase().includes(search.toLowerCase()) || q.role.toLowerCase().includes(search.toLowerCase());
    const matchDiff = diffFilter === 'All' || q.difficulty === diffFilter;
    const matchType = typeFilter === 'All' || q.type === typeFilter;
    return matchSearch && matchDiff && matchType;
  });

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Question Bank</h1>
          <p className="text-sm text-gray-500 mt-0.5">Community-sourced interview questions from real interviews.</p>
        </div>
        <PrimaryBtn onClick={() => navigate('submit-question')} className="flex items-center gap-2">
          <Plus size={15} /> Submit Question
        </PrimaryBtn>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-3">
        <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5">
          <Search size={16} className="text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search questions, roles, companies..." className="flex-1 text-sm focus:outline-none placeholder:text-gray-400" />
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1.5">
            <Filter size={13} className="text-gray-400" />
            <span className="text-xs text-gray-500 font-medium">Difficulty:</span>
            {['All', 'Easy', 'Medium', 'Hard'].map(d => (
              <button key={d} onClick={() => setDiffFilter(d)} className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${diffFilter === d ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{d}</button>
            ))}
          </div>
          <div className="flex items-center gap-1.5 ml-3">
            <span className="text-xs text-gray-500 font-medium">Type:</span>
            {['All', 'Technical', 'Behavioral', 'Scenario-Based'].map(t => (
              <button key={t} onClick={() => setTypeFilter(t)} className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${typeFilter === t ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-3">
        {filtered.map(q => (
          <Card key={q.id} className="p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">{q.role}</span>
                  {q.company && (
                    <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-200">
                      <Building size={10} /> {q.company}
                    </span>
                  )}
                  {q.real && <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">✓ Real Interview</span>}
                </div>
                <p className="text-gray-900 font-medium text-sm leading-relaxed">{q.q}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${diffColor(q.difficulty)}`}>{q.difficulty}</span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">{q.type}</span>
                  {q.tags.map(t => (
                    <span key={t} className="text-xs text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => setVoted(v => ({ ...v, [q.id]: 'up' }))} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${voted[q.id] === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500 hover:bg-emerald-50 hover:text-emerald-600'}`}>
                  <ThumbsUp size={12} /> {q.helpful + (voted[q.id] === 'up' ? 1 : 0)}
                </button>
                <button onClick={() => setVoted(v => ({ ...v, [q.id]: 'down' }))} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${voted[q.id] === 'down' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-600'}`}>
                  <ThumbsDown size={12} />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
