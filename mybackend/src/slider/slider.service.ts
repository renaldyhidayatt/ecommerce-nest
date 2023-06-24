import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Slider } from 'src/entities/Slider';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { CreateSliderDto } from './dto/create.dto';
import { UpdateSliderDto } from './dto/update.dto';

@Injectable()
export class SliderService {
  constructor(
    @InjectRepository(Slider) private sliderRepository: Repository<Slider>,
  ) {}

  async findAll(): Promise<Slider[]> {
    try {
      const slider = await this.sliderRepository.find();

      return slider;
    } catch (e) {
      throw new Error('Failed message: ' + e);
    }
  }

  async findById(id: number): Promise<Slider> {
    try {
      const slider = await this.sliderRepository.findOne({
        where: {
          slider_id: id,
        },
      });
      if (!slider) {
        throw new Error('Slider not found');
      }

      return slider;
    } catch (e) {
      throw new Error('Failed message: ' + e);
    }
  }

  async createSlider(
    dto: CreateSliderDto,
    file: Express.Multer.File,
  ): Promise<Slider> {
    try {
      const createSlider = this.sliderRepository.create({
        nama: dto.nama,
        image: file.path,
      });

      const saved = this.sliderRepository.save(createSlider);

      return saved;
    } catch (e) {
      throw new Error('Failed message: ' + e);
    }
  }

  async updateSlider(
    id: number,
    dto: UpdateSliderDto,
    file: Express.Multer.File,
  ) {
    try {
      const findById = await this.findById(id);

      if (findById == null) {
        throw new Error('Failed not found slider');
      }

      // if (findById.image) {
      //   fs.unlinkSync(findById.image);
      // }

      console.log(file.path);

      findById.nama = dto.nama;
      findById.image = file.path;

      await this.sliderRepository.save(findById);
    } catch (e) {
      throw new Error('Failed message: ' + e);
    }
  }

  async deleteSlider(id: number) {
    try {
      const slider = await this.findById(id);

      if (slider == null) {
        throw new Error('Failed not found product');
      }

      if (slider.image) {
        fs.unlinkSync(slider.image);
      }

      return await this.sliderRepository.remove(slider);
    } catch (e) {
      throw new Error('Failed message ' + e);
    }
  }
}
