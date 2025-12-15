
import React, { useState, useCallback } from 'react';
import { UserProfile, InterviewFeedback, View, ResumeCritique } from './types';
import Onboarding from './components/Onboarding';
import Interview from './components/Interview';
import FeedbackReport from './components/FeedbackReport';
import ResumeAnalyzer from './components/ResumeAnalyzer';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import Assessments from './components/Assessments';
import ResumeTailor from './components/ResumeTailor';
import LearningPath from './components/LearningPath';
import RecruiterDashboard from './components/RecruiterDashboard';
import CoachDashboard from './components/CoachDashboard';
import CombinedReport from './components/CombinedReport';
import PricingPage from './components/PricingPage';
import KPIsDashboard from './components/KPIsDashboard';
import TestingPlan from './components/TestingPlan';
import Roadmap from './components/Roadmap';
import Infrastructure from './components/Infrastructure';
import Partnerships from './components/Partnerships';
import EdgeCases from './components/EdgeCases';
import Deliverables from './components/Deliverables';
import AcceptanceCriteria from './components/AcceptanceCriteria';
import MarketingLaunchPlan from './components/MarketingLaunchPlan';
import { CareerAIIcon } from './components/icons';

const App: React.FC = () => {
  const [view, setView] = useState<View>('LANDING');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [feedback, setFeedback] = useState<InterviewFeedback[] | null>(null);
  const [resumeCritique, setResumeCritique] = useState<ResumeCritique | null>(null);
  const [learningGoal, setLearningGoal] = useState<string>('');

  const handleStartInterview = useCallback((profile: UserProfile) => {
    setUserProfile(profile);
    setFeedback(null);
    setView('INTERVIEW');
  }, []);

  const handleInterviewFinish = useCallback((finalFeedback: InterviewFeedback[]) => {
    setFeedback(finalFeedback);
    if (resumeCritique) {
      setView('COMBINED_REPORT');
    } else {
      setView('FEEDBACK');
    }
  }, [resumeCritique]);
  
  const handleResumeAnalyzed = useCallback((critique: ResumeCritique) => {
    setResumeCritique(critique);
  }, []);

  const handleCreateLearningPath = useCallback((goal: string) => {
    setLearningGoal(goal);
    setView('LEARNING_PATH');
  }, []);

  const handleRestart = useCallback(() => {
    setUserProfile(null);
    setFeedback(null);
    setResumeCritique(null);
    setLearningGoal('');
    setView('LANDING');
  }, []);
  
  const handleBackToDashboard = () => {
      setLearningGoal('');
      setView('DASHBOARD');
  }

  const renderView = () => {
    switch (view) {
      case 'LANDING':
        return <LandingPage onNavigate={setView} />;
      case 'DASHBOARD':
        return <Dashboard onNavigate={setView} />;
      case 'ONBOARDING':
        return <Onboarding onStart={handleStartInterview} />;
      case 'INTERVIEW':
        if (!userProfile) {
            setView('ONBOARDING');
            return null;
        }
        return <Interview userProfile={userProfile} onFinish={handleInterviewFinish} />;
      case 'FEEDBACK':
        if (!feedback || !userProfile) {
            setView('DASHBOARD');
            return null;
        }
        return <FeedbackReport feedback={feedback} userProfile={userProfile} onRestart={handleRestart} onNavigate={setView} />;
      case 'COMBINED_REPORT':
        if (!feedback || !resumeCritique || !userProfile) {
            setView('DASHBOARD');
            return null;
        }
        return <CombinedReport feedback={feedback} resumeCritique={resumeCritique} userProfile={userProfile} onRestart={handleRestart} onNavigate={setView} />;
      case 'RESUME_ANALYZER':
        return <ResumeAnalyzer onBack={() => setView('DASHBOARD')} onNavigate={setView} onAnalysisComplete={handleResumeAnalyzed} />;
      case 'ASSESSMENTS':
        return <Assessments onBack={() => setView('DASHBOARD')} onNavigate={setView} onCreateLearningPath={handleCreateLearningPath} />;
      case 'RESUME_TAILOR':
        return <ResumeTailor onBack={() => setView('DASHBOARD')} />;
      case 'LEARNING_PATH':
        return <LearningPath onBack={handleBackToDashboard} initialGoal={learningGoal} />;
      case 'RECRUITER_DASHBOARD':
        return <RecruiterDashboard onBack={() => setView('DASHBOARD')} />;
      case 'COACH_DASHBOARD':
        return <CoachDashboard onBack={() => setView('DASHBOARD')} />;
      case 'PRICING':
        return <PricingPage onBack={() => setView('DASHBOARD')} onNavigate={setView} />;
      case 'KPIS':
        return <KPIsDashboard onBack={() => setView('DASHBOARD')} />;
      case 'TESTING_PLAN':
        return <TestingPlan onBack={() => setView('DASHBOARD')} />;
      case 'ROADMAP':
        return <Roadmap onBack={() => setView('DASHBOARD')} />;
      case 'INFRASTRUCTURE':
        return <Infrastructure onBack={() => setView('DASHBOARD')} />;
      case 'PARTNERSHIPS':
        return <Partnerships onBack={() => setView('DASHBOARD')} />;
      case 'EDGE_CASES':
        return <EdgeCases onBack={() => setView('DASHBOARD')} />;
      case 'DELIVERABLES':
        return <Deliverables onBack={() => setView('DASHBOARD')} />;
      case 'ACCEPTANCE_CRITERIA':
        return <AcceptanceCriteria onBack={() => setView('DASHBOARD')} />;
      case 'MARKETING':
        return <MarketingLaunchPlan onBack={() => setView('DASHBOARD')} />;
      default:
        return <LandingPage onNavigate={setView} />;
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col items-center justify-center p-4 relative font-sans">
      <div className="absolute inset-0 bg-grid-gray-700/[0.2] [mask-image:linear-gradient(to_bottom,white_5%,transparent_90%)]"></div>
      <div className="w-full max-w-4xl mx-auto z-10">
        <div className="flex items-center justify-center space-x-3 mb-8 cursor-pointer" onClick={handleRestart}>
          <CareerAIIcon />
          <h1 className="text-3xl font-bold">CareerAI</h1>
        </div>
        {renderView()}
      </div>
    </div>
  );
};

export default App;
