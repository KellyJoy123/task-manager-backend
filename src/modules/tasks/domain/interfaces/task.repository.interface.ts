import { Task } from '../entities/task.entity';

export interface ITaskRepository {
  findAll(): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
  create(task: Task): Promise<Task>;
  update(task: Task): Promise<Task>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}