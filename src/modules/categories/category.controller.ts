/* eslint-disable @typescript-eslint/require-await */
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CategoriesService } from './category.service';

@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoryController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAll() {
    return this.categoriesService.findAll();
  }

  @Post()
  async create(
    @Body() body: { name: string; type: 'expense' | 'income'; icon?: string },
  ) {
    return this.categoriesService.create(body.name, body.type, body.icon);
  }
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { name?: string; icon?: string },
  ) {
    return this.categoriesService.updateCategory(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.categoriesService.deleteCategory(id);
  }
}
