import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are BitcoinAI, an expert Bitcoin Core developer and blockchain data analyst. 
You are embedded in a Bitcoin node dashboard.
You can help debug RPC issues, explain log messages, and analyze network trends.
When the user provides logs, analyze them for warnings or errors.
Your tone should be professional, technical, yet helpful.
Always format code snippets clearly.
`;

export const sendMessageToGemini = async (
  history: ChatMessage[], 
  newMessage: string
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';

    // Construct the conversation history string for context
    // Ideally we would use the chat session feature, but for simple state management here, 
    // passing context in the prompt or maintaining a session object in the component is fine.
    // For this implementation, we will use a fresh generateContent call with history as context text for simplicity
    // or use the proper chat interface if we were keeping the session object alive.
    
    // Let's use the Chat API properly:
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "No response generated.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to Bitcoin AI. Please check your API key configuration.";
  }
};

export const analyzeLogEntry = async (logLine: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Analyze this Bitcoin Core log line and explain what it means in simple terms: "${logLine}"`,
            config: {
                systemInstruction: "You are a concise log analyzer. Explain technical Bitcoin Core logs in one sentence."
            }
        });
        return response.text || "Analysis failed.";
    } catch (e) {
        return "Could not analyze log.";
    }
}
