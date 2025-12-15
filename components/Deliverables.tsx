
import React from 'react';
import { ProductSpecIcon, WireframesIcon, QuestionBankIcon, TranscriptsIcon, AcceptanceCriteriaIcon, DownloadIcon } from './icons';

interface DeliverablesProps {
  onBack: () => void;
}

const DeliverableCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  description: string;
}> = ({ title, icon, description }) => (
  <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600 flex flex-col">
    <div className="flex items-center mb-4">
      <div className="bg-gray-800 p-3 rounded-lg text-blue-400 mr-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>
    <p className="text-gray-400 text-sm flex-grow mb-4">{description}</p>
    <button className="mt-auto bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-md transition-colors flex items-center justify-center text-sm">
        <DownloadIcon /> <span className="ml-2">Download Sample</span>
    </button>
  </div>
);

const Deliverables: React.FC<DeliverablesProps> = ({ onBack }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 w-full animate-fade-in space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-center mb-2 text-blue-300">Sample Deliverables</h2>
        <p className="text-center text-gray-400 max-w-3xl mx-auto">
          Key assets provided to engineering and design teams to ensure clear requirements and successful execution.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DeliverableCard
          title="Product Spec"
          icon={<ProductSpecIcon />}
          description="A comprehensive document detailing all features, user flows, business logic, and non-functional requirements for the platform."
        />
        <DeliverableCard
          title="UX Wireframes"
          icon={<WireframesIcon />}
          description="Visual blueprints for the main application flows, including onboarding, interview sessions, feedback scorecards, and resume review interfaces."
        />
        <DeliverableCard
          title="Question Bank CSV"
          icon={<QuestionBankIcon />}
          description="A structured dataset of interview questions, tagged by type (behavioral, technical), difficulty, and target role."
        />
        <DeliverableCard
          title="Example Transcripts"
          icon={<TranscriptsIcon />}
          description="A collection of good and bad sample answers used for training, calibrating, and testing the AI evaluation models."
        />
        <DeliverableCard
          title="Acceptance Criteria"
          icon={<AcceptanceCriteriaIcon />}
          description="A clear, testable set of pass/fail criteria for each feature, defining what 'done' means from a user perspective (e.g., 'User can complete interview and receive scorecard in <10s')."
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

export default Deliverables;
