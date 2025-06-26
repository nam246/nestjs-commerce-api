import { Module } from '@nestjs/common';
import { PostsCategoryService } from './post-categories.service';
import { PostsCategoryController } from './post-categories.controller';

@Module({
  providers: [PostsCategoryService],
  controllers: [PostsCategoryController]
})
export class PostsCategoryModule {}
