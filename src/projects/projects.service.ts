// src/projects/projects.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Projects } from "../entities/projects";
import { DataSource, Repository } from "typeorm";
import { CreateProjectsDto, UpdateProjectsDto } from "./dto/projects.dto";
import { BaseService } from "../common/base.service";

@Injectable()
export class ProjectsService extends BaseService<Projects> {
  constructor(
    @InjectRepository(Projects)
    private readonly projectRepository: Repository<Projects>,
    protected readonly dataSource: DataSource
  ) {
    super(projectRepository, dataSource);
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
    return this.runInTransaction(async (manager) => {
      const project = this.repository.create(projectsDto);
      return manager.save(project);
    });
  }

  async updateProject(id: bigint, projectDto: UpdateProjectsDto) {
    return super.update(id, projectDto);
  }
}
