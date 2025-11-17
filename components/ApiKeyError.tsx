import React from 'react';

export const ApiKeyError: React.FC = () => {
  return (
    <div className="mt-6 bg-amber-900/50 border border-amber-700 text-amber-200 px-6 py-5 rounded-lg text-left max-w-3xl mx-auto">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-6 w-6 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-bold text-amber-300">API Key Configuration Required</h3>
          <div className="mt-2 text-sm text-amber-200 space-y-2">
            <p>This application requires a Google Gemini API key to function. The key is missing or not configured correctly in your project settings.</p>
            <p className="font-semibold">To resolve this, please follow these steps:</p>
            <ol className="list-decimal list-inside space-y-1 pl-2 font-roboto-mono">
              <li>Go to your project's deployment settings (e.g., on Vercel, Netlify, etc.).</li>
              <li>Find the "Environment Variables" section.</li>
              {/* Fix: Use API_KEY instead of VITE_API_KEY */}
              <li>Create a new variable with the exact name: <code className="bg-slate-700 px-1.5 py-0.5 rounded-md text-sky-300">API_KEY</code></li>
              <li>Set its value to your Google Gemini API key.</li>
              <li>Redeploy your application for the changes to take effect.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};