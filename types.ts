
export interface TechStackItem {
  category: string;
  technologies: string[];
}

export interface Step {
  step: number;
  title: string;
  details: string;
}

export interface Resource {
  name: string;
  url: string;
}

export interface ProjectIdea {
  title: string;
  description: string;
  features: string[];
  techStack: TechStackItem[];
  steps: Step[];
  challenges: string[];
  resources: Resource[];
}
