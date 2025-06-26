import { IsArray, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class UpdatePostsCategoriesDto {
    @IsNumber()
    @Type(() => Number)
    postId: number;

    @IsNumber()
    @IsArray()
    @Type(() => Number)
    postsCategoryIds?: number[]
}