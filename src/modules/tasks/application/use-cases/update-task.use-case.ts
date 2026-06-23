import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from '../../infrastructure/repositories/task.repository'; 
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskResponseDto } from '../dto/task-response.dto';
import { TaskMapper } from '../mappers/task.mapper';

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskResponseDto> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }

    task.updateDetails(updateTaskDto.title, updateTaskDto.description);
    
    if (updateTaskDto.completed !== undefined) {
      task.completed = updateTaskDto.completed;
      task.updatedAt = new Date();
    }

    const updatedTask = await this.taskRepository.update(task);
    return TaskMapper.toResponseDto(updatedTask);
  }
}