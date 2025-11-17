import { GoogleGenAI, Type } from "@google/genai";
import type { ProjectIdea } from '../types';

const projectSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: 'A creative and descriptive project title' },
    description: { type: Type.STRING, description: 'A one-paragraph overview of the project, explaining its purpose and value.' },
    features: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'A list of 3-5 key features for the project.'
    },
    techStack: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING, description: 'e.g., Frontend, Backend, Database, Deployment' },
          technologies: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ['category', 'technologies']
      }
    },
    steps: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          step: { type: Type.INTEGER },
          title: { type: Type.STRING },
          details: { type: Type.STRING, description: 'Detailed instructions for this step.' }
        },
        required: ['step', 'title', 'details']
      }
    },
    challenges: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'A list of potential challenges or difficulties the engineer might face.'
    },
    resources: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          url: { type: Type.STRING }
        },
        required: ['name', 'url']
      }
    }
  },
  required: ['title', 'description', 'features', 'techStack', 'steps', 'challenges', 'resources']
};

export const generateProjectIdea = async (userInput: string): Promise<ProjectIdea> => {
  // Fix: Per coding guidelines, initialize GoogleGenAI directly with process.env.API_KEY.
  // This resolves the TypeScript error and aligns with API key handling rules.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Fix: Separated system instruction from user prompt for clarity and correctness.
  const systemInstruction = `You are an expert engineering mentor named 'Yantrakar'. Your role is to provide detailed, actionable, and comprehensive project blueprints for engineers based on their requirements. The output MUST be a single, valid JSON object that adheres to the provided schema. Do not include any text outside of the JSON object, including markdown tags like \`\`\`json.`;
  const contents = `The user's request is: "${userInput}"

Based on this request, generate a complete project plan.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: contents,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: projectSchema,
        temperature: 0.7,
      }
    });
    
    const jsonText = response.text.trim();
    const projectData: ProjectIdea = JSON.parse(jsonText);
    return projectData;
  } catch (error) {
    console.error("Error generating project idea:", error);
    throw new Error("Failed to get a valid response from the AI model. The service may be busy or the API key may be invalid.");
  }
};
