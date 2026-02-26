import { GoogleGenAI } from "@google/genai";
import { DashboardData } from "../types";

export const generateHealthReport = async (data: DashboardData): Promise<string> => {
  // ⚠️ 安全性問題：API Key 不應該暴露在前端程式碼中
  // 這裡僅作為 Demo 使用，正式環境應透過後端 proxy 呼叫 API
  const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : undefined;

  if (!apiKey) {
    return "未找到 API 金鑰。請設定環境變數。";
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const prompt = `
      你是一位專精於阿茲海默症追蹤的醫療助手。
      請分析以下病患數據，並提供一段簡潔、充滿同理心的 3 句摘要，說明目前狀況並提供一個具體建議。
      請使用繁體中文（Traditional Chinese）回答。
      
      數據：
      - 認知分數趨勢 (MoCA): ${JSON.stringify(data.cognitive_trend)}
      - 睡眠趨勢 (小時): ${JSON.stringify(data.sleep_trend)}
      - 預估風險 (1年/3年/5年): ${data.risk_prediction.year_1}%, ${data.risk_prediction.year_3}%, ${data.risk_prediction.year_5}%
      
      請不要使用 markdown 格式（如粗體或斜體），僅使用純文字。
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "暫時無法產生分析報告。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI 分析服務暫時無法使用。";
  }
};