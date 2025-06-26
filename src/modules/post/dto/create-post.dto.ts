import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Type, Transform } from "class-transformer";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    excerpt?: string;

    @IsString()
    @IsOptional()
    content?: string;

    @IsString()
    @IsOptional()
    image?: string;

    @IsBoolean()
    public: boolean = false;

    @IsBoolean()
    status: boolean = false;

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    order?: number;

    @IsString()
    @IsOptional()
    seoTitle?: string;

    @IsString()
    @IsOptional()
    seoDescription?: string;

    @IsString()
    @IsOptional()
    seoKeywords?: string;

    @IsArray()
    @IsNumber({}, { each: true })
    @Transform(({ value }) => value.map(Number))
    @IsOptional()
    categoriesIds?: number[]
}