export type Page =
  | 'landing'
  | 'login'
  | 'signup'
  | 'recruiter-dashboard'
  | 'create-interview'
  | 'interview-created'
  | 'candidate-list'
  | 'candidate-profile'
  | 'candidate-history'
  | 'recruiter-analytics'
  | 'student-dashboard'
  | 'create-practice'
  | 'interview-screen'
  | 'coding-screen'
  | 'interview-results'
  | 'question-analysis'
  | 'communication-analysis'
  | 'resume-analysis'
  | 'question-bank'
  | 'submit-question'
  | 'student-performance';

export type UserRole = 'recruiter' | 'student' | null;
