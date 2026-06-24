import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema, TaskDocument } from './infrastructure/schemas/task.schema';
import { TaskRepository } from './infrastructure/repositories/task.repository';
import { TasksController } from './presentation/controllers/tasks.controller';
import { CreateTaskUseCase } from './application/use-cases/create-task.use-case';
import { GetTasksUseCase } from './application/use-cases/get-task.use-case';
import { UpdateTaskUseCase } from './application/use-cases/update-task.use-case';
import { DeleteTaskUseCase } from './application/use-cases/delete-task.use-case';
import { ToggleTaskStatusUseCase } from './application/use-cases/toggle-task.use-case';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TaskDocument.name, schema: TaskSchema },
    ]),
  ],
  controllers: [TasksController],
  providers: [
    TaskRepository, 
    CreateTaskUseCase,
    GetTasksUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
    ToggleTaskStatusUseCase,
  ],
})
export class TasksModule {}