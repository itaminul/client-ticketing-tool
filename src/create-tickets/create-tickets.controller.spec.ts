import { Test, TestingModule } from '@nestjs/testing';
import { CreateTicketsController } from './create-tickets.controller';

describe('CreateTicketsController', () => {
  let controller: CreateTicketsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateTicketsController],
    }).compile();

    controller = module.get<CreateTicketsController>(CreateTicketsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
