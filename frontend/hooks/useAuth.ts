"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export function useAuth() {
  const auth = useAuthStore();

  useEffect(() => {
    if (!auth.hydrated) {
      auth.hydrate();
    }
  }, [auth]);

  return auth;
}
