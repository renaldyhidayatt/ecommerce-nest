import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, Length } from 'class-validator';

export class CreateUser {
  @ApiProperty({ required: true })
  @IsString()
  firstname: string;

  @ApiProperty({ required: true })
  @IsString()
  lastname: string;

  @ApiProperty({ required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @Length(6, 20)
  password: string;
}
