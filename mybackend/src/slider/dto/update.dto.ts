import { ApiProperty } from '@nestjs/swagger';

export class UpdateSliderDto {
  @ApiProperty({ required: true })
  nama: string;

  @ApiProperty({ required: true, type: 'string', format: 'binary' })
  file: any;
}
