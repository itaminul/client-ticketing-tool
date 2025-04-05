import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../entities/users";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private jwtServiec: JwtService
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userRepository.findOne({
      where: {
        username: username,
      },
    //  relations: ["roles"],
    });
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(registerDto: RegisterDto) {
    try {
      const existingUser = await this.userRepository.findOne({
        where: {
          username: registerDto.username,
        },
      });
      if (existingUser) {
        throw new ConflictException("User with this username already exists");
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);

      const userData = this.userRepository.create({
        ...registerDto,
        password: hashedPassword,
      });
      // Save the Resume userRepository
      const savedUserData = await this.userRepository.save(userData);
      return savedUserData;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.message,
          code: error.code,
          detail: error.default,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.validateUser(
        loginDto.username,
        loginDto.password
      );
      console.log("user", user);
      const payload = { username: user.username };
      const access_token = this.jwtServiec.sign(payload);
      console.log("access toke", access_token);
      return {
        access_token,
        username: user.username,
      };
    } catch (error) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: "Login failed: Invalid credentials",
        error: "Unauthorized",
      });
    }
  }

  async getAll(page: number = 1, limit: number = 10) {
    const [result, total] = await this.userRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      result: result,
      total,
    };
  }
}
