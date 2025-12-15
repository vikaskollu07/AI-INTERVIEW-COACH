
import React from 'react';

interface RecruiterDashboardProps {
  onBack: () => void;
}

const FeatureComingSoon: React.FC<{ title: string; description: string; }> = ({ title, description }) => (
  <div className="bg-gray-700/80 rounded-lg p-6 border border-gray-600 relative overflow-hidden">
    <h3 className="text-xl font-semibold text-white">{title}</h3>
    <p className="text-gray-400 mt-2">{description}</p>
    <div className="absolute top-2 right-2 bg-yellow-500 text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full">
      Coming Soon
    </div>
  </div>
);


const RecruiterDashboard: React.FC<RecruiterDashboardProps> = ({ onBack }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 w-full animate-fade-in">
      <h2 className="text-3xl font-bold text-center mb-2 text-blue-300">Recruiter Dashboard</h2>
      <p className="text-center text-gray-400 mb-8">
        Streamline your preliminary screening process with AI-powered assessments.
      </p>

      <div className="space-y-6">
        <FeatureComingSoon 
            title="Bulk Candidate Assessments"
            description="Send standardized interview assessments to multiple candidates at once."
        />
        <FeatureComingSoon 
            title="Generate Invite Links"
            description="Create unique, shareable links for candidates to complete an AI interview."
        />
        <FeatureComingSoon 
            title="Candidate Analytics"
            description="Compare candidate performance with objective scores and detailed reports."
        />
      </div>

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

export default RecruiterDashboard;
