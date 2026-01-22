export type TaskDTO = {
  title: string;
  description?: string | null;
  isCompleted: boolean;
  isDeleted: boolean;
  slug: string;
};