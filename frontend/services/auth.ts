import { api } from "./api";
import type { AuthResponse } from "@/types";

export async function login(email: string, password: string) {
  const { data } = await api.post<AuthResponse>("/login", { email, password });
  return data;
}
