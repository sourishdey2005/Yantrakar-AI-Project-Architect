
import React from 'react';

export const Loader: React.FC = () => (
  <div className="flex flex-col items-center justify-center text-center p-8">
    <div className="w-12 h-12 border-4 border-t-sky-400 border-r-sky-400 border-b-sky-400 border-l-slate-600 rounded-full animate-spin"></div>
    <p className="mt-4 text-slate-400">Architecting your blueprint...</p>
    <p className="text-sm text-slate-500">This may take a moment.</p>
  </div>
);
