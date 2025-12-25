
import { GoogleGenAI } from "@google/genai";
import { CrystalSearchResponse, GroundingSource, Locale } from "../types";

const API_KEY = process.env.API_KEY || "";

export const searchCrystalInfo = async (query: string, locale: Locale = 'en'): Promise<CrystalSearchResponse> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const languageInstruction =
    locale === 'zh-CN' ? 'Write the response in Simplified Chinese.' : 'Write the response in English.';

  const prompt = `
    Find and organize information about the crystal: "${query}". 
    Use the structure provided in guides like crystalyzeguide.com.
    Include:
    - Scientific properties (hardness, chemistry)
    - Colors and physical appearance
    - Healing properties and meanings
    - Associated Chakras, Elements, and Zodiac signs
    
    ${languageInstruction}
    Return the response in a clear, well-formatted Markdown structure.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const content = response.text || "No information found.";
    
    // Extract sources from grounding metadata
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: GroundingSource[] = groundingChunks
      .filter((chunk: any) => chunk.web)
      .map((chunk: any) => ({
        title: chunk.web.title,
        uri: chunk.web.uri,
      }));

    return { content, sources };
  } catch (error) {
    console.error("Gemini API Error:", error);
    if (locale === 'zh-CN') {
      throw new Error("获取水晶信息失败，请稍后重试。");
    }
    throw new Error("Failed to fetch crystal data. Please try again.");
  }
};

export const crawlSpecificSite = async (locale: Locale = 'en'): Promise<CrystalSearchResponse> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const languageInstruction =
    locale === 'zh-CN' ? 'Write the response in Simplified Chinese.' : 'Write the response in English.';

  const prompt = `
    Access and summarize the data from https://www.crystalyzeguide.com/types-of-crystals/.
    List the main crystal categories or a comprehensive list of crystal types mentioned there.
    Organize them with their primary spiritual benefits and colors.
    ${languageInstruction}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const content = response.text || "No site data available.";
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: GroundingSource[] = groundingChunks
      .filter((chunk: any) => chunk.web)
      .map((chunk: any) => ({
        title: chunk.web.title,
        uri: chunk.web.uri,
      }));

    return { content, sources };
  } catch (error) {
    console.error("Gemini API Error:", error);
    if (locale === 'zh-CN') {
      throw new Error("访问站点数据失败。");
    }
    throw new Error("Failed to access site data.");
  }
};
