import React, { useState } from 'react';
import { Plus, GripVertical, Trash2, Code2, Wand2, Clock, Globe, Camera, Sliders, ChevronRight, Copy, ExternalLink, Monitor } from 'lucide-react';
import { ProgressSteps, PrimaryBtn, SecondaryBtn, Input, Select, Toggle, Card } from '../../components/shared';
import { Page } from '../../types';

type ScreenSharingMode = 'required' | 'optional' | 'disabled';
type ScreenSharingScope = 'entire' | 'technical' | 'coding';
type ScreenSharingViolation = 'warn' | 'pause' | 'flag' | 'end';

const STEPS = ['Basic Info', 'Questions', 'Language', 'Duration', 'Monitoring', 'Coding', 'Evaluation', 'Review'];

interface Question {
  id: number; text: string; type: string; difficulty: string; skills: string; maxTime: string;
}

export default function CreateInterview({ navigate }: { navigate: (p: Page) => void }) {
  const [step, setStep] = useState(0);
  const [questionMode, setQuestionMode] = useState<'ai' | 'manual'>('ai');
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, text: 'Explain the difference between supervised and unsupervised learning.', type: 'Technical', difficulty: 'Medium', skills: 'Machine Learning', maxTime: '3 min' },
    { id: 2, text: 'Describe a challenging project you worked on and how you handled obstacles.', type: 'Behavioral', difficulty: 'Medium', skills: 'Problem Solving', maxTime: '4 min' },
  ]);
  const [lang, setLang] = useState('English');
  const [duration, setDuration] = useState('45 Minutes');
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [codingEnabled, setCodingEnabled] = useState(true);
  const [selectedLangs, setSelectedLangs] = useState<string[]>(['Python', 'SQL']);
  const [weights, setWeights] = useState({ technical: 50, communication: 25, problemSolving: 15, presentation: 10 });
  const [title, setTitle] = useState('Machine Learning Engineer — Technical Screening');
  const [jobRole, setJobRole] = useState('Machine Learning Engineer');
  const [screenSharing, setScreenSharing] = useState<ScreenSharingMode>('required');
  const [screenSharingScope, setScreenSharingScope] = useState<ScreenSharingScope>('entire');
  const [screenSharingViolation, setScreenSharingViolation] = useState<ScreenSharingViolation>('warn');

  const addQuestion = () => {
    setQuestions(prev => [...prev, { id: Date.now(), text: '', type: 'Technical', difficulty: 'Medium', skills: '', maxTime: '3 min' }]);
  };
  const removeQuestion = (id: number) => setQuestions(prev => prev.filter(q => q.id !== id));

  const toggleLang = (l: string) => {
    setSelectedLangs(prev => prev.includes(l) ? prev.filter(x => x !== l) : [...prev, l]);
  };

  if (step === STEPS.length) {
    return <InterviewCreated navigate={navigate} title={title} screenSharing={screenSharing} />;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Create AI Interview</h1>
        <p className="text-sm text-gray-500">Set up a customized AI interview session for your candidates.</p>
      </div>

      <ProgressSteps steps={STEPS} current={step} />

      <Card className="p-6">
        {/* STEP 0 — Basic Info */}
        {step === 0 && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Basic Information</h2>
            <Input label="Interview Title" placeholder="e.g. Machine Learning Engineer — Technical Screening" value={title} onChange={setTitle} required />
            <Input label="Job Role" placeholder="e.g. Machine Learning Engineer" value={jobRole} onChange={setJobRole} required />
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Job Description</label>
              <textarea rows={4} placeholder="Paste the full job description here..." className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
            </div>
            <Select label="Experience Level" options={['Intern', 'Junior', 'Mid-Level', 'Senior']} />
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Interview Type</label>
              <div className="grid grid-cols-2 gap-3">
                {['Technical Interview', 'Communication Interview', 'Mixed Interview', 'Behavioral Interview'].map(t => (
                  <label key={t} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-indigo-300 hover:bg-indigo-50 transition-colors">
                    <input type="radio" name="type" className="accent-indigo-600" defaultChecked={t === 'Mixed Interview'} />
                    <span className="text-sm text-gray-700">{t}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 1 — Questions */}
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Interview Questions</h2>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setQuestionMode('ai')} className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${questionMode === 'ai' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <Wand2 size={20} className={questionMode === 'ai' ? 'text-indigo-600' : 'text-gray-400'} />
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-900">AI Generate Questions</p>
                  <p className="text-xs text-gray-500 mt-0.5">Auto-generate from job description</p>
                </div>
              </button>
              <button onClick={() => setQuestionMode('manual')} className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${questionMode === 'manual' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <Plus size={20} className={questionMode === 'manual' ? 'text-indigo-600' : 'text-gray-400'} />
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-900">Add Manually</p>
                  <p className="text-xs text-gray-500 mt-0.5">Write your own questions</p>
                </div>
              </button>
            </div>

            {questionMode === 'ai' && (
              <div className="bg-indigo-50 rounded-xl p-4 space-y-3">
                <p className="text-sm font-medium text-indigo-800">AI Question Generator</p>
                <Input label="Skills to focus on" placeholder="e.g. Python, Machine Learning, Deep Learning, SQL" />
                <PrimaryBtn className="flex items-center gap-2 w-full justify-center">
                  <Wand2 size={15} /> Generate Questions
                </PrimaryBtn>
              </div>
            )}

            <div className="space-y-3">
              {questions.map((q, idx) => (
                <div key={q.id} className="border border-gray-200 rounded-xl p-4 space-y-3 bg-white">
                  <div className="flex items-center gap-2">
                    <GripVertical size={16} className="text-gray-300 cursor-grab" />
                    <span className="text-xs font-medium text-gray-400">Question {idx + 1}</span>
                    <button onClick={() => removeQuestion(q.id)} className="ml-auto text-red-400 hover:text-red-600 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <textarea
                    defaultValue={q.text}
                    placeholder="Enter your interview question..."
                    rows={2}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Select options={['Technical', 'Behavioral', 'Coding', 'Communication', 'Scenario-Based']} />
                    <Select options={['Easy', 'Medium', 'Hard']} />
                    <input placeholder="Expected skills" defaultValue={q.skills} className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    <Select options={['2 min', '3 min', '4 min', '5 min', '10 min']} />
                  </div>
                </div>
              ))}
              <button onClick={addQuestion} className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-300 rounded-xl text-sm font-medium text-gray-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
                <Plus size={16} /> Add Question
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 — Language */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 mb-1">
              <Globe size={20} className="text-indigo-600" />
              <h2 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Interview Language</h2>
            </div>
            <div className="space-y-3">
              {['English', 'Urdu', 'Urdu + English Mixed'].map(l => (
                <label key={l} className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${lang === l ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input type="radio" name="lang" checked={lang === l} onChange={() => setLang(l)} className="mt-0.5 accent-indigo-600" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{l}</p>
                    {l === 'Urdu + English Mixed' && (
                      <p className="text-xs text-indigo-700 mt-1 bg-indigo-100 rounded-lg px-3 py-1.5 mt-2">
                        AI will understand natural code-switching between Urdu and English.
                      </p>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3 — Duration */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 mb-1">
              <Clock size={20} className="text-indigo-600" />
              <h2 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Interview Duration</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['15 Minutes', '30 Minutes', '45 Minutes', '60 Minutes', 'Custom Duration'].map(d => (
                <button key={d} onClick={() => setDuration(d)} className={`py-4 rounded-xl border-2 text-sm font-semibold transition-all ${duration === d ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                  {d}
                </button>
              ))}
            </div>
            {duration === 'Custom Duration' && (
              <Input label="Custom Duration (minutes)" placeholder="e.g. 75" />
            )}
            <div className="border-t border-gray-100 pt-5">
              <Select label="Maximum Answer Time Per Question" options={['1 minute', '2 minutes', '3 minutes', '4 minutes', '5 minutes', '10 minutes']} />
            </div>
          </div>
        )}

        {/* STEP 4 — Monitoring */}
        {step === 4 && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 mb-1">
              <Camera size={20} className="text-indigo-600" />
              <h2 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Camera & Monitoring Settings</h2>
            </div>
            <div className="border border-gray-200 rounded-xl divide-y divide-gray-100">
              <div className="px-4">
                <Toggle label="Require Camera" checked={cameraEnabled} onChange={setCameraEnabled} description="Candidates must enable their camera during the interview." />
              </div>
              {cameraEnabled && (
                <>
                  <div className="px-4 pt-2 pb-1">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Observable Presence Checks</p>
                    {[
                      { label: 'Face Presence Detection', desc: 'Flag when no face is visible in the camera frame.' },
                      { label: 'Multiple Person Detection', desc: 'Alert when more than one person appears in frame.' },
                      { label: 'Looking Away Detection', desc: 'Track prolonged periods of looking away from screen.' },
                      { label: 'Suspicious Movement Detection', desc: 'Flag unusual or repeated off-screen movements.' },
                    ].map(item => (
                      <Toggle key={item.label} label={item.label} description={item.desc} checked={true} onChange={() => {}} />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
              <p className="font-semibold mb-1">Interview Integrity Note</p>
              <p className="text-xs leading-relaxed">This system monitors observable behaviors (camera presence, looking away, multiple persons) for interview integrity. It does not use facial expression analysis to assess honesty, personality, or hiring suitability.</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-800">Interview Monitoring Rules — Warning System</h3>
              <div className="space-y-3">
                {[
                  { w: 'Warning 1', desc: 'Minor violation detected. Candidate receives a prompt notification.', color: 'amber' },
                  { w: 'Warning 2', desc: 'Second violation. Candidate receives a serious warning alert.', color: 'orange' },
                  { w: 'Warning 3', desc: 'Third violation. Recruiter is notified immediately.', color: 'red' },
                ].map(({ w, desc, color }) => (
                  <div key={w} className={`flex items-start gap-3 p-3 bg-${color}-50 border border-${color}-200 rounded-lg`}>
                    <span className={`text-xs font-bold text-${color}-700 bg-${color}-100 px-2 py-0.5 rounded-full`}>{w}</span>
                    <p className={`text-xs text-${color}-700`}>{desc}</p>
                  </div>
                ))}
              </div>
              <Toggle label="Automatically terminate interview after 3rd serious warning" checked={true} onChange={() => {}} description="Interview will end and recruiter will be notified." />
            </div>

            {/* ── Screen Sharing ── */}
            <div className="border-t border-gray-100 pt-5 space-y-4">
              <div className="flex items-center gap-2">
                <Monitor size={16} className="text-indigo-600" />
                <h3 className="text-sm font-semibold text-gray-800">Screen Sharing</h3>
              </div>
              <p className="text-xs text-gray-500 -mt-2">
                Configure whether candidates must share their screen during the interview.
              </p>

              {/* Mode selection */}
              <div className="space-y-2">
                {([
                  { value: 'required', label: 'Screen Sharing Required', desc: 'Candidates must share their screen before the interview can begin and keep screen sharing active during the required parts of the interview.' },
                  { value: 'optional', label: 'Screen Sharing Optional', desc: 'Candidates can choose whether to share their screen. No restrictions apply if they decline.' },
                  { value: 'disabled', label: 'Screen Sharing Disabled', desc: 'Screen sharing is not available for this interview.' },
                ] as { value: ScreenSharingMode; label: string; desc: string }[]).map(opt => (
                  <label
                    key={opt.value}
                    className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${screenSharing === opt.value ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <input
                      type="radio"
                      name="screenSharing"
                      checked={screenSharing === opt.value}
                      onChange={() => setScreenSharing(opt.value)}
                      className="mt-0.5 accent-indigo-600 flex-shrink-0"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{opt.label}</p>
                      {screenSharing === opt.value && (
                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">{opt.desc}</p>
                      )}
                    </div>
                  </label>
                ))}
              </div>

              {/* Scope — only shown when required */}
              {screenSharing === 'required' && (
                <div className="space-y-3 pl-1">
                  <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">When is screen sharing required?</p>
                  <div className="grid grid-cols-3 gap-2">
                    {([
                      { value: 'entire', label: 'Entire Interview' },
                      { value: 'technical', label: 'Technical Questions Only' },
                      { value: 'coding', label: 'Coding Questions Only' },
                    ] as { value: ScreenSharingScope; label: string }[]).map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => setScreenSharingScope(opt.value)}
                        className={`py-2.5 px-3 text-xs font-semibold rounded-lg border-2 transition-all text-center ${screenSharingScope === opt.value ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  {/* Violation action */}
                  <div className="space-y-2 pt-1">
                    <p className="text-xs font-semibold text-gray-700">If candidate stops screen sharing:</p>
                    <div className="space-y-2">
                      {([
                        { value: 'warn', label: 'Show warning', desc: 'Notify the candidate and log a warning.' },
                        { value: 'pause', label: 'Pause interview', desc: 'Interview pauses until screen sharing is resumed.' },
                        { value: 'flag', label: 'Flag for recruiter review', desc: 'Mark the interview for manual review without interrupting.' },
                        { value: 'end', label: 'End interview after repeated violations', desc: 'Terminate the interview after the third screen-sharing violation.' },
                      ] as { value: ScreenSharingViolation; label: string; desc: string }[]).map(opt => (
                        <label
                          key={opt.value}
                          className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${screenSharingViolation === opt.value ? 'border-indigo-400 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}
                        >
                          <input
                            type="radio"
                            name="ssViolation"
                            checked={screenSharingViolation === opt.value}
                            onChange={() => setScreenSharingViolation(opt.value)}
                            className="mt-0.5 accent-indigo-600 flex-shrink-0"
                          />
                          <div>
                            <p className="text-xs font-semibold text-gray-800">{opt.label}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Warning integration */}
                  <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 space-y-2">
                    <p className="text-xs font-semibold text-indigo-800">Screen Sharing — Warning System Integration</p>
                    <div className="space-y-1.5">
                      {[
                        { w: 'Warning 1', desc: 'Screen sharing stopped — candidate is notified.' },
                        { w: 'Warning 2', desc: 'Screen sharing stopped again — serious alert shown.' },
                        { w: 'Warning 3', desc: 'Final warning — interview action triggered per your setting above.' },
                      ].map(({ w, desc }) => (
                        <div key={w} className="flex items-start gap-2 text-xs text-indigo-700">
                          <span className="font-bold bg-indigo-100 px-2 py-0.5 rounded-full flex-shrink-0">{w}</span>
                          <span>{desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 5 — Coding */}
        {step === 5 && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 mb-1">
              <Code2 size={20} className="text-indigo-600" />
              <h2 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Coding Settings</h2>
            </div>
            <div className="border border-gray-200 rounded-xl px-4 divide-y divide-gray-100">
              <Toggle label="Enable Coding Questions" checked={codingEnabled} onChange={setCodingEnabled} description="Include programming challenges with an embedded code editor." />
            </div>
            {codingEnabled && (
              <>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Allowed Programming Languages</label>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'Java', 'C++', 'JavaScript', 'SQL', 'TypeScript', 'Go', 'Rust'].map(l => (
                      <button key={l} onClick={() => toggleLang(l)} className={`px-3 py-1.5 text-sm rounded-lg border-2 font-medium transition-all ${selectedLangs.includes(l) ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-gray-400 text-xs ml-2">Code Editor Preview</span>
                  </div>
                  <div className="text-gray-300 space-y-0.5 text-xs leading-relaxed">
                    <div><span className="text-purple-400">def</span> <span className="text-blue-300">two_sum</span><span className="text-white">(nums, target):</span></div>
                    <div className="pl-4"><span className="text-gray-500"># Return indices of two numbers that add up to target</span></div>
                    <div className="pl-4"><span className="text-purple-400">seen</span> <span className="text-white">= {}</span></div>
                    <div className="pl-4"><span className="text-purple-400">for</span> i, num <span className="text-purple-400">in</span> <span className="text-blue-300">enumerate</span>(nums):</div>
                    <div className="pl-8 text-gray-400">...</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <Toggle label="Allow Code Execution" checked={true} onChange={() => {}} />
                  <Input label="Number of Coding Questions" placeholder="2" />
                  <Select label="Time Limit per Problem" options={['15 min', '20 min', '30 min', '45 min']} />
                </div>
              </>
            )}
          </div>
        )}

        {/* STEP 6 — Evaluation */}
        {step === 6 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-1">
              <Sliders size={20} className="text-indigo-600" />
              <h2 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Evaluation Criteria</h2>
            </div>
            <div className="space-y-5">
              {[
                { key: 'technical' as const, label: 'Technical Skills', color: 'indigo' },
                { key: 'communication' as const, label: 'Communication Skills', color: 'purple' },
                { key: 'problemSolving' as const, label: 'Problem Solving', color: 'blue' },
                { key: 'presentation' as const, label: 'Confidence / Presentation', color: 'violet' },
              ].map(({ key, label, color }) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">{label}</span>
                    <span className={`font-bold text-${color}-600`}>{weights[key]}%</span>
                  </div>
                  <input
                    type="range" min={0} max={100} value={weights[key]}
                    onChange={e => setWeights(prev => ({ ...prev, [key]: +e.target.value }))}
                    className="w-full accent-indigo-600 h-2"
                  />
                </div>
              ))}
              <div className={`text-center text-sm font-semibold py-2 rounded-lg ${
                Object.values(weights).reduce((a, b) => a + b, 0) === 100 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
              }`}>
                Total: {Object.values(weights).reduce((a, b) => a + b, 0)}%
                {Object.values(weights).reduce((a, b) => a + b, 0) !== 100 && ' (must equal 100%)'}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800">Minimum Qualifying Thresholds</h3>
              <div className="grid grid-cols-3 gap-4">
                <Input label="Technical Score (min %)" placeholder="70" />
                <Input label="Communication Score (min %)" placeholder="50" />
                <Input label="Overall Score (min %)" placeholder="65" />
              </div>
              <Toggle label="Only show candidates who meet qualification criteria" checked={true} onChange={() => {}} description="Hide candidates below thresholds from the main list." />
            </div>
          </div>
        )}

        {/* STEP 7 — Review */}
        {step === 7 && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Review & Create</h2>
            <div className="bg-gray-50 rounded-xl p-5 space-y-3 text-sm">
              {[
                { label: 'Position', value: jobRole },
                { label: 'Interview Duration', value: duration },
                { label: 'Language', value: lang },
                { label: 'Questions', value: `${questions.length} questions` },
                { label: 'Camera Required', value: cameraEnabled ? 'Yes' : 'No' },
                { label: 'Screen Sharing', value: screenSharing === 'required' ? `Required (${screenSharingScope === 'entire' ? 'Entire interview' : screenSharingScope === 'technical' ? 'Technical questions' : 'Coding questions'})` : screenSharing === 'optional' ? 'Optional' : 'Disabled' },
                { label: 'Coding Enabled', value: codingEnabled ? `Yes (${selectedLangs.join(', ')})` : 'No' },
                { label: 'Technical Weight', value: `${weights.technical}%` },
                { label: 'Communication Weight', value: `${weights.communication}%` },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between py-2 border-b border-gray-200 last:border-0">
                  <span className="text-gray-500">{label}</span>
                  <span className="font-medium text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <SecondaryBtn onClick={() => step > 0 ? setStep(s => s - 1) : navigate('recruiter-dashboard')}>
          {step === 0 ? 'Cancel' : '← Back'}
        </SecondaryBtn>
        <PrimaryBtn onClick={() => setStep(s => s + 1)} className="flex items-center gap-2">
          {step === STEPS.length - 1 ? 'Create Interview' : <>Next <ChevronRight size={16} /></>}
        </PrimaryBtn>
      </div>
    </div>
  );
}

function InterviewCreated({ navigate, title, screenSharing }: { navigate: (p: Page) => void; title: string; screenSharing: ScreenSharingMode }) {
  const [copied, setCopied] = useState(false);
  const link = 'hiremindai.com/interview/ml2026x';

  const ssLabel = screenSharing === 'required' ? 'Required' : screenSharing === 'optional' ? 'Optional' : 'Not Required';
  const ssBadgeClass = screenSharing === 'required'
    ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
    : screenSharing === 'optional'
    ? 'bg-amber-50 text-amber-700 border-amber-200'
    : 'bg-gray-100 text-gray-500 border-gray-200';

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-3 py-6">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Interview Successfully Created!</h1>
        <p className="text-gray-500 text-sm">{title}</p>
      </div>

      <Card className="p-6 space-y-4">
        <h3 className="font-semibold text-gray-800">Interview Link</h3>
        <div className="flex items-center gap-3 bg-gray-50 rounded-xl border border-gray-200 p-3">
          <code className="flex-1 text-sm text-indigo-700 font-mono">{link}</code>
          <button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-800 bg-white border border-indigo-200 rounded-lg px-3 py-1.5 transition-colors">
            <Copy size={13} /> {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-gray-400 text-xs mb-1">Expiry Date</p>
            <p className="font-medium text-gray-800">Oct 29, 2026</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-gray-400 text-xs mb-1">Max Attempts</p>
            <p className="font-medium text-gray-800">1 per candidate</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-gray-400 text-xs mb-1">Status</p>
            <p className="font-medium text-emerald-600">Active</p>
          </div>
        </div>

        {/* Candidate Instructions Preview */}
        <div className="border border-gray-200 rounded-xl p-4 space-y-3 bg-gray-50">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Candidate Will See</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Monitor size={15} className="text-indigo-500" />
              <span className="text-sm font-medium text-gray-800">Screen Sharing Requirement</span>
            </div>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${ssBadgeClass}`}>{ssLabel}</span>
          </div>
          {screenSharing === 'required' && (
            <div className="space-y-2">
              <p className="text-xs text-gray-600 leading-relaxed">
                This interview requires screen sharing. You must share your screen before the interview can begin and keep it active throughout the required sections.
              </p>
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-colors w-full justify-center">
                <Monitor size={13} /> Share Screen &amp; Continue
              </button>
              <p className="text-xs text-gray-400 text-center">Preview only — candidates see this button when they open the interview link</p>
            </div>
          )}
          {screenSharing === 'optional' && (
            <p className="text-xs text-gray-600">Screen sharing is optional for this interview. Candidates may choose to share or skip.</p>
          )}
          {screenSharing === 'disabled' && (
            <p className="text-xs text-gray-500">Screen sharing is not required or available for this interview.</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <PrimaryBtn onClick={() => navigate('candidate-list')} className="flex items-center justify-center gap-2 w-full">
            <ExternalLink size={15} /> View Interview
          </PrimaryBtn>
          <SecondaryBtn onClick={() => {}} className="flex items-center justify-center gap-2 w-full">
            Email Candidates
          </SecondaryBtn>
        </div>
      </Card>

      <div className="text-center">
        <button onClick={() => navigate('recruiter-dashboard')} className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}
