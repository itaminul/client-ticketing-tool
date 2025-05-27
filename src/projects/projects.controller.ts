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
import { BaseController } from "src/common/base.controller";
import { Projects } from "src/entities/projects";

@Controller("projects")
export class ProjectsController extends BaseController<Projects> {
  constructor(public readonly projectService: ProjectsService) {
    super(projectService);
  }

  @Get("list")
  async getAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10
  ) {
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
  }

  @Post()
  async create(@Body() projectDto: CreateProjectsDto): Promise<any> {
    const data = await super.create(projectDto);
    return {
      status: HttpStatus.OK,
      data: data,
    };
  }

  @Patch(":id")
  async update(
    @Param("id") id: any,
    @Body() projectDto: UpdateProjectsDto
  ): Promise<any> {
    const data = await super.update(id, projectDto);

    if (data && (data as any).status === HttpStatus.NOT_FOUND) {
      return data;
    }

    return {
      status: HttpStatus.OK,
      data: data,
    };
  }
}
