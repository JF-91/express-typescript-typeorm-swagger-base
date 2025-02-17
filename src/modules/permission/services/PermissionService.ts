import { Service } from 'typedi';
import { CreatePermissionDto } from '../dtos/CreatePermissionDto';
import { IPermission } from '../interfaces/IPermission';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Service()
class PermissionService {
    async getAllPermissions(): Promise<IPermission[]> {
        return prisma.permission.findMany();
    }

    async getPermissionById(id: number): Promise<IPermission | null> {
        return prisma.permission.findUnique({ where: { id } });
    }

    async createPermission(permissionData: CreatePermissionDto): Promise<IPermission> {
        return prisma.permission.create({ data: permissionData });
    }

    async updatePermission(id: number, permissionData: CreatePermissionDto): Promise<IPermission> {
        return prisma.permission.update({
            where: { id },
            data: permissionData,
        });
    }

    async deletePermission(id: number): Promise<IPermission> {
        return prisma.permission.delete({ where: { id } });
    }
}

export default PermissionService;
