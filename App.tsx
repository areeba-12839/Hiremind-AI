import React, { useState } from 'react';
import { Page, UserRole } from './types';

// Pages
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import RecruiterLayout from './components/RecruiterLayout';
import StudentLayout from './components/StudentLayout';
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard';
import CreateInterview from './pages/recruiter/CreateInterview';
import CandidateList from './pages/recruiter/CandidateList';
import CandidateProfile from './pages/recruiter/CandidateProfile';
import CandidateHistory from './pages/recruiter/CandidateHistory';
import RecruiterAnalytics from './pages/recruiter/RecruiterAnalytics';
import StudentDashboard from './pages/student/StudentDashboard';
import CreatePractice from './pages/student/CreatePractice';
import InterviewScreen from './pages/student/InterviewScreen';
import InterviewResults from './pages/student/InterviewResults';
import ResumeAnalysis from './pages/student/ResumeAnalysis';
import StudentPerformance from './pages/student/StudentPerformance';
import QuestionBank from './pages/QuestionBank';
import SubmitQuestion from './pages/SubmitQuestion';

const RECRUITER_PAGES: Page[] = [
  'recruiter-dashboard', 'create-interview', 'interview-created',
  'candidate-list', 'candidate-profile', 'candidate-history', 'recruiter-analytics',
];

const STUDENT_PAGES: Page[] = [
  'student-dashboard', 'create-practice', 'interview-screen', 'coding-screen',
  'interview-results', 'question-analysis', 'communication-analysis',
  'resume-analysis', 'student-performance',
];

const SHARED_PAGES: Page[] = ['question-bank', 'submit-question'];

export default function App() {
  const [page, setPage] = useState<Page>('landing');
  const [role, setRole] = useState<UserRole>(null);

  const navigate = (p: Page) => setPage(p);
  const setRoleAndNavigate = (r: UserRole) => setRole(r);

  // Full-screen pages (no layout)
  if (page === 'landing') return <LandingPage navigate={navigate} setRole={setRoleAndNavigate} />;
  if (page === 'login') return <AuthPage mode="login" navigate={navigate} setRole={setRoleAndNavigate} />;
  if (page === 'signup') return <AuthPage mode="signup" navigate={navigate} setRole={setRoleAndNavigate} />;
  if (page === 'interview-screen') return <InterviewScreen navigate={navigate} />;

  // Recruiter pages
  if (RECRUITER_PAGES.includes(page) || (role === 'recruiter' && SHARED_PAGES.includes(page))) {
    return (
      <RecruiterLayout currentPage={page} navigate={navigate}>
        {page === 'recruiter-dashboard' && <RecruiterDashboard navigate={navigate} />}
        {page === 'create-interview' && <CreateInterview navigate={navigate} />}
        {page === 'candidate-list' && <CandidateList navigate={navigate} />}
        {page === 'candidate-profile' && <CandidateProfile navigate={navigate} />}
        {page === 'candidate-history' && <CandidateHistory />}
        {page === 'recruiter-analytics' && <RecruiterAnalytics />}
        {page === 'question-bank' && <QuestionBank navigate={navigate} />}
        {page === 'submit-question' && <SubmitQuestion navigate={navigate} />}
      </RecruiterLayout>
    );
  }

  // Student pages
  if (STUDENT_PAGES.includes(page) || (role === 'student' && SHARED_PAGES.includes(page)) || SHARED_PAGES.includes(page)) {
    return (
      <StudentLayout currentPage={page} navigate={navigate}>
        {page === 'student-dashboard' && <StudentDashboard navigate={navigate} />}
        {page === 'create-practice' && <CreatePractice navigate={navigate} />}
        {page === 'interview-results' && <InterviewResults navigate={navigate} />}
        {page === 'resume-analysis' && <ResumeAnalysis />}
        {page === 'student-performance' && <StudentPerformance />}
        {page === 'question-bank' && <QuestionBank navigate={navigate} />}
        {page === 'submit-question' && <SubmitQuestion navigate={navigate} />}
      </StudentLayout>
    );
  }

  // Fallback
  return <LandingPage navigate={navigate} setRole={setRoleAndNavigate} />;
}
