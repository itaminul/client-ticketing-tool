import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";

@Controller("auth")
export class AuthController {
  constructor(public readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() registerDto: RegisterDto) {
    try {
      const results = await this.authService.register(registerDto);
      return results;
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
