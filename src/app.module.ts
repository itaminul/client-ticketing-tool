import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppDataSource } from "./data-source";
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource), AuthModule, ClientsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
