import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ClientsService } from "./clients.service";
import { CreateClientsDto, UpdateClientsDto } from "./dto/clients.dto";

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

  @Post()
  async create(@Body() clientDto: CreateClientsDto) {
    try {
      const data = await this.clientService.create(clientDto);
      return {
        status: HttpStatus.OK,
        data: data,
      };
    } catch (error) {
      throw error;
    }
  }

  @Patch(":id")
  async update(@Param("id") id: any, @Body() clientDto: UpdateClientsDto) {
    try {
      const data = await this.clientService.update(id, clientDto);
      return {
        status: HttpStatus.OK,
        data: data
      };
    } catch (error) {
      throw error;
    }
  }
}
