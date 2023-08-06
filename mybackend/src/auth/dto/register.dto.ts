import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    required: true,
    example: 'John',
    description: 'User first name',
  })
  @IsString()
  firstname: string;

  @ApiProperty({
    required: true,
    example: 'Doe',
    description: 'User last name',
  })
  @IsString()
  lastname: string;

  @ApiProperty({
    required: true,
    example: 'user@example.com',
    description: 'User email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    example: 'password123',
    description: 'User password',
  })
  @IsString()
  @Length(6, 20)
  password: string;
}
