import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/entities/users";
import { JwtService } from "@nestjs/jwt";
import { Roles } from "src/entities/role";

@Module({
  imports: [TypeOrmModule.forFeature([Users, Roles])],
  providers: [JwtService, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
