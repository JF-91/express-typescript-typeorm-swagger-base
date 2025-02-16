import { IsString, IsNotEmpty, IsBoolean, IsArray, IsInt, ArrayNotEmpty, ArrayMinSize } from 'class-validator';

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsBoolean()
    @IsNotEmpty()
    published: boolean;

    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @IsInt({ each: true })
    categoryIds: number[];

    @IsInt()
    @IsNotEmpty()
    authorId: number;
}