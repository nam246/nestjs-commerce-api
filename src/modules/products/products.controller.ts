import { Controller, Get, Post, Patch, Delete, UseInterceptors, Body, BadRequestException, UploadedFiles, UseGuards, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('image', 5, {
        storage: diskStorage({
            destination: './uploads',  // Thư mục lưu file
            filename: (req, file, cb) => {
                cb(null, `${Date.now()}-${file.originalname}`);
            },
        }),
        limits: { fileSize: 2 * 1024 * 1024 }, // Giới hạn 2MB
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                return cb(new BadRequestException('Only image files are allowed!'), false);
            }
            cb(null, true);
        },
    }))
    async create(@CurrentUser() CurrentUser, @UploadedFiles() files: Express.Multer.File[], @Body() dto: CreateProductDto) {
        return this.productsService.create(CurrentUser, files, dto);
    }

    @Get()
    async gets(@Query() dto: PaginationDto) {
        return await this.productsService.gets(dto);
    }

    @Get(':id')
    async getById(id: number) {
        return this.productsService.getById(id);
    }
}
