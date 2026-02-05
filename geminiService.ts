
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { BarberShop } from "../types";

const bookAppointmentFunction: FunctionDeclaration = {
  name: 'bookAppointment',
  parameters: {
    type: Type.OBJECT,
    description: 'Call this function to confirm and finalize the booking once the user provides a service and time.',
    properties: {
      serviceId: { type: Type.STRING, description: 'ID of the chosen service' },
      time: { type: Type.STRING, description: 'Requested time slot' },
      customerName: { type: Type.STRING, description: 'Name of the user' },
    },
    required: ['serviceId', 'time'],
  },
};

/**
 * AI Receptionist for a specific shop (Customer interaction)
 */
export const getAIReceptionistResponse = async (
  shop: BarberShop,
  message: string,
  history: { role: 'user' | 'model'; parts: { text: string }[] }[]
) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const systemInstruction = `
      You are the human receptionist for "${shop.name}". 
      Speak naturally like a local Indian shop helper in Hinglish or English.
      
      Shop Context:
      - Owner: ${shop.ownerName}
      - Services: ${shop.services.map(s => `${s.name} (₹${s.price}) [ID: ${s.id}]`).join(', ')}
      - Highlights: ${shop.highlights?.join('; ') || 'Premium grooming'}
      
      Your Goal:
      1. Get the user to choose a service and a time slot.
      2. Once they mention a service and a time, IMMEDIATELY call the "bookAppointment" tool.
      3. If they ask about prices, list them clearly.
      4. If they are undecided, suggest a "Master Cut" and "Tomorrow at 11 AM".
      5. BE CONCISE. Don't write long paragraphs.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction,
        tools: [{ functionDeclarations: [bookAppointmentFunction] }],
      },
    });

    return response;
  } catch (error) {
    console.error("Gemini AI Receptionist Error:", error);
    throw error;
  }
};

/**
 * General REPY Assistant for help with the app
 */
export const getGeneralAssistantResponse = async (
  userRole: 'CUSTOMER' | 'BARBER',
  message: string,
  history: { role: 'user' | 'model'; parts: { text: string }[] }[]
) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    let instruction = "";
    if (userRole === 'BARBER') {
      instruction = `
        You are the REPY Partner Assistant. You help barber shop owners manage their business.
        Focus on:
        - Automatic billing: REPY auto-detects payments via UPI deep-linking.
        - Trial: 30-day free trial.
        - Booking: AI Receptionist confirms slots automatically.
        Tone: Business-focused, fast, helpful.
      `;
    } else {
      instruction = `
        You are the REPY Help Assistant for customers.
        Help them find shops and explain that REPY AI can book slots for them automatically without phone calls.
      `;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: instruction,
      },
    });

    return response;
  } catch (error) {
    console.error("Gemini General Assistant Error:", error);
    throw error;
  }
};
