import React, { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { Input, Select, PrimaryBtn, SecondaryBtn, Card } from '../components/shared';
import { Page } from '../types';

export default function SubmitQuestion({ navigate }: { navigate: (p: Page) => void }) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="p-6 max-w-xl mx-auto text-center space-y-4 py-20">
        <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Question Submitted!</h2>
        <p className="text-gray-500 text-sm">Your question has been submitted for review. It will appear in the community bank after moderation.</p>
        <PrimaryBtn onClick={() => navigate('question-bank')}>Back to Question Bank</PrimaryBtn>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-5">
      <button onClick={() => navigate('question-bank')} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 transition-colors">
        <ArrowLeft size={15} /> Back to Question Bank
      </button>

      <div>
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Submit Interview Question</h1>
        <p className="text-sm text-gray-500 mt-0.5">Share questions from your real interview experience with the community.</p>
      </div>

      <Card className="p-6 space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <Input label="Job Role" placeholder="e.g. Machine Learning Engineer" required />
          <Input label="Company (optional)" placeholder="e.g. Google, Meta, Amazon" />
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">Interview Question <span className="text-red-500">*</span></label>
          <textarea rows={4} placeholder="Write the interview question exactly as it was asked..." className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Select label="Question Type" options={['Technical', 'Behavioral', 'Coding', 'Communication', 'Scenario-Based']} />
          <Select label="Difficulty" options={['Easy', 'Medium', 'Hard']} />
          <Input label="Technologies / Skills" placeholder="e.g. Python, ML, SQL" />
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">Interview Experience Notes (optional)</label>
          <textarea rows={3} placeholder="Share context — what stage was this? Was it a phone screen, onsite, or technical round? Any tips?" className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" className="mt-0.5 accent-indigo-600" />
          <div>
            <p className="text-sm font-medium text-gray-700">This question was asked in a real interview</p>
            <p className="text-xs text-gray-400 mt-0.5">Check this to help others identify questions from actual interviews.</p>
          </div>
        </label>

        <div className="flex gap-3 pt-2">
          <SecondaryBtn onClick={() => navigate('question-bank')}>Cancel</SecondaryBtn>
          <PrimaryBtn onClick={() => setSubmitted(true)} className="flex items-center gap-2">
            <Send size={15} /> Submit Question
          </PrimaryBtn>
        </div>
      </Card>
    </div>
  );
}
