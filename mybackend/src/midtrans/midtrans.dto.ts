import { ApiProperty } from '@nestjs/swagger';

export class MidtransDto {
  @ApiProperty({ required: true })
  gross_amount: number;

  @ApiProperty({ required: true })
  firstname: string;

  @ApiProperty({ required: true })
  lastName: string;

  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: true })
  phone: string;
}
