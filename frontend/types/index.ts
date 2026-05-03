export type UserRole = "admin" | "manager" | "student" | string;

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface DashboardData {
  totalFees: number;
  pendingDues: number;
  attendancePercentage: number;
  activityFeed: Array<{ id: string; title: string; timestamp: string }>;
}

export interface Room {
  id: string;
  blockName: string;
  roomNumber: string;
  capacity: number;
  occupiedBeds: number;
  availableBeds: number;
  roomType: string;
  monthlyRent: number;
  status: string;
}

export interface Expense {
  id: string;
  title: string;
  category: string;
  amount: number;
  expenseDate: string;
  notes?: string;
}

export interface ExpenseResponse {
  items: Expense[];
  totalsByCategory: Array<{ category: string; totalAmount: number }>;
}

export interface Insight {
  id: string;
  title: string;
  detail: string;
  severity?: "low" | "medium" | "high";
}
