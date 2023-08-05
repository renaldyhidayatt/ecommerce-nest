import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/entities/User';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import PasswordHash from '../utils/hash';
import { CreateUser } from 'src/user/dto/create.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(dto: LoginDto): Promise<string> {
    const user = await this.userService.findByEmail(dto.email);

    if (user) {
      const valid = await PasswordHash.correctPassword(
        dto.password,
        user.password,
      );

      if (valid) {
        return this.generateToken(user);
      } else {
        throw new BadRequestException({
          message: 'Error Password',
        });
      }
    } else {
      throw new BadRequestException({
        message: 'Email not found',
      });
    }
  }

  async register(dto: CreateUser): Promise<User> {
    return this.userService.create(dto);
  }

  private generateToken(user: any): string {
    let dataToken = {
      id: user.user_id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
    };

    let secret = this.configService.get<string>('JWT_SECRET');
    let token = this.jwtService.sign(dataToken, { secret });

    return token;
  }
}
