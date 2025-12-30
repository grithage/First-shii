
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function chatWithShopper(userMessage: string, products: Product[]) {
  const productContext = products.map(p => 
    `${p.name} ($${p.price}): ${p.description} [ID: ${p.id}]`
  ).join('\n');

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User: ${userMessage}`,
      config: {
        systemInstruction: `You are the GRITBUYS AI Personal Shopper. Your tone is rugged, helpful, and direct. 
        You recommend products from the GRITBUYS catalog based on user needs.
        Here is our current catalog:
        ${productContext}
        
        Rules:
        1. Only recommend products from the list above.
        2. Keep responses concise but "gritty".
        3. If a user asks for something we don't have, recommend the closest alternative or explain why they might need a specific piece of gear we DO have.`,
      }
    });

    return response.text || "I'm having trouble connecting to the base camp. Try again, soldier.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The signal is weak. Check your connection.";
  }
}
