import { Test, TestingModule } from '@nestjs/testing';
import { CreateTicketsService } from './create-tickets.service';

describe('CreateTicketsService', () => {
  let service: CreateTicketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateTicketsService],
    }).compile();

    service = module.get<CreateTicketsService>(CreateTicketsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
