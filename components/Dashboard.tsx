
import React, { useState } from 'react';
import { View } from '../types';
import { ArrowRightIcon, TailorIcon, LearningPathIcon, RecruiterIcon, CoachIcon, FeatureSkillsIcon, FeatureResumeIcon, SecurityIcon, DownloadIcon, StarIcon, FlameIcon } from './icons';

interface DashboardProps {
  onNavigate: (view: View) => void;
}

const StatCard: React.FC<{ value: string; label: string; }> = ({ value, label }) => (
    <div className="bg-gray-700/50 p-4 rounded-lg text-center">
        <p className="text-3xl font-bold text-blue-300">{value}</p>
        <p className="text-sm text-gray-400">{label}</p>
    </div>
);

const Toggle: React.FC<{ label: string; enabled: boolean; onToggle: () => void; }> = ({ label, enabled, onToggle }) => (
    <div className="flex items-center justify-between">
        <span className="font-semibold text-white">{label}</span>
        <button onClick={onToggle} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${enabled ? 'bg-blue-600' : 'bg-gray-600'}`}>
            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
    </div>
);

const StreakCard = () => (
    <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <div className="bg-orange-500/20 p-2 rounded-lg text-orange-400">
                    <FlameIcon />
                </div>
                <div>
                    <p className="font-semibold text-white">3 Day Streak!</p>
                    <p className="text-xs text-gray-400">Keep the momentum going!</p>
                </div>
            </div>
            <div>
                 <p className="text-sm text-gray-400 text-right mb-1">Weekly Goal</p>
                 <div className="flex items-center space-x-2">
                     <p className="text-white font-bold text-sm">3/5 Interviews</p>
                     <div className="w-24 bg-gray-600 rounded-full h-2">
                         <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                     </div>
                 </div>
            </div>
        </div>
    </div>
);


const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
    const [publicProfileEnabled, setPublicProfileEnabled] = useState(false);
    const [saveHistory, setSaveHistory] = useState(true);

    const handleDeleteData = () => {
        if (window.confirm("Are you sure you want to permanently delete all your data? This action cannot be undone.")) {
            // In a real app, this would trigger an API call to the backend.
            alert("Your data has been scheduled for deletion.");
            // Potentially log the user out or reset the app state here.
        }
    };

    const handleDownloadData = () => {
        // In a real app, this would fetch data from the backend.
        // Here, we simulate it with placeholder data.
        const userData = {
            profile: {
                name: "John Doe",
                targetRole: "Senior Software Engineer",
            },
            interviewHistory: [
                { date: "2024-07-15", score: 8.2, type: "Behavioral" },
                { date: "2024-07-12", score: 7.5, type: "Technical" },
            ],
            resumeCritiques: [
                { date: "2024-07-10", feedback: "Good, but add more metrics." }
            ],
            preferences: {
                saveHistory: saveHistory,
                publicProfile: publicProfileEnabled,
            }
        };

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(userData, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "careerai_my_data.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }
    
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 w-full animate-fade-in space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-center text-blue-300 mb-2">Welcome Back</h1>
        <p className="text-center text-gray-400">Here's your dashboard. Let's continue your journey.</p>
      </div>
      
      <StreakCard />

      {/* Progress Overview */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Progress Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard value="3" label="Interviews Completed" />
            <StatCard value="8.2" label="Avg. Overall Score" />
            <StatCard value="2" label="Skills Assessed" />
            <StatCard value="1" label="Resumes Analyzed" />
        </div>
      </div>
      
      {/* Main Action Card for Job Seekers */}
      <div 
        onClick={() => onNavigate('ONBOARDING')}
        className="bg-blue-600/50 hover:bg-blue-500/50 transition-all duration-300 rounded-lg p-6 cursor-pointer transform hover:scale-105 border border-blue-500"
      >
        <h2 className="text-2xl font-semibold text-white mb-2">Start a New Mock Interview</h2>
        <p className="text-blue-200 mb-4">Practice makes perfect. Let's do another round.</p>
        <span className="inline-flex items-center font-semibold text-white bg-blue-500/50 px-4 py-2 rounded-md">
          Start Now <ArrowRightIcon />
        </span>
      </div>

       {/* Upgrade to Pro Card */}
      <div 
        onClick={() => onNavigate('PRICING')}
        className="bg-gradient-to-r from-purple-600/50 to-blue-600/50 hover:from-purple-500/50 hover:to-blue-500/50 transition-all duration-300 rounded-lg p-6 cursor-pointer transform hover:scale-105 border border-purple-500 flex items-center justify-between"
      >
        <div>
            <h2 className="text-2xl font-semibold text-white mb-2 flex items-center"><StarIcon className="w-6 h-6 text-yellow-300 mr-2"/>Unlock Your Full Potential</h2>
            <p className="text-purple-200 mb-4">Go Pro for unlimited interviews, voice analysis, and advanced resume tools.</p>
        </div>
        <span className="inline-flex items-center font-semibold text-white bg-purple-500/50 px-4 py-2 rounded-md">
          Upgrade Now <ArrowRightIcon />
        </span>
      </div>


      {/* Grid for all user tools */}
      <div className="grid md:grid-cols-2 gap-6">
        <div onClick={() => onNavigate('RESUME_ANALYZER')} className="bg-gray-700/50 hover:bg-gray-600/50 p-4 rounded-lg cursor-pointer transition-colors flex items-center space-x-3"><FeatureResumeIcon /> <span className="font-semibold">Resume Tools</span></div>
        <div onClick={() => onNavigate('ASSESSMENTS')} className="bg-gray-700/50 hover:bg-gray-600/50 p-4 rounded-lg cursor-pointer transition-colors flex items-center space-x-3"><FeatureSkillsIcon /> <span className="font-semibold">Skill Assessments</span></div>
        <div onClick={() => onNavigate('LEARNING_PATH')} className="bg-gray-700/50 hover:bg-gray-600/50 p-4 rounded-lg cursor-pointer transition-colors flex items-center space-x-3"><LearningPathIcon /> <span className="font-semibold">Learning Path</span></div>
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <Toggle label="Public Profile" enabled={publicProfileEnabled} onToggle={() => setPublicProfileEnabled(!publicProfileEnabled)} />
          <p className="text-xs text-gray-400 mt-2">Enable to make your profile and scores visible to recruiters.</p>
        </div>
      </div>
      
       {/* Settings & Privacy Section */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center"><SecurityIcon /> <span className="ml-2">Settings & Privacy</span></h3>
        <div className="bg-gray-700/50 rounded-lg p-4 space-y-4">
            <div>
                <Toggle label="Save Session History" enabled={saveHistory} onToggle={() => setSaveHistory(!saveHistory)} />
                <p className="text-xs text-gray-400 mt-2">
                    {saveHistory 
                        ? "Your interview transcripts and feedback are saved to track progress. Disable for ephemeral sessions." 
                        : "Your sessions are now ephemeral and will not be saved. Enable to track your progress."
                    }
                </p>
            </div>
             <div className="border-t border-gray-600/50 pt-4">
                <h4 className="font-semibold text-white mb-2">Data Management</h4>
                <div className="flex flex-col md:flex-row gap-4">
                    <button 
                        onClick={handleDownloadData}
                        className="flex-1 flex items-center justify-center bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                    >
                        <DownloadIcon /> <span className="ml-2">Download My Data</span>
                    </button>
                    <button 
                        onClick={handleDeleteData}
                        className="flex-1 bg-red-600/50 hover:bg-red-500/50 border border-red-500 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                    >
                        Delete All My Data
                    </button>
                </div>
                 <p className="text-xs text-gray-400 mt-2">Download a copy of your data or permanently delete your account and all associated information.</p>
            </div>
        </div>
      </div>

      {/* Section for Professional Users */}
      <div>
        <h3 className="text-lg font-semibold text-center text-gray-400 mb-4 border-t border-gray-700 pt-6">For Professionals</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div onClick={() => onNavigate('RECRUITER_DASHBOARD')} className="bg-gray-700/50 hover:bg-gray-600/50 p-4 rounded-lg cursor-pointer transition-colors flex items-center space-x-3">
            <RecruiterIcon />
            <span className="font-semibold">Recruiter Portal</span>
          </div>
          <div onClick={() => onNavigate('COACH_DASHBOARD')} className="bg-gray-700/50 hover:bg-gray-600/50 p-4 rounded-lg cursor-pointer transition-colors flex items-center space-x-3">
            <CoachIcon />
            <span className="font-semibold">Coach & Bootcamp Portal</span>
          </div>
        </div>
      </div>
      <footer className="text-center text-xs text-gray-500 pt-4 border-t border-gray-700 flex flex-wrap justify-center gap-x-4 gap-y-2">
        <button onClick={() => onNavigate('KPIS')} className="hover:text-gray-400 transition-colors">
          KPI & Success Metrics (Admin)
        </button>
        <button onClick={() => onNavigate('TESTING_PLAN')} className="hover:text-gray-400 transition-colors">
          Product & QA Plan (Admin)
        </button>
         <button onClick={() => onNavigate('ROADMAP')} className="hover:text-gray-400 transition-colors">
          Product Roadmap (Admin)
        </button>
        <button onClick={() => onNavigate('INFRASTRUCTURE')} className="hover:text-gray-400 transition-colors">
          Deployment & Infra (Admin)
        </button>
        <button onClick={() => onNavigate('PARTNERSHIPS')} className="hover:text-gray-400 transition-colors">
          Partnerships & Integrations (Admin)
        </button>
        <button onClick={() => onNavigate('EDGE_CASES')} className="hover:text-gray-400 transition-colors">
          Edge Cases & Risks (Admin)
        </button>
        <button onClick={() => onNavigate('DELIVERABLES')} className="hover:text-gray-400 transition-colors">
          Sample Deliverables (Admin)
        </button>
        <button onClick={() => onNavigate('ACCEPTANCE_CRITERIA')} className="hover:text-gray-400 transition-colors">
          Acceptance Criteria (Admin)
        </button>
        <button onClick={() => onNavigate('MARKETING')} className="hover:text-gray-400 transition-colors">
          Marketing & Launch (Admin)
        </button>
      </footer>
    </div>
  );
};

export default Dashboard;
