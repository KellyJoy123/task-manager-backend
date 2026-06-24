import { Task } from '../entities/task.entity';

export interface ITaskRepository {
  findAll(userId: string): Promise<Task[]>;
  findById(id: string, userId: string): Promise<Task | null>;
  create(task: Task): Promise<Task>;
  update(task: Task): Promise<Task>;
  delete(id: string): Promise<void>;
  exists(id: string, userId: string): Promise<boolean>;
}