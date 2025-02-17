import { IsString, IsEnum, IsOptional, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { BlockType } from '../interfaces/IBlock';

export class CreateBlockImageDto {
    @IsString()
    url: string;

    @IsString()
    @IsOptional()
    alt?: string;

    @IsNumber()
    @IsOptional()
    width?: number;

    @IsNumber()
    @IsOptional()
    height?: number;

    @IsNumber()
    @IsOptional()
    order?: number;
}

export class CreateBlockVideoDto {
    @IsString()
    url: string;

    @IsString()
    @IsOptional()
    alt?: string;

    @IsNumber()
    @IsOptional()
    width?: number;

    @IsNumber()
    @IsOptional()
    height?: number;
}

export class CreateBlockDto {
    @IsString()
    name: string;

    @IsString()
    content: string;

    @IsString()
    @IsOptional()
    headline?: string;

    @IsEnum(BlockType)
    type: BlockType;

    @IsOptional()
    urls?: any;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateBlockImageDto)
    @IsOptional()
    images?: CreateBlockImageDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateBlockVideoDto)
    @IsOptional()
    videos?: CreateBlockVideoDto[];
}
