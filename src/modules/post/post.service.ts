import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdatePostsCategoriesDto } from './dto/update-posts-categories.dto';
import generateSlug from 'src/shared/generate-slug';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(currentUser: any, dto: CreatePostDto) {
    return this.prisma.post.create({
      data: {
        title: dto.title,
        slug: generateSlug(dto.title),
        excerpt: dto.excerpt,
        content: dto.content,
        userCreated: currentUser.sub,
        categories: {
          create:
            dto.categoriesIds?.map((categoryId) => ({
              postsCategory: { connect: { id: categoryId } },
            })) || [],
        },
      },
    });
  }

  async gets(dto: PaginationDto) {
    const { page, limit, cursor } = dto;

    const where = {};

    const [data, total] = await this.prisma.$transaction([
      this.prisma.post.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { id: 'asc' },
      }),

      this.prisma.post.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async getPublished() {
    return await this.prisma.post.findMany({ where: { public: true } });
  }

  async getDraft() {
    return await this.prisma.post.findMany({ where: { public: false } });
  }

  async getById(id: number) {
    return await this.prisma.post.findUnique({ where: { id } });
  }

  async update(id: number, dto: UpdatePostDto) {
    const post = await this.prisma.post.findFirst({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return await this.prisma.post.update({
      where: { id: id },
      data: {
        title: dto.title,
        slug: dto.slug,
        excerpt: dto.excerpt,
        content: dto.content,
        image: dto.image,
        seoTitle: dto.seoTitle,
        seoDescription: dto.seoDescription,
        seoKeywords: dto.seoKeywords,
      },
    });
  }

  async updateCategories(dto: UpdatePostsCategoriesDto) {}

  async remove(id: number) {
    return await this.prisma.post.delete({ where: { id } });
  }
}
