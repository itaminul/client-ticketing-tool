import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import { GenerateTicket } from "src/entities/generate-tickets";
import { Repository } from "typeorm";

@Injectable()
export class CreateTicketsService extends BaseService<GenerateTicket> {
  constructor(
    @InjectRepository(GenerateTicket)
    public readonly generateTicketRepository: Repository<GenerateTicket>
  ) {
    super(generateTicketRepository);
  }

  async getAll(page: number = 1, limit: number = 10) {
    return super.getAll(page, limit, {
      order: { id: "DESC" },
      select: {
        id: true,
        ticketStartDate: true,
        ticketEndDate: true,
        ticketAssigned: true,
        ticketAssignedTo: true,
        ticketStatus: true,
      },
    });
  }
}
