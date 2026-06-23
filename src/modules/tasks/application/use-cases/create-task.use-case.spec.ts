import { Test, TestingModule } from '@nestjs/testing';
import { CreateTaskUseCase } from './create-task.use-case';
import { TaskRepository } from '../../infrastructure/repositories/task.repository';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from '../../domain/entities/task.entity';

const mockTaskRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  exists: jest.fn(),
};

describe('CreateTaskUseCase', () => {
  let useCase: CreateTaskUseCase;
  let repository: TaskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTaskUseCase,
        {
          provide: TaskRepository, 
          useValue: mockTaskRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateTaskUseCase>(CreateTaskUseCase);
    repository = module.get<TaskRepository>(TaskRepository);
  });

  it('should create a task', async () => {
    const dto: CreateTaskDto = {
      title: 'Test Task',
      description: 'Test Description',
    };

    const expectedTask = new Task(dto.title, dto.description);
    mockTaskRepository.create.mockResolvedValue(expectedTask);

    const result = await useCase.execute(dto);

    expect(result.title).toBe(dto.title);
    expect(result.description).toBe(dto.description);
    expect(result.completed).toBe(false);
    expect(mockTaskRepository.create).toHaveBeenCalled();
  });
});