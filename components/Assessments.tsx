
import React, { useState } from 'react';
import { AssessmentCommunicationIcon, AssessmentProblemSolvingIcon, AssessmentTechnicalIcon } from './icons';
import { generateAssessmentQuestion } from '../services/geminiService';
import { AssessmentQuestion, View } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface AssessmentsProps {
  onBack: () => void;
  onNavigate: (view: View) => void;
  onCreateLearningPath: (skill: string) => void;
}

type AssessmentState = 'selection' | 'taking' | 'result';

const AssessmentCard: React.FC<{ icon: React.ReactNode; title: string; description: string; onSelect: () => void; }> = ({ icon, title, description, onSelect }) => (
  <div onClick={onSelect} className="bg-gray-700/80 rounded-lg p-6 border border-gray-600 hover:border-blue-500 cursor-pointer transition-all transform hover:scale-105">
    <div className="flex items-center space-x-4">
      <div className="bg-gray-800 p-3 rounded-lg text-blue-400">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  </div>
);

const Assessments: React.FC<AssessmentsProps> = ({ onBack, onNavigate, onCreateLearningPath }) => {
  const [state, setState] = useState<AssessmentState>('selection');
  const [currentSkill, setCurrentSkill] = useState('');
  const [question, setQuestion] = useState<AssessmentQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSelectSkill = async (skill: string) => {
    setCurrentSkill(skill);
    setIsLoading(true);
    setState('taking');
    setError('');
    try {
      const q = await generateAssessmentQuestion(skill);
      setQuestion(q);
    } catch (err) {
      setError('Failed to load assessment question. Please try again.');
      setState('selection');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || !question) return;
    const correct = selectedOption === question.correctOptionIndex;
    setIsCorrect(correct);
    setState('result');
  };

  const resetAssessment = () => {
    setState('selection');
    setCurrentSkill('');
    setQuestion(null);
    setSelectedOption(null);
    setIsCorrect(null);
    setError('');
  };

  const renderSelection = () => (
    <>
      <h2 className="text-3xl font-bold text-center mb-2 text-blue-300">Skill Assessments</h2>
      <p className="text-center text-gray-400 mb-8">
        Identify your strengths and weaknesses with targeted assessments.
      </p>
      {error && <p className="text-red-400 text-center mb-4">{error}</p>}
      <div className="space-y-6">
        <AssessmentCard 
            icon={<AssessmentCommunicationIcon />} 
            title="Communication Skills"
            description="Evaluate your ability to articulate ideas clearly and concisely."
            onSelect={() => handleSelectSkill('Communication')}
        />
        <AssessmentCard 
            icon={<AssessmentProblemSolvingIcon />} 
            title="Problem-Solving & Logic"
            description="Test your analytical thinking with logic puzzles and case prompts."
            onSelect={() => handleSelectSkill('Problem-Solving')}
        />
        <AssessmentCard 
            icon={<AssessmentTechnicalIcon />} 
            title="Technical Skills (SQL)"
            description="Assess your knowledge with practical, role-specific coding snippets."
            onSelect={() => handleSelectSkill('SQL')}
        />
      </div>
      <div className="text-center mt-8">
        <button onClick={onBack} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-md transition duration-300">
          Back to Dashboard
        </button>
      </div>
    </>
  );

  const renderTaking = () => {
    if (isLoading || !question) return <LoadingSpinner message={`Generating ${currentSkill} question...`} />;

    return (
      <div>
        <h3 className="text-2xl font-bold text-center text-blue-300 mb-4">{currentSkill} Assessment</h3>
        <p className="text-lg text-gray-300 mb-6">{question.question}</p>
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedOption(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${selectedOption === index ? 'bg-blue-600 border-blue-500' : 'bg-gray-700 border-gray-600 hover:bg-gray-600'}`}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="text-center mt-8">
          <button onClick={handleSubmitAnswer} disabled={selectedOption === null} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition duration-300 disabled:bg-gray-500">
            Submit Answer
          </button>
        </div>
      </div>
    );
  };
  
  const renderResult = () => {
    if (!question) return null;
    const resultColor = isCorrect ? 'text-green-400 border-green-500' : 'text-red-400 border-red-500';
    const resultBg = isCorrect ? 'bg-green-500/10' : 'bg-red-500/10';
    return (
      <div className="text-center">
        <h3 className={`text-3xl font-bold mb-4 ${resultColor}`}>
          {isCorrect ? 'Correct!' : 'Incorrect'}
        </h3>
        <div className={`p-6 rounded-lg border ${resultColor} ${resultBg} mb-6`}>
            <p className="font-semibold text-white mb-2">Explanation:</p>
            <p className="text-gray-300">{question.explanation}</p>
        </div>
        <div className="flex justify-center flex-wrap gap-4">
            <button onClick={resetAssessment} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-md transition duration-300">
                Try Another
            </button>
            {!isCorrect && (
                 <button onClick={() => onCreateLearningPath(`Improve my ${currentSkill} skills`)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition duration-300">
                    Create Learning Path
                </button>
            )}
            <button onClick={onBack} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-md transition duration-300">
                Back to Dashboard
            </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 w-full animate-fade-in">
      {state === 'selection' && renderSelection()}
      {state === 'taking' && renderTaking()}
      {state === 'result' && renderResult()}
    </div>
  );
};

export default Assessments;
