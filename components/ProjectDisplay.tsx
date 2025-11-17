
import React from 'react';
import type { ProjectIdea, TechStackItem, Step, Resource } from '../types';

interface ProjectDisplayProps {
  idea: ProjectIdea;
}

const Section: React.FC<{ title: string; icon?: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <section className="mb-10 bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 shadow-lg">
    <h2 className="flex items-center text-2xl font-bold text-sky-300 mb-4">
      {icon && <span className="mr-3">{icon}</span>}
      {title}
    </h2>
    {children}
  </section>
);

export const ProjectDisplay: React.FC<ProjectDisplayProps> = ({ idea }) => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-teal-300">{idea.title}</h1>
        <p className="mt-4 text-lg text-slate-300">{idea.description}</p>
      </header>
      
      <Section title="Key Features" icon={<ListIcon />}>
        <ul className="list-disc list-inside space-y-2 text-slate-300">
          {idea.features.map((feature, index) => <li key={index}>{feature}</li>)}
        </ul>
      </Section>
      
      <Section title="Recommended Tech Stack" icon={<ChipIcon />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {idea.techStack.map((stack, index) => (
            <div key={index} className="bg-slate-700/40 p-4 rounded-md">
              <h3 className="font-semibold text-teal-300">{stack.category}</h3>
              <ul className="mt-2 text-sm text-slate-300 font-roboto-mono">
                {stack.technologies.map((tech, i) => <li key={i}>{tech}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Step-by-Step Guide" icon={<ClipboardListIcon />}>
        <ol className="relative border-l border-slate-600 ml-4">
          {idea.steps.map((step) => (
            <li key={step.step} className="mb-8 ml-8">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-sky-800 rounded-full -left-4 ring-4 ring-slate-800 text-sky-300 font-bold">
                {step.step}
              </span>
              <h3 className="font-semibold text-lg text-teal-300">{step.title}</h3>
              <p className="mt-1 text-slate-300">{step.details}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Potential Challenges" icon={<AlertTriangleIcon />}>
        <ul className="list-disc list-inside space-y-2 text-slate-300">
          {idea.challenges.map((challenge, index) => <li key={index}>{challenge}</li>)}
        </ul>
      </Section>

      <Section title="Learning Resources" icon={<BookOpenIcon />}>
        <div className="space-y-3">
          {idea.resources.map((resource, index) => (
            <a 
              key={index} 
              href={resource.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center p-3 bg-slate-700/40 rounded-md hover:bg-slate-700/80 transition-colors"
            >
              <span className="text-sky-400 mr-3"><LinkIcon /></span>
              <span className="text-slate-200">{resource.name}</span>
            </a>
          ))}
        </div>
      </Section>
    </div>
  );
};


// SVG Icons (defined in the same file for simplicity)
const ListIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>;
const ChipIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3M5.636 5.636l1.414 1.414m10.607 10.607l-1.414-1.414M19.071 5.636l-1.414 1.414M5.636 19.071l1.414-1.414M12 18a6 6 0 100-12 6 6 0 000 12z" /></svg>;
const ClipboardListIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
const AlertTriangleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const BookOpenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
const LinkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>;
