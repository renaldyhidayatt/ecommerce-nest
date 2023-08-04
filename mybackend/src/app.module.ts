import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './entities/User';
import { Role } from './entities/Role';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { Category } from './entities/Category';
import { Product } from './entities/Product';
import { Slider } from './entities/Slider';
import { Order } from './entities/Order';
import { SliderModule } from './slider/slider.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { OrderModule } from './order/order.module';
import { AdminModule } from './admin/admin.module';
import { CartModule } from './cart/cart.module';
import { RajaOngkirModule } from './raja_ongkir/raja_ongkir.module';
import { Cart } from './entities/Cart';
import { MidtransModule } from './midtrans/midtrans.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
      renderPath: 'public',
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Role, Category, Product, Slider, Order, Cart],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    RoleModule,
    ProductModule,
    CategoryModule,
    SliderModule,
    OrderModule,
    AdminModule,
    CartModule,
    RajaOngkirModule,
    MidtransModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
