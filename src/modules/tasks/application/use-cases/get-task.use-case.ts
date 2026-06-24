import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../../infrastructure/repositories/task.repository'; 
import { TaskResponseDto } from '../dto/task-response.dto';
import { TaskMapper } from '../mappers/task.mapper';

@Injectable()
export class GetTasksUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute(userId: string): Promise<TaskResponseDto[]> {
    const tasks = await this.taskRepository.findAll(userId);
    return tasks.map((task) => TaskMapper.toResponseDto(task));
  }
}