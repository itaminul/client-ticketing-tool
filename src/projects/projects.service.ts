// src/projects/projects.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Projects } from "../entities/projects";
import { DataSource, Repository } from "typeorm";
import { CreateProjectsDto, UpdateProjectsDto } from "./dto/projects.dto";
import { BaseService } from "../common/base.service";
import { Client } from "src/entities/client";

@Injectable()
export class ProjectsService extends BaseService<Projects> {
  constructor(
    @InjectRepository(Projects)
    private readonly projectRepository: Repository<Projects>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>
  ) {
    super(projectRepository);
  }

  async getAll(page: number = 1, limit: number = 10) {
    return super.getAll(page, limit, {
      order: { id: "DESC" },
      relations: { client: true },
      select: {
        id: true,
        projectName: true,
        projectDescripton: true,
        phone: true,
        client: {
          clientName: true,
          clientDescripton: true,
          contactNo: true,
        },
      },
    });
  }

  async create(projectsDto: CreateProjectsDto) {
    const client = await this.clientRepository.findOne({
      where: { id: projectsDto.client_id },
    });
    if (!client) {
      throw new NotFoundException(`Client ID  not found`);
    }

    const projectData = {
      ...projectsDto,
      client,
      client_id: client.id,
    };
    return super.create(projectData);
  }

  async update(id: bigint, projectDto: UpdateProjectsDto) {
    const client = await this.clientRepository.findOne({
      where: { id: projectDto.client_id },
    });
    if (!client) {
      throw new NotFoundException(`Client ID  not found`);
    }
    const projectData = {
      ...projectDto,
      client,
      client_id: client.id,
    };
    return super.update(id, projectData);
  }
}
