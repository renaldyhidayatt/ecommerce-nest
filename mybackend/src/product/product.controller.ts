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
import { ProductService } from './product.service';
import { Product } from 'src/entities/Product';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create.dto';
import { CartDto } from './dto/cart.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Role } from 'src/auth/decorator/role.decorator';

@ApiTags('Product')
@ApiBearerAuth()
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'find all product' })
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'find by id product' })
  findById(@Param('id') id: number): Promise<Product> {
    return this.productService.findById(id);
  }

  @Get('/slug/:slug')
  @ApiOperation({ summary: 'find by slug product' })
  findBySlug(@Param('slug') slug: string): Promise<Product> {
    return this.productService.findBySlug(slug);
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Role('administrator')
  @Post('/create')
  @ApiOperation({ summary: 'create product' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createProduct: CreateProductDto,
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
    return this.productService.createProduct(createProduct, file);
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Role('administrator')
  @Put('/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'update product' })
  updateById(
    @Param('id') id: number,
    @Body() updateProduct: CreateProductDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<Product> {
    return this.productService.updateProduct(id, updateProduct, file);
  }

  @UseGuards(JwtGuard)
  @Post('/updatequantity')
  @ApiOperation({ summary: 'update quantity berdasarkan cart' })
  updateQuantity(@Body('cart') cart: CartDto[]) {
    return this.productService.updateQuantity(cart);
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Role('administrator')
  @Delete(':id')
  @ApiOperation({ summary: 'delete product by id' })
  deleteById(@Param('id') id: number) {
    return this.productService.deleteProduct(id);
  }
}
