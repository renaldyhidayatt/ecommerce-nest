import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MidtransService } from './midtrans.service';
import { MidtransDto } from './midtrans.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@ApiTags('Midtrans')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('midtrans')
export class MidtransController {
  constructor(private midtransService: MidtransService) {}

  @Post('/transaction')
  async createTransaction(@Body() dto: MidtransDto) {
    return this.midtransService.createTransaction(dto);
  }
}
