import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RoleDto {
  @ApiProperty({ required: true })
  @IsString()
  role: string;
}
