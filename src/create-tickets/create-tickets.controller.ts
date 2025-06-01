import { Controller, Get, HttpStatus, Query } from "@nestjs/common";
import { CreateTicketsService } from "./create-tickets.service";
import { BaseController } from "src/common/base.controller";
import { GenerateTicket } from "src/entities/generate-tickets";

@Controller("create-tickets")
export class CreateTicketsController extends BaseController<GenerateTicket> {
  constructor(public readonly createTicketService: CreateTicketsService) {
    super(createTicketService);
  }

  @Get("list")
  async getAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10
  ) {
    const data = await this.createTicketService.getAll(page, limit);
    return {
      status: HttpStatus.OK,
      data: data.result,
      error: null,
      pagination: {
        totalItems: data.total,
        totalPages: Math.ceil(data.total / limit),
        currentPage: page,
        itemsPerPage: limit,
      },
    };
  }
}
