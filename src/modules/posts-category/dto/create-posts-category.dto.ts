import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePostsCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @Type(() => Number) // Chuyển đổi string từ request thành number
    @IsOptional()
    parentId?: number;
}