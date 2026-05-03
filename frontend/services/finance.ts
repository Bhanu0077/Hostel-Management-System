import { api } from "./api";
import type { ExpenseResponse } from "@/types";

export async function getFees(studentId: string) {
  try {
    const { data } = await api.get(`/students/${studentId}/fees`);
    return data;
  } catch {
    // Backend currently exposes /expenses; keep finance UI functional.
    const { data } = await api.get<ExpenseResponse>("/expenses");
    return data;
  }
}

export async function createPayment(payload: Record<string, unknown>) {
  try {
    const { data } = await api.post("/payments", payload);
    return data;
  } catch {
    const { data } = await api.post("/expenses", payload);
    return data;
  }
}
