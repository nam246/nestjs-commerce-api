import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostCategoryDto } from './dto/create-post-category.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PostCategoriesService {
  constructor(private prisma: PrismaService) {}

  async gets(dto: PaginationDto) {
    const { page, limit, cursor } = dto;

    const where = {};

    const [data, total] = await this.prisma.$transaction([
      this.prisma.postCategory.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { id: 'asc' },
      }),

      this.prisma.postCategory.count({ where }),
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

  async getById(id: number) {
    try {
      const record = await this.prisma.postCategory.findFirst({
        where: {
          id: id,
        },
      });

      if (!record) {
        throw new NotFoundException(`Parent category with ID ${id} not found`);
      }

      return record;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to get category by ID: ${error.message}`,
      );
    }
  }

  async create(currentUser: any, dto: CreatePostCategoryDto) {
    try {
      // Kiểm tra nếu có parentId thì nó phải tồn tại
      if (dto.parentId) {
        const parentCategory = await this.prisma.postCategory.findUnique({
          where: { id: dto.parentId },
          select: { id: true }, // Chỉ lấy ID, tránh truy vấn thừa
        });

        if (!parentCategory) {
          throw new NotFoundException(
            `Parent category with ID ${dto.parentId} not found`,
          );
        }
      }

      // Tạo danh mục mới
      return await this.prisma.postCategory.create({
        data: {
          name: dto.name.trim(), // Trim để tránh lỗi dữ liệu
          slug: dto.name
            .toLocaleLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-'),
          userCreated: currentUser.sub,
          parentId: dto.parentId || null, // Đảm bảo không để undefined
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to create category: ${error.message}`,
      );
    }
  }

  async delete(id: number) {
    return this.prisma.postCategory.delete({
      where: {
        id: id,
      },
    });
  }
}
