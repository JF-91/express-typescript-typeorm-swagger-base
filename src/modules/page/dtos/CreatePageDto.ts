import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreatePageDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    @IsNotEmpty()
    slug: string;

    @IsBoolean()
    @IsNotEmpty()
    published: boolean;
}
