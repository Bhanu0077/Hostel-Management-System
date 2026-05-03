"use client";

import { FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/services/auth";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      router.push("/dashboard");
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1280px] items-center justify-center px-4 py-8 md:px-6">
      <div className="grid w-full max-w-5xl grid-cols-1 gap-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0px_8px_24px_rgba(15,23,42,0.05)] md:grid-cols-2 md:p-6">
        <section className="hidden rounded-xl border border-slate-200 bg-slate-50 p-10 md:block">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-600">
            FinHost Platform
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">
            Finance and hostel operations, unified.
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Access occupancy, fees, and operational insights from a single workspace designed for teams.
          </p>
        </section>
        <section className="flex flex-col justify-center rounded-xl border border-slate-200 p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Sign in</h2>
          <p className="mt-2 text-sm text-slate-600">
            Please enter your details to access your account.
          </p>
          <form className="mt-6 space-y-5" onSubmit={onSubmit}>
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {mutation.error ? (
              <p className="text-sm text-red-600">
                {mutation.error.message.includes("Something went wrong")
                  ? "Unable to sign in. Check backend server, API URL, and credentials."
                  : mutation.error.message}
              </p>
            ) : null}
            <Button className="w-full" type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Signing In..." : "Sign In"}
            </Button>
          </form>
          <div className="mt-5 border-t border-slate-200 pt-4 text-sm text-slate-600">
            New to FinHost?{" "}
            <Link href="/auth/signup" className="font-medium text-blue-600 hover:underline">
              Create an account
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
