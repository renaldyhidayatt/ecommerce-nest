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
import { CategoryService } from './category.service';
import { Category } from 'src/entities/Category';
import { CreateCategoryDto } from './dto/create.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateCategoryDto } from './dto/update.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Role } from 'src/auth/decorator/role.decorator';

@ApiTags('Category')
@ApiBearerAuth()
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'find all category' })
  @Get()
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @ApiOperation({ summary: 'find id category' })
  @Get(':id')
  findById(@Param('id') id: number): Promise<Category> {
    return this.categoryService.findById(id);
  }

  @ApiOperation({ summary: 'find slug category' })
  @Get('/slug/:slug')
  findBySlug(@Param('slug') slug: string): Promise<Category> {
    return this.categoryService.findBySlug(slug);
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Role('administrator')
  @ApiOperation({ summary: 'create category' })
  @Post('/create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createCategory: CreateCategoryDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<Category> {
    return this.categoryService.createCategory(createCategory, file);
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Role('administrator')
  @ApiOperation({ summary: 'update category' })
  @ApiConsumes('multipart/form-data')
  @Put('/:id')
  @UseInterceptors(FileInterceptor('file'))
  updateById(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<Category> {
    return this.categoryService.updateCategory(id, updateCategoryDto, file);
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Role('administrator')
  @ApiOperation({ summary: 'delete category' })
  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
