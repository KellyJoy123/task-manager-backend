import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from '../../infrastructure/repositories/task.repository'; 


@Injectable()
export class DeleteTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute(id: string, userId: string): Promise<void> {
    const exists = await this.taskRepository.exists(id, userId);
    if (!exists) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }
    await this.taskRepository.delete(id);
  }
}