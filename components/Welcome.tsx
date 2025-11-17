
import React from 'react';

const examples = [
  "A personal finance dashboard using Plaid API",
  "A real-time chat application with WebSockets",
  "A machine learning model to classify images of flowers",
  "An e-commerce site for a custom t-shirt business"
];

export const Welcome: React.FC = () => {
  return (
    <div className="text-center max-w-2xl mx-auto p-8 bg-slate-800/30 border border-slate-700/50 rounded-lg">
      <h2 className="text-2xl font-bold text-slate-200">Welcome to Yantrakar</h2>
      <p className="mt-2 text-slate-400">
        Your AI partner for engineering project creation. Describe an idea, and I will generate a complete technical blueprint to bring it to life.
      </p>
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-sky-300">Try an example:</h3>
        <ul className="mt-3 space-y-2 text-slate-400">
          {examples.map((ex, i) => (
            <li key={i} className="font-roboto-mono text-sm">{ex}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
