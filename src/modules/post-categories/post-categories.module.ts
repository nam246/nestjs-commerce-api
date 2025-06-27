import { Module } from '@nestjs/common';
import { PostCategoriesService } from './post-categories.service';
import { PostsCategoryController } from './post-categories.controller';

@Module({
  providers: [PostCategoriesService],
  controllers: [PostsCategoryController],
})
export class PostsCategoryModule {}
