import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/entities/Cart';
import { Repository } from 'typeorm';
import { CartDto } from './cart.dto';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    private userService: UserService,
    private productService: ProductService,
  ) {}

  async findAllByUserId(userId: number): Promise<Cart[]> {
    return this.cartRepository.find({ where: { user: { user_id: userId } } });
  }

  async create(cart: CartDto, user_id: number): Promise<Cart> {
    try {
      const product = await this.productService.findById(cart.product_id);
      const user = await this.userService.findById(user_id);

      const createCart = this.cartRepository.create({
        name: cart.name,
        price: cart.price,
        image: cart.image_product,
        quantity: cart.quantity,
        product: product,
        user: user,
        weight: cart.weight,
      });

      return this.cartRepository.save(createCart);
    } catch (error) {
      console.log(error);
      throw new NotFoundException(error);
    }
  }

  async delete(cartId: number): Promise<void> {
    const cart = await this.cartRepository.findOne({
      where: { cart_id: cartId },
    });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    await this.cartRepository.remove(cart);
  }

  async deleteDeleteMany(cartIds: number[]): Promise<void> {
    if (!cartIds || cartIds.length === 0) {
      throw new Error('No cart ids');
    }
    for (const cartId of cartIds) {
      const cart = await this.cartRepository.findOne({
        where: {
          cart_id: cartId,
        },
      });

      if (!cart) {
        throw new NotFoundException(`Cart with ID ${cartId} not found`);
      }

      await this.cartRepository.remove(cart);
    }
  }
}
