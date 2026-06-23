import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from '../../infrastructure/repositories/task.repository'; 
import { TaskResponseDto } from '../dto/task-response.dto';
import { TaskMapper } from '../mappers/task.mapper';

@Injectable()
export class ToggleTaskStatusUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute(id: string): Promise<TaskResponseDto> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }

    task.toggleStatus();
    const updatedTask = await this.taskRepository.update(task);
    return TaskMapper.toResponseDto(updatedTask);
  }
}