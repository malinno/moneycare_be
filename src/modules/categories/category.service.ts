import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './category.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(name: string, type: 'expense' | 'income', icon?: string) {
    const category = new this.categoryModel({ name, type, icon });
    return category.save();
  }

  async findAll() {
    return this.categoryModel.find().exec();
  }

  async findById(id: string) {
    return this.categoryModel.findById(id).exec();
  }
  async updateCategory(id: string, body: { name?: string; icon?: string }) {
    return this.categoryModel.findByIdAndUpdate(id, body, { new: true }).exec();
  }

  async deleteCategory(id: string) {
    return this.categoryModel.findByIdAndDelete(id).exec();
  }
}
