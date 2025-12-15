
import React, { useState } from 'react';
import { critiqueResume } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import { ResumeCritique, View } from '../types';

interface ResumeAnalyzerProps {
  onBack: () => void;
  onNavigate: (view: View) => void;
  onAnalysisComplete: (critique: ResumeCritique) => void;
}

const ResumeAnalyzer: React.FC<ResumeAnalyzerProps> = ({ onBack, onNavigate, onAnalysisComplete }) => {
  const [resumeText, setResumeText] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [critique, setCritique] = useState<ResumeCritique | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!resumeText.trim() || !targetRole.trim()) {
      setError('Please provide both resume text and a target role.');
      return;
    }
    setError('');
    setIsLoading(true);
    setCritique(null);
    try {
      const result = await critiqueResume(resumeText, targetRole);
      setCritique(result);
      onAnalysisComplete(result);
    } catch (err) {
      setError('An error occurred while analyzing the resume. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 w-full animate-fade-in">
      <h2 className="text-3xl font-bold text-center mb-2 text-blue-300">Resume Analyzer</h2>
      <p className="text-center text-gray-400 mb-6">Get instant feedback to tailor your resume for your dream job.</p>

      {!critique && (
        <div className="space-y-4">
          <div>
            <label htmlFor="targetRole" className="block text-sm font-medium text-gray-300 mb-2">
              Target Job Title
            </label>
            <input
              type="text"
              id="targetRole"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g., Data Scientist"
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="resumeText" className="block text-sm font-medium text-gray-300 mb-2">
              Paste Your Resume
            </label>
            <textarea
              id="resumeText"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume content here..."
              className="w-full h-64 bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none resize-y"
            />
          </div>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <div className="flex justify-between items-center">
            <button
                onClick={onBack}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
                Back to Dashboard
            </button>
            <button
              onClick={handleAnalyze}
              disabled={isLoading || !resumeText.trim() || !targetRole.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 disabled:bg-gray-500"
            >
              {isLoading ? 'Analyzing...' : 'Analyze Resume'}
            </button>
          </div>
        </div>
      )}

      {isLoading && <LoadingSpinner message="Analyzing your resume..." />}

      {critique && (
        <div className="space-y-6 animate-fade-in">
          <h3 className="text-2xl font-semibold text-center">Your Feedback</h3>
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <h4 className="font-semibold text-lg text-blue-300 mb-2">Missing Keywords</h4>
            <ul className="flex flex-wrap gap-2">
              {critique.missingKeywords.map((keyword, i) => (
                <li key={i} className="bg-yellow-400/20 text-yellow-300 text-xs font-medium px-2.5 py-0.5 rounded-full">{keyword}</li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <h4 className="font-semibold text-lg text-blue-300 mb-2">Quantification & Impact</h4>
            <p className="text-gray-300">{critique.quantificationFeedback}</p>
          </div>
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <h4 className="font-semibold text-lg text-blue-300 mb-2">Formatting & Clarity</h4>
            <p className="text-gray-300">{critique.formattingFeedback}</p>
          </div>
          <div className="text-center mt-6 flex justify-center flex-wrap gap-4">
            <button
              onClick={() => { setCritique(null); setResumeText(''); setTargetRole('')}}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
              Analyze Another
            </button>
            <button
              onClick={() => onNavigate('ONBOARDING')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
              Practice Interview Based on Feedback
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;
