
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-sky-400">
        Yantrakar
      </h1>
      <p className="mt-2 text-lg md:text-xl text-slate-400">
        AI-Powered Project Blueprints for Engineers
      </p>
    </header>
  );
};
