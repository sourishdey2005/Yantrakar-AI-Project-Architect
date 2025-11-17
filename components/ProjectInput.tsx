
import React from 'react';

interface ProjectInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const ProjectInput: React.FC<ProjectInputProps> = ({ value, onChange, onSubmit, isLoading }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      onSubmit();
    }
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <textarea
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          placeholder="Describe your dream project... e.g., 'a fitness tracker app with social features' or 'an IOT plant watering system'"
          className="w-full h-32 p-4 pr-32 bg-slate-800/50 border border-slate-700 rounded-lg text-gray-200 placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow duration-300 resize-none"
          disabled={isLoading}
        />
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="absolute top-1/2 right-4 -translate-y-1/2 px-6 py-2 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100"
        >
          {isLoading ? 'Creating...' : 'Generate'}
        </button>
      </div>
      <p className="text-center text-sm text-slate-500 mt-2">Press Ctrl+Enter or Cmd+Enter to submit</p>
    </div>
  );
};
