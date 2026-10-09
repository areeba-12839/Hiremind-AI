import React, { useState } from 'react';
import { Upload, Check, X, AlertCircle } from 'lucide-react';
import { Card } from '../../components/shared';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const sections = [
  { label: 'Job Description Match', score: 78, status: 'good' },
  { label: 'Technical Skills', score: 85, status: 'good' },
  { label: 'Experience', score: 72, status: 'warning' },
  { label: 'Projects', score: 80, status: 'good' },
  { label: 'Education', score: 90, status: 'good' },
  { label: 'Formatting', score: 65, status: 'warning' },
];

const pieData = [
  { name: 'Matched', value: 76, color: '#4f46e5' },
  { name: 'Missing', value: 24, color: '#e5e7eb' },
];

export default function ResumeAnalysis() {
  const [uploaded, setUploaded] = useState(true);

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Resume ATS Analyzer</h1>
        <p className="text-sm text-gray-500 mt-0.5">Check how well your resume matches job descriptions and passes ATS systems.</p>
      </div>

      {!uploaded ? (
        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-16 text-center hover:border-violet-400 transition-colors cursor-pointer" onClick={() => setUploaded(true)}>
          <Upload size={36} className="text-gray-300 mx-auto mb-3" />
          <p className="font-medium text-gray-700">Upload your resume</p>
          <p className="text-sm text-gray-400 mt-1">PDF or DOCX — up to 5MB</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-5">
          {/* ATS Score */}
          <Card className="p-5 text-center">
            <h3 className="font-semibold text-gray-900 mb-4">ATS Score</h3>
            <div className="relative h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={48} outerRadius={68} dataKey="value" startAngle={90} endAngle={-270}>
                    {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <p className="text-3xl font-extrabold text-indigo-600">76%</p>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-400">ATS Compatibility</p>
          </Card>

          {/* Section Scores */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="p-5 space-y-4">
              <h3 className="font-semibold text-gray-900">Section Breakdown</h3>
              {sections.map(s => (
                <div key={s.label} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{s.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-800">{s.score}%</span>
                      {s.status === 'good' ? <Check size={14} className="text-emerald-500" /> : <AlertCircle size={14} className="text-amber-500" />}
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${s.status === 'good' ? 'bg-indigo-500' : 'bg-amber-400'}`} style={{ width: `${s.score}%` }} />
                  </div>
                </div>
              ))}
            </Card>
          </div>

          {/* Missing Keywords */}
          <Card className="p-5 space-y-3">
            <h3 className="font-semibold text-gray-900">Missing Keywords</h3>
            <p className="text-xs text-gray-500">These keywords appear in the job description but are absent from your resume.</p>
            <div className="flex flex-wrap gap-2">
              {['MLOps', 'Kubernetes', 'A/B Testing', 'Feature Stores', 'Airflow', 'dbt', 'Spark', 'Ray'].map(k => (
                <span key={k} className="flex items-center gap-1 px-2.5 py-1 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-medium">
                  <X size={11} /> {k}
                </span>
              ))}
            </div>
          </Card>

          {/* Strengths & Improvements */}
          <Card className="p-5 space-y-3">
            <h3 className="font-semibold text-gray-900 text-emerald-700">✓ Resume Strengths</h3>
            <ul className="space-y-1.5">
              {['Strong Python and ML project portfolio', 'Quantified results in experience section', 'Clean formatting with ATS-friendly structure', 'Relevant education and certifications'].map(s => (
                <li key={s} className="flex items-start gap-2 text-sm text-gray-700"><span className="text-emerald-500 mt-0.5">•</span>{s}</li>
              ))}
            </ul>
          </Card>

          <Card className="p-5 space-y-3">
            <h3 className="font-semibold text-gray-900 text-amber-700">⚠ Suggested Improvements</h3>
            <ul className="space-y-1.5">
              {['Add MLOps and deployment experience', 'Include measurable project outcomes', 'Add a Skills section with listed technologies', 'Mention cloud platforms (AWS, GCP, Azure)'].map(s => (
                <li key={s} className="flex items-start gap-2 text-sm text-gray-700"><span className="text-amber-500 mt-0.5">•</span>{s}</li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
}
