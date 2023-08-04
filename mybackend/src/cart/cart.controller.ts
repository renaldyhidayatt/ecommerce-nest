import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from 'src/entities/Cart';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CartDto } from './cart.dto';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @UseGuards(JwtGuard)
  @Get()
  async index(@Request() req): Promise<Cart[]> {
    return this.cartService.findAllByUserId(req.user.id);
  }

  @UseGuards(JwtGuard)
  @Post()
  async create(@Request() req, @Body() cartDto: CartDto): Promise<Cart> {
    return this.cartService.create(cartDto, req.user_id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.cartService.delete(id);
  }
}
