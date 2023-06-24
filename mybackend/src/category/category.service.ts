import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/Category';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create.dto';
import * as fs from 'fs';
import { UpdateCategoryDto } from './dto/update.dto';
import slugify from 'slugify';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    try {
      const category = this.categoryRepository.find();

      return category;
    } catch (e) {
      throw new Error('Failed message: ' + e);
    }
  }

  async findById(id: number): Promise<Category> {
    try {
      const category = this.categoryRepository.findOne({
        where: {
          category_id: id,
        },
      });

      return category;
    } catch (e) {
      throw new Error('Failed message: ' + e);
    }
  }

  async findBySlug(slug: string): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOne({
        where: {
          slug_category: slug,
        },
        relations: ['products'],
      });

      return category;
    } catch (e) {
      throw new Error('Failed message: ' + e);
    }
  }

  async createCategory(dto: CreateCategoryDto, file: Express.Multer.File) {
    try {
      const byname = await this.findByName(dto.name);
      if (byname != null) {
        throw new Error('Failed name already exist');
      }

      const slug = slugify(dto.name, { lower: true });

      const createCategory = this.categoryRepository.create({
        nama_kategori: dto.name,
        image_category: file.path,
        slug_category: slug,
      });

      const saved = await this.categoryRepository.save(createCategory);

      return saved;
    } catch (e) {
      throw new Error('Failed message: ' + e);
    }
  }

  async updateCategory(
    id: number,
    dto: UpdateCategoryDto,
    file: Express.Multer.File,
  ) {
    try {
      const findById = await this.findById(id);

      if (findById == null) {
        throw new Error('Failed not found category');
      }

      if (findById.image_category) {
        fs.unlinkSync(findById.image_category);
      }
      const slug = slugify(dto.name, { lower: true });

      findById.nama_kategori = dto.name;
      findById.image_category = file.path;
      findById.slug_category = slug;

      const categoryUpdate = await this.categoryRepository.save(findById);

      return categoryUpdate;
    } catch (e) {
      throw new Error('Failed message: ' + e);
    }
  }

  async deleteCategory(id: number) {
    try {
      const categoryById = await this.findById(id);

      if (categoryById == null) {
        throw new Error('Failed not found category');
      }

      if (categoryById.image_category) {
        fs.unlinkSync(categoryById.image_category);
      }

      return await this.categoryRepository.remove(categoryById);
    } catch (e) {
      throw new Error('Failed message ' + e);
    }
  }

  async findByName(name: string): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOne({
        where: {
          nama_kategori: name,
        },
      });

      return category;
    } catch (e) {
      throw new Error('Failed message: ' + e);
    }
  }
}
