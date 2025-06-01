import { Module } from "@nestjs/common";
import { CreateTicketsService } from "./create-tickets.service";
import { CreateTicketsController } from "./create-tickets.controller";
import { InjectRepository, TypeOrmModule } from "@nestjs/typeorm";
import { GenerateTicket } from "src/entities/generate-tickets";
import { TicketAttachments } from "src/entities/tickets-attachements";

@Module({
  imports: [TypeOrmModule.forFeature([GenerateTicket, TicketAttachments])],
  providers: [CreateTicketsService],
  controllers: [CreateTicketsController],
})
export class CreateTicketsModule {}
