import { api } from "./api";
import type { Insight } from "@/types";

export async function getInsights() {
  try {
    const { data } = await api.get<Insight[]>("/ai/insights/fee-forecast");
    return data;
  } catch {
    const { data } = await api.get<Insight[]>("/ai-insights");
    return data;
  }
}

export async function chatSSE(message: string) {
  try {
    const { data } = await api.post("/ai/chat", { message });
    return data;
  } catch {
    return { text: "AI chat endpoint is not available yet on backend." };
  }
}
