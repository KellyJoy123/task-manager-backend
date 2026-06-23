import { Injectable } from '@nestjs/common';
import { Task } from '../../domain/entities/task.entity';
import { TaskRepository } from '../../infrastructure/repositories/task.repository'; 
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskResponseDto } from '../dto/task-response.dto';
import { TaskMapper } from '../mappers/task.mapper';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute(createTaskDto: CreateTaskDto): Promise<TaskResponseDto> {
    const task = new Task(createTaskDto.title, createTaskDto.description);
    const createdTask = await this.taskRepository.create(task);
    return TaskMapper.toResponseDto(createdTask);
  }
}