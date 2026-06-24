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
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateTaskDto } from '../../application/dto/create-task.dto';
import { UpdateTaskDto } from '../../application/dto/update-task.dto';
import { TaskResponseDto } from '../../application/dto/task-response.dto';
import { CreateTaskUseCase } from '../../application/use-cases/create-task.use-case';
import { GetTasksUseCase } from '../../application/use-cases/get-task.use-case';
import { UpdateTaskUseCase } from '../../application/use-cases/update-task.use-case';
import { DeleteTaskUseCase } from '../../application/use-cases/delete-task.use-case';
import { ToggleTaskStatusUseCase } from '../../application/use-cases/toggle-task.use-case';
import { JwtAuthGuard } from 'src/modules/auth/presentation/guards/jwt-auth.guard';
import { use } from 'passport';

@Controller('api/tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly getTasksUseCase: GetTasksUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
    private readonly toggleTaskStatusUseCase: ToggleTaskStatusUseCase,
  ) {}

  @Get()
  async getAll(@Request() req): Promise<TaskResponseDto[]> {
    const userId = req.user.userId;
    return this.getTasksUseCase.execute(userId);
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Request() req,): Promise<TaskResponseDto> {
    const userId = req.user.userId;
    return this.createTaskUseCase.execute(createTaskDto, userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req,
  ): Promise<TaskResponseDto> {
    const userId = req.user.userId;
    return this.updateTaskUseCase.execute(id, updateTaskDto, userId);
  }

  @Patch(':id/toggle')
  async toggleStatus(
    @Param('id') id: string,
    @Request() req,
    ): Promise<TaskResponseDto> {
    const userId = req.user.userId;
    return this.toggleTaskStatusUseCase.execute(id, userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id') id: string,
    @Request() req,
    ): Promise<void> {
    const userId = req.user.userId;
    await this.deleteTaskUseCase.execute(id, userId);
  }
}