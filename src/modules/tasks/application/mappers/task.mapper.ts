import { Task } from '../../domain/entities/task.entity';
import { TaskResponseDto } from '../dto/task-response.dto';

export class TaskMapper {
  static toResponseDto(task: Task): TaskResponseDto {
    return {
      id: task.id || '', 
      title: task.title,
      description: task.description,
      completed: task.completed,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }
}