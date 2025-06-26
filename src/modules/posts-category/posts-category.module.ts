import { Module } from '@nestjs/common';
import { PostsCategoryService } from './posts-category.service';
import { PostsCategoryController } from './posts-category.controller';

@Module({
  providers: [PostsCategoryService],
  controllers: [PostsCategoryController]
})
export class PostsCategoryModule {}
