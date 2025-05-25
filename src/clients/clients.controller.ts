import { Body, Controller, Get, HttpStatus, Post, Query } from "@nestjs/common";
import { ClientsService } from "./clients.service";
import { CreateClientsDto } from "./dto/create.clients.dto";

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
      if (!data || data.result.length === 0) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: "Data not found",
          data: data.result,
          error: null,
          pagination: {
            totalItems: data.total,
            totalPages: Math.ceil(data.total / limit),
            currentPage: page,
            itemsPerPage: limit,
          },
        };
      } else {
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
      }
    } catch (error) {
      throw error;
    }
  }

  @Post()
  async create(@Body() clientDto: CreateClientsDto) {
    try {
      return await this.clientService.create(clientDto);
    } catch (error) {
      throw error;
    }
  }
}
