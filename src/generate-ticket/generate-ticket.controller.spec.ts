import { Test, TestingModule } from '@nestjs/testing';
import { GenerateTicketController } from './generate-ticket.controller';

describe('GenerateTicketController', () => {
  let controller: GenerateTicketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenerateTicketController],
    }).compile();

    controller = module.get<GenerateTicketController>(GenerateTicketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
