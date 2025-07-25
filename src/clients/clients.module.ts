import { Module } from "@nestjs/common";
import { ClientsService } from "./clients.service";
import { ClientsController } from "./clients.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Client } from "src/entities/client";

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  providers: [ClientsService],
  controllers: [ClientsController],
})
export class ClientsModule {}
