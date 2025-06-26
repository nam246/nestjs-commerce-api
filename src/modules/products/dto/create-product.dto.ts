import { Type } from 'class-transformer';
import { IsString, IsNumber, IsOptional, IsJSON } from 'class-validator';

export class CreateProductDto {
    @IsNumber()
    @Type(() => Number)
    code?: number;

    @IsString()
    name: string;

    @IsJSON()
    @IsOptional()
    image?: string;

    @IsNumber()
    @Type(() => Number)
    price: number;

    @IsNumber()
    @Type(() => Number)
    priceSale: number;
}