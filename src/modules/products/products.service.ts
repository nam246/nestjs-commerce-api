import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import generateSlug from 'src/shared/generate-slug';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(
    currentUser: any,
    files: Express.Multer.File[],
    dto: CreateProductDto,
  ) {
    const imagePaths = files?.length ? files.map((file) => file.path) : [];

    return await this.prisma.product.create({
      data: {
        name: dto.name,
        code: dto.code,
        slug: generateSlug(dto.name),
        userCreated: currentUser.sub,
        image: imagePaths,
        price: dto.price,
        priceSale: dto.priceSale,
      },
    });
  }

  async gets(dto: PaginationDto) {
    const { page, limit, cursor } = dto;

    const where = {};

    const [data, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { id: 'asc' },
      }),

      this.prisma.product.count({ where }),
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
    return 'get product by' + id;
  }
}
