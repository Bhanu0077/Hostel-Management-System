"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/hostel", label: "Hostel Management" },
  { href: "/finance", label: "Financials" },
  { href: "/auth/login", label: "Sign in" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white px-4 py-5 md:flex">
        <div className="mb-8 px-2">
          <h1 className="text-xl font-bold tracking-tight text-slate-900">FinHost AI</h1>
          <p className="mt-1 text-xs uppercase tracking-wider text-slate-500">Admin Portal</p>
        </div>
        <nav className="space-y-1.5">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-lg px-3 py-2.5 text-sm transition ${
                  active
                    ? "border border-slate-200 bg-slate-50 font-semibold text-slate-900"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1">
        <header className="sticky top-0 z-10 flex h-16 items-center border-b border-slate-200 bg-white px-6">
          <h2 className="text-base font-semibold tracking-tight text-slate-900">FinHost Portal</h2>
        </header>
        <div className="mx-auto w-full max-w-[1280px] space-y-8 px-4 py-6 md:px-6 md:py-8">{children}</div>
      </main>
    </div>
  );
}
