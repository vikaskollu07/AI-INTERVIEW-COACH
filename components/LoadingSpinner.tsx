
import React from 'react';

const LoadingSpinner: React.FC<{ message?: string }> = ({ message = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center space-y-4 p-8">
    <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"></div>
    <p className="text-lg text-gray-300">{message}</p>
  </div>
);

export default LoadingSpinner;
