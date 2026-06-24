import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './modules/tasks/presentation/controllers/tasks.controller';
import { CreateTaskUseCase } from '../src/modules/tasks/application/use-cases/create-task.use-case';
import { GetTasksUseCase } from '../src/modules/tasks/application/use-cases/get-task.use-case';
import { UpdateTaskUseCase } from '../src/modules/tasks/application/use-cases/update-task.use-case';
import { DeleteTaskUseCase } from '../src/modules/tasks/application/use-cases/delete-task.use-case';
import { ToggleTaskStatusUseCase } from './modules/tasks/application/use-cases/toggle-task.use-case';
import { beforeEach, describe } from 'node:test';

describe('TasksController', () => {
  let controller: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: CreateTaskUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: GetTasksUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: UpdateTaskUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: DeleteTaskUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: ToggleTaskStatusUseCase,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});