import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateTaskDto } from '../../application/dto/create-task.dto';
import { UpdateTaskDto } from '../../application/dto/update-task.dto';
import { TaskResponseDto } from '../../application/dto/task-response.dto';
import { CreateTaskUseCase } from '../../application/use-cases/create-task.use-case';
import { GetTasksUseCase } from '../../application/use-cases/get-task.use-case';
import { UpdateTaskUseCase } from '../../application/use-cases/update-task.use-case';
import { DeleteTaskUseCase } from '../../application/use-cases/delete-task.use-case';
import { ToggleTaskStatusUseCase } from '../../application/use-cases/toggle-task.use.case';

@Controller('api/tasks')
export class TasksController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly getTasksUseCase: GetTasksUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
    private readonly toggleTaskStatusUseCase: ToggleTaskStatusUseCase,
  ) {}

  @Get()
  async getAll(): Promise<TaskResponseDto[]> {
    return this.getTasksUseCase.execute();
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<TaskResponseDto> {
    return this.createTaskUseCase.execute(createTaskDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.updateTaskUseCase.execute(id, updateTaskDto);
  }

  @Patch(':id/toggle')
  async toggleStatus(@Param('id') id: string): Promise<TaskResponseDto> {
    return this.toggleTaskStatusUseCase.execute(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteTaskUseCase.execute(id);
  }
}