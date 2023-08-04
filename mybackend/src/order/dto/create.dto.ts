import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ required: true })
  nama: string;

  @ApiProperty({ required: true })
  phone: string;

  @ApiProperty({ required: true })
  provinsi: string;

  @ApiProperty({ required: true })
  kota: string;

  @ApiProperty({ required: true })
  alamat: string;

  @ApiProperty({ required: true })
  kurir: string;

  @ApiProperty({ required: true })
  shippingMethod: string;

  @ApiProperty({ required: true })
  shippingCost: number;

  @ApiProperty({ required: true })
  @IsString()
  totalProduct: string;

  @ApiProperty({ required: true })
  @IsNumber()
  totalPrice: number;
}
