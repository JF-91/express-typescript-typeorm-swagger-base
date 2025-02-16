import { IsEmail, IsNotEmpty, IsString, MinLength, IsInt } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsInt()
    @IsNotEmpty()
    roleId: number;
}
