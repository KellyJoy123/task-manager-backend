import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from '../../domain/entities/task.entity';
import { ITaskRepository } from '../../domain/interfaces/task.repository.interface';
import { TaskDocument } from '../schemas/task.schema';

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(
    @InjectModel(TaskDocument.name)
    private readonly taskModel: Model<TaskDocument>,
  ) {}

  private toDomain(document: TaskDocument): Task {
    const task = new Task(document.title, document.description);
    Object.assign(task, {
      id: document._id.toString(),
      completed: document.completed,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
    return task;
  }

  private toDocument(task: Task): any {
    const doc: any = {
      title: task.title,
      description: task.description,
      completed: task.completed,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
    
    if (task.id) {
      doc._id = task.id;
    }
    
    return doc;
  }

  async findAll(): Promise<Task[]> {
    const documents = await this.taskModel.find().sort({ createdAt: -1 }).exec();
    return documents.map((doc) => this.toDomain(doc));
  }

  async findById(id: string): Promise<Task | null> {
    const document = await this.taskModel.findById(id).exec();
    if (!document) return null;
    return this.toDomain(document);
  }

  async create(task: Task): Promise<Task> {
    const document = new this.taskModel({
      title: task.title,
      description: task.description,
      completed: task.completed,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    });
    
    const savedDocument = await document.save();
    return this.toDomain(savedDocument);
  }

  async update(task: Task): Promise<Task> {
    const updatedDocument = await this.taskModel
      .findByIdAndUpdate(
        task.id, 
        {
          title: task.title,
          description: task.description,
          completed: task.completed,
          updatedAt: task.updatedAt,
        }, 
        { new: true }
      )
      .exec();
      
    if (!updatedDocument) throw new Error('Task not found');
    return this.toDomain(updatedDocument);
  }

  async delete(id: string): Promise<void> {
    await this.taskModel.findByIdAndDelete(id).exec();
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.taskModel.countDocuments({ _id: id }).exec();
    return count > 0;
  }
}