
import React, { useState } from 'react';
import { tailorResumeForATS } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import { TailoredResumeSuggestion } from '../types';

interface ResumeTailorProps {
  onBack: () => void;
}

const ResumeTailor: React.FC<ResumeTailorProps> = ({ onBack }) => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [suggestion, setSuggestion] = useState<TailoredResumeSuggestion | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      setError('Please provide both your resume and a job description.');
      return;
    }
    setError('');
    setIsLoading(true);
    setSuggestion(null);
    try {
      const result = await tailorResumeForATS(resumeText, jobDescription);
      setSuggestion(result);
    } catch (err) {
      setError('An error occurred while tailoring the resume. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 w-full animate-fade-in">
      <h2 className="text-3xl font-bold text-center mb-2 text-blue-300">ATS Resume Tailor</h2>
      <p className="text-center text-gray-400 mb-6">Optimize your resume for a specific job description to beat the bots.</p>

      {!suggestion && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="resumeText" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Resume
                </label>
                <textarea
                  id="resumeText"
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your resume content here..."
                  className="w-full h-64 bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none resize-y"
                />
              </div>
              <div>
                <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-300 mb-2">
                  Job Description
                </label>
                <textarea
                  id="jobDescription"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here..."
                  className="w-full h-64 bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none resize-y"
                />
              </div>
          </div>
          
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <div className="flex justify-between items-center pt-2">
            <button
                onClick={onBack}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
                Back to Dashboard
            </button>
            <button
              onClick={handleAnalyze}
              disabled={isLoading || !resumeText.trim() || !jobDescription.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 disabled:bg-gray-500"
            >
              {isLoading ? 'Tailoring...' : 'Tailor My Resume'}
            </button>
          </div>
        </div>
      )}

      {isLoading && <LoadingSpinner message="Optimizing your resume..." />}

      {suggestion && (
        <div className="space-y-6 animate-fade-in">
          <h3 className="text-2xl font-semibold text-center">Your Tailored Resume</h3>
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <h4 className="font-semibold text-lg text-blue-300 mb-2">Summary of Changes</h4>
            <p className="text-gray-300 whitespace-pre-wrap">{suggestion.explanation}</p>
          </div>
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <h4 className="font-semibold text-lg text-blue-300 mb-2">Optimized Resume Text</h4>
            <textarea
              readOnly
              value={suggestion.tailoredResume}
              className="w-full h-80 bg-gray-800 border border-gray-600 rounded-md px-4 py-2 text-white resize-y"
            />
            <button
              onClick={() => navigator.clipboard.writeText(suggestion.tailoredResume)}
              className="mt-2 bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
              Copy Text
            </button>
          </div>
          <div className="text-center mt-6">
            <button
              onClick={() => { setSuggestion(null); setResumeText(''); setJobDescription('')}}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
              Tailor Another Resume
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeTailor;
