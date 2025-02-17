import { Service } from 'typedi';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { UpdateUserDto } from '../dtos/UpdateUserDto';
import { IUser } from '../interfaces/IUser';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Service()
class UserService {
    async getAllUsers(): Promise<IUser[]> {
        return prisma.user.findMany({
            include: {
                role: true,
                profile: true,
                posts: true
            }
        });
    }

    async getUserById(id: number): Promise<IUser | null> {
        return prisma.user.findUnique({
            where: { id },
            include: {
                role: true,
                profile: true,
                posts: true
            }
        });
    }

    async createUser(userData: CreateUserDto): Promise<IUser> {
        return prisma.user.create({
            data: {
                email: userData.email,
                name: userData.name,
                password: userData.password,
                roleId: userData.roleId
            },
            include: {
                role: true,
                profile: true,
                posts: true
            }
        });
    }

    async updateUser(id: number, userData: UpdateUserDto): Promise<IUser> {
        return prisma.user.update({
            where: { id },
            data: userData,
            include: {
                role: true,
                profile: true,
                posts: true
            }
        });
    }
}

export default UserService;
