import { Controller, Get, Post, Delete, Query, Body, Param, UseGuards } from '@nestjs/common';
import { PostsCategoryService } from './post-categories.service';
import { CreatePostsCategoryDto } from './dto/create-post-category.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';

@Controller('posts-category')
export class PostsCategoryController {
    constructor(private postsCategoryService: PostsCategoryService) { }

    @Get()
    async gets(@Query() dto: PaginationDto) {
        return await this.postsCategoryService.gets(dto);
    }

    @Get(':id')
    async getById(@Param('id') id: number) {
        return await this.postsCategoryService.getById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@CurrentUser() CurrentUser, @Body() dto: CreatePostsCategoryDto) {
        return await this.postsCategoryService.create(CurrentUser, dto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.postsCategoryService.delete(id);
    }
}
