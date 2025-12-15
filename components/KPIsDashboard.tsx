
import React from 'react';
import { View } from '../types';
import { ActivationIcon, EngagementIcon, ConversionIcon, MonetaryIcon, QualityIcon, RetentionIcon } from './icons';

interface KPIsDashboardProps {
  onBack: () => void;
}

const KpiCard: React.FC<{
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  period: string;
  icon: React.ReactNode;
}> = ({ title, value, change, isPositive, period, icon }) => (
    <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600 flex items-start space-x-4">
        <div className="bg-gray-800 p-3 rounded-lg text-blue-400">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-400">{title}</p>
            <p className="text-3xl font-bold text-white">{value}</p>
            <div className="flex items-center text-sm">
                <span className={`mr-2 font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {isPositive ? '↑' : '↓'} {change}
                </span>
                <span className="text-gray-500">{period}</span>
            </div>
        </div>
    </div>
);


const KPIsDashboard: React.FC<KPIsDashboardProps> = ({ onBack }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 w-full animate-fade-in space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-center mb-2 text-blue-300">KPIs & Success Metrics</h2>
        <p className="text-center text-gray-400">
          Monitoring the health and growth of the CareerAI platform.
        </p>
      </div>
      
      {/* Activation & Engagement */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Activation & Engagement</h3>
        <div className="grid md:grid-cols-3 gap-4">
            <KpiCard title="Activation Rate" value="68%" change="2.5%" isPositive={true} period="vs. last month" icon={<ActivationIcon />} />
            <KpiCard title="Avg. Sessions/User" value="4.2" change="0.3" isPositive={true} period="/ month" icon={<EngagementIcon />} />
            <KpiCard title="Avg. Time per Session" value="12 min" change="1.5 min" isPositive={true} period="vs. last month" icon={<EngagementIcon />} />
        </div>
      </div>

      {/* Conversion & Monetary */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Conversion & Monetary</h3>
        <div className="grid md:grid-cols-4 gap-4">
            <KpiCard title="Free → Paid Conversion" value="5.2%" change="0.8%" isPositive={true} period="this quarter" icon={<ConversionIcon />} />
            <KpiCard title="MRR" value="$15,280" change="$1.2k" isPositive={true} period="vs. last month" icon={<MonetaryIcon />} />
            <KpiCard title="ARPU" value="$24.50" change="$0.75" isPositive={true} period="this month" icon={<MonetaryIcon />} />
            <KpiCard title="CAC Payback" value="4 mos" change="0.5 mos" isPositive={false} period="avg. this year" icon={<MonetaryIcon />} />
        </div>
      </div>
      
      {/* Quality & Retention */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Quality & Retention</h3>
        <div className="grid md:grid-cols-4 gap-4">
            <KpiCard title="User NPS" value="52" change="3 pts" isPositive={true} period="this quarter" icon={<QualityIcon />} />
            <KpiCard title="7-Day Retention" value="45%" change="1.2%" isPositive={true} period="this month" icon={<RetentionIcon />} />
            <KpiCard title="30-Day Retention" value="28%" change="2.1%" isPositive={true} period="this month" icon={<RetentionIcon />} />
            <KpiCard title="Avg. Score Improvement" value="18%" change="0.5%" isPositive={true} period="after 3 sessions" icon={<QualityIcon />} />
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

export default KPIsDashboard;
