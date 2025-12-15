
import React from 'react';
import { MvpIcon, VoiceIcon, LearningPathIcon, EnterpriseIcon, CheckCircleIcon } from './icons';

interface RoadmapProps {
  onBack: () => void;
}

const RoadmapItem: React.FC<{
  title: string;
  duration: string;
  icon: React.ReactNode;
  features: string[];
  isLast?: boolean;
}> = ({ title, duration, icon, features, isLast = false }) => (
  <div className="flex">
    <div className="flex flex-col items-center mr-4">
      <div>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600/50 text-blue-300 border-2 border-blue-500">
          {icon}
        </div>
      </div>
      {!isLast && <div className="w-px h-full bg-gray-600"></div>}
    </div>
    <div className="pb-8">
      <p className="mb-2 text-sm font-semibold text-blue-300">{duration}</p>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <ul className="space-y-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start">
            <CheckCircleIcon className="w-4 h-4 text-green-400 mr-2 mt-1 flex-shrink-0" />
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const Roadmap: React.FC<RoadmapProps> = ({ onBack }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 w-full animate-fade-in space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-center mb-2 text-blue-300">Product Roadmap</h2>
        <p className="text-center text-gray-400 max-w-3xl mx-auto">
          Our development plan from the initial MVP to scaling for the future.
        </p>
      </div>

      <div className="w-full max-w-3xl mx-auto">
        <RoadmapItem
          title="MVP Launch"
          duration="Weeks 0–4"
          icon={<MvpIcon />}
          features={[
            "Core text mock interviews",
            "Basic question bank & scoring",
            "Resume upload & basic critique",
            "Simple React UI & user authentication",
            "CI/CD pipeline and privacy opt-in"
          ]}
        />
        <RoadmapItem
          title="Voice & Reporting"
          duration="Weeks 5–8"
          icon={<VoiceIcon />}
          features={[
            "Voice mode with ASR (Automatic Speech Recognition)",
            "Enhanced scoring algorithms",
            "Shareable PDF reports",
            "Subscription billing integration"
          ]}
        />
        <RoadmapItem
          title="Expansion & Pro Features"
          duration="Weeks 9–12"
          icon={<LearningPathIcon />}
          features={[
            "Personalized learning path recommender",
            "Human coach booking system",
            "Analytics dashboard for user progress",
            "Initial recruiter portal offering"
          ]}
        />
        <RoadmapItem
          title="Scale & Growth"
          duration="Months 4–6"
          icon={<EnterpriseIcon />}
          features={[
            "Enterprise integrations (ATS, HRIS)",
            "Advanced speech analytics (intonation, pace)",
            "Multilingual support",
            "Dedicated mobile app development"
          ]}
          isLast={true}
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

export default Roadmap;
