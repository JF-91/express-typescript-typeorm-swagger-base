import { CreateUserDto } from '../dtos/CreateUserDto';
import { UpdateUserDto } from '../dtos/UpdateUserDto';
import { IUser } from '../interfaces/IUser';
import prisma from '@services/prisma';

class UserService {
    async getAllUsers(): Promise<IUser[]> {
        return prisma.user.findMany() as unknown as IUser[];
    }

    async getUserById(id: number): Promise<IUser | null> {
        return prisma.user.findUnique({ where: { id } }) as unknown as IUser | null;
    }

    async createUser(userData: CreateUserDto): Promise<IUser> {
        return prisma.user.create({
            data: {
                email: userData.email,
                name: userData.name,
                password: userData.password,
                roleId: userData.roleId
            }
        }) as unknown as IUser;
    }

    async updateUser(id: number, userData: UpdateUserDto): Promise<IUser> {
        return prisma.user.update({
            where: { id },
            data: userData,
        }) as unknown as IUser;
    }
}

export default UserService;
