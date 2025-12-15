
import React from 'react';
import { BiasIcon, DisclaimerIcon, LegalIcon, AsrErrorIcon } from './icons';

interface EdgeCasesProps {
  onBack: () => void;
}

const RiskCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  description: string;
  mitigations: string[];
}> = ({ title, icon, description, mitigations }) => (
  <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600 flex flex-col">
    <div className="flex items-center mb-4">
      <div className="bg-gray-800 p-3 rounded-lg text-yellow-400 mr-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>
    <p className="text-gray-400 text-sm flex-grow mb-4">{description}</p>
    <div>
        <h4 className="font-semibold text-gray-300 mb-2 text-sm">Mitigation Strategies:</h4>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
            {mitigations.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
    </div>
  </div>
);

const EdgeCases: React.FC<EdgeCasesProps> = ({ onBack }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 w-full animate-fade-in space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-center mb-2 text-blue-300">Edge Cases & Risks</h2>
        <p className="text-center text-gray-400 max-w-3xl mx-auto">
          Proactively addressing potential challenges to ensure a fair, reliable, and responsible platform.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <RiskCard
          title="AI & Scoring Bias"
          icon={<BiasIcon />}
          description="Ensuring that AI scoring models do not unfairly penalize users based on accents, dialects, or cultural differences in communication styles."
          mitigations={[
            "Use human calibration with diverse evaluators to benchmark and adjust models.",
            "Continuously monitor for performance disparities across demographic groups.",
            "Incorporate fairness metrics into model training and evaluation.",
            "Provide transparent feedback on which specific criteria are being evaluated."
          ]}
        />
        <RiskCard
          title="Over-reliance on AI"
          icon={<DisclaimerIcon />}
          description="Managing user expectations and preventing them from treating AI feedback as infallible or a substitute for human judgment."
          mitigations={[
            "Display clear disclaimers that the AI is a tool, not a hiring manager.",
            "Actively encourage and integrate options for human coaching sessions.",
            "Frame feedback as 'suggestions' and 'areas to consider' rather than absolute truths.",
            "Provide context on the limitations of AI-driven analysis."
          ]}
        />
        <RiskCard
          title="Legal & Compliance"
          icon={<LegalIcon />}
          description="Avoiding legal risks by ensuring the platform does not offer employment guarantees or legal advice to users."
          mitigations={[
            "Include a clear Terms of Service stating no employment guarantees are made.",
            "Avoid making definitive statements like 'you will get the job'.",
            "Consult with legal counsel to ensure compliance with employment laws.",
            "Maintain strict data privacy and security standards (e.g., GDPR, CCPA)."
          ]}
        />
        <RiskCard
          title="ASR & Technical Errors"
          icon={<AsrErrorIcon />}
          description="Handling inaccuracies in Automatic Speech Recognition (ASR) or other technical failures gracefully to avoid user frustration."
          mitigations={[
            "Allow users to view and edit the transcript of their spoken answers before submission.",
            "Provide a prominent 're-record' option if the user misspeaks or the ASR fails.",
            "Offer a simple way to switch to text mode if voice input is problematic.",
            "Implement robust error handling and provide helpful user-facing error messages."
          ]}
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

export default EdgeCases;
