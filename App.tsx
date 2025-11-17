
import React, { useState, useCallback } from 'react';
import type { ProjectIdea } from './types';
import { generateProjectIdea } from './services/geminiService';
import { Header } from './components/Header';
import { ProjectInput } from './components/ProjectInput';
import { ProjectDisplay } from './components/ProjectDisplay';
import { Loader } from './components/Loader';
import { Welcome } from './components/Welcome';

const App: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [projectIdea, setProjectIdea] = useState<ProjectIdea | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!userInput.trim()) {
      setError('Please describe your project idea.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setProjectIdea(null);

    try {
      const idea = await generateProjectIdea(userInput);
      setProjectIdea(idea);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [userInput]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 text-gray-200">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <Header />
        
        <main className="mt-8">
          <ProjectInput
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onSubmit={handleGenerate}
            isLoading={isLoading}
          />

          {error && (
            <div className="mt-6 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">
              <p>{error}</p>
            </div>
          )}

          <div className="mt-10">
            {isLoading && <Loader />}
            {!isLoading && !projectIdea && <Welcome />}
            {projectIdea && <ProjectDisplay idea={projectIdea} />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
