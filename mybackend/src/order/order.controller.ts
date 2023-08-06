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
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create.dto';
import { Order } from 'src/entities/Order';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Role } from 'src/auth/decorator/role.decorator';

@ApiTags('Order')
@ApiBearerAuth()
@UseGuards(JwtGuard, RoleGuard)
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('/findUser/:id')
  async findByuserId(@Param('id') id: number): Promise<Order[]> {
    return this.orderService.findByByIdUser(id);
  }

  @Post('/create')
  async createOrder(
    @Request() req,
    @Body() dto: CreateOrderDto,
  ): Promise<Order> {
    console.log(dto);
    return await this.orderService.create(dto, req.user.user_id);
  }

  @Get()
  async findAll(): Promise<Order[]> {
    return await this.orderService.findAll();
  }

  @Role('administrator')
  @ApiOperation({ summary: 'delete order' })
  @Delete('/delete/:id')
  async deleteOrder(@Param('id') id: string) {
    return await this.orderService.deleteById(id);
  }
}
