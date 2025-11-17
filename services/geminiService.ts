
import { GoogleGenAI, Type } from "@google/genai";
import type { ProjectIdea } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

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
  const prompt = `
    You are an expert engineering mentor named 'Yantrakar'. Your role is to provide detailed, actionable, and comprehensive project blueprints for engineers based on their requirements.

    The user's request is: "${userInput}"

    Based on this request, generate a complete project plan. The output MUST be a single, valid JSON object that adheres to the provided schema. Do not include any text outside of the JSON object, including markdown tags like \`\`\`json.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
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
    throw new Error("Failed to get a valid response from the AI model.");
  }
};
