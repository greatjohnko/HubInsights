
import { GoogleGenAI } from "@google/genai";

export const getGeminiInsights = async (hubName: string, reviews: any[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  const reviewsText = reviews.map(r => r.content).join("\n");
  
  const prompt = `Analyze these student reviews for "${hubName}" tech hub and provide a brief 3-sentence summary of its key strengths and one area for improvement. 
  Reviews:
  ${reviewsText}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Insights currently unavailable. Please check back later.";
  }
};

export const getTopHubsInsight = async (region: string) => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const prompt = `Give me a list of top 3 tech hubs in ${region} for software engineering training based on industry reputation and placement. Format as a brief paragraph.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        return `Loading insights for ${region}...`;
    }
}
