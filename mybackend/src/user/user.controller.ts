import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from 'src/entities/User';
import { CreateUser } from './dto/create.dto';
import { UpdateUserDto } from './dto/update.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@ApiTags('User')
@Controller('user')
// @UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  create(@Body() createUser: CreateUser): Promise<User> {
    return this.userService.create(createUser);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<User> {
    return this.userService.findById(id);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  updateById(
    @Param('id') id: number,
    @Body() updateUser: UpdateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.userService.updateById(id, updateUser, file);
  }

  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.userService.deleteById(id);
  }
}
