export type DashboardStats = {
  total: number;
  completed: number;
  unfinished: number;
  completionRate: number;

  completedThisWeek: number;

  avgCompletionTime: number | null; // seconds

  mostActiveDay: string;

  overdueTodos: number;

  recentlyDeleted: Array<{
    id: number;
    title: string;
    deleted_at: string;
  }>;
  totalActive: number;
  totalDeleted: number;
};