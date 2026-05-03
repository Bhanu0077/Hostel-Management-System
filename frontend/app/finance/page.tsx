"use client";

import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/layout/AppShell";
import { Protected } from "@/components/layout/Protected";
import { getFees } from "@/services/finance";
import { DataTable } from "@/components/tables/DataTable";
import { StatCard } from "@/components/cards/StatCard";

export default function FinancePage() {
  const fees = useQuery({ queryKey: ["fees"], queryFn: () => getFees("1") });
  const items = fees.data?.items ?? [];
  const pending = items.reduce((sum: number, i: { amount: number }) => sum + i.amount, 0);

  return (
    <Protected>
      <AppShell>
        <section className="page-header">
          <h1 className="page-title">Financials</h1>
          <p className="page-subtitle">
            Review fee collections, category totals, and payment activity.
          </p>
        </section>
        {fees.isLoading ? <div className="quiet-card h-32 animate-pulse" /> : null}
        {fees.error ? (
          <div className="quiet-card p-4 text-sm text-red-600">Unable to load finance data.</div>
        ) : null}
        <section className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          <StatCard label="Pending Dues" value={`₹${pending.toLocaleString()}`} />
          <StatCard label="Transactions" value={`${items.length}`} />
          <StatCard
            label="Categories"
            value={`${fees.data?.totalsByCategory?.length ?? 0}`}
            helper="Tracked expense categories"
          />
        </section>
        <section>
          <h3 className="mb-3 text-lg font-semibold tracking-tight text-slate-900">Payment History</h3>
          <DataTable
            headers={["Title", "Category", "Date", "Amount"]}
            rows={items.map((i: { title: string; category: string; expenseDate: string; amount: number }) => [
              i.title,
              i.category,
              new Date(i.expenseDate).toLocaleDateString(),
              `₹${i.amount.toLocaleString()}`,
            ])}
          />
        </section>
      </AppShell>
    </Protected>
  );
}
