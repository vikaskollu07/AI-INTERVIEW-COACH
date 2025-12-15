
import React from 'react';
import { InterviewFeedback, ResumeCritique, UserProfile, View } from '../types';
import { CoachIcon, ThumbsUpIcon, WrenchIcon } from './icons';

interface CombinedReportProps {
  feedback: InterviewFeedback[];
  resumeCritique: ResumeCritique;
  userProfile: UserProfile;
  onRestart: () => void;
  onNavigate: (view: View) => void;
}

const ScoreCircle: React.FC<{ score: number, label: string }> = ({ score, label }) => {
    const displayValue = score.toFixed(1);
    const color = score >= 8 ? 'text-green-400' : score >= 5 ? 'text-yellow-400' : 'text-red-400';
    const circumference = 2 * Math.PI * 35;
    const offset = circumference - (score / 10) * circumference;

    return (
        <div className="flex flex-col items-center text-center">
            <svg className="w-20 h-20 transform -rotate-90">
                <circle className="text-gray-700" strokeWidth="6" stroke="currentColor" fill="transparent" r="35" cx="40" cy="40" />
                <circle className={color} strokeWidth="6" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" stroke="currentColor" fill="transparent" r="35" cx="40" cy="40" />
            </svg>
            <span className={`-mt-12 text-xl font-bold ${color}`}>{displayValue}</span>
            <p className="mt-10 text-xs text-gray-400">{label}</p>
        </div>
    );
};

const CombinedReport: React.FC<CombinedReportProps> = ({ feedback, resumeCritique, userProfile, onRestart, onNavigate }) => {
  const avgStarScore = feedback.reduce((sum, f) => sum + f.feedback.starScore, 0) / feedback.length;
  const avgContentScore = feedback.reduce((sum, f) => sum + f.feedback.contentScore, 0) / feedback.length;
  const avgClarityScore = feedback.reduce((sum, f) => sum + f.feedback.clarityScore, 0) / feedback.length;
  const avgConfidenceScore = feedback.reduce((sum, f) => sum + f.feedback.confidenceScore, 0) / feedback.length;
  const overallScore = (avgStarScore + avgContentScore + avgClarityScore + avgConfidenceScore) / 4;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 w-full animate-fade-in printable-report">
      <h2 className="text-3xl font-bold text-center mb-2 text-blue-300">Combined Feedback Report</h2>
      <p className="text-center text-gray-400 mb-8">
        For your {userProfile.experienceLevel} {userProfile.jobTitle} application.
      </p>
      
      {/* Interview Feedback Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">Interview Performance</h3>
        <div className="bg-gray-700/50 rounded-lg p-6 mb-6">
            <div className="flex justify-around items-center flex-wrap gap-4">
                <ScoreCircle score={overallScore} label="Overall" />
                <ScoreCircle score={avgStarScore} label="STAR" />
                <ScoreCircle score={avgContentScore} label="Content" />
                <ScoreCircle score={avgClarityScore} label="Clarity" />
                <ScoreCircle score={avgConfidenceScore} label="Confidence" />
            </div>
        </div>
        <div className="space-y-4">
            {feedback.map((item, index) => (
              <div key={`interview-${index}`} className="bg-gray-700/50 p-4 rounded-lg">
                <p className="font-semibold text-gray-300 mb-3">Feedback for: "{item.question}"</p>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-semibold text-green-400 mb-2 flex items-center text-sm"><ThumbsUpIcon /> <span className="ml-2">Strengths</span></h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                            {item.feedback.strengths.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-semibold text-yellow-400 mb-2 flex items-center text-sm"><WrenchIcon /> <span className="ml-2">Improvements</span></h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                            {item.feedback.improvements.map((imp, i) => <li key={i}>{imp}</li>)}
                        </ul>
                    </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      
      {/* Resume Critique Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">Resume Critique</h3>
         <div className="space-y-4">
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <h4 className="font-semibold text-lg text-blue-300 mb-2">Missing Keywords</h4>
            <ul className="flex flex-wrap gap-2">
              {resumeCritique.missingKeywords.map((keyword, i) => (
                <li key={`keyword-${i}`} className="bg-yellow-400/20 text-yellow-300 text-xs font-medium px-2.5 py-0.5 rounded-full list-none">{keyword}</li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <h4 className="font-semibold text-lg text-blue-300 mb-2">Quantification & Impact</h4>
            <p className="text-gray-300">{resumeCritique.quantificationFeedback}</p>
          </div>
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <h4 className="font-semibold text-lg text-blue-300 mb-2">Formatting & Clarity</h4>
            <p className="text-gray-300">{resumeCritique.formattingFeedback}</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 no-print flex justify-center flex-wrap gap-4">
        <button
          onClick={() => onNavigate('ONBOARDING')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition duration-300"
        >
          Practice Again
        </button>
         <button
          onClick={() => onNavigate('COACH_DASHBOARD')}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-md transition duration-300 flex items-center"
        >
          <CoachIcon /> <span className="ml-2">Book a Coach</span>
        </button>
        <button
          onClick={onRestart}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-md transition duration-300"
        >
          New Session
        </button>
      </div>
    </div>
  );
};

export default CombinedReport;
