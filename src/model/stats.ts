export type DashboardStats = {
  total: number;
  completed: number;
  unfinished: number;
  completionRate: number;

  completedThisWeek: number;

  avgCompletionTime: number | null; // seconds

  mostActiveDay: string;

  overdueTodos: number;

  recentlyDeleted: Array<TaskInformation>;
  recentlyCompleted: Array<TaskInformation>;
  totalActive: number;
  totalDeleted: number;
};

export type TaskInformation = {
  id: number;
  title: string;
  localized: string;
};