import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/entities/Cart';
import { Product } from 'src/entities/Product';
import { ProductModule } from 'src/product/product.module';
import { ProductService } from 'src/product/product.service';
import { Category } from 'src/entities/Category';
import { CategoryModule } from 'src/category/category.module';
import { CategoryService } from 'src/category/category.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    ProductModule,
    CategoryModule,
    UserModule,
    TypeOrmModule.forFeature([Cart, Product, Category]),
  ],
  providers: [CartService, ProductService, CategoryService],
  controllers: [CartController],
})
export class CartModule {}
