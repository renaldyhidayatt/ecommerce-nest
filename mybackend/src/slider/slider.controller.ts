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
import { SliderService } from './slider.service';
import { Slider } from 'src/entities/Slider';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateSliderDto } from './dto/create.dto';
import { UpdateSliderDto } from './dto/update.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Role } from 'src/auth/decorator/role.decorator';

@ApiTags('Slider')
@Controller('slider')
export class SliderController {
  constructor(private sliderService: SliderService) {}

  @Get()
  findAll(): Promise<Slider[]> {
    return this.sliderService.findAll();
  }

  @Get('/:id')
  findById(@Param('id') id: number): Promise<Slider> {
    return this.sliderService.findById(id);
  }

  @Post('/create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createSlider: CreateSliderDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<Slider> {
    return this.sliderService.createSlider(createSlider, file);
  }

  @Put('/:id')
  @UseGuards(JwtGuard, RoleGuard)
  @Role('administrator')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  updateById(
    @Param('id') id: number,
    @Body() updateSlider: UpdateSliderDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<any> {
    return this.sliderService.updateSlider(id, updateSlider, file);
  }

  @Delete(':id')
  @UseGuards(JwtGuard, RoleGuard)
  @Role('administrator')
  deleteById(@Param('id') id: number) {
    return this.sliderService.deleteSlider(id);
  }
}
