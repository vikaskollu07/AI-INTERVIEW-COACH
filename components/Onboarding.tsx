
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { ArrowRightIcon, MicIcon, TextIcon } from './icons';

interface OnboardingProps {
  onStart: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onStart }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Entry-Level');
  const [interviewMode, setInterviewMode] = useState<'Text' | 'Voice'>('Text');
  const [industry, setIndustry] = useState('Technology');
  const [interviewType, setInterviewType] = useState<'Behavioral' | 'Technical' | 'Case Study'>('Behavioral');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (jobTitle.trim()) {
      onStart({ jobTitle, experienceLevel, interviewMode, industry, interviewType });
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 w-full animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-2 text-blue-300">Prepare for Your Interview</h2>
      <p className="text-center text-gray-400 mb-6">Let's tailor the experience to your career goals.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-300 mb-2">
              Target Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g., Senior Software Engineer"
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-300 mb-2">
              Experience Level
            </label>
            <select
              id="experienceLevel"
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option>Entry-Level</option>
              <option>Mid-Level</option>
              <option>Senior-Level</option>
              <option>Manager</option>
            </select>
          </div>
           <div>
            <label htmlFor="industry" className="block text-sm font-medium text-gray-300 mb-2">
              Industry
            </label>
            <select
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option>Technology</option>
              <option>Finance</option>
              <option>Healthcare</option>
              <option>Consulting</option>
              <option>Retail</option>
            </select>
          </div>
          <div>
            <label htmlFor="interviewType" className="block text-sm font-medium text-gray-300 mb-2">
              Interview Type
            </label>
            <select
              id="interviewType"
              value={interviewType}
              onChange={(e) => setInterviewType(e.target.value as any)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option>Behavioral</option>
              <option>Technical</option>
              <option>Case Study</option>
            </select>
          </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Interview Mode</label>
            <div className="grid grid-cols-2 gap-4">
                <button type="button" onClick={() => setInterviewMode('Text')} className={`flex items-center justify-center p-4 rounded-md border-2 transition-colors ${interviewMode === 'Text' ? 'bg-blue-600 border-blue-500' : 'bg-gray-700 border-gray-600 hover:bg-gray-600'}`}>
                    <TextIcon /> Text
                </button>
                <button type="button" onClick={() => setInterviewMode('Voice')} className={`flex items-center justify-center p-4 rounded-md border-2 transition-colors ${interviewMode === 'Voice' ? 'bg-blue-600 border-blue-500' : 'bg-gray-700 border-gray-600 hover:bg-gray-600'}`}>
                    <MicIcon className="h-5 w-5 mr-2"/> Voice
                </button>
            </div>
        </div>
        
        <button 
          type="submit"
          className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 disabled:bg-gray-500"
          disabled={!jobTitle.trim()}
        >
          Start Interview <ArrowRightIcon />
        </button>
      </form>
    </div>
  );
};

export default Onboarding;
