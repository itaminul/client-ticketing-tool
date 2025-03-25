import { Body, Controller, HttpStatus, Post, Query, UseInterceptors } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { Users } from "src/entities/users";
import { ResponseDto } from "src/dto/response.dto";
import { PaginationDto } from "src/dto/pagination.dto";
import { MetadataDto } from "src/dto/metadata.dto";
import { ResponseInterceptor } from "src/interceptors/response.interceptor";

@Controller("auth")
@UseInterceptors(ResponseInterceptor) 
export class AuthController {
  constructor(public readonly authService: AuthService) {}

  @Post("register")
  async register(
    @Body() registerDto: RegisterDto
  ) {
    try {
      const results = await this.authService.register(registerDto);
      // Build the metadata information
      return {
        status: HttpStatus.OK,
        message: 'Request successful',
        data: results, // Returning registered user data
        error: null,
        pagination: null,
      };
    } catch (error) {
      throw error;
    }
  }
  async login(loginDto: LoginDto) {
    try {
      const results = await this.authService.login(loginDto);
      return results;
    } catch (error) {
      console.log(error);
    }
  }
}
