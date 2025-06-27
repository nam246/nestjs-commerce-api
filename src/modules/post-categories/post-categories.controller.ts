import {
  Controller,
  Get,
  Post,
  Delete,
  Query,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { PostCategoriesService } from './post-categories.service';
import { CreatePostCategoryDto } from './dto/create-post-category.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';

@Controller('posts-category')
export class PostsCategoryController {
  constructor(private postCategoriesService: PostCategoriesService) {}

  @Get()
  async gets(@Query() dto: PaginationDto) {
    return await this.postCategoriesService.gets(dto);
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.postCategoriesService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@CurrentUser() currentUser, @Body() dto: CreatePostCategoryDto) {
    return await this.postCategoriesService.create(currentUser, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.postCategoriesService.delete(id);
  }
}
