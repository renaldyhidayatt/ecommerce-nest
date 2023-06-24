import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { RoleDto } from './role.dto';
import { Role } from 'src/entities/Role';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Role as Ro } from '../auth/decorator/role.decorator';

@ApiTags('Role')
@UseGuards(JwtGuard, RoleGuard)
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('/create')
  @Ro('administrator')
  create(@Body() createRole: RoleDto): Promise<Role> {
    return this.roleService.createRole(createRole);
  }

  @Get()
  @Ro('administrator')
  findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  @Ro('administrator')
  findById(@Param('id') id: number): Promise<Role> {
    return this.roleService.findById(id);
  }

  @Put(':id')
  @Ro('administrator')
  updateById(@Param('id') id: number, @Body() updateRole: RoleDto) {
    return this.roleService.updateById(id, updateRole);
  }

  @Delete(':id')
  @Ro('administrator')
  deleteById(@Param('id') id: number) {
    return this.roleService.deleteById(id);
  }
}
