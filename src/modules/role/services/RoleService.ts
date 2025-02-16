import { CreateRoleDto } from '../dtos/CreateRoleDto';
import { IRole } from '../interfaces/IRole';
import prisma from '@services/prisma';

class RoleService {
    async getAllRoles(): Promise<IRole[]> {
        return prisma.role.findMany();
    }

    async getRoleById(id: number): Promise<IRole | null> {
        return prisma.role.findUnique({ where: { id } });
    }

    async createRole(roleData: CreateRoleDto): Promise<IRole> {
        return prisma.role.create({ data: roleData });
    }

    async updateRole(id: number, roleData: CreateRoleDto): Promise<IRole> {
        return prisma.role.update({
            where: { id },
            data: roleData,
        });
    }

    async deleteRole(id: number): Promise<IRole> {
        return prisma.role.delete({ where: { id } });
    }
}

export default RoleService;
