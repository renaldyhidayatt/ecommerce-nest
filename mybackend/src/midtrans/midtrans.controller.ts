import { Body, Controller, Post } from '@nestjs/common';
import { MidtransService } from './midtrans.service';
import { MidtransDto } from './midtrans.dto';

@Controller('midtrans')
export class MidtransController {
  constructor(private midtransService: MidtransService) {}

  @Post('/transaction')
  async createTransaction(@Body() dto: MidtransDto) {
    return this.midtransService.createTransaction(dto);
  }
}
