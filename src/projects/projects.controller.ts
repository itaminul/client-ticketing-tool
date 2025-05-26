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
import { ProjectsService } from "./projects.service";
import { CreateProjectsDto, UpdateProjectsDto } from "./dto/projects.dto";

@Controller("projects")
export class ProjectsController {
  constructor(public readonly projectService: ProjectsService) {}

  @Get("list")
  async getAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 1
  ) {
    try {
      const data = await this.projectService.getAll(page, limit);
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
  async create(@Body() projectDto: CreateProjectsDto) {
    try {
      const data = await this.projectService.create(projectDto);
      return {
        status: HttpStatus.OK,
        data: data,
      };
    } catch (error) {
      throw error;
    }
  }

  @Patch(":id")
  async update(@Param("id") id: bigint, @Body() projectDto: UpdateProjectsDto) {
    try {
      const data = await this.projectService.update(id, projectDto);
      return {
        status: HttpStatus.OK,
        data: data,
      };
    } catch (error) {
      throw error;
    }
  }
}
