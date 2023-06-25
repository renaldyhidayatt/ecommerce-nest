import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { Order } from 'src/entities/Order';
import { Product } from 'src/entities/Product';

@Module({
  imports: [TypeOrmModule.forFeature([User, Order, Product])],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
