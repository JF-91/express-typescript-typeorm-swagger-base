import { Service } from 'typedi';
import { CreateRoleDto } from '../dtos/CreateRoleDto';
import { IRole } from '../interfaces/IRole';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Service()
class RoleService {
    async getAllRoles(): Promise<IRole[]> {
        return prisma.role.findMany({
            include: {
                users: true,
                permissions: true
            }
        });
    }

    async getRoleById(id: number): Promise<IRole | null> {
        return prisma.role.findUnique({
            where: { id },
            include: {
                users: true,
                permissions: true
            }
        });
    }

    async createRole(roleData: CreateRoleDto): Promise<IRole> {
        return prisma.role.create({
            data: roleData,
            include: {
                users: true,
                permissions: true
            }
        });
    }

    async updateRole(id: number, roleData: CreateRoleDto): Promise<IRole> {
        return prisma.role.update({
            where: { id },
            data: roleData,
            include: {
                users: true,
                permissions: true
            }
        });
    }

    async deleteRole(id: number): Promise<IRole> {
        return prisma.role.delete({ 
            where: { id },
            include: {
                users: true,
                permissions: true
            }
        });
    }
}

export default RoleService;
