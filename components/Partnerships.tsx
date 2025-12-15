
import React from 'react';
import { AsrIcon, LlmIcon, ResumeParsingIcon, PaymentsIcon, SsoIcon } from './icons';

interface PartnershipsProps {
  onBack: () => void;
}

const PartnershipCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  description: string;
  providers: string[];
}> = ({ title, icon, description, providers }) => (
  <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600 flex flex-col">
    <div className="flex items-center mb-4">
      <div className="bg-gray-800 p-3 rounded-lg text-blue-400 mr-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>
    <p className="text-gray-400 text-sm flex-grow mb-4">{description}</p>
    <div className="flex flex-wrap gap-2">
        {providers.map(tech => <span key={tech} className="bg-gray-600 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">{tech}</span>)}
    </div>
  </div>
);

const Partnerships: React.FC<PartnershipsProps> = ({ onBack }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 w-full animate-fade-in space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-center mb-2 text-blue-300">Partnerships & Integrations</h2>
        <p className="text-center text-gray-400 max-w-3xl mx-auto">
          Leveraging best-in-class third-party services to deliver a powerful and seamless user experience.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PartnershipCard
          title="ASR Providers"
          icon={<AsrIcon />}
          description="High-accuracy Automatic Speech Recognition engines convert spoken answers into text for analysis in voice-based interviews."
          providers={["Google Speech-to-Text", "Whisper Variants", "Commercial ASRs"]}
        />
        <PartnershipCard
          title="LLM & Text APIs"
          icon={<LlmIcon />}
          description="Foundation models for generating questions, evaluating answers, summarizing feedback, and providing resume critiques."
          providers={["Google Gemini API", "Embedding Models", "Summarization APIs"]}
        />
        <PartnershipCard
          title="Resume Parsing"
          icon={<ResumeParsingIcon />}
          description="Specialized services to extract structured data from resume files, enabling detailed analysis and ATS compatibility checks."
          providers={["Affinda", "Sovren", "In-house NLP"]}
        />
        <PartnershipCard
          title="Payment Processing"
          icon={<PaymentsIcon />}
          description="Secure and reliable payment gateway for managing user subscriptions and one-time bookings for coaching sessions."
          providers={["Stripe API"]}
        />
        <PartnershipCard
          title="SSO Providers"
          icon={<SsoIcon />}
          description="Enable easy and secure user sign-up and login through trusted third-party identity providers, simplifying the onboarding process."
          providers={["Google OAuth", "LinkedIn OAuth"]}
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

export default Partnerships;
