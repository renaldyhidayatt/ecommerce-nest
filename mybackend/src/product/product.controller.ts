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
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from 'src/entities/Product';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create.dto';
import { CartDto } from './dto/cart.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<Product> {
    return this.productService.findById(id);
  }

  @Get('/slug/:slug')
  findBySlug(@Param('slug') slug: string): Promise<Product> {
    return this.productService.findBySlug(slug);
  }

  @Post('/create')
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

  @Put('/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
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

  @Post('/updatequantity')
  updateQuantity(@Body('cart') cart: CartDto[]) {
    return this.productService.updateQuantity(cart);
  }

  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.productService.deleteProduct(id);
  }
}
