import { IsString, IsNotEmpty, IsArray, IsOptional, IsInt } from 'class-validator';

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsArray()
    @IsInt({ each: true })
    @IsOptional()
    permissionIds?: number[];
}
