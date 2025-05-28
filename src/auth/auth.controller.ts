import {
  UnauthorizedException,
  NotFoundException,
  InternalServerErrorException,
  Controller,
  Post,
  BadRequestException,
  Body,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { JwtPayload } from "./jwt-payload.interface";
import { use } from "passport";
import { Users } from "src/entities/users";
@Controller("auth")
export class AuthController {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly jwtService: JwtService
  ) {}

  /**
   * Validates user credentials
   * @param username
   * @param password
   * @returns user without password if valid
   * @throws NotAcceptableException if user not found
   * @throws UnauthorizedException if password is invalid
   */
  async validateUser(username: string, password: string) {
    // console.log("user name", username)
    // console.log("password", password)
    if (!password) {
      // throw error;
      throw new BadRequestException("Password must be provided");
    }

    try {
      const user = await this.usersRepository
        .createQueryBuilder("user")
        .addSelect("user.password")
        .where("user.username = :username", { username })
        .getOne();

      if (!user) {
        throw new NotFoundException("User not found");
      }

      if (!user.password) {
        throw new InternalServerErrorException(
          "Password hash missing from user record"
        );
      }

      const passwordValid = await bcrypt.compare(password, user.password);

      if (!passwordValid) {
        throw new UnauthorizedException("Invalid credentials with password");
      }

      const { password: _, ...result } = user;
      return result;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof UnauthorizedException ||
        error instanceof BadRequestException ||
        error instanceof InternalServerErrorException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        "Unexpected error validating user"
      );
    }
  }

  /**
   * Logs in a user and returns JWT token
   * @param loginDto
   * @returns access token and user info
   * @throws UnauthorizedException if login fails
   */

  @Post("/login")
  async login(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    try {
      const user = await this.validateUser(username, password);
      // Generate access token
      const payload = {
        username: user.username,
        sub: user.id,
       // roleName: user.roleName,
      };
      const access_token = this.jwtService.sign(payload);
      return {
        access_token,
      //  role: user.roleName,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Validates JWT payload
   * @param payload
   * @returns user if valid
   * @throws UnauthorizedException if invalid
   */
  async validateJwtPayload(payload: JwtPayload): Promise<Users> {
    try {
      const user = await this.usersRepository.findOne({
        where: { username: payload.username },
      });

      if (!user) {
        throw new UnauthorizedException("Invalid token");
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException("Invalid token");
    }
  }
}
