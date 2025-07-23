import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppDataSource } from "./data-source";
import { ClientsModule } from './clients/clients.module';
import { ProjectsModule } from './projects/projects.module';
import { CreateTicketsModule } from './create-tickets/create-tickets.module';
import { GenerateTicketModule } from './generate-ticket/generate-ticket.module';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource), AuthModule, ClientsModule, ProjectsModule, CreateTicketsModule, GenerateTicketModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
