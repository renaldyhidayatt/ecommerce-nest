import { Module } from '@nestjs/common';
import { RajaOngkirService } from './raja_ongkir.service';
import { RajaOngkirController } from './raja_ongkir.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [RajaOngkirService],
  controllers: [RajaOngkirController],
})
export class RajaOngkirModule {}
