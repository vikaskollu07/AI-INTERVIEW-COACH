
import React from 'react';
import { UniversityIcon, PartnershipIcon, CampaignIcon, ContentIcon } from './icons';

interface MarketingLaunchPlanProps {
  onBack: () => void;
}

const StrategyCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  description: string;
  details: string[];
}> = ({ title, icon, description, details }) => (
  <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600 flex flex-col">
    <div className="flex items-center mb-4">
      <div className="bg-gray-800 p-3 rounded-lg text-blue-400 mr-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>
    <p className="text-gray-400 text-sm flex-grow mb-4">{description}</p>
    <div>
      <h4 className="font-semibold text-gray-300 mb-2 text-sm">Key Actions:</h4>
      <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
        {details.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  </div>
);

const MarketingLaunchPlan: React.FC<MarketingLaunchPlanProps> = ({ onBack }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 w-full animate-fade-in space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-center mb-2 text-blue-300">Marketing Hooks & Launch Plan</h2>
        <p className="text-center text-gray-400 max-w-3xl mx-auto">
          A strategic plan to build momentum, attract our first users, and drive growth.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <StrategyCard
          title="Beta Program"
          icon={<UniversityIcon />}
          description="Engage with early adopters to gather feedback, refine the product, and build initial case studies."
          details={[
            "Partner with university career centers.",
            "Offer free premium access to coding bootcamps.",
            "Establish a direct feedback loop with beta users."
          ]}
        />
        <StrategyCard
          title="Partnerships"
          icon={<PartnershipIcon />}
          description="Leverage established communities to reach our target audience and build credibility."
          details={[
            "Offer exclusive discount codes to bootcamp students.",
            "Collaborate with career coaches and influencers.",
            "Integrate with job boards and career platforms."
          ]}
        />
        <StrategyCard
          title="Launch Campaign"
          icon={<CampaignIcon />}
          description="Create a compelling narrative and a clear call-to-action to drive initial user acquisition."
          details={[
            "Headline: “Practice 10 interviews in 10 days — improve your pass rate.”",
            "Launch on Product Hunt and other tech communities.",
            "Run targeted ads on platforms like LinkedIn."
          ]}
        />
        <StrategyCard
          title="Content Marketing"
          icon={<ContentIcon />}
          description="Provide valuable content to attract organic traffic and establish CareerAI as a thought leader in career prep."
          details={[
            "Publish blog posts on interview techniques.",
            "Create YouTube demos of mock interviews.",
            "Develop data-driven case studies showing user improvement."
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

export default MarketingLaunchPlan;
