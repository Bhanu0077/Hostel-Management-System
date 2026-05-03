"use client";

import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/layout/AppShell";
import { Protected } from "@/components/layout/Protected";
import { StatCard } from "@/components/cards/StatCard";
import { getDashboard } from "@/services/dashboard";
import { getInsights } from "@/services/ai";
import { chatSSE } from "@/services/ai";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function DashboardPage() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<string[]>([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => getDashboard("1"),
  });
  const insights = useQuery({ queryKey: ["insights"], queryFn: getInsights });

  async function onSend() {
    if (!message.trim()) return;
    const payload = await chatSSE(message);
    setChat((prev) => [...prev, `You: ${message}`, `AI: ${payload.text ?? "No response"}`]);
    setMessage("");
  }

  return (
    <Protected>
      <AppShell>
        <section className="page-header">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-600">
            Operational Overview
          </p>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">
            Monitor collections, dues, attendance trends, and daily hostel activity in one place.
          </p>
        </section>

        {isLoading ? <div className="quiet-card h-32 animate-pulse" /> : null}
        {isError ? (
          <div className="quiet-card p-4 text-sm text-red-600">Failed to load dashboard data.</div>
        ) : null}
        {data ? (
          <section className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            <StatCard label="Total Fees Collected" value={`₹${data.totalFees.toLocaleString()}`} />
            <StatCard label="Pending Dues" value={`₹${data.pendingDues.toLocaleString()}`} />
            <StatCard label="Attendance Rate" value={`${data.attendancePercentage}%`} />
          </section>
        ) : null}

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-5 lg:col-span-8">
            <div className="quiet-card p-6">
              <h3 className="text-lg font-semibold tracking-tight text-slate-900">Recent Activity</h3>
              <div className="mt-4 space-y-3">
                {data?.activityFeed.length ? (
                  data.activityFeed.map((item) => (
                    <div key={item.id} className="rounded-lg border border-slate-100 bg-slate-50/40 p-3.5">
                      <p className="text-sm font-medium text-slate-800">{item.title}</p>
                      <p className="mt-1 text-xs text-slate-500">{item.timestamp}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">No activities yet.</p>
                )}
              </div>
            </div>
          </div>
          <aside className="space-y-5 lg:col-span-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-slate-100">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">Insights</p>
              <div className="mt-3 space-y-2 text-sm">
                {insights.data?.length
                  ? insights.data.slice(0, 2).map((i) => <p key={i.id || i.title}>{i.detail || i.title}</p>)
                  : <p className="text-slate-300">Loading insights...</p>}
              </div>
            </div>
            <div className="quiet-card p-5">
              <h3 className="mb-3 text-sm font-semibold text-slate-900">Assistant</h3>
              <div className="mb-3 max-h-36 space-y-2 overflow-auto text-xs leading-5 text-slate-700">
                {chat.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about collections or dues..."
                />
                <Button onClick={onSend}>Send</Button>
              </div>
            </div>
          </aside>
        </section>
      </AppShell>
    </Protected>
  );
}
