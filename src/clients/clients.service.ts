import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Client } from "src/entities/client";
import { Repository } from "typeorm";
import { CreateClientsDto } from "./dto/create.clients.dto";

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    public readonly clientsRepository: Repository<Client>
  ) {}

  async getAll(page: number = 1, limit: number = 10) {
    try {
      const [result, total] = await this.clientsRepository.findAndCount({
        take: limit,
        skip: (page - 1) * limit,
        order: {
          id: "DESC",
        },
        select: {
          id: true,
          clientName: true,
          clientDescripton: true,
          contactNo: true,
          active_status: true,
        },
      });
      return {
        result: result,
        total,
      };
    } catch (error) {
      throw error;
    }
  }

  async create(clientDto: CreateClientsDto) {
    try {
      const dataStore = this.clientsRepository.create({
        ...clientDto,
      });
      const result = await this.clientsRepository.save(dataStore);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async update(id: any, clientDto: CreateClientsDto) {
    try {
      const existingClient = await this.clientsRepository.findOne({
        where: { id },
      });
      if (!existingClient) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: "Data not found",
        };
      }

      Object.assign(existingClient, clientDto);
      return this.clientsRepository.save(existingClient);
    } catch (error) {
      throw error;
    }
  }
}
