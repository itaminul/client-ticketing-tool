import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { ResponseInterceptor } from "src/interceptors/response.interceptor";

@Controller("auth")
@UseInterceptors(ResponseInterceptor)
export class AuthController {
  constructor(public readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() registerDto: RegisterDto) {
    try {
      const results = await this.authService.register(registerDto);
      // Build the metadata information
      return {
        status: HttpStatus.OK,
        message: "Request successful",
        data: results, // Returning registered user data
        error: null,
        pagination: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Post("login")
  async login(loginDto: LoginDto) {
    try {
      const results = await this.authService.login(loginDto);
      return results;
    } catch (error) {
      console.log(error);
    }
  }

  @Get("list")
  async getAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10
  ) {
    try {
      const data = await this.authService.getAll(page, limit);
      return {
        status: HttpStatus.OK,
        message: "Request successful",
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
