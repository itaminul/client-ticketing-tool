import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Projects } from "src/entities/projects";
import { Repository } from "typeorm";

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Projects)
    private readonly projectRepository: Repository<Projects>
  ) {}

  async getAll(page: number = 1, limit: number = 1) {
    try {
      const [result, total] = await this.projectRepository.findAndCount({
        take: limit,
        skip: (page - 1) * limit,
        order: {
          id: "DESC",
        },
        select: {
          id: true,
          projectName: true,
          projectDescripton: true,
          phone: true,
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
}
