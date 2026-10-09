import React, { useState } from 'react';
import { Trophy, ChevronDown, ChevronUp, ArrowLeft, RotateCcw } from 'lucide-react';
import { ScoreBar, Card, StatusBadge } from '../../components/shared';
import { Page } from '../../types';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
} from 'recharts';

const radarData = [
  { subject: 'Technical', A: 78 },
  { subject: 'Communication', A: 65 },
  { subject: 'Problem Solving', A: 80 },
  { subject: 'Presentation', A: 70 },
  { subject: 'Coding', A: 82 },
];

const commData = [
  { name: 'Speaking Clarity', score: 72 },
  { name: 'Answer Structure', score: 65 },
  { name: 'Filler Words', score: 58 },
  { name: 'Speaking Pace', score: 77 },
  { name: 'Technical Vocab', score: 81 },
];

const qas = [
  {
    q: 'Explain the difference between supervised and unsupervised learning.',
    a: 'Supervised learning uses labeled training data to learn a mapping from inputs to outputs. Unsupervised learning finds hidden patterns in unlabeled data. Examples include regression/classification for supervised, and clustering/dimensionality reduction for unsupervised.',
    score: 88, well: 'Clear distinction with good examples.', improve: 'Could add deep learning context.', better: 'Structure: definition → example → contrast → application.',
  },
  {
    q: 'What is overfitting and how do you prevent it?',
    a: 'Overfitting is when a model learns the training data too well, including noise, and fails to generalize. Prevention techniques include regularization like L1/L2, dropout, cross-validation, and early stopping.',
    score: 82, well: 'Good coverage of prevention techniques.', improve: 'Could mention bias-variance tradeoff.', better: 'Mention bias-variance tradeoff explicitly and when each technique applies.',
  },
  {
    q: 'How would you deploy a machine learning model in production?',
    a: 'I would containerize the model using Docker, set up an API endpoint using FastAPI or Flask, use Kubernetes for orchestration, and implement CI/CD pipelines for model updates. Monitoring with tools like MLflow.',
    score: 74, well: 'Good practical knowledge of MLOps tools.', improve: 'Add model versioning and rollback strategies.', better: 'Include A/B testing for gradual rollout and observability setup.',
  },
];

export default function InterviewResults({ navigate }: { navigate: (p: Page) => void }) {
  const [tab, setTab] = useState('scores');
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-10 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy size={28} className="text-yellow-300" />
          </div>
          <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Interview Completed!</h1>
          <p className="text-violet-200 text-sm mb-6">AI Engineer — Technical Interview · Sep 29, 2026</p>
          <div className="inline-block bg-white/15 rounded-2xl px-8 py-4">
            <p className="text-6xl font-extrabold" style={{ fontFamily: 'var(--font-heading)' }}>78</p>
            <p className="text-violet-200 text-sm">/ 100 Overall Score</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6 space-y-5">
        {/* Score Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: 'Technical', score: 78, color: 'indigo' },
            { label: 'Communication', score: 65, color: 'violet' },
            { label: 'Problem Solving', score: 80, color: 'blue' },
            { label: 'Presentation', score: 70, color: 'purple' },
            { label: 'Coding', score: 82, color: 'emerald' },
          ].map(({ label, score, color }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 text-center">
              <p className={`text-2xl font-bold text-${color}-600`}>{score}%</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
          {[
            { id: 'scores', label: 'Scores' },
            { id: 'questions', label: 'Question Analysis' },
            { id: 'communication', label: 'Communication' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${tab === t.id ? 'bg-white text-violet-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'scores' && (
          <div className="grid lg:grid-cols-2 gap-5">
            <Card className="p-5 space-y-4">
              <h3 className="font-semibold text-gray-900">Score Breakdown</h3>
              <ScoreBar label="Technical Skills" value={78} color="bg-indigo-500" />
              <ScoreBar label="Communication" value={65} color="bg-violet-500" />
              <ScoreBar label="Problem Solving" value={80} color="bg-blue-500" />
              <ScoreBar label="Presentation" value={70} color="bg-purple-500" />
              <ScoreBar label="Coding Skills" value={82} color="bg-emerald-500" />
            </Card>
            <Card className="p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Performance Radar</h3>
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#6b7280' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
                  <Radar dataKey="A" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.15} />
                  <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                </RadarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-5">
              <h3 className="font-semibold text-gray-900 mb-3 text-emerald-700">✓ Strengths</h3>
              <ul className="space-y-2">
                {['Strong Python and ML fundamentals', 'Good problem-solving approach', 'Clear explanation of coding solutions', 'Hands-on MLOps knowledge'].map(s => (
                  <li key={s} className="flex items-start gap-2 text-sm text-gray-700"><span className="text-emerald-500">•</span>{s}</li>
                ))}
              </ul>
            </Card>

            <Card className="p-5">
              <h3 className="font-semibold text-gray-900 mb-3 text-amber-700">⚠ Areas to Improve</h3>
              <ul className="space-y-2">
                {['Reduce filler words (um, uh)', 'Use STAR format for behavioral answers', 'Improve database optimization knowledge', 'More structured explanations'].map(s => (
                  <li key={s} className="flex items-start gap-2 text-sm text-gray-700"><span className="text-amber-500">•</span>{s}</li>
                ))}
              </ul>
            </Card>
          </div>
        )}

        {tab === 'questions' && (
          <div className="space-y-3">
            {qas.map((qa, i) => (
              <Card key={i} className="overflow-hidden">
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <span className={`flex-shrink-0 text-sm font-bold px-2.5 py-0.5 rounded-full ${qa.score >= 80 ? 'bg-emerald-50 text-emerald-700' : qa.score >= 65 ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'}`}>
                      {qa.score}%
                    </span>
                    <p className="text-sm font-medium text-gray-800">Q{i+1}. {qa.q}</p>
                  </div>
                  {expanded === i ? <ChevronUp size={16} className="text-gray-400 flex-shrink-0" /> : <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />}
                </button>
                {expanded === i && (
                  <div className="px-5 pb-5 space-y-3 border-t border-gray-100">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs font-medium text-gray-500 mb-1">Your Answer</p>
                      <p className="text-sm text-gray-700">{qa.a}</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-emerald-50 rounded-lg p-3">
                        <p className="text-xs font-medium text-emerald-700 mb-1">What You Did Well</p>
                        <p className="text-sm text-emerald-800">{qa.well}</p>
                      </div>
                      <div className="bg-amber-50 rounded-lg p-3">
                        <p className="text-xs font-medium text-amber-700 mb-1">How to Improve</p>
                        <p className="text-sm text-amber-800">{qa.improve}</p>
                      </div>
                    </div>
                    <div className="bg-indigo-50 rounded-lg p-3">
                      <p className="text-xs font-medium text-indigo-700 mb-1">Suggested Answer Structure</p>
                      <p className="text-sm text-indigo-800">{qa.better}</p>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}

        {tab === 'communication' && (
          <div className="space-y-5">
            <Card className="p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Communication Analysis</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={commData} layout="vertical" margin={{ left: 20, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#6b7280' }} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#6b7280' }} width={100} />
                  <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="score" fill="#7c3aed" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-5 space-y-3">
              <h3 className="font-semibold text-gray-900">Visible Presentation Feedback</h3>
              <p className="text-xs text-gray-400">Based on observable camera behaviors only. This feedback does not assess personality, honesty, or emotional state.</p>
              <div className="space-y-2 text-sm">
                {[
                  { label: 'Camera presence', value: 'Good — mostly on screen', ok: true },
                  { label: 'Looking away (prolonged)', value: '3 instances detected', ok: false },
                  { label: 'Long periods off-camera', value: 'None detected', ok: true },
                  { label: 'Posture consistency', value: 'Stable throughout', ok: true },
                ].map(f => (
                  <div key={f.label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <span className="text-gray-600">{f.label}</span>
                    <span className={f.ok ? 'text-emerald-600 font-medium' : 'text-amber-600 font-medium'}>{f.value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button onClick={() => navigate('student-dashboard')} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
            <ArrowLeft size={15} /> Dashboard
          </button>
          <button onClick={() => navigate('create-practice')} className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 text-white text-sm font-semibold rounded-xl hover:bg-violet-700 transition-colors">
            <RotateCcw size={15} /> Practice Again
          </button>
          <button onClick={() => navigate('resume-analysis')} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-violet-200 text-violet-600 text-sm font-semibold rounded-xl hover:bg-violet-50 transition-colors shadow-sm ml-auto">
            Analyze Resume →
          </button>
        </div>
      </div>
    </div>
  );
}
