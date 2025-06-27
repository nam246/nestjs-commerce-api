import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Query,
  UseGuards,
  UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdatePostsCategoriesDto } from './dto/update-posts-categories.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@CurrentUser() user, @Body() dto: CreatePostDto) {
    return this.postService.create(user, dto);
  }

  @Get()
  async gets(@Query() dto: PaginationDto) {
    return this.postService.gets(dto);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.postService.getById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', {}))
  async update(
    @Param('id') id: number,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() dto: UpdatePostDto,
  ) {
    return this.postService.update(+id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async updateCategories(@Query() dto: UpdatePostsCategoriesDto) {
    return this.postService.updateCategories(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
