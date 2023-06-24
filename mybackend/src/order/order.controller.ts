import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { OrderService } from './order.service';
import * as ExcelJs from 'exceljs';
import * as fs from 'fs';
import { CreateOrderDto } from './dto/create.dto';
import { Order } from 'src/entities/Order';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('export/excel')
  async exportExcel(@Res() res: Response) {
    const orders = await this.orderService.findAll();

    const workbook = new ExcelJs.Workbook();
    const worksheet = workbook.addWorksheet('Order Report');

    worksheet.columns = [
      { header: 'Order ID', key: 'id', width: 15 },
      { header: 'Email', key: 'email', width: 20 },
      { header: 'User ID', key: 'user_id', width: 15 },
      { header: 'Country Code', key: 'country_code', width: 15 },
      { header: 'Total Price', key: 'total_price', width: 15 },
      { header: 'Total Product', key: 'total_product', width: 15 },
    ];

    orders.forEach((order) => {
      worksheet.addRow({
        id: order.order_id,
        email: order.email,
        user_id: order.user.user_id,
        country_code: order.country_code,
        total_price: order.total_price,
        total_product: order.total_product,
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=order_report.xlsx',
    );

    res.send(buffer);
  }

  @Get('/findUser/:id')
  async findByuserId(@Param('id') id: number): Promise<Order[]> {
    return this.orderService.findByByIdUser(id);
  }

  @Post('/create')
  async createOrder(@Body() dto: CreateOrderDto): Promise<Order> {
    return await this.orderService.create(dto);
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
