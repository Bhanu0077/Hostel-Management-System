"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export function Protected({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { token, hydrated } = useAuth();

  useEffect(() => {
    if (hydrated && !token) {
      router.replace("/auth/login");
    }
  }, [hydrated, token, router]);

  if (!hydrated || !token) {
    return <div className="p-6 text-sm text-slate-500">Checking authentication...</div>;
  }

  return <>{children}</>;
}
