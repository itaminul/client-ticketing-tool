import { Module } from "@nestjs/common";
import { ProjectsController } from "./projects.controller";
import { ProjectsService } from "./projects.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Projects } from "src/entities/projects";
import { Client } from "src/entities/client";

@Module({
  imports: [TypeOrmModule.forFeature([Projects, Client])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
