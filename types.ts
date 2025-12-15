
export interface UserProfile {
  jobTitle: string;
  experienceLevel: string;
  interviewMode: 'Text' | 'Voice';
  industry: string;
  interviewType: 'Behavioral' | 'Technical' | 'Case Study';
}

export interface InterviewFeedback {
  question: string;
  answer: string;
  feedback: {
    starScore: number;
    contentScore: number;
    clarityScore: number;
    confidenceScore: number;
    strengths: string[];
    improvements: string[];
  };
}

export interface ResumeCritique {
  missingKeywords: string[];
  quantificationFeedback: string;
  formattingFeedback: string;
}

export interface TailoredResumeSuggestion {
  tailoredResume: string;
  explanation: string;
}

export interface AssessmentQuestion {
    question: string;
    options: string[];
    correctOptionIndex: number;
    explanation:string;
}

export interface LearningResource {
    type: 'Course' | 'Article' | 'Practice';
    title: string;
    description: string;
}

export type View = 'LANDING' | 'DASHBOARD' | 'ONBOARDING' | 'INTERVIEW' | 'FEEDBACK' | 'RESUME_ANALYZER' | 'ASSESSMENTS' | 'RESUME_TAILOR' | 'LEARNING_PATH' | 'RECRUITER_DASHBOARD' | 'COACH_DASHBOARD' | 'COMBINED_REPORT' | 'PRICING' | 'KPIS' | 'TESTING_PLAN' | 'ROADMAP' | 'INFRASTRUCTURE' | 'PARTNERSHIPS' | 'EDGE_CASES' | 'DELIVERABLES' | 'ACCEPTANCE_CRITERIA' | 'MARKETING';
