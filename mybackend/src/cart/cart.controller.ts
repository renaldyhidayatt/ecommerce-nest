import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from 'src/entities/Cart';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CartDto } from './cart.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Cart')
@UseGuards(JwtGuard)
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @ApiOperation({ summary: 'find all cart' })
  @Get()
  async index(@Request() req): Promise<Cart[]> {
    return this.cartService.findAllByUserId(req.user.id);
  }

  @ApiOperation({ summary: 'create cart' })
  @Post()
  async create(@Request() req, @Body() cartDto: CartDto): Promise<Cart> {
    return this.cartService.create(cartDto, req.user_id);
  }

  @ApiOperation({ summary: 'delete cart' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.cartService.delete(id);
  }

  @Post('delete-many')
  async deleteMany(
    @Body('cartIds', ParseIntPipe) cartIds: number[],
  ): Promise<void> {
    if (!cartIds || cartIds.length === 0) {
      throw new Error('No cart IDs provided');
    }
    console.log(cartIds);

    try {
      await this.cartService.deleteDeleteMany(cartIds);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
