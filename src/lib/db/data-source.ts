import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { User } from './entities/User';
import { Project } from './entities/Project';
import { Task } from './entities/Task';

import { Priority } from './entities/Priority';
import { Status } from './entities/Status';
import { Category } from './entities/Category';
import { Tag } from './entities/Tag';
import { TaskStatusHistory } from './entities/TaskStatusHistory';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'postgres',
  synchronize: true, // turn off in production
  logging: false,
  entities: [User, Project, Task, Priority, Status, Category, Tag, TaskStatusHistory],

});

export async function getDb() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
}

// -----------------------------
// Repository Helpers
// -----------------------------

export async function getTaskRepository() {
  return (await getDb()).getRepository(Task);
}

export async function getUserRepository() {
  return (await getDb()).getRepository(User);
}

export async function getProjectRepository() {
  return (await getDb()).getRepository(Project);
}

export async function getPriorityRepository() {
  return (await getDb()).getRepository(Priority);
}

export async function getStatusRepository() {
  return (await getDb()).getRepository(Status);
}

export async function getCategoryRepository() {
  return (await getDb()).getRepository(Category);
}

export async function getTagRepository() {
  return (await getDb()).getRepository(Tag);
}

export async function getTaskStatusHistoryRepository() {
  return (await getDb()).getRepository(TaskStatusHistory);
}