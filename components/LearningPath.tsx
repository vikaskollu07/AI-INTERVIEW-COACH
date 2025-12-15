
import React, { useState, useEffect } from 'react';
import { generateLearningPath } from '../services/geminiService';
import { LearningResource } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface LearningPathProps {
  onBack: () => void;
  initialGoal?: string;
}

const LearningItem: React.FC<{ resource: LearningResource }> = ({ resource }) => (
  <div className="bg-gray-700/80 rounded-lg p-4 border border-gray-600 flex items-center justify-between transition-all animate-fade-in">
    <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center text-lg font-bold ${resource.type === 'Article' ? 'bg-green-500/20 text-green-300' : resource.type === 'Course' ? 'bg-purple-500/20 text-purple-300' : 'bg-blue-500/20 text-blue-300'}`}>
            {resource.type.slice(0,1)}
        </div>
        <div>
            <span className="text-xs text-gray-400">{resource.type}</span>
            <h4 className="font-semibold text-white">{resource.title}</h4>
            <p className="text-sm text-gray-400">{resource.description}</p>
        </div>
    </div>
    <button className="text-sm font-bold text-blue-400 hover:text-blue-300">Start</button>
  </div>
);

const LearningPath: React.FC<LearningPathProps> = ({ onBack, initialGoal = '' }) => {
  const [goal, setGoal] = useState(initialGoal);
  const [path, setPath] = useState<LearningResource[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGeneratePath = async (currentGoal: string) => {
    if (!currentGoal.trim()) {
      setError('Please enter a skill or goal.');
      return;
    }
    setError('');
    setIsLoading(true);
    setPath(null);
    try {
      const result = await generateLearningPath(currentGoal);
      setPath(result);
    } catch (err) {
      setError('An error occurred while generating the learning path. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialGoal) {
        handleGeneratePath(initialGoal);
    }
  }, [initialGoal]);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 w-full animate-fade-in">
      <h2 className="text-3xl font-bold text-center mb-2 text-blue-300">Your Personalized Learning Path</h2>
      <p className="text-center text-gray-400 mb-8">
        Tell us what you want to learn, and we'll generate a custom roadmap for you.
      </p>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="e.g., 'Become proficient in Python for data analysis'"
          className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          disabled={isLoading}
        />
        <button
          onClick={() => handleGeneratePath(goal)}
          disabled={isLoading || !goal.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition duration-300 disabled:bg-gray-500 w-full md:w-auto flex-shrink-0"
        >
          {isLoading ? 'Generating...' : 'Generate Path'}
        </button>
      </div>

      {error && <p className="text-red-400 text-center mb-4">{error}</p>}
      
      {isLoading && <LoadingSpinner message="Building your learning path..." />}

      {path && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-center mt-4">Your Roadmap to "{goal}"</h3>
          {path.map((item, index) => (
            <LearningItem key={index} resource={item} />
          ))}
        </div>
      )}
      
      {!path && !isLoading && (
        <div className="text-center text-gray-500 py-8">
            <p>Your generated learning path will appear here.</p>
        </div>
      )}

      <div className="text-center mt-8">
        <button
          onClick={onBack}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-md transition duration-300"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default LearningPath;
