import { IsString, IsOptional, IsInt, IsNotEmpty } from 'class-validator';

export class CreateProfileDto {
    @IsString()
    @IsOptional()
    bio?: string;

    @IsInt()
    @IsNotEmpty()
    userId: number;
}
