import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { PostModule } from './modules/post/post.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { LikeModule } from './modules/like/like.module';
import { ProductsModule } from './modules/products/products.module';
import { PostsCategoryModule } from './modules/posts-category/posts-category.module';
import { UploadController } from './modules/upload/upload.controller';

@Module({
  imports: [
    UsersModule,
    PostModule,
    PrismaModule,
    AuthModule,
    LikeModule,
    ProductsModule,
    PostsCategoryModule,
  ],
  controllers: [UploadController]
})
export class AppModule { }
