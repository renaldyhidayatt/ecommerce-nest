import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { RajaOngkirService } from './raja_ongkir.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Raja-ongkir')
@ApiBearerAuth()
@UseGuards()
@Controller('raja-ongkir')
export class RajaOngkirController {
  constructor(private rajaOngkirService: RajaOngkirService) {}

  @Get()
  async getProvinci() {
    return this.rajaOngkirService.getProvinsi();
  }

  @Get('/kota/:provId')
  async getCity(@Param('provId') provId: number) {
    return this.rajaOngkirService.getCity(provId);
  }

  @Get('/ongkos/:asal/:tujuan/:berat/:kurir')
  async getOngkos(
    @Param('asal') asal: string,
    @Param('tujuan') tujuan: string,
    @Param('berat') berat: number,
    @Param('kurir') kurir: string,
  ) {
    return this.rajaOngkirService.getCost(asal, tujuan, berat, kurir);
  }
}
