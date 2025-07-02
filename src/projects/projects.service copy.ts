import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Projects } from "src/entities/projects";
import { Repository } from "typeorm";
import { CreateProjectsDto, UpdateProjectsDto } from "./dto/projects.dto";

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
        relations: {
          client: true,
        },
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
      return {
        result: result,
        total,
      };
    } catch (error) {
      throw error;
    }
  }

  async create(projectsDto: CreateProjectsDto) {
    try {
      const data = this.projectRepository.create({
        ...projectsDto,
      });

      const result = await this.projectRepository.save(data);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async update(id: bigint, projectDto: UpdateProjectsDto) {
    try {
      const ifExist = await this.projectRepository.findOne({
        where: {
          id: id,
        },
      });
      if (!ifExist) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: "Data not found",
        };
      }
      Object.assign(ifExist, projectDto);
      return await this.projectRepository.save(ifExist);
    } catch (error) {
      throw error;
    }
  }
}
