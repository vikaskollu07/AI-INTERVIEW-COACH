
import React from 'react';
import { CdnIcon, ApiIcon, InferenceIcon, DatabaseIcon, StorageIcon, CicdIcon, MonitoringIcon } from './icons';

interface InfrastructureProps {
  onBack: () => void;
}

const InfoCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  description: string;
  technologies: string[];
}> = ({ title, icon, description, technologies }) => (
  <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600 flex flex-col">
    <div className="flex items-center mb-4">
      <div className="bg-gray-800 p-3 rounded-lg text-blue-400 mr-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>
    <p className="text-gray-400 text-sm flex-grow mb-4">{description}</p>
    <div className="flex flex-wrap gap-2">
        {technologies.map(tech => <span key={tech} className="bg-gray-600 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">{tech}</span>)}
    </div>
  </div>
);


const Infrastructure: React.FC<InfrastructureProps> = ({ onBack }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 w-full animate-fade-in space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-center mb-2 text-blue-300">Deployment & Infrastructure</h2>
        <p className="text-center text-gray-400 max-w-3xl mx-auto">
          A high-level overview of the scalable, secure, and reliable infrastructure powering CareerAI.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InfoCard
          title="Frontend"
          icon={<CdnIcon />}
          description="The user interface is a modern React single-page application, served globally via a Content Delivery Network (CDN) for fast, low-latency access."
          technologies={["React", "TypeScript", "TailwindCSS", "Vercel/Netlify"]}
        />
        <InfoCard
          title="Backend"
          icon={<ApiIcon />}
          description="Stateless API microservices are containerized and deployed on a serverless platform, allowing for automatic scaling based on demand."
          technologies={["Docker", "Cloud Run / ECS", "Node.js", "REST API"]}
        />
         <InfoCard
          title="AI/Model Inference"
          icon={<InferenceIcon />}
          description="AI models are served from a separate, autoscaling inference cluster or managed endpoints to handle computational loads without affecting the core application."
          technologies={["Vertex AI", "SageMaker", "LLM APIs", "ASR APIs"]}
        />
        <InfoCard
          title="Metadata Storage"
          icon={<DatabaseIcon />}
          description="User data, session metadata, and application state are stored in a managed, relational database for reliability and data integrity."
          technologies={["PostgreSQL", "Managed DB", "Data Encryption"]}
        />
        <InfoCard
          title="Object Storage"
          icon={<StorageIcon />}
          description="Large files, such as voice recordings and user-uploaded resumes, are securely stored in a scalable object store."
          technologies={["AWS S3", "Google Cloud Storage", "Encrypted at Rest"]}
        />
        <InfoCard
          title="CI/CD Pipeline"
          icon={<CicdIcon />}
          description="A fully automated CI/CD pipeline ensures code quality and rapid, reliable deployments for tests, linting, building, and deploying."
          technologies={["GitHub Actions", "Automated Tests", "Zero-Downtime Deploy"]}
        />
        <InfoCard
          title="Monitoring & Logging"
          icon={<MonitoringIcon />}
          description="Comprehensive monitoring provides insights into application performance, with structured logging and real-time alerts for proactive issue resolution."
          technologies={["Structured Logs", "Dashboards", "Error Alerts"]}
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

export default Infrastructure;
