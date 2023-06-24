import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from 'src/entities/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/entities/Role';
import { RoleModule } from 'src/role/role.module';
import { RoleService } from 'src/role/role.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    RoleModule,
    TypeOrmModule.forFeature([User, Role]),
    MulterModule.register({
      storage: diskStorage({
        destination: './public/upload/userprofile', // Specify the destination directory for uploaded files
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  providers: [UserService, RoleService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
