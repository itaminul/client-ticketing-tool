import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/entities/users";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
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
        name: username,
      },
      relations: ["roles"],
    });
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
      roles: user.roles.map((role) => role.name),
    };
    return {
      access_toke: this.jwtServiec.sign(payload),
    };
  }
}
