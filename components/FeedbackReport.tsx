
import React, { useState, useEffect } from 'react';
import { InterviewFeedback, UserProfile, View } from '../types';
import { generatePassLikelihood, generateExampleAnswer } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import { LightbulbIcon, CoachIcon, ThumbsUpIcon, WrenchIcon } from './icons';

interface FeedbackReportProps {
  feedback: InterviewFeedback[];
  userProfile: UserProfile;
  onRestart: () => void;
  onNavigate: (view: View) => void;
}

const ScoreCircle: React.FC<{ score: number, label: string }> = ({ score, label }) => {
    const isPercentage = label.includes('%');
    const displayValue = isPercentage ? score.toFixed(0) : score.toFixed(1);
    const color = score >= (isPercentage ? 75 : 8) ? 'text-green-400' : score >= (isPercentage ? 50 : 5) ? 'text-yellow-400' : 'text-red-400';
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (score / (isPercentage ? 100 : 10)) * circumference;

    return (
        <div className="flex flex-col items-center text-center">
            <svg className="w-24 h-24 transform -rotate-90">
                <circle className="text-gray-700" strokeWidth="8" stroke="currentColor" fill="transparent" r="45" cx="48" cy="48" />
                <circle className={color} strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" stroke="currentColor" fill="transparent" r="45" cx="48" cy="48" />
            </svg>
            <span className={`-mt-16 text-2xl font-bold ${color}`}>{displayValue}{isPercentage ? '%' : ''}</span>
            <p className="mt-12 text-sm text-gray-400">{label}</p>
        </div>
    );
};

const AudioPlayerMockup: React.FC = () => (
    <div className="bg-gray-800/50 p-3 rounded-lg flex items-center space-x-3 mt-3 border border-gray-700">
        <button className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0" aria-label="Play audio">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-0.5"><path d="M8 5v14l11-7z"/></svg>
        </button>
        <div className="w-full h-8 bg-transparent flex items-center space-x-px px-1 overflow-hidden">
            {[...Array(50)].map((_, i) => (
                <div key={i} className="bg-blue-400/50 rounded-full w-1 flex-shrink-0" style={{ height: `${10 + Math.random() * 80}%` }}></div>
            ))}
        </div>
        <span className="text-xs text-gray-400 font-mono">0:28</span>
    </div>
);


const FeedbackReport: React.FC<FeedbackReportProps> = ({ feedback, userProfile, onRestart, onNavigate }) => {
  const [passLikelihood, setPassLikelihood] = useState<{ likelihood: number, rationale: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [exampleAnswers, setExampleAnswers] = useState<{ [index: number]: string }>({});
  const [loadingExample, setLoadingExample] = useState<number | null>(null);
  const [expandedImprovements, setExpandedImprovements] = useState<{ [index: number]: boolean }>({});

  const avgStarScore = feedback.reduce((sum, f) => sum + f.feedback.starScore, 0) / feedback.length;
  const avgContentScore = feedback.reduce((sum, f) => sum + f.feedback.contentScore, 0) / feedback.length;
  const avgClarityScore = feedback.reduce((sum, f) => sum + f.feedback.clarityScore, 0) / feedback.length;
  const avgConfidenceScore = feedback.reduce((sum, f) => sum + f.feedback.confidenceScore, 0) / feedback.length;
  const overallScore = (avgStarScore + avgContentScore + avgClarityScore + avgConfidenceScore) / 4;

  useEffect(() => {
    const getLikelihood = async () => {
        setIsLoading(true);
        const result = await generatePassLikelihood(overallScore);
        setPassLikelihood(result);
        setIsLoading(false);
    };
    getLikelihood();
  }, [overallScore]);

  const handleShowExample = async (index: number, question: string) => {
    if (exampleAnswers[index]) return;
    setLoadingExample(index);
    try {
        const answer = await generateExampleAnswer(question, userProfile);
        setExampleAnswers(prev => ({ ...prev, [index]: answer }));
    } catch (error) {
        console.error("Failed to load example answer", error);
        setExampleAnswers(prev => ({ ...prev, [index]: "Could not load example answer." }));
    } finally {
        setLoadingExample(null);
    }
  };


  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 w-full animate-fade-in printable-report">
      <h2 className="text-3xl font-bold text-center mb-2 text-blue-300">Interview Feedback</h2>
      <p className="text-center text-gray-400 mb-8">
        For your {userProfile.interviewType} interview as a {userProfile.experienceLevel} {userProfile.jobTitle}.
      </p>

      <div className="bg-gray-700/50 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-center mb-6">Overall Performance</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <ScoreCircle score={overallScore} label="Overall Score" />
            <ScoreCircle score={avgStarScore} label="STAR Structure" />
            <ScoreCircle score={avgContentScore} label="Content Quality" />
            <ScoreCircle score={avgClarityScore} label="Clarity" />
            <ScoreCircle score={avgConfidenceScore} label="Confidence" />
             {isLoading ? <div className="w-24 h-24 flex items-center justify-center"><LoadingSpinner message=''/></div> : passLikelihood && <ScoreCircle score={passLikelihood.likelihood} label="Pass Likelihood %" />}
        </div>
        {!isLoading && passLikelihood && <p className="text-center text-sm text-gray-400 mt-4">{passLikelihood.rationale}</p>}
      </div>
      
      <div className="space-y-6">
        <h3 className="text-xl font-semibold mb-2">Detailed Breakdown</h3>
        {feedback.map((item, index) => (
          <div key={index} className="bg-gray-700/50 p-4 rounded-lg">
            <p className="font-semibold text-gray-300 mb-2">Q: {item.question}</p>
            <p className="text-sm text-gray-400 italic bg-gray-800/50 p-3 rounded-md mb-3">Your Answer: "{item.answer}"</p>
            
            {userProfile.interviewMode === 'Voice' && <AudioPlayerMockup />}
            
            <div className="grid md:grid-cols-2 gap-4 mt-3">
                <div>
                    <h4 className="font-semibold text-green-400 mb-2 flex items-center"><ThumbsUpIcon /> <span className="ml-2">Strengths</span></h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                        {item.feedback.strengths.map((s, i) => <li key={`s-${i}`}>{s}</li>)}
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold text-yellow-400 mb-2 flex items-center"><WrenchIcon /> <span className="ml-2">Areas for Improvement</span></h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                         {item.feedback.improvements
                            .slice(0, expandedImprovements[index] ? item.feedback.improvements.length : 3)
                            .map((imp, i) => <li key={`imp-${i}`}>{imp}</li>)}
                    </ul>
                     {item.feedback.improvements.length > 3 && (
                      <button 
                        onClick={() => setExpandedImprovements(prev => ({...prev, [index]: !prev[index]}))} 
                        className="text-xs text-blue-400 hover:text-blue-300 mt-2 font-semibold"
                      >
                          {expandedImprovements[index] ? 'Show Less' : `Show ${item.feedback.improvements.length - 3} More...`}
                      </button>
                    )}
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-600/50">
                {loadingExample === index ? (
                     <LoadingSpinner message="Generating example..."/>
                ) : exampleAnswers[index] ? (
                    <div>
                        <h5 className="font-semibold text-sm text-blue-300 mb-2 flex items-center"><LightbulbIcon /> <span className="ml-2">Example Answer</span></h5>
                        <p className="text-sm text-gray-300 bg-gray-800/50 p-3 rounded-md whitespace-pre-wrap">{exampleAnswers[index]}</p>
                    </div>
                ) : (
                    <button onClick={() => handleShowExample(index, item.question)} className="text-sm font-semibold text-blue-400 hover:text-blue-300 flex items-center transition-colors">
                        <LightbulbIcon /> <span className="ml-2">Show Example Answer</span>
                    </button>
                )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-8 no-print flex justify-center flex-wrap gap-4">
        <button
          onClick={() => onNavigate('ONBOARDING')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition duration-300"
        >
          Try Again
        </button>
         <button
          onClick={() => onNavigate('PRICING')}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-md transition duration-300 flex items-center"
        >
          <CoachIcon /> <span className="ml-2">Book a Human Coach</span>
        </button>
        <button
          onClick={() => window.print()}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-md transition duration-300"
        >
          Share Report
        </button>
      </div>
    </div>
  );
};

export default FeedbackReport;
