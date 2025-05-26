import { Controller, Get, HttpStatus, Query } from "@nestjs/common";
import { ProjectsService } from "./projects.service";

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

  
}
