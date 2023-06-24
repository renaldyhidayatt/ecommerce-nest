import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/Order';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { User } from 'src/entities/User';
import { Role } from 'src/auth/decorator/role.decorator';
import { RoleService } from 'src/role/role.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Role]), UserModule],
  providers: [OrderService, UserService, RoleService],
  controllers: [OrderController],
})
export class OrderModule {}
