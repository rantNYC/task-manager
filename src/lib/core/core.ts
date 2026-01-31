import bcrypt from 'bcrypt';
import {
  getDb,
  getProjectRepository,
  getStatusRepository,
  getTaskRepository,
  getTaskStatusHistoryRepository,
  getUserRepository,
} from '@/lib/db/data-source';
import { User } from '@/lib/db/entities/User';
import { Task } from '@/lib/db/entities/Task';
import { slugify } from '@/lib/core/utils';
import { DashboardStats } from '@/model/stats';
import { Project } from '@/lib/db/entities/Project';
import { Repository } from 'typeorm';

export async function createUser(
  email: string,
  password: string,
  name: string,
) {
  const db = await getDb();

  const userRepo = db.getRepository(User);

  // Check if email already exists
  const existing = await userRepo.findOne({ where: { email } });
  if (existing) {
    throw new Error('Email already in use');
  }

  // Hash password
  const password_hash = await bcrypt.hash(password, 12);

  // Create user entity
  const user = userRepo.create({
    email,
    slug: slugify(name),
    password_hash,
    name: name,
  });

  // Save to DB
  const saved = await userRepo.save(user);

  // Return safe user object
  return {
    id: saved.id,
    email: saved.email,
    name: saved.name,
    created_at: saved.created_at,
  };
}

export async function verifyUser(email: string, password: string) {
  const db = await getDb();

  const userRepo = db.getRepository(User);

  const user = await userRepo.findOne({ where: { email } });
  if (!user) return null;

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}

export async function getAll({
  repo,
  slug,
}: {
  repo: 'project' | 'task';
  slug: string;
}): Promise<{ db: Repository<Task | Project>; all: Task | Project | null }> {
  switch (repo) {
    case 'project':
      const projectDb = await getProjectRepository();
      return {
        db: projectDb,
        all: await projectDb.findOne({ where: { slug } }),
      };
    case 'task':
      const taskDb = await getTaskRepository();
      return { db: taskDb, all: await taskDb.findOne({ where: { slug } }) };
    default:
      throw new Error('Unknown repo');
  }
}

type MarkAsValueInput =
  | { repo: 'task'; slug: string; column: keyof Task; value: Task[keyof Task] }
  | {
      repo: 'project';
      slug: string;
      column: keyof Project;
      value: Project[keyof Project];
    };

export async function markAsValue({
  slug,
  column,
  value,
  repo,
}: MarkAsValueInput) {
  const { db, all } = await getAll({ slug, repo });
  if (!all) {
    throw new Error('Value not found');
  }
  return {
    success: true,
    task: await db.update(all.id, {
      [column]: value,
    }),
  };
}

export async function findUserByEmail({ email }: { email: string }) {
  const userRepo = await getUserRepository();
  return await userRepo.findOne({ where: { email }, relations: ['projects'] });
}

export async function createTask({
  projectId,
  title,
  description,
}: {
  projectId: number;
  title: string;
  description?: string;
}) {
  const taskDb = await getTaskRepository();
  const task = await taskDb.save({
    title,
    slug: slugify(title),
    description,
    project: { id: projectId },
  });
  return { success: true, task };
}

export async function createProject({
  email,
  name,
  description,
}: {
  email: string;
  name: string;
  description?: string;
}) {
  const userRepo = await getUserRepository();
  const user = await userRepo.findOne({ where: { email } });
  if (!user) {
    throw new Error(`Cannot find user with email ${email}`);
  }
  const projectDb = await getProjectRepository();
  const project = await projectDb.save({
    name,
    slug: slugify(name),
    description,
    user,
  });
  return { success: true, project };
}

export async function getProjectByUser({
  projectSlug,
  userSlug,
}: {
  projectSlug: string;
  userSlug: string;
}) {
  const projectRepo = await getProjectRepository();

  const project = await projectRepo.findOne({
    where: { slug: projectSlug, user: { slug: userSlug } },
    relations: [
      'tasks',
      'tasks.status',
      'tasks.priority',
      'tasks.category',
      'tasks.tags',
    ],
  });

  return { success: true, project };
}

export async function getDashboardStats({
  tasks,
}: {
  tasks: Task[];
}): Promise<DashboardStats> {
  // --- BASIC COUNTS ---
  const total = tasks.length;

  const completed = tasks.filter((t) => t.status?.role === 'completed').length;

  const unfinished = tasks.filter(
    (t) => t.status?.role !== 'completed' && t.status?.role !== 'deleted',
  ).length;

  const completionRate =
    total === 0 ? 0 : Number(((completed / total) * 100).toFixed(2));

  // --- COMPLETED THIS WEEK ---
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const completedThisWeek = tasks.filter(
    (t) =>
      t.status?.role === 'completed' &&
      t.completed_at &&
      new Date(t.completed_at) >= oneWeekAgo,
  ).length;

  // --- AVERAGE COMPLETION TIME ---
  const completedTasks = tasks.filter((t) => t.status?.role === 'completed');

  const avgCompletionTime =
    completedTasks.length === 0
      ? null
      : completedTasks.reduce((sum, t) => {
          const created = new Date(t.created_at).getTime();
          const completedAt = t.completed_at
            ? new Date(t.completed_at).getTime()
            : created;
          return sum + (completedAt - created) / 1000; // seconds
        }, 0) / completedTasks.length;

  // --- MOST ACTIVE DAY ---
  const dayCounts: Record<string, number> = {};

  completedTasks.forEach((t) => {
    if (!t.completed_at) return;

    const day = new Date(t.completed_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    dayCounts[day] = (dayCounts[day] || 0) + 1;
  });

  const mostActiveDay =
    Object.keys(dayCounts).length === 0
      ? 'N/A'
      : Object.entries(dayCounts).sort((a, b) => b[1] - a[1])[0][0];

  // --- OVERDUE (placeholder logic) ---
  // You probably want a due_date column later.
  const overdueTodos = tasks.filter(
    (t) =>
      t.status?.role !== 'completed' &&
      t.status?.role !== 'deleted' &&
      t.deleted_at &&
      new Date(t.deleted_at) < new Date(),
  ).length;

  // --- RECENTLY DELETED ---
  const recentlyDeleted = tasks
    .filter((t) => t.status?.role === 'deleted')
    .sort((a, b) => {
      const aTime = a.deleted_at ? new Date(a.deleted_at).getTime() : 0;
      const bTime = b.deleted_at ? new Date(b.deleted_at).getTime() : 0;
      return bTime - aTime;
    })
    .slice(0, 5)
    .map((t) => ({
      id: t.id,
      title: t.title,
      localized: t.deleted_at ? new Date(t.deleted_at).toLocaleString() : 'N/A',
    }));

  // --- RECENTLY COMPLETED ---
  const recentlyCompleted = tasks
    .filter((t) => t.status?.role === 'completed')
    .sort((a, b) => {
      const aTime = a.completed_at ? new Date(a.completed_at).getTime() : 0;
      const bTime = b.completed_at ? new Date(b.completed_at).getTime() : 0;
      return bTime - aTime;
    })
    .slice(0, 5)
    .map((t) => ({
      id: t.id,
      title: t.title,
      localized: t.completed_at
        ? new Date(t.completed_at).toLocaleString()
        : 'N/A',
    }));

  const totalActive = tasks.filter((t) => t.status?.role !== 'deleted').length;
  const totalDeleted = tasks.filter((t) => t.status?.role === 'deleted').length;

  return {
    total,
    completed,
    unfinished,
    completionRate,
    completedThisWeek,
    avgCompletionTime,
    mostActiveDay,
    overdueTodos,
    recentlyDeleted,
    recentlyCompleted,
    totalActive,
    totalDeleted,
  };
}

export async function getTaks({
  projectSlug,
  userSlug,
  isCompleted,
  isDeleted,
}: {
  projectSlug: string;
  userSlug: string;
  isCompleted?: boolean;
  isDeleted?: boolean;
}) {
  const { project } = await getProjectByUser({ projectSlug, userSlug });
  if (!project) throw new Error('Project not found');
  return project.tasks.filter((t) => {
    if (isDeleted !== undefined && t.status?.role !== 'deleted') return false;
    return !(isCompleted !== undefined && t.status?.role !== 'completed');
  });
}

export async function getStatusByName(name: string) {
  const repo = await getStatusRepository();
  const status = await repo.findOne({ where: { name } });
  if (!status) throw new Error(`Status "${name}" not found`);
  return status;
}

export async function updateTaskStatus(
  taskSlug: string,
  newStatusName: string,
) {
  const taskRepo = await getTaskRepository();
  const statusRepo = await getStatusRepository();
  const historyRepo = await getTaskStatusHistoryRepository();

  const task = await taskRepo.findOne({
    where: { slug: taskSlug },
    relations: ['status'],
  });

  if (!task) throw new Error('Task not found');

  const newStatus = await statusRepo.findOne({
    where: { role: newStatusName },
  });
  if (!newStatus) throw new Error(`Status "${newStatusName}" not found`);

  const oldStatus = task.status;

  const now = new Date();

  if (newStatusName === 'completed') {
    task.completed_at = now;
  } else {
    task.completed_at = null;
  }

  if (newStatusName === 'deleted') {
    task.deleted_at = now;
  }

  if (newStatusName === 'in_progress') {
    task.in_progress_at = now;
  }

  task.status = newStatus;

  await taskRepo.save(task);

  await historyRepo.save({
    task,
    old_status: oldStatus ?? null,
    new_status: newStatus,
    changed_at: now,
  });

  return { success: true, task };
}