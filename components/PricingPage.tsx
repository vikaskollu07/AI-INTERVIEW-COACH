
import React, { useState } from 'react';
import { View } from '../types';
import { CheckCircleIcon, CoachIcon, RecruiterIcon } from './icons';

interface PricingPageProps {
  onBack: () => void;
  onNavigate: (view: View) => void;
}

const PricingCard: React.FC<{
  plan: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isFeatured?: boolean;
}> = ({ plan, price, period, description, features, isFeatured = false }) => (
  <div className={`rounded-xl p-8 border ${isFeatured ? 'bg-blue-600/20 border-blue-500' : 'bg-gray-700/50 border-gray-600'}`}>
    {isFeatured && <div className="text-center mb-4"><span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</span></div>}
    <h3 className="text-2xl font-bold text-center">{plan}</h3>
    <p className="text-center text-gray-400 mt-2">{description}</p>
    <div className="text-center my-6">
      <span className="text-5xl font-extrabold">{price}</span>
      <span className="text-gray-400">{period}</span>
    </div>
    <button className={`w-full font-bold py-3 rounded-lg transition-colors ${isFeatured ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-600 hover:bg-gray-500 text-white'}`}>
      {plan === 'Free' ? 'Current Plan' : 'Get Started'}
    </button>
    <ul className="mt-6 space-y-3">
      {features.map((feature, i) => (
        <li key={i} className="flex items-center">
          <CheckCircleIcon className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
          <span className="text-gray-300">{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

const PricingPage: React.FC<PricingPageProps> = ({ onBack, onNavigate }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 w-full animate-fade-in space-y-12">
      <div>
        <h2 className="text-4xl font-bold text-center text-blue-300">Choose Your Plan</h2>
        <p className="text-center text-gray-400 mt-4 max-w-2xl mx-auto">
          Whether you're just starting out or aiming for the top, we have a plan that fits your career goals.
        </p>
      </div>

      <div className="flex justify-center items-center space-x-4">
        <span className={billingCycle === 'monthly' ? 'font-semibold' : 'text-gray-400'}>Monthly</span>
        <button onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors bg-gray-600`}>
          <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
        <span className={billingCycle === 'annual' ? 'font-semibold' : 'text-gray-400'}>Annual</span>
        <span className="bg-yellow-400/20 text-yellow-300 text-xs font-medium px-2.5 py-1 rounded-full">Save 20%</span>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <PricingCard
          plan="Free"
          price="$0"
          period="/ month"
          description="For casual practice and getting started."
          features={[
            "5 Text-based mock interviews per month",
            "Basic resume critique",
            "1 Skill assessment per month",
            "Limited question bank"
          ]}
        />
        <PricingCard
          plan="Pro"
          price={billingCycle === 'monthly' ? "$29" : "$23"}
          period={billingCycle === 'monthly' ? "/ month" : "/ month"}
          description="Unlock your full potential and land your dream job faster."
          features={[
            "Unlimited text & voice interviews",
            "Advanced voice analysis (pace, filler words)",
            "Unlimited resume reviews & tailoring",
            "Unlimited skill assessments",
            "Personalized learning paths",
            "Full question bank access"
          ]}
          isFeatured={true}
        />
        <PricingCard
          plan="Enterprise"
          price="Custom"
          period=""
          description="For teams, bootcamps, and recruiters."
          features={[
            "All Pro features",
            "Bulk candidate assessments",
            "Analytics and reporting dashboard",
            "Custom branding",
            "Dedicated support"
          ]}
        />
      </div>

      <div className="border-t border-gray-700 pt-10">
        <h3 className="text-2xl font-bold text-center text-blue-300">Additional Services</h3>
        <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="bg-gray-700/50 rounded-lg p-6 flex items-center space-x-4">
                <CoachIcon />
                <div>
                    <h4 className="text-xl font-semibold">1:1 Human Coaching</h4>
                    <p className="text-gray-400 text-sm mt-1">Book a pay-per-session meeting with a certified career coach for expert guidance.</p>
                    <button onClick={() => onNavigate('COACH_DASHBOARD')} className="text-blue-400 font-semibold mt-2 text-sm hover:text-blue-300">Learn More →</button>
                </div>
            </div>
             <div className="bg-gray-700/50 rounded-lg p-6 flex items-center space-x-4">
                <RecruiterIcon />
                <div>
                    <h4 className="text-xl font-semibold">Affiliate Courses</h4>
                    <p className="text-gray-400 text-sm mt-1">Explore recommended courses from our partners to master new skills. (Affiliate links)</p>
                     <button onClick={() => onNavigate('LEARNING_PATH')} className="text-blue-400 font-semibold mt-2 text-sm hover:text-blue-300">Explore Courses →</button>
                </div>
            </div>
        </div>
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

export default PricingPage;
