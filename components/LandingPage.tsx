
import React from 'react';
import { View } from '../types';
import { CareerAIIcon, BotIcon, FeatureMockInterviewIcon, FeatureResumeIcon, FeatureSkillsIcon, FeatureVoiceTextIcon, StepUploadIcon, StepGoalsIcon, StepPracticeIcon, StepTrackIcon, StarIcon, CheckmarkIcon, TwitterIcon, LinkedInIcon } from './icons';

interface LandingPageProps {
  onNavigate: (view: View) => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; tags: string[] }> = ({ icon, title, description, tags }) => (
    <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 flex flex-col">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-400 w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-400 text-sm flex-grow mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
            {tags.map(tag => <span key={tag} className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">{tag}</span>)}
        </div>
    </div>
);

const Step: React.FC<{ num: string; icon: React.ReactNode; title: string; description: string; onClick: () => void; }> = ({ num, icon, title, description, onClick }) => (
    <div className="text-center cursor-pointer group" onClick={onClick}>
        <div className="relative inline-block mb-4 transition-transform group-hover:scale-110">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white">
                {icon}
            </div>
            <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gray-900 border-2 border-cyan-400 flex items-center justify-center font-bold text-cyan-400">{num}</span>
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-400 max-w-xs mx-auto">{description}</p>
    </div>
);

const TestimonialCard: React.FC<{ quote: string; name: string; role: string; img: string; }> = ({ quote, name, role, img }) => (
    <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
        <div className="flex text-yellow-400 mb-4">
            {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
        </div>
        <p className="text-gray-300 mb-4">"{quote}"</p>
        <div className="flex items-center">
            <img src={img} alt={name} className="w-12 h-12 rounded-full mr-4" />
            <div>
                <p className="font-semibold">{name}</p>
                <p className="text-sm text-gray-400">{role}</p>
            </div>
        </div>
    </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full text-white animate-fade-in overflow-x-hidden">
      <div className="w-full relative">
        <header className="absolute top-0 left-0 right-0 z-20">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <CareerAIIcon />
              <span className="text-2xl font-bold">CareerAI</span>
            </div>
            <div className="hidden md:flex items-center space-x-8 text-sm">
              <button onClick={() => onNavigate('ONBOARDING')} className="hover:text-cyan-300 transition-colors">Practice</button>
              <button onClick={() => onNavigate('ASSESSMENTS')} className="hover:text-cyan-300 transition-colors">Assessments</button>
              <button onClick={() => onNavigate('RESUME_ANALYZER')} className="hover:text-cyan-300 transition-colors">Resume</button>
              <button onClick={() => onNavigate('PRICING')} className="hover:text-cyan-300 transition-colors">Pricing</button>
              <button onClick={() => onNavigate('DASHBOARD')} className="hover:text-cyan-300 transition-colors">Dashboard</button>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-cyan-300 transition-colors text-sm">Sign In</a>
              <button 
                onClick={() => onNavigate('ONBOARDING')}
                className="bg-white text-gray-900 font-semibold py-2 px-5 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                Get Started
              </button>
            </div>
          </nav>
        </header>
        
        <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-32 pb-16">
          <div className="bg-gray-800/50 border border-gray-700 rounded-full px-4 py-1.5 text-sm mb-4 inline-block">
            AI-Powered Interview Coach
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl">
            Land Your Dream Job with <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">AI-Powered</span> Interview Practice
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mt-6 max-w-2xl">
            Practice interviews, assess your skills, optimize your resume, and get personalized feedback—all powered by advanced AI to help you succeed.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => onNavigate('ONBOARDING')}
              className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold py-3 px-8 rounded-lg text-lg hover:opacity-90 transition-opacity transform hover:scale-105"
            >
              Start Free Practice →
            </button>
            <button 
              onClick={() => scrollTo('how-it-works')}
              className="bg-transparent border-2 border-gray-600 text-white font-semibold py-3 px-8 rounded-lg text-lg hover:bg-gray-800 hover:border-gray-500 transition-colors transform hover:scale-105"
            >
              ▷ Try Demo
            </button>
          </div>
        </main>
      </div>

      <section className="container mx-auto px-6 py-16">
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-4 md:p-6 lg:p-8 shadow-2xl relative overflow-hidden">
            <div className="flex space-x-2 mb-4">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-2/3 space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0"><BotIcon/></div>
                        <div className="bg-gray-700 rounded-lg p-3 max-w-md">Tell me about a time you had to lead a team through a challenging project. How did you handle it?</div>
                    </div>
                    <div className="flex items-start gap-3 justify-end">
                         <div className="bg-blue-600 rounded-lg p-3 max-w-md">In my previous role, I led a cross-functional team of 8 to deliver a product launch...</div>
                         <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0 font-bold">JD</div>
                    </div>
                </div>
                <div className="w-full md:w-1/3 bg-gray-900/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-4">Live Feedback</h4>
                    <div className="space-y-4 text-sm">
                        <div>
                            <div className="flex justify-between mb-1"><span>STAR Method</span><span>92%</span></div>
                            <div className="w-full bg-gray-700 rounded-full h-2"><div className="bg-cyan-400 h-2 rounded-full" style={{width: '92%'}}></div></div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1"><span>Confidence</span><span>87%</span></div>
                            <div className="w-full bg-gray-700 rounded-full h-2"><div className="bg-cyan-400 h-2 rounded-full" style={{width: '87%'}}></div></div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1"><span>Clarity</span><span>95%</span></div>
                            <div className="w-full bg-gray-700 rounded-full h-2"><div className="bg-cyan-400 h-2 rounded-full" style={{width: '95%'}}></div></div>
                        </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-4">Great use of specific metrics! Consider adding more about the impact on your team.</p>
                </div>
            </div>
        </div>
      </section>

      <section id="features" className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8">
            <FeatureCard title="Realistic Mock Interviews" description="Role-specific simulations with immediate, explainable AI feedback. Practice behavioral, technical, and case study interviews tailored to your target position." tags={["Role-specific questions", "Instant feedback", "STAR analysis"]} icon={<FeatureMockInterviewIcon />} />
            <FeatureCard title="Automated Resume Critique" description="Get tailored improvement suggestions, ATS compatibility scores, and keyword optimization to make your resume stand out to recruiters." tags={["ATS optimization", "Keyword analysis", "Formatting tips"]} icon={<FeatureResumeIcon />}/>
            <FeatureCard title="Skill Assessments & Learning" description="Objective scoring across communication, problem-solving, and technical skills with personalized learning paths to close your skill gaps." tags={["Competency mapping", "Progress tracking", "Curated resources"]} icon={<FeatureSkillsIcon />} />
            <FeatureCard title="Voice & Text Modes" description="Practice spoken answers to build confidence, or use text mode for quick sessions. Analyze pace, filler words, and non-verbal communication cues." tags={["Voice recording", "Speech analysis", "Non-verbal cues"]} icon={<FeatureVoiceTextIcon />} />
        </div>
      </section>
      
      <section id="how-it-works" className="container mx-auto px-6 py-16 text-center scroll-mt-20">
        <div className="inline-block bg-gray-800/50 border border-gray-700 text-sm rounded-full px-4 py-1.5 mb-4">How It Works</div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Path to Interview Success</h2>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-12">Get started in minutes and begin improving your interview skills with our proven 4-step process.</p>
        <div className="grid md:grid-cols-4 gap-8">
            <Step num="01" icon={<StepUploadIcon />} title="Upload Your Resume" description="Start by uploading your resume. Our AI instantly analyzes it and identifies your strengths and areas for improvement." onClick={() => onNavigate('RESUME_ANALYZER')} />
            <Step num="02" icon={<StepGoalsIcon />} title="Set Your Goals" description="Tell us your target role, industry, and timeline. We'll create a personalized preparation plan just for you." onClick={() => onNavigate('ONBOARDING')} />
            <Step num="03" icon={<StepPracticeIcon />} title="Practice Interviews" description="Engage in realistic interview simulations with our AI. Choose voice or text mode for different types of interviews." onClick={() => onNavigate('ONBOARDING')} />
            <Step num="04" icon={<StepTrackIcon />} title="Track & Improve" description="Review detailed feedback, track your progress over time, and follow your personalized learning path to mastery." onClick={() => onNavigate('DASHBOARD')} />
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Loved by Thousands of Job Seekers</h2>
        <p className="text-lg text-gray-400 text-center max-w-3xl mx-auto mb-12">Join over 50,000+ professionals who have accelerated their careers with CareerAI.</p>
        <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard name="Sarah Chen" role="Software Engineer at InnoTech" quote="CareerAI transformed my interview prep. The AI feedback helped me identify patterns I wasn't aware of. Landed my dream job in 3 weeks!" img="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
            <TestimonialCard name="Michael Torres" role="Product Manager at Meta" quote="The voice interview practice was a game-changer. I felt so much more confident walking into my actual interviews after using this platform." img="https://i.pravatar.cc/150?u=a042581f4e29026704e" />
            <TestimonialCard name="Emily Watson" role="Data Scientist at QuantumLeap" quote="The personalized learning path helped me focus on exactly what I needed to improve. The resume optimizer alone was worth it!" img="https://i.pravatar.cc/150?u=a042581f4e29026704f" />
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 text-center bg-gray-800/50 border border-gray-700 rounded-2xl py-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Ace Your Next Interview?</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">Join thousands of job seekers who have transformed their interview skills and landed their dream jobs with CareerAI.</p>
            <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-2 text-gray-300 mb-8">
                <span className="flex items-center"><CheckmarkIcon/> <span className="ml-2">No credit card required</span></span>
                <span className="flex items-center"><CheckmarkIcon/> <span className="ml-2">5 free practice interviews</span></span>
                <span className="flex items-center"><CheckmarkIcon/> <span className="ml-2">Full resume analysis</span></span>
            </div>
            <button 
              onClick={() => onNavigate('ONBOARDING')}
              className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold py-3 px-8 rounded-lg text-lg hover:opacity-90 transition-opacity transform hover:scale-105"
            >
              Start Free Practice Now
            </button>
        </div>
      </section>

      <footer className="bg-gray-900/50 border-t border-gray-800">
        <div className="container mx-auto px-6 py-12">
            <div className="grid md:grid-cols-6 gap-8 text-sm">
                <div className="col-span-2">
                    <div className="flex items-center space-x-3 mb-4">
                        <CareerAIIcon />
                        <span className="text-xl font-bold">CareerAI</span>
                    </div>
                    <p className="text-gray-400">AI-powered interview preparation to help you land your dream job.</p>
                    <div className="flex space-x-4 mt-4 text-gray-400">
                        <a href="#" className="hover:text-white"><TwitterIcon /></a>
                        <a href="#" className="hover:text-white"><LinkedInIcon /></a>
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold mb-4">Product</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><button onClick={() => scrollTo('features')} className="hover:text-white">Features</button></li>
                        <li><button onClick={() => scrollTo('how-it-works')} className="hover:text-white">How It Works</button></li>
                        <li><a href="#" className="hover:text-white">Pricing</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-4">Company</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-white">About Us</a></li>
                        <li><a href="#" className="hover:text-white">Careers</a></li>
                        <li><a href="#" className="hover:text-white">Blog</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-4">Resources</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-white">Interview Tips</a></li>
                        <li><a href="#" className="hover:text-white">Resume Templates</a></li>
                        <li><a href="#" className="hover:text-white">Career Guides</a></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold mb-4">Legal</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                    </ul>
                </div>
            </div>
            <div className="mt-8 border-t border-gray-800 pt-6 flex justify-between items-center text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} CareerAI. All rights reserved.</p>
                <p>Made with ❤️ for job seekers everywhere</p>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
