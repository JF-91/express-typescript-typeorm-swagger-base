import { IsEmail, IsOptional, IsString, MinLength, IsInt } from 'class-validator';

export class UpdateUserDto {
    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @MinLength(6)
    @IsOptional()
    password?: string;

    @IsInt()
    @IsOptional()
    roleId?: number;
}
