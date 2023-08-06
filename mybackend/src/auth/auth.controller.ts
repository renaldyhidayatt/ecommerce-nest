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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from './guard/jwt.guard';
import { RoleGuard } from './guard/role.guard';
import { Role } from './decorator/role.decorator';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() register: RegisterDto) {
    return await this.authService.register(register);
  }

  @Post('/login')
  async login(@Body() login: LoginDto) {
    const token = await this.authService.login(login);
    return { token };
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard, RoleGuard)
  @Role('administrator')
  @Get('/me')
  cekUser(@Request() req) {
    return req.user;
  }
}
