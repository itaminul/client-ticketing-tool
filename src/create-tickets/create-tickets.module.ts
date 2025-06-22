import { Module } from '@nestjs/common';
import { CreateTicketsService } from './create-tickets.service';
import { CreateTicketsController } from './create-tickets.controller';

@Module({
  providers: [CreateTicketsService],
  controllers: [CreateTicketsController]
})
export class CreateTicketsModule {}
