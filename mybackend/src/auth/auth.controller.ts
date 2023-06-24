import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateUser } from 'src/user/dto/create.dto';
import { JwtGuard } from './guard/jwt.guard';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from './guard/role.guard';
import { Role } from './decorator/role.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() register: CreateUser) {
    return await this.authService.register(register);
  }

  @Post('/login')
  async login(@Body() login: LoginDto) {
    const token = await this.authService.login(login);
    return { token };
  }

  @Get('/me')
  @UseGuards(JwtGuard, RoleGuard)
  @Role('administrator')
  cekUser(@Request() req) {
    return req.user;
  }
}
