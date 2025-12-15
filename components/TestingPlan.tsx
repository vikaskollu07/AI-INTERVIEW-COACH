
import React from 'react';
import { UnitTestsIcon, HumanEvalIcon, ABTestIcon, SecurityIcon } from './icons';

interface TestingPlanProps {
  onBack: () => void;
}

const TestPlanItem: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
}> = ({ title, description, icon, details }) => (
  <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600 flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
    <div className="bg-gray-800 p-4 rounded-lg text-blue-400 flex-shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="text-gray-400 mt-1 mb-3">{description}</p>
      <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
        {details.map((detail, i) => (
          <li key={i}>{detail}</li>
        ))}
      </ul>
    </div>
  </div>
);

const TestingPlan: React.FC<TestingPlanProps> = ({ onBack }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 w-full animate-fade-in space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-center mb-2 text-blue-300">Testing Plan (Product & QA)</h2>
        <p className="text-center text-gray-400 max-w-3xl mx-auto">
          Ensuring the quality, reliability, and fairness of CareerAI through a multi-faceted testing strategy.
        </p>
      </div>

      <div className="space-y-6">
        <TestPlanItem
          title="Unit & Integration Testing"
          description="Verify the correctness of individual components and their interactions."
          icon={<UnitTestsIcon />}
          details={[
            "Test resume parsing accuracy with a diverse set of sample resumes.",
            "Validate scoring rules for consistency and expected outcomes.",
            "Evaluate ASR (Automatic Speech Recognition) accuracy using a library of test audio clips.",
            "Ensure seamless data flow between frontend, backend, and AI services."
          ]}
        />
        <TestPlanItem
          title="Human Evaluation & Calibration"
          description="Benchmark AI performance against human experts to ensure fairness and accuracy."
          icon={<HumanEvalIcon />}
          details={[
            "Recruit 50 real interviewers and career coaches to rate AI-generated scores.",
            "Analyze and calibrate scoring algorithms to reduce bias (e.g., against non-native accents).",
            "Continuously review a sample of sessions to identify edge cases and areas for improvement.",
            "Gather qualitative feedback from human evaluators on the helpfulness of AI suggestions."
          ]}
        />
        <TestPlanItem
          title="A/B Testing"
          description="Experiment with different features and user experiences to optimize learning outcomes."
          icon={<ABTestIcon />}
          details={[
            "Test different feedback styles (e.g., concise vs. verbose) to measure user engagement.",
            "Experiment with various question difficulties in the adaptive engine.",
            "Analyze the impact of different UI/UX flows on user retention and conversion rates.",
            "Measure the effectiveness of different learning path recommendations."
          ]}
        />
        <TestPlanItem
          title="Security Audits"
          description="Proactively identify and address potential security vulnerabilities."
          icon={<SecurityIcon />}
          details={[
            "Conduct regular penetration tests for data flows and storage.",
            "Audit for compliance with privacy regulations like GDPR and CCPA.",
            "Implement a sensitive data filter to prevent collection of PII.",
            "Review access control policies for user data, especially for coach and recruiter portals."
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

export default TestingPlan;
