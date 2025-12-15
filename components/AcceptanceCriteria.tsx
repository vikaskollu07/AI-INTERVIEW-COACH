
import React from 'react';
import { ScorecardSpeedIcon, ParsingAccuracyIcon, WordErrorRateIcon, PdfExportIcon, CheckCircleIcon } from './icons';

interface AcceptanceCriteriaProps {
  onBack: () => void;
}

const CriteriaItem: React.FC<{
  icon: React.ReactNode;
  text: string;
}> = ({ icon, text }) => (
    <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600 flex items-center justify-between">
        <div className="flex items-center space-x-4">
            <div className="bg-gray-800 p-3 rounded-lg text-blue-400 flex-shrink-0">
                {icon}
            </div>
            <p className="text-gray-300">{text}</p>
        </div>
        <div className="bg-green-500/20 text-green-300 text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1.5">
            <CheckCircleIcon className="w-4 h-4" />
            <span>PASS</span>
        </div>
    </div>
);

const AcceptanceCriteria: React.FC<AcceptanceCriteriaProps> = ({ onBack }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 w-full animate-fade-in space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-center mb-2 text-blue-300">Example Acceptance Criteria (MVP)</h2>
        <p className="text-center text-gray-400 max-w-3xl mx-auto">
          These are the specific, measurable, and testable requirements that define when a core feature of the Minimum Viable Product is considered complete and successful.
        </p>
      </div>

      <div className="space-y-4">
        <CriteriaItem
          icon={<ScorecardSpeedIcon />}
          text="User can complete a 5-question text interview and receive a scorecard within 10 seconds of submitting the final answer."
        />
        <CriteriaItem
          icon={<ParsingAccuracyIcon />}
          text="Resume upload correctly parses key fields (name, education, skills) with ≥90% accuracy across a standardized set of test resumes."
        />
        <CriteriaItem
          icon={<WordErrorRateIcon />}
          text="Voice interview produces a transcript with a Word Error Rate (WER) of ≤10% on clean speech samples from our test dataset."
        />
        <CriteriaItem
          icon={<PdfExportIcon />}
          text="Users can successfully export their final interview scorecard as a properly formatted PDF file that is ready for sharing."
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

export default AcceptanceCriteria;
