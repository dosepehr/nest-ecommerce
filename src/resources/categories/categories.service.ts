import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  create(data: CreateCategoryDto) {
    const newCategory = this.categoryRepository.create(data);
    return this.categoryRepository.save(newCategory);
  }

  findAll() {
    return this.categoryRepository.find({ relations: ['products'] });
  }

  findOne(id: number) {
    return this.categoryRepository.findOne({
      where: { id },
      relations: ['products'],
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  async removeOnlyCategory(id: number) {
    const category = await this.findOne(id);
    console.log(category);
    if (!category) {
      throw new NotFoundException('Not Found');
    }
    category.products = [];
    await this.categoryRepository.save(category);
    return this.categoryRepository.remove(category);
  }
}
