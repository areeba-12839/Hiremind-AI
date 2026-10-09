import React, { useState } from 'react';
import { Wand2, Upload, Play, ChevronRight } from 'lucide-react';
import { ProgressSteps, PrimaryBtn, SecondaryBtn, Input, Card } from '../../components/shared';
import { Page } from '../../types';

const STEPS = ['Job Role', 'Description', 'Resume', 'Difficulty', 'Interview Type', 'Language', 'Duration', 'Camera', 'Coding', 'Start'];

const ROLES = ['AI Engineer', 'Machine Learning Engineer', 'Software Engineer', 'Data Scientist', 'Backend Developer', 'Frontend Developer', 'DevOps Engineer', 'Product Manager'];

export default function CreatePractice({ navigate }: { navigate: (p: Page) => void }) {
  const [step, setStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState('AI Engineer');
  const [customRole, setCustomRole] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');
  const [interviewType, setInterviewType] = useState('Mixed Interview');
  const [lang, setLang] = useState('English');
  const [duration, setDuration] = useState('45 Minutes');
  const [cameraMode, setCameraMode] = useState('Camera Off');
  const [codingEnabled, setCodingEnabled] = useState(false);
  const [selectedLangs, setSelectedLangs] = useState<string[]>(['Python']);
  const [jdAnalyzed, setJdAnalyzed] = useState(false);

  const toggleLang = (l: string) => setSelectedLangs(prev => prev.includes(l) ? prev.filter(x => x !== l) : [...prev, l]);
  const handleNext = () => {
    if (step === STEPS.length - 1) {
      navigate('interview-screen');
      return;
    }

    setStep(s => s + 1);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Start Practice Interview</h1>
        <p className="text-sm text-gray-500 mt-0.5">Customize your AI interview session.</p>
      </div>

      <ProgressSteps steps={STEPS} current={step} />

      <Card className="p-6">
        {/* Step 0 — Job Role */}
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Select Job Role</h2>
            <div className="grid grid-cols-2 gap-2">
              {ROLES.map(r => (
                <button key={r} onClick={() => setSelectedRole(r)} className={`text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${selectedRole === r && !customRole ? 'border-violet-500 bg-violet-50 text-violet-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                  {r}
                </button>
              ))}
            </div>
            <Input label="Or enter a custom role" placeholder="e.g. Quantitative Analyst, NLP Engineer..." value={customRole} onChange={setCustomRole} />
          </div>
        )}

        {/* Step 1 — Job Description */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Job Description</h2>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Paste the job description here</label>
              <textarea rows={6} placeholder="Paste the full job description here..." className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none" />
            </div>
            <PrimaryBtn onClick={() => setJdAnalyzed(true)} className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700">
              <Wand2 size={15} /> Analyze Job Description
            </PrimaryBtn>
            {jdAnalyzed && (
              <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 text-sm space-y-2">
                <p className="font-semibold text-violet-800">AI Analysis Complete</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-violet-600 font-medium mb-1">Required Skills</p>
                    {['Python', 'TensorFlow', 'SQL', 'Docker', 'MLOps'].map(s => (
                      <span key={s} className="inline-block mr-1 mb-1 px-2 py-0.5 bg-white border border-violet-200 text-violet-700 rounded-full text-xs">{s}</span>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs text-violet-600 font-medium mb-1">Experience Level</p>
                    <p className="text-violet-800 font-semibold">Mid-Level (2–4 years)</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2 — Resume */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Upload Resume</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center hover:border-violet-400 transition-colors cursor-pointer">
              <Upload size={32} className="text-gray-300 mx-auto mb-3" />
              <p className="text-sm font-medium text-gray-700">Drag & drop your resume</p>
              <p className="text-xs text-gray-400 mt-1">PDF or DOCX — up to 5MB</p>
              <button className="mt-4 px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                Browse Files
              </button>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-700">
              Your resume will be used to personalize interview questions based on your experience and skills.
            </div>
          </div>
        )}

        {/* Step 3 — Difficulty */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Select Difficulty</h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { d: 'Easy', desc: 'Basic concepts and beginner-friendly questions.', color: 'emerald', emoji: '🟢' },
                { d: 'Medium', desc: 'Practical and intermediate-level challenges.', color: 'amber', emoji: '🟡' },
                { d: 'Hard', desc: 'Advanced concepts and complex scenarios.', color: 'red', emoji: '🔴' },
              ].map(({ d, desc, color, emoji }) => (
                <button key={d} onClick={() => setDifficulty(d)} className={`p-5 rounded-2xl border-2 text-left transition-all ${difficulty === d ? `border-${color}-500 bg-${color}-50` : 'border-gray-200 hover:border-gray-300'}`}>
                  <p className="text-xl mb-2">{emoji}</p>
                  <p className={`font-bold text-sm ${difficulty === d ? `text-${color}-700` : 'text-gray-800'}`}>{d}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4 — Interview Type */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Interview Type</h2>
            <div className="space-y-2">
              {['Technical', 'Behavioral', 'Communication', 'Coding', 'Mixed Interview'].map(t => (
                <label key={t} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${interviewType === t ? 'border-violet-500 bg-violet-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input type="radio" name="itype" checked={interviewType === t} onChange={() => setInterviewType(t)} className="accent-violet-600" />
                  <span className="text-sm font-medium text-gray-800">{t}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 5 — Language */}
        {step === 5 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Interview Language</h2>
            {['English', 'Urdu', 'Urdu + English Mixed'].map(l => (
              <label key={l} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${lang === l ? 'border-violet-500 bg-violet-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <input type="radio" name="lang" checked={lang === l} onChange={() => setLang(l)} className="accent-violet-600" />
                <div>
                  <p className="text-sm font-medium text-gray-800">{l}</p>
                  {l === 'Urdu + English Mixed' && <p className="text-xs text-gray-500 mt-0.5">AI supports natural code-switching between Urdu and English.</p>}
                </div>
              </label>
            ))}
          </div>
        )}

        {/* Step 6 — Duration */}
        {step === 6 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Interview Duration</h2>
            <div className="grid grid-cols-2 gap-3">
              {['15 Minutes', '30 Minutes', '45 Minutes', '60 Minutes'].map(d => (
                <button key={d} onClick={() => setDuration(d)} className={`py-4 rounded-xl border-2 text-sm font-semibold transition-all ${duration === d ? 'border-violet-500 bg-violet-50 text-violet-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                  {d}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 7 — Camera */}
        {step === 7 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Camera Mode</h2>
            {[
              { m: 'Camera Off', desc: 'No camera required. Audio only.' },
              { m: 'Camera On', desc: 'Realistic interview mode with camera presence feedback.' },
            ].map(({ m, desc }) => (
              <label key={m} className={`flex items-start gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${cameraMode === m ? 'border-violet-500 bg-violet-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <input type="radio" name="cam" checked={cameraMode === m} onChange={() => setCameraMode(m)} className="mt-0.5 accent-violet-600" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">{m}</p>
                  <p className="text-xs text-gray-500 mt-1">{desc}</p>
                </div>
              </label>
            ))}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700 leading-relaxed">
              Camera mode provides feedback on observable presentation behaviors such as prolonged looking away, posture changes, and camera presence. It does not assess personality, honesty, or emotional state through facial expressions.
            </div>
          </div>
        )}

        {/* Step 8 — Coding */}
        {step === 8 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Coding Mode</h2>
            <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-violet-300 transition-colors">
              <input type="checkbox" checked={codingEnabled} onChange={e => setCodingEnabled(e.target.checked)} className="accent-violet-600 w-4 h-4" />
              <div>
                <p className="text-sm font-semibold text-gray-900">Include Coding Questions</p>
                <p className="text-xs text-gray-500 mt-0.5">Add programming challenges to your interview session.</p>
              </div>
            </label>
            {codingEnabled && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Preferred Languages</p>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'Java', 'C++', 'JavaScript', 'SQL', 'TypeScript'].map(l => (
                    <button key={l} onClick={() => toggleLang(l)} className={`px-3 py-1.5 text-sm rounded-lg border-2 font-medium transition-all ${selectedLangs.includes(l) ? 'border-violet-500 bg-violet-50 text-violet-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 9 — Start */}
        {step === 9 && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Interview Summary</h2>
            <div className="bg-gray-50 rounded-xl p-5 space-y-3 text-sm">
              {[
                { label: 'Job Role', value: customRole || selectedRole },
                { label: 'Difficulty', value: difficulty },
                { label: 'Interview Type', value: interviewType },
                { label: 'Language', value: lang },
                { label: 'Duration', value: duration },
                { label: 'Camera', value: cameraMode },
                { label: 'Coding', value: codingEnabled ? `Yes (${selectedLangs.join(', ')})` : 'No' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between py-2 border-b border-gray-200 last:border-0">
                  <span className="text-gray-500">{label}</span>
                  <span className="font-semibold text-gray-900">{value}</span>
                </div>
              ))}
            </div>
            <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 text-sm text-violet-800">
              <strong>Ready?</strong> Your AI interviewer will ask questions based on your configuration. Speak naturally and take your time.
            </div>
          </div>
        )}
      </Card>

      <div className="flex justify-between">
        <SecondaryBtn onClick={() => step > 0 ? setStep(s => s - 1) : navigate('student-dashboard')}>
          {step === 0 ? 'Cancel' : '← Back'}
        </SecondaryBtn>
        <PrimaryBtn onClick={handleNext} className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700">
          {step === STEPS.length - 1 ? <><Play size={15} /> Start AI Interview</> : <>Next <ChevronRight size={16} /></>}
        </PrimaryBtn>
      </div>
    </div>
  );
}
