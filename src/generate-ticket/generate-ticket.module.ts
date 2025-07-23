import { Module } from '@nestjs/common';
import { GenerateTicketService } from './generate-ticket.service';
import { GenerateTicketController } from './generate-ticket.controller';

@Module({
  providers: [GenerateTicketService],
  controllers: [GenerateTicketController]
})
export class GenerateTicketModule {}
