export type DashboardStats = {
  name: string;
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
};