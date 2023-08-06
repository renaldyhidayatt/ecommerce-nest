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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { RoleDto } from './role.dto';
import { Role } from 'src/entities/Role';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Role as RoleDecorator } from '../auth/decorator/role.decorator';

@ApiTags('Role')
@ApiBearerAuth()
@UseGuards(JwtGuard, RoleGuard)
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @RoleDecorator('administrator')
  @Post('/create')
  create(@Body() createRole: RoleDto): Promise<Role> {
    return this.roleService.createRole(createRole);
  }

  @RoleDecorator('administrator')
  @Get()
  findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @RoleDecorator('administrator')
  @Get(':id')
  findById(@Param('id') id: number): Promise<Role> {
    return this.roleService.findById(id);
  }

  @RoleDecorator('administrator')
  @Put(':id')
  updateById(@Param('id') id: number, @Body() updateRole: RoleDto) {
    return this.roleService.updateById(id, updateRole);
  }

  @RoleDecorator('administrator')
  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.roleService.deleteById(id);
  }
}
