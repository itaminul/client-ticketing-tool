import { Test, TestingModule } from '@nestjs/testing';
import { GenerateTicketService } from './generate-ticket.service';

describe('GenerateTicketService', () => {
  let service: GenerateTicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenerateTicketService],
    }).compile();

    service = module.get<GenerateTicketService>(GenerateTicketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
