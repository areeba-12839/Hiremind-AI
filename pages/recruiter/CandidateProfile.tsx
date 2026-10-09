import React, { useState } from 'react';
import { ArrowLeft, Mail, Phone, Star, ChevronDown } from 'lucide-react';
import { StatusBadge, ScoreBar, Card } from '../../components/shared';
import { Page } from '../../types';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip,
} from 'recharts';

const radarData = [
  { subject: 'Technical', A: 84 },
  { subject: 'Communication', A: 78 },
  { subject: 'Problem Solving', A: 80 },
  { subject: 'Presentation', A: 72 },
  { subject: 'Coding', A: 76 },
];

const questions = [
  {
    q: 'Explain the difference between supervised and unsupervised learning.',
    a: 'Supervised learning uses labeled data to train models where the algorithm learns to map inputs to outputs. Examples include classification and regression tasks. Unsupervised learning finds patterns in unlabeled data — clustering, dimensionality reduction. The key difference is whether we have ground truth labels during training.',
    score: 88,
    feedback: 'Strong answer with clear examples. Good distinction between the two paradigms.',
  },
  {
    q: 'How would you handle class imbalance in a machine learning dataset?',
    a: 'I would use techniques like SMOTE for oversampling, undersampling the majority class, or using class weights in the loss function. I would also evaluate with F1-score, precision-recall curves rather than just accuracy.',
    score: 82,
    feedback: 'Good practical knowledge. Could have mentioned ensemble methods like balanced random forests.',
  },
  {
    q: 'Describe a challenging ML project and how you solved it.',
    a: 'I worked on a fraud detection system with 0.1% positive class. We used ADASYN for oversampling, XGBoost with class weights, and achieved 94% recall at 85% precision.',
    score: 91,
    feedback: 'Excellent specific example with measurable outcomes. Shows real-world experience.',
  },
];

export default function CandidateProfile({ navigate }: { navigate: (p: Page) => void }) {
  const [tab, setTab] = useState('overview');

  return (
    <div className="p-6 space-y-5">
      <button onClick={() => navigate('candidate-list')} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 transition-colors">
        <ArrowLeft size={15} /> Back to Candidates
      </button>

      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-xl font-bold text-indigo-700">AK</div>
            <div>
              <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Aisha Khan</h1>
              <div className="flex items-center gap-4 mt-1 text-sm text-gray-500 flex-wrap">
                <span className="flex items-center gap-1"><Mail size={13} /> aisha.khan@gmail.com</span>
                <span className="flex items-center gap-1"><Phone size={13} /> +92 300 1234567</span>
                <span>ML Engineer</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <StatusBadge status="Qualified" />
                <span className="text-xs text-gray-400">ID: AI-2026-001</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-extrabold text-indigo-600">82%</p>
            <p className="text-sm text-gray-400">Overall Score</p>
            <div className="flex gap-1 mt-1 justify-end">
              {[1,2,3,4].map(i => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />)}
              <Star size={14} className="text-gray-200 fill-gray-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        {['overview', 'analysis', 'history', 'resume'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm font-medium rounded-lg capitalize transition-colors ${tab === t ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
            {t === 'analysis' ? 'Interview Analysis' : t === 'history' ? 'Previous Interviews' : t === 'resume' ? 'Resume Analysis' : 'Overview'}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="grid lg:grid-cols-2 gap-5">
          <Card className="p-5 space-y-4">
            <h3 className="font-semibold text-gray-900">Score Breakdown</h3>
            <ScoreBar label="Overall Score" value={82} color="bg-indigo-500" />
            <ScoreBar label="Technical Skills" value={84} color="bg-blue-500" />
            <ScoreBar label="Communication" value={78} color="bg-violet-500" />
            <ScoreBar label="Problem Solving" value={80} color="bg-purple-500" />
            <ScoreBar label="Presentation" value={72} color="bg-pink-500" />
          </Card>
          <Card className="p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Performance Radar</h3>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: '#6b7280' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Radar name="Score" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.15} />
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              </RadarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}

      {tab === 'analysis' && (
        <div className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <Card className="p-5">
              <h3 className="font-semibold text-gray-900 mb-3 text-emerald-700">✓ Strengths</h3>
              <ul className="space-y-2">
                {['Strong Python and ML knowledge', 'Good understanding of model evaluation metrics', 'Clear technical explanations with real examples', 'Hands-on experience with imbalanced datasets'].map(s => (
                  <li key={s} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-emerald-500 mt-0.5">•</span> {s}
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="p-5">
              <h3 className="font-semibold text-gray-900 mb-3 text-amber-700">⚠ Areas to Improve</h3>
              <ul className="space-y-2">
                {['Deep learning architectures could be stronger', 'Could provide more structured STAR-format answers', 'Database optimization knowledge limited', 'Improve discussion of model deployment'].map(s => (
                  <li key={s} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-amber-500 mt-0.5">•</span> {s}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <Card className="p-5">
            <h3 className="font-semibold text-gray-900 mb-1">AI Interview Summary</h3>
            <p className="text-sm text-gray-500 mb-4">Generated by HireMind AI · Sep 28, 2026</p>
            <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
              Aisha demonstrates solid foundational ML knowledge with strong practical experience. Her answers were clear and included specific metrics, indicating real-world project exposure. Technical depth is strong for junior-to-mid level. Communication was professional with good pacing. Recommended for the next interview stage.
            </p>
          </Card>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Question-by-Question Analysis</h3>
            {questions.map((q, i) => (
              <Card key={i} className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold text-gray-800">Q{i+1}. {q.q}</p>
                  <span className={`text-sm font-bold flex-shrink-0 ${q.score >= 80 ? 'text-emerald-600' : 'text-amber-600'}`}>{q.score}/100</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1 font-medium">Candidate Answer</p>
                  <p className="text-sm text-gray-700">{q.a}</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-3">
                  <p className="text-xs text-indigo-700 font-medium mb-1">AI Feedback</p>
                  <p className="text-sm text-indigo-800">{q.feedback}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {tab === 'history' && (
        <Card className="p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Interview History at TechCorp Inc.</h3>
          <div className="space-y-4">
            {[
              { n: 1, role: 'ML Internship', date: 'March 2026', score: 64, status: 'Not Qualified' },
              { n: 2, role: 'ML Engineer', date: 'September 2026', score: 82, status: 'Qualified' },
            ].map(h => (
              <div key={h.n} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-sm font-bold text-indigo-700">#{h.n}</div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{h.role}</p>
                  <p className="text-xs text-gray-400">{h.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">{h.score}%</p>
                  <StatusBadge status={h.status} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === 'resume' && (
        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Resume ATS Analysis</h3>
              <span className="text-2xl font-bold text-indigo-600">76%</span>
            </div>
            <ScoreBar label="Job Description Match" value={78} color="bg-indigo-500" />
            <div className="mt-4 space-y-2 text-sm">
              <p className="font-medium text-gray-700">Missing Keywords</p>
              {['MLOps', 'Kubernetes', 'A/B Testing', 'Feature Stores'].map(k => (
                <span key={k} className="inline-block mr-2 px-2.5 py-1 bg-red-50 text-red-700 rounded-lg border border-red-200 text-xs">{k}</span>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
