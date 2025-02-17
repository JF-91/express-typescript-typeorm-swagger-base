import { Service } from 'typedi';
import { CreateProfileDto } from '../dtos/CreateProfileDto';
import { IProfile } from '../interfaces/IProfile';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Service()
class ProfileService {
    async getAllProfiles(): Promise<IProfile[]> {
        return prisma.profile.findMany({
            include: {
                user: true
            }
        });
    }

    async getProfileById(id: number): Promise<IProfile | null> {
        return prisma.profile.findUnique({
            where: { id },
            include: {
                user: true
            }
        });
    }

    async createProfile(profileData: CreateProfileDto): Promise<IProfile> {
        return prisma.profile.create({
            data: profileData,
            include: {
                user: true
            }
        });
    }

    async updateProfile(id: number, profileData: CreateProfileDto): Promise<IProfile> {
        return prisma.profile.update({
            where: { id },
            data: profileData,
            include: {
                user: true
            }
        });
    }

    async deleteProfile(id: number): Promise<IProfile> {
        return prisma.profile.delete({ where: { id } });
    }
}

export default ProfileService;
