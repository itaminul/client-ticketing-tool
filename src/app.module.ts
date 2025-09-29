import { Module } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";
import { AppDataSource } from "./data-source";
import { ClientsModule } from "./clients/clients.module";
import { ProjectsModule } from "./projects/projects.module";
import { CreateTicketsModule } from "./create-tickets/create-tickets.module";
import { GenerateTicketModule } from "./generate-ticket/generate-ticket.module";
import { JwtService } from "@nestjs/jwt";
import { JwtStrategy } from "./auth/jwt.strategy";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource),
    AuthModule,
    ClientsModule,
    ProjectsModule,
    CreateTicketsModule,
    GenerateTicketModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
