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
  // Fix: Adhere to guideline to use process.env.API_KEY. This also resolves the TypeScript error.
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    // Fix: Updated error message to be generic and to be caught by the UI handler.
    throw new Error("API Key is not configured");
  }

  const ai = new GoogleGenAI({ apiKey });

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
    // Check if the error is an instance of Error to access the message property safely
    if (error instanceof Error) {
        // Provide more specific feedback for common issues
        if (error.message.includes('API key not valid')) {
            // Fix: Refer to API_KEY instead of VITE_API_KEY.
            throw new Error('The provided API Key is invalid. Please check your API_KEY environment variable.');
        }
    }
    throw new Error("Failed to get a valid response from the AI model. The service may be busy or the API key may be invalid.");
  }
};