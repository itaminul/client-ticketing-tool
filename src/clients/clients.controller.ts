import { Controller, Get, HttpStatus, Query } from "@nestjs/common";
import { ClientsService } from "./clients.service";

@Controller("clients")
export class ClientsController {
  constructor(public readonly clientService: ClientsService) {}

  @Get("list")
  async getAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10
  ) {
    try {
      const data = await this.clientService.getAll(page, limit);
      return {
        status: HttpStatus.OK,
        message: "Request successful",
        data: data.result,
        error: null,
        pagination: {
          totalItems: data.total,
          totalPages: Math.ceil(data.total / limit),
          currentPage: page,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      throw error;
    }
  }
}
