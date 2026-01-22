import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Task } from './entities/Task';
import { Project } from './entities/Project';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'postgres',
  synchronize: true, // turn off in production
  logging: false,
  entities: [User, Project, Task],
});

export async function getDb() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
}

export async function getTaskRepository() {
  return (await getDb()).getRepository(Task);
}
export async function getUserRepository() {
  return (await getDb()).getRepository(User);
}

export async function getProjectRepository() {
  return (await getDb()).getRepository(Project);
}