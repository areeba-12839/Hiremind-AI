import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Video, VideoOff, RotateCcw, ChevronRight, AlertTriangle, Wifi, Code2, Monitor, MonitorOff } from 'lucide-react';
import { Page } from '../../types';

export default function InterviewScreen({ navigate }: { navigate: (p: Page) => void }) {
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [screenSharing, setScreenSharing] = useState(true);
  const [currentQ, setCurrentQ] = useState(4);
  const totalQ = 10;
  const [timeLeft, setTimeLeft] = useState(187); // seconds
  const [showCoding, setShowCoding] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(s => s > 0 ? s - 1 : 0), 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const question = 'Can you explain the difference between supervised and unsupervised learning? Please provide real-world examples of each.';

  return (
    <div className="h-screen bg-gray-900 flex flex-col overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">AI</span>
          </div>
          <span className="text-white text-sm font-semibold">AI Engineer — Technical Interview</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-gray-300">
            <Wifi size={14} className="text-green-400" />
            <span className="text-xs">Connected</span>
          </div>
          <button
            onClick={() => setScreenSharing(s => !s)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              screenSharing
                ? 'bg-emerald-900/50 text-emerald-300 border border-emerald-700'
                : 'bg-red-900/50 text-red-400 border border-red-700'
            }`}
            title="Toggle screen sharing status"
          >
            {screenSharing ? <Monitor size={13} /> : <MonitorOff size={13} />}
            {screenSharing ? 'Screen Sharing: Active' : 'Screen Sharing: Stopped'}
          </button>
          <div className="flex items-center gap-1 bg-gray-700 rounded-lg px-3 py-1">
            <span className="text-gray-400 text-xs">Question</span>
            <span className="text-white font-bold">{currentQ}/{totalQ}</span>
          </div>
          <button onClick={() => setShowCoding(c => !c)} className="flex items-center gap-1.5 text-xs text-indigo-300 hover:text-indigo-200 transition-colors">
            <Code2 size={14} /> {showCoding ? 'Text Mode' : 'Code Mode'}
          </button>
          <button
            onClick={() => navigate('interview-results')}
            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            End Interview
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {!showCoding ? (
            <>
              {/* AI Interviewer */}
              <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-b from-gray-900 to-gray-800">
                <div className="max-w-2xl w-full space-y-8 text-center">
                  {/* AI Avatar */}
                  <div className="relative mx-auto w-32 h-32">
                    <div className="w-32 h-32 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-4xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>AI</span>
                    </div>
                    {/* Pulse ring */}
                    <div className="absolute inset-0 rounded-full border-4 border-indigo-500 animate-ping opacity-20" />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-800" />
                  </div>

                  <div>
                    <p className="text-indigo-300 text-sm font-medium mb-3">AI Interviewer is asking:</p>
                    <p className="text-white text-lg font-medium leading-relaxed bg-gray-800/60 rounded-2xl p-6 border border-gray-700">
                      {question}
                    </p>
                  </div>

                  {/* Answer area */}
                  <div className="bg-gray-800/40 rounded-2xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-2.5 h-2.5 rounded-full ${micOn ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} />
                      <span className="text-gray-400 text-xs">{micOn ? 'Listening... speak your answer' : 'Microphone off'}</span>
                    </div>
                    <div className="min-h-[80px] text-gray-300 text-sm text-left leading-relaxed">
                      {micOn ? (
                        <span className="text-gray-400 italic">Your answer will appear here as you speak...</span>
                      ) : (
                        <span className="text-gray-500">Enable microphone to answer.</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Coding Editor */
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="bg-gray-800 border-b border-gray-700 p-4">
                <p className="text-white text-sm font-semibold">Coding Challenge: Two Sum</p>
                <p className="text-gray-400 text-xs mt-1">Given an array of integers and a target, return indices of two numbers that add up to the target.</p>
              </div>
              <div className="flex flex-1 overflow-hidden">
                <div className="flex-1 bg-gray-950 p-4 font-mono text-sm text-gray-300 overflow-y-auto">
                  <div className="space-y-0.5">
                    <div><span className="text-gray-500 select-none mr-4">1</span><span className="text-purple-400">def</span> <span className="text-blue-300">two_sum</span><span className="text-white">(nums, target):</span></div>
                    <div><span className="text-gray-500 select-none mr-4">2</span><span className="pl-8 text-gray-500"># Write your solution here</span></div>
                    <div><span className="text-gray-500 select-none mr-4">3</span><span className="pl-8"><span className="text-purple-400">seen</span> = <span className="text-orange-300">{}</span></span></div>
                    <div><span className="text-gray-500 select-none mr-4">4</span><span className="pl-8 text-purple-400">for</span> i, num <span className="text-purple-400">in</span> <span className="text-blue-300">enumerate</span>(nums):</div>
                    <div><span className="text-gray-500 select-none mr-4">5</span><span className="pl-16 text-purple-400">complement</span> = target - num</div>
                    <div><span className="text-gray-500 select-none mr-4">6</span><span className="pl-16 text-purple-400">if</span> complement <span className="text-purple-400">in</span> seen:</div>
                    <div><span className="text-gray-500 select-none mr-4">7</span><span className="pl-24 text-purple-400">return</span> [seen[complement], i]</div>
                    <div><span className="text-gray-500 select-none mr-4">8</span><span className="pl-16">seen[num] = i</span></div>
                    <div><span className="text-gray-500 select-none mr-4">9</span><span className="pl-8 text-purple-400">return</span> []</div>
                    <div className="mt-2 bg-gray-800 rounded-lg p-3 text-green-400 text-xs">
                      <div>✓ Test case 1 passed: [2,7,11,15], target=9 → [0,1]</div>
                      <div>✓ Test case 2 passed: [3,2,4], target=6 → [1,2]</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 p-3 bg-gray-800 border-t border-gray-700">
                <button className="px-4 py-2 bg-gray-700 text-gray-300 text-sm rounded-lg hover:bg-gray-600 transition-colors">Run Code</button>
                <button onClick={() => navigate('interview-results')} className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors">Submit Solution</button>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="w-72 bg-gray-800 border-l border-gray-700 flex flex-col p-4 space-y-4 overflow-y-auto">
          {/* Progress */}
          <div className="bg-gray-700/50 rounded-xl p-4">
            <p className="text-gray-400 text-xs font-medium mb-2">Interview Progress</p>
            <div className="flex justify-between mb-2">
              <span className="text-white font-bold">Question {currentQ} of {totalQ}</span>
            </div>
            <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(currentQ / totalQ) * 100}%` }} />
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-400">
              <span>Progress</span>
              <span>{Math.round((currentQ / totalQ) * 100)}%</span>
            </div>
          </div>

          {/* Timer */}
          <div className="bg-gray-700/50 rounded-xl p-4 text-center">
            <p className="text-gray-400 text-xs mb-1">Time Remaining</p>
            <p className={`text-3xl font-mono font-bold ${timeLeft < 30 ? 'text-red-400' : 'text-white'}`}>{fmt(timeLeft)}</p>
          </div>

          {/* Camera Preview */}
          <div className="bg-gray-700/50 rounded-xl overflow-hidden aspect-video flex items-center justify-center">
            {camOn ? (
              <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
                <span className="text-gray-400 text-xs">Camera Preview</span>
              </div>
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <VideoOff size={24} className="text-gray-500" />
              </div>
            )}
          </div>

          {/* Warnings */}
          <div className="bg-gray-700/50 rounded-xl p-3">
            <p className="text-gray-400 text-xs font-medium mb-2">Monitoring</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Warnings</span>
              <span className="text-xs font-semibold text-green-400">0 / 3</span>
            </div>
            <div className="flex gap-1 mt-2">
              {[0, 1, 2].map(i => <div key={i} className="flex-1 h-1.5 bg-gray-600 rounded-full" />)}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="bg-gray-800 border-t border-gray-700 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setMicOn(m => !m)} className={`p-2.5 rounded-xl transition-colors ${micOn ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-red-600/20 text-red-400'}`}>
            {micOn ? <Mic size={18} /> : <MicOff size={18} />}
          </button>
          <button onClick={() => setCamOn(c => !c)} className={`p-2.5 rounded-xl transition-colors ${camOn ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-red-600/20 text-red-400'}`}>
            {camOn ? <Video size={18} /> : <VideoOff size={18} />}
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-4 py-2 bg-gray-700 text-gray-300 text-sm font-medium rounded-xl hover:bg-gray-600 transition-colors">
            <RotateCcw size={14} /> Repeat
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
            Submit Answer
          </button>
          <button onClick={() => { setCurrentQ(q => Math.min(q + 1, totalQ)); }} className="flex items-center gap-1.5 px-4 py-2 bg-gray-700 text-gray-300 text-sm font-medium rounded-xl hover:bg-gray-600 transition-colors">
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
