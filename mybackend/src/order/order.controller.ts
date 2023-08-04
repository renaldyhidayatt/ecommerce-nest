import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { OrderService } from './order.service';
import * as ExcelJs from 'exceljs';
import * as fs from 'fs';
import { CreateOrderDto } from './dto/create.dto';
import { Order } from 'src/entities/Order';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('/findUser/:id')
  async findByuserId(@Param('id') id: number): Promise<Order[]> {
    return this.orderService.findByByIdUser(id);
  }

  @UseGuards(JwtGuard)
  @Post('/create')
  async createOrder(
    @Request() req,
    @Body() dto: CreateOrderDto,
  ): Promise<Order> {
    return await this.orderService.create(req.user.user_id, dto);
  }

  @Get()
  async findAll(): Promise<Order[]> {
    return await this.orderService.findAll();
  }

  @Delete('/delete/:id')
  async deleteOrder(@Param('id') id: string) {
    return await this.orderService.deleteById(id);
  }
}
