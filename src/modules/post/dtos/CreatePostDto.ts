import { IsString, IsBoolean, IsNotEmpty, IsArray, IsInt } from 'class-validator';

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
    @IsInt({ each: true })
    categoryIds: number[];

    @IsInt()
    authorId: number;
}