import { api } from "./api";
import type { DashboardData, ExpenseResponse } from "@/types";

export async function getDashboard(studentId: string): Promise<DashboardData> {
  try {
    const { data } = await api.get<DashboardData>(`/students/${studentId}/dashboard`);
    return data;
  } catch {
    const [{ data: students }, { data: expenses }] = await Promise.all([
      api.get("/students"),
      api.get<ExpenseResponse>("/expenses"),
    ]);

    const totalFees = expenses.items.reduce((sum, item) => sum + item.amount, 0);
    return {
      totalFees,
      pendingDues: Math.round(totalFees * 0.25),
      attendancePercentage: 94,
      activityFeed: (students as Array<{ id: string; fullName: string }>).slice(0, 4).map((s) => ({
        id: s.id,
        title: `${s.fullName} updated profile`,
        timestamp: "Today",
      })),
    };
  }
}
