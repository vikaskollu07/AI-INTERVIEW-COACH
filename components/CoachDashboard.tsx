
import React from 'react';

interface CoachDashboardProps {
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

const CoachDashboard: React.FC<CoachDashboardProps> = ({ onBack }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 w-full animate-fade-in">
      <h2 className="text-3xl font-bold text-center mb-2 text-blue-300">Coach & Bootcamp Dashboard</h2>
      <p className="text-center text-gray-400 mb-8">
        Scale your coaching services and provide data-driven feedback to your clients.
      </p>

      <div className="space-y-6">
        <FeatureComingSoon 
            title="Review Client AI Reports"
            description="Access detailed performance reports from your clients' AI interview sessions."
        />
        <FeatureComingSoon 
            title="Manage 1:1 Bookings"
            description="Integrate your calendar to schedule and manage paid coaching sessions."
        />
        <FeatureComingSoon 
            title="Shareable Learning Paths"
            description="Create and assign custom learning paths for your clients to follow."
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

export default CoachDashboard;
